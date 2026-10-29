(function () {
  'use strict';

  var ORANGE = '#f36b21';
  var fmt = new Intl.NumberFormat('en-US');

  /* ---------- Header & navigation ---------- */
  var header = document.querySelector('.site-header');
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 30);
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
  var revealTargets = document.querySelectorAll('.card, .feature, .zone, .chart-card, .rent-card, .pay-example, .stat');
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

  /* ---------- SVG chart helpers ---------- */
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
      out += el('line', { x1: o.left, x2: o.right, y1: y, y2: y, stroke: o.grid, 'stroke-dasharray': v ? '4 6' : '0' });
      out += el('text', { x: o.left - 12, y: y + 5, 'text-anchor': 'end', 'font-size': o.fs, fill: o.muted }, o.tick(v));
    }
    return out;
  }

  // Grouped bar chart
  function barChart(target, cfg) {
    var narrow = target.clientWidth < 600;
    var W = narrow ? 520 : 820, H = 420, L = 70, R = W - 10, T = 30, B = H - 44;
    var fs = narrow ? 17 : 14;
    var y = function (v) { return B - (v / cfg.max) * (B - T); };
    var groupW = (R - L) / cfg.labels.length;
    var n = cfg.series.length;
    var barW = Math.min(64, (groupW * 0.72) / n);
    var svg = axes({ max: cfg.max, step: cfg.step, y: y, left: L, right: R, grid: cfg.grid, muted: cfg.muted, tick: cfg.tick, fs: fs });

    cfg.labels.forEach(function (label, i) {
      var cx = L + groupW * i + groupW / 2;
      var start = cx - (barW * n) / 2;
      cfg.series.forEach(function (s, j) {
        var v = s.data[i];
        var x = start + j * barW;
        svg += el('rect', { x: x + 1, y: y(v), width: barW - 2, height: B - y(v), fill: s.color, rx: 2 });
        svg += el('text', { x: x + barW / 2, y: y(v) - 8, 'text-anchor': 'middle', 'font-size': n > 2 && narrow ? 13 : fs, 'font-weight': 600, fill: cfg.text }, cfg.valueLabel(v));
      });
      svg += el('text', { x: cx, y: B + 28, 'text-anchor': 'middle', 'font-size': n > 2 && narrow ? 14 : fs + 1, fill: cfg.text }, label);
    });

    target.innerHTML = legend(cfg.series) +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + svg + '</svg>';
  }

  // Line chart
  function lineChart(target, cfg) {
    var narrow = target.clientWidth < 600;
    var W = narrow ? 560 : 900, H = 440, L = 60, R = W - 30, T = 30, B = H - 44;
    var fs = narrow ? 17 : 14;
    var y = function (v) { return B - (v / cfg.max) * (B - T); };
    var stepX = (R - L) / (cfg.labels.length - 1);
    var x = function (i) { return L + i * stepX; };
    var svg = axes({ max: cfg.max, step: cfg.step, y: y, left: L, right: R, grid: cfg.grid, muted: cfg.muted, tick: cfg.tick, fs: fs });

    cfg.labels.forEach(function (label, i) {
      svg += el('text', { x: x(i), y: B + 28, 'text-anchor': 'middle', 'font-size': fs + 1, fill: cfg.text }, label);
    });

    cfg.series.forEach(function (s) {
      var pts = [];
      s.data.forEach(function (v, i) { if (v != null) pts.push([x(i), y(v), v]); });
      svg += el('polyline', {
        points: pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' '),
        fill: 'none', stroke: s.color, 'stroke-width': 3, 'stroke-dasharray': s.dash || '0',
        'stroke-linejoin': 'round', 'stroke-linecap': 'round'
      });
      pts.forEach(function (p) {
        svg += el('circle', { cx: p[0], cy: p[1], r: 5, fill: s.color });
        svg += el('text', {
          x: p[0] + (s.labelDx || 0), y: p[1] + (s.labelDx ? 5 : s.labelBelow ? 24 : -12), 'text-anchor': 'middle',
          'font-size': narrow ? 15 : 13, 'font-weight': 600, fill: s.color
        }, String(p[2]).replace('.', ',') + '%');
      });
    });

    target.innerHTML = legend(cfg.series.map(function (s) {
      return { label: s.label, color: s.color, type: s.dash ? 'dash' : 'line' };
    })) + '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + svg + '</svg>';
  }

  var dark = { grid: 'rgba(255,255,255,.14)', muted: '#b5aea4', text: '#f4f1ec' };
  var light = { grid: 'rgba(0,0,0,.12)', muted: '#5b5650', text: '#1b1b1b' };

  function renderCharts() {
  var visas = document.getElementById('chartVisas');
  if (visas) {
    barChart(visas, Object.assign({
      labels: ['2022', '2023', '2024', '2025'],
      max: 140000, step: 20000,
      tick: function (v) { return fmt.format(v); },
      valueLabel: function (v) { return Math.round(v / 1000) + 'k'; },
      series: [
        { label: 'Izdate rezidentne vize', color: ORANGE, data: [110000, 120000, 125000, 130000] },
        { label: 'Nove stambene jedinice', color: '#f4f1ec', data: [37000, 36000, 39000, 42000] }
      ]
    }, dark));
  }

  var growth = document.getElementById('chartGrowth');
  if (growth) {
    barChart(growth, Object.assign({
      labels: ['Palm Jumeirah', 'Dubai Marina', 'Business Bay', 'JVC', 'Dubai Hills'],
      max: 18, step: 2,
      tick: function (v) { return v + '%'; },
      valueLabel: function (v) { return v + '%'; },
      series: [
        { label: '2023', color: '#f9b868', data: [8, 12, 10, 6, 9] },
        { label: '2024', color: ORANGE, data: [14, 16, 13, 10, 11] },
        { label: '2025', color: '#8e3410', data: [10, 12, 11, 9, 10] }
      ]
    }, light));
  }

  var roi = document.getElementById('chartRoi');
  if (roi) {
    lineChart(roi, Object.assign({
      labels: ['1. god.', '2. god.', '3. god.', '4. god.', '5. god.', '6+ god.'],
      max: 45, step: 5,
      tick: function (v) { return v + '%'; },
      series: [
        { label: 'ROI – dugoročni najam (%)', color: '#f4f1ec', data: [10.9, 10.0, 9.3, 8.7, 8.1, 7.6], labelBelow: true },
        { label: 'ROI – kratkoročni najam (%)', color: ORANGE, dash: '10 6', data: [11.3, 10.5, 9.7, 9.0, 8.5, 7.9] },
        { label: 'Rast kapitalne vrednosti (%)', color: '#ffb488', dash: '14 6 3 6', data: [null, 5, 12, 20, 30, 40], labelDx: -32 }
      ]
    }, dark));
  }

  }
  renderCharts();
  var wasNarrow = window.innerWidth < 640;
  window.addEventListener('resize', function () {
    var isNarrow = window.innerWidth < 640;
    if (isNarrow !== wasNarrow) { wasNarrow = isNarrow; renderCharts(); }
  });

  /* ---------- Payment plan (example: AED 1,420,000) ---------- */
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
        '%</td><td>AED ' + fmt.format(a) + '</td><td>USD ' + fmt.format(usd(a)) + '</td></tr>';
    });
    var post = aed(30);
    html += '<tr class="hl"><td colspan="2">Nakon primopredaje – 1% mesečno, 30 meseci od jula 2029.</td><td>30%</td><td>AED ' +
      fmt.format(post) + '</td><td>USD ' + fmt.format(usd(post)) + '</td></tr>';
    rowsEl.innerHTML = html;

    var summary = [
      ['Učešće (09/2025 i 11/2025)', 20],
      ['Tokom izgradnje', 50],
      ['Nakon primopredaje', 30]
    ];
    summaryEl.innerHTML = summary.map(function (r) {
      var a = aed(r[1]);
      return '<tr><td>' + r[0] + '</td><td>' + r[1] + '%</td><td>' + fmt.format(a) + '</td><td>' + fmt.format(usd(a)) + '</td></tr>';
    }).join('') +
      '<tr class="total"><td>Ukupno</td><td>100%</td><td>' + fmt.format(PRICE) + '</td><td>' + fmt.format(usd(PRICE)) + '</td></tr>';
  }

  /* ---------- Contact form → email ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['ime', 'email'].forEach(function (name) {
        var input = form.elements[name];
        var valid = input.value.trim() !== '' && input.checkValidity();
        input.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        note.textContent = 'Molimo unesite ime i ispravnu email adresu.';
        return;
      }
      var f = form.elements;
      var body = [
        'Ime i prezime: ' + f.ime.value,
        'Email: ' + f.email.value,
        'Telefon / WhatsApp: ' + f.telefon.value,
        'Budžet: ' + f.budzet.value,
        'Zona interesovanja: ' + f.zona.value,
        '',
        f.poruka.value
      ].join('\n');
      window.location.href = 'mailto:office@dubairapidproperties.com' +
        '?subject=' + encodeURIComponent('Upit za investiciju – ' + f.ime.value) +
        '&body=' + encodeURIComponent(body);
      note.textContent = 'Hvala! Otvaramo vaš email program da pošaljete upit.';
    });
  }
})();
