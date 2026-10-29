(function () {
  'use strict';

  var ORANGE = '#e8641e';
  var INK = '#2b2620';
  var fmt = new Intl.NumberFormat('sr-Latn-RS', { maximumFractionDigits: 0 });
  function eur(n) { return fmt.format(Math.round(n)) + ' €'; }

  /* ---------- Header & navigation ---------- */
  var header = document.querySelector('.site-header');
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Mark photo slots whose image has not been added yet ---------- */
  document.querySelectorAll('.photo').forEach(function (box) {
    var m = box.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    if (!m) return;
    var img = new Image();
    img.onerror = function () { box.setAttribute('data-missing', m[1].split('/').pop()); };
    img.src = m[1];
  });

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll('.tile, .chart-card, .steps li, .rent-card, .zones-panel, .zones-map, .calc-result, .num, .results div, .phases li, .contact-form, .about-media');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Zone tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.zone-tab'));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var next = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  /* ---------- SVG chart helpers ---------- */
  var theme = { grid: '#e7ddd0', muted: '#7a7268', text: '#17140f' };

  function el(tag, attrs, text) {
    var s = '<' + tag;
    for (var k in attrs) s += ' ' + k + '="' + attrs[k] + '"';
    return s + (text != null ? '>' + text + '</' + tag + '>' : '/>');
  }

  function legend(items) {
    return '<div class="legend">' + items.map(function (it) {
      var cls = it.type ? ' class="' + it.type + '"' : '';
      var style = it.type === 'dash' ? 'border-color:' + it.color : 'background:' + it.color;
      return '<span><i' + cls + ' style="' + style + '"></i>' + it.label + '</span>';
    }).join('') + '</div>';
  }

  function axes(o) {
    var out = '';
    for (var v = 0; v <= o.max; v += o.step) {
      var y = o.y(v);
      out += el('line', { x1: o.left, x2: o.right, y1: y, y2: y, stroke: theme.grid, 'stroke-dasharray': v ? '3 6' : '0' });
      out += el('text', { x: o.left - 12, y: y + 5, 'text-anchor': 'end', 'font-size': o.fs, fill: theme.muted }, o.tick(v));
    }
    return out;
  }

  // Grouped bar chart
  function barChart(target, cfg) {
    var narrow = target.clientWidth < 520;
    var W = narrow ? 480 : 640, H = 380, L = 62, R = W - 6, T = 26, B = H - 40;
    var fs = narrow ? 16 : 13;
    var y = function (v) { return B - (v / cfg.max) * (B - T); };
    var groupW = (R - L) / cfg.labels.length;
    var n = cfg.series.length;
    var barW = Math.min(46, (groupW * 0.74) / n);
    var svg = axes({ max: cfg.max, step: cfg.step, y: y, left: L, right: R, tick: cfg.tick, fs: fs });

    cfg.labels.forEach(function (label, i) {
      var cx = L + groupW * i + groupW / 2;
      var start = cx - (barW * n) / 2;
      cfg.series.forEach(function (s, j) {
        var v = s.data[i];
        var x = start + j * barW;
        svg += el('rect', { x: x + 1.5, y: y(v), width: barW - 3, height: B - y(v), fill: s.color, rx: 4 });
        svg += el('text', { x: x + barW / 2, y: y(v) - 7, 'text-anchor': 'middle', 'font-size': n > 2 ? fs - 2 : fs, 'font-weight': 700, fill: theme.text }, cfg.valueLabel(v));
      });
      svg += el('text', { x: cx, y: B + 26, 'text-anchor': 'middle', 'font-size': n > 2 ? fs - 1 : fs, fill: theme.muted }, label);
    });

    target.innerHTML = legend(cfg.series) +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + svg + '</svg>';
  }

  // Line chart
  function lineChart(target, cfg) {
    var narrow = target.clientWidth < 520;
    var W = narrow ? 500 : 720, H = 400, L = 54, R = W - 24, T = 26, B = H - 40;
    var fs = narrow ? 16 : 13;
    var y = function (v) { return B - (v / cfg.max) * (B - T); };
    var stepX = (R - L) / (cfg.labels.length - 1);
    var x = function (i) { return L + i * stepX; };
    var svg = axes({ max: cfg.max, step: cfg.step, y: y, left: L, right: R, tick: cfg.tick, fs: fs });

    cfg.labels.forEach(function (label, i) {
      svg += el('text', { x: x(i), y: B + 26, 'text-anchor': 'middle', 'font-size': fs, fill: theme.muted }, label);
    });

    cfg.series.forEach(function (s) {
      var pts = [];
      s.data.forEach(function (v, i) { if (v != null) pts.push([x(i), y(v), v]); });
      svg += el('polyline', {
        points: pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' '),
        fill: 'none', stroke: s.color, 'stroke-width': 2.5, 'stroke-dasharray': s.dash || '0',
        'stroke-linejoin': 'round', 'stroke-linecap': 'round'
      });
      pts.forEach(function (p, k) {
        if (s.labelEnds && k > 0 && k < pts.length - 1) {
          svg += el('circle', { cx: p[0], cy: p[1], r: 3.5, fill: '#fff', stroke: s.color, 'stroke-width': 2 });
          return;
        }
        svg += el('circle', { cx: p[0], cy: p[1], r: 4.5, fill: '#fff', stroke: s.color, 'stroke-width': 2.5 });
        svg += el('text', {
          x: p[0] + (s.labelDx || 0), y: p[1] + (s.labelDx ? 5 : s.labelBelow ? 22 : -11), 'text-anchor': 'middle',
          'font-size': fs - 1, 'font-weight': 700, fill: s.color
        }, String(p[2]).replace('.', ',') + '%');
      });
    });

    target.innerHTML = legend(cfg.series.map(function (s) {
      return { label: s.label, color: s.color, type: s.dash ? 'dash' : 'line' };
    })) + '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + svg + '</svg>';
  }

  function renderCharts() {
    var visas = document.getElementById('chartVisas');
    if (visas) {
      barChart(visas, {
        labels: ['2022', '2023', '2024', '2025'],
        max: 140000, step: 20000,
        tick: function (v) { return v ? v / 1000 + 'k' : '0'; },
        valueLabel: function (v) { return Math.round(v / 1000) + 'k'; },
        series: [
          { label: 'Izdate rezidentne vize', color: ORANGE, data: [110000, 120000, 125000, 130000] },
          { label: 'Nove stambene jedinice', color: INK, data: [37000, 36000, 39000, 42000] }
        ]
      });
    }

    var growth = document.getElementById('chartGrowth');
    if (growth) {
      barChart(growth, {
        labels: ['Palm J.', 'Marina', 'Bus. Bay', 'JVC', 'D. Hills'],
        max: 18, step: 3,
        tick: function (v) { return v + '%'; },
        valueLabel: function (v) { return v; },
        series: [
          { label: '2023', color: '#f2b98f', data: [8, 12, 10, 6, 9] },
          { label: '2024', color: ORANGE, data: [14, 16, 13, 10, 11] },
          { label: '2025', color: '#8a3a10', data: [10, 12, 11, 9, 10] }
        ]
      });
    }

    var roi = document.getElementById('chartRoi');
    if (roi) {
      lineChart(roi, {
        labels: ['1. god.', '2. god.', '3. god.', '4. god.', '5. god.', '6+'],
        max: 45, step: 5,
        tick: function (v) { return v + '%'; },
        series: [
          { label: 'ROI – dugoročni najam', color: INK, data: [10.9, 10.0, 9.3, 8.7, 8.1, 7.6], labelBelow: true, labelEnds: true },
          { label: 'ROI – kratkoročni najam', color: ORANGE, dash: '8 5', data: [11.3, 10.5, 9.7, 9.0, 8.5, 7.9], labelEnds: true },
          { label: 'Rast kapitalne vrednosti', color: '#8a3a10', dash: '12 5 3 5', data: [null, 5, 12, 20, 30, 40], labelDx: -40 }
        ]
      });
    }
  }
  renderCharts();
  var wasNarrow = window.innerWidth < 640;
  window.addEventListener('resize', function () {
    var isNarrow = window.innerWidth < 640;
    if (isNarrow !== wasNarrow) { wasNarrow = isNarrow; renderCharts(); }
  });

  /* ---------- Payment calculator ---------- */
  var price = document.getElementById('price');
  if (price) {
    var state = { rate: 1, yield: 8 };
    var out = function (id) { return document.getElementById(id); };

    function setChecked(group, btn) {
      group.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-checked', String(b === btn)); });
    }
    document.querySelectorAll('.segmented').forEach(function (group) {
      group.addEventListener('click', function (e) {
        var btn = e.target.closest('button');
        if (!btn) return;
        setChecked(group, btn);
        if (btn.dataset.rate) state.rate = parseFloat(btn.dataset.rate);
        if (btn.dataset.yield) state.yield = parseFloat(btn.dataset.yield);
        update();
      });
    });

    function update() {
      var p = parseFloat(price.value);
      var fill = (p - price.min) / (price.max - price.min) * 100;
      price.style.setProperty('--fill', fill + '%');
      out('priceOut').textContent = eur(p);

      var post = p * state.rate / 100;
      var months = Math.round(30 / state.rate);
      var rent = p * state.yield / 100 / 12;
      var cover = rent / post * 100;

      out('rDown').textContent = eur(p * 0.24);
      out('rBuild').textContent = eur(p * 0.01);
      out('rPost').textContent = eur(post);
      out('rPostNote').textContent = '30% kroz ' + months + ' meseci';
      out('rRent').textContent = eur(rent);
      out('rRentNote').textContent = String(state.yield).replace('.', ',') + '% godišnje, bruto procena';
      out('rCover').textContent = cover >= 100 ? '100%+' : Math.round(cover) + '%';
      out('rCoverBar').style.width = Math.min(100, cover) + '%';
    }
    price.addEventListener('input', update);
    update();
  }

  /* ---------- Payment plan example (AED 1,420,000) ---------- */
  var PRICE = 1420000;
  var AED_PER_USD = 3.65;
  // % of price per monthly installment, starting 05 Sep 2025
  var schedule = [10, 0, 10, 0]
    .concat(repeat(1, 8), [3], repeat(1, 11), [4], repeat(1, 11), [4], repeat(1, 9));

  function repeat(v, n) { var a = []; while (n--) a.push(v); return a; }
  function aed(pct) { return PRICE * pct / 100; }
  function usd(amount) { return Math.round(amount / AED_PER_USD); }
  function pad(n) { return n < 10 ? '0' + n : String(n); }

  var rowsEl = document.getElementById('payRows');
  var summaryEl = document.getElementById('paySummary');
  if (rowsEl && summaryEl) {
    var html = '';
    schedule.forEach(function (pct, i) {
      var d = new Date(2025, 8 + i, 5);
      var date = pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear() + '.';
      var a = aed(pct);
      html += '<tr' + (pct > 1 ? ' class="hl"' : '') + '><td>' + (i + 1) + '</td><td>' + date + '</td><td>' + pct +
        '%</td><td>' + fmt.format(a) + '</td><td>' + fmt.format(usd(a)) + '</td></tr>';
    });
    var postAed = aed(30);
    html += '<tr class="hl"><td colspan="2">Nakon ključeva – 1% mesečno, 30 meseci od jula 2029.</td><td>30%</td><td>' +
      fmt.format(postAed) + '</td><td>' + fmt.format(usd(postAed)) + '</td></tr>';
    rowsEl.innerHTML = html;

    var summary = [
      ['Učešće (09/2025 i 11/2025)', 20],
      ['Tokom izgradnje', 50],
      ['Nakon ključeva', 30]
    ];
    summaryEl.innerHTML = summary.map(function (r) {
      var a = aed(r[1]);
      return '<tr><td>' + r[0] + '</td><td>' + r[1] + '%</td><td>' + fmt.format(a) + '</td><td>' + fmt.format(usd(a)) + '</td></tr>';
    }).join('') +
      '<tr class="total"><td>Ukupno</td><td>100%</td><td>' + fmt.format(PRICE) + '</td><td>' + fmt.format(usd(PRICE)) + '</td></tr>';
  }

  /* ---------- Contact form → email or WhatsApp ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    var validate = function (required) {
      var ok = true;
      required.forEach(function (name) {
        var input = form.elements[name];
        var valid = input.value.trim() !== '' && input.checkValidity();
        input.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) note.textContent = required.length > 1 ? 'Molimo unesite ime i ispravnu email adresu.' : 'Molimo unesite ime.';
      return ok;
    };

    var message = function () {
      var f = form.elements;
      return [
        'Ime i prezime: ' + f.ime.value,
        'Email: ' + f.email.value,
        'Telefon / WhatsApp: ' + f.telefon.value,
        'Budžet: ' + f.budzet.value,
        'Zona interesovanja: ' + f.zona.value,
        '',
        f.poruka.value
      ].join('\n');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(['ime', 'email'])) return;
      window.location.href = 'mailto:office@dubairapidproperties.com' +
        '?subject=' + encodeURIComponent('Upit za investiciju – ' + form.elements.ime.value) +
        '&body=' + encodeURIComponent(message());
      note.textContent = 'Hvala! Otvaramo vaš email program da pošaljete upit.';
    });

    document.getElementById('waSend').addEventListener('click', function () {
      if (!validate(['ime'])) return;
      window.open('https://wa.me/971567770272?text=' + encodeURIComponent('Zdravo, zanima me investicija u Dubaiju.\n\n' + message()), '_blank', 'noopener');
      note.textContent = 'Hvala! Otvaramo WhatsApp da pošaljete upit.';
    });
  }
})();
