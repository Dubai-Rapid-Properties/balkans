# D|R|P – Investitorski landing page (Balkan)

Landing page na srpskom (latinica) napravljen na osnovu PDF-a **„Priručnik za investitore"** – Dubai Rapid Properties.

Čist HTML/CSS/JS, bez build koraka. Otvorite `index.html` u browseru ili postavite folder na bilo koji statički hosting (Netlify, Vercel, GitHub Pages, cPanel…).

```
index.html            – sve sekcije stranice
assets/css/style.css  – dizajn (svetla tema: belo/krem + narandžasto, Playfair Display + Jost)
assets/js/main.js     – meni, grafikoni (SVG), plan otplate, kontakt forma
assets/img/           – slike (vidi listu ispod)
```

## Sekcije

1. Hero – „Investiraj sa D|R|P" (str. 1)
2. Ključne brojke – 10 god. viza, 0% poreza, 8–10% ROI, 70/30
3. Šta vam Dubai nudi – Zlatna viza, porezi, ROI (str. 2)
4. Regulacija i sigurnost + životni stil, biznis, bezbednost (str. 3)
5. Lokacije A, B i C sa mapom i cenama (str. 4)
6. Tržište u brojkama – 2 grafikona (str. 5–6)
7. Planovi otplate 70/30 + kompletan raspored 46 rata (str. 7)
8. ROI kod post-handover planova + linijski grafikon (str. 8–9)
9. Izdavanje: dugoročni vs. kratkoročni najam (str. 10)
10. Dobili ste ključeve – šta sada? (str. 11)
11. Kontakt + forma za upit (str. 12)

Grafikoni i ikonice su napravljeni u kodu (SVG), pa za njih ne trebaju slike.

## Potrebne slike

Ubacite fajlove u `assets/img/` **tačno sa ovim imenima**. Dok slika ne postoji, na njenom mestu se vidi oznaka „Slika: ime-fajla.jpg".
Stranica je u svetloj temi, pa najbolje izgledaju **svetle, dnevne fotografije** (plavo nebo, prirodno svetlo). Preko pozadinskih slika ide beli providni sloj da tekst ostane čitljiv.

| Fajl | Gde se koristi | Šta treba da bude na slici | Veličina |
|---|---|---|---|
| `dubai-map-zones.jpg` | Lokacije A/B/C | Mapa sa zonama – **već ubačena** | – |
| `hero-team.jpg` | Hero, desna polovina | Grupna fotografija DRP tima (ispred kancelarije ili u kancelariji) | 1400×1600, uspravna |
| `palm-jumeirah.jpg` | Pozadina „Šta vam Dubai nudi" | Palm Jumeirah iz vazduha, danju | 2400×1200 |
| `burj-khalifa.jpg` | Regulacija i sigurnost | Burj Khalifa / Downtown danju | 1600×1800 |
| `desert-skyline.jpg` | Pored grafikona viza | Pustinja + skyline Dubaija | 800×1200, uspravna |
| `dubai-marina.jpg` | Pored grafikona rasta + ROI sekcija | Dubai Marina, jahte i kule | 800×1400, uspravna |
| `villa-pool.jpg` | Pozadina „Planovi otplate" | Moderna vila / terasa sa bazenom | 2400×1400 |
| `terrace-skyline.jpg` | Kartica „Kratkoročni najam" | Svetla terasa stana sa pogledom na grad | 1200×1000 |
| `dubai-skyline.jpg` | Pozadina „Šta sada?" | Panorama Dubaija sa vodom | 2400×1200 |
| `office-interior.jpg` | Pozadina kontakta | Enterijer DRP kancelarije | 2400×1400 |
| `og-image.jpg` | Pregled linka na WhatsApp/Facebook/Viber | Logo + naslov „Investiraj sa D\|R\|P" | 1200×630 |
| `favicon.png` | Ikonica u tabu browsera | D\|R\|P znak | 512×512 |

Saveti: JPG ili WebP, kvalitet ~75–80%, svaka slika ispod ~400 KB. Fotografije iz PDF-a imaju utisnut tekst, pa su potrebni originalni (čisti) fajlovi.
Logo je trenutno napisan fontom (D | R | P ★); ako imate SVG logo, može se zameniti.

## Kontakt i društvene mreže

- Telefon: +971 4 529 4904 · WhatsApp: +971 56 777 0272 · office@dubairapidproperties.com
- Instagram [@drp_dubairapidproperties](https://www.instagram.com/drp_dubairapidproperties/), [LinkedIn](https://www.linkedin.com/company/dubairapidproperties/), [Facebook](https://www.facebook.com/dubairapidproperties/)
- Plutajuće WhatsApp dugme (dole desno) otvara chat sa unapred upisanom porukom.
- **Kontakt forma** – „Pošalji email" otvara email program posetioca sa popunjenim upitom za `office@dubairapidproperties.com`, a „Pošalji na WhatsApp" šalje isti upit na WhatsApp. Za direktno slanje u inbox/CRM povežite formu sa Formspree / Netlify Forms / CRM-om.

## Ispravke u odnosu na PDF

- Str. 7: zbir USD za 70% je u PDF-u **USD 256,767**, a po istom kursu (3.65) iznosi **USD 272,329**; ukupno je **USD 389,041** umesto 373,479. Stranica prikazuje ispravljene iznose.
- Str. 6: naslov kaže 2023/2024/2025, a legenda 2022/2024/2025 – na stranici je korišćeno **2023 / 2024 / 2025**.
- Str. 11: treća kartica je počinjala nemačkim tekstom („Die aus der Vermietung erzielten…") – prevedeno na srpski.
