# D|R|P – Investitorski landing page (Balkan)

Landing page na srpskom (latinica) napravljen na osnovu PDF-a **„Priručnik za investitore"** – Dubai Rapid Properties.

Čist HTML/CSS/JS, bez build koraka. Otvorite `index.html` u browseru ili postavite folder na bilo koji statički hosting (Netlify, Vercel, GitHub Pages, cPanel…).

```
index.html            – sve sekcije stranice
assets/css/style.css  – dizajn (crno + narandžasto, Playfair Display + Jost)
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

| Fajl | Gde se koristi | Sadržaj (kao u PDF-u) | Preporučena veličina |
|---|---|---|---|
| `dubai-map-zones.jpg` | Lokacije | Mapa sa zonama A/B/C – **već ubačena** (izvučena iz PDF-a, str. 4) | – |
| `hero-team.jpg` | Hero, desna polovina | Grupna fotografija DRP tima ispred kancelarije (str. 1) | 1400×1600, uspravna |
| `palm-jumeirah-sunset.jpg` | Pozadina „Šta vam Dubai nudi" | Palm Jumeirah iz vazduha u zalasku (str. 2) | 2400×1200 |
| `burj-khalifa-sunset.jpg` | Regulacija i sigurnost | Burj Khalifa i Downtown u zalasku, sa vodom (str. 3) | 1600×1800 |
| `desert-skyline.jpg` | Pored grafikona viza | Pustinjske dine + skyline (str. 5) | 800×1200, uspravna |
| `dubai-marina-sunset.jpg` | Pored grafikona rasta + ROI sekcija | Dubai Marina u zalasku, jahte (str. 6 i 8) | 800×1400, uspravna |
| `villa-pool-night.jpg` | Pozadina „Planovi otplate" | Moderna vila / terasa sa bazenom noću (str. 7) | 2400×1400 |
| `terrace-skyline.jpg` | Kartica „Kratkoročni najam" | Svetla terasa stana sa pogledom na grad (str. 10) | 1200×1000 |
| `skyline-night.jpg` | Pozadina „Šta sada?" | Panorama Dubaija u sumrak, sa vodom (str. 11) | 2400×1200 |
| `office-interior.jpg` | Pozadina kontakta | Enterijer DRP kancelarije sa stepeništem (str. 12) | 2400×1400 |
| `og-image.jpg` | Pregled linka na WhatsApp/Facebook/Viber | Logo + naslov „Investiraj sa D\|R\|P" | 1200×630 |
| `favicon.png` | Ikonica u tabu browsera | D\|R\|P znak | 512×512 |

Saveti: JPG ili WebP, kvalitet ~75–80%, svaka slika ispod ~400 KB. Fotografije iz PDF-a imaju utisnut tekst, pa su potrebni originalni (čisti) fajlovi.
Logo je trenutno napisan fontom (D | R | P ★); ako imate SVG logo, može se zameniti.

## Šta još treba popuniti

- **Društvene mreže** – u `index.html` linkovi za Instagram, LinkedIn, YouTube i Facebook su `#` (traži `TODO`).
- **Kontakt forma** – trenutno otvara email program posetioca sa popunjenom porukom za `office@dubairapidproperties.com`. Za direktno slanje (bez email programa) povežite formu sa Formspree / Netlify Forms / CRM-om.
- **WhatsApp broj** – ako postoji, može se dodati plutajuće WhatsApp dugme.

## Ispravke u odnosu na PDF

- Str. 7: zbir USD za 70% je u PDF-u **USD 256,767**, a po istom kursu (3.65) iznosi **USD 272,329**; ukupno je **USD 389,041** umesto 373,479. Stranica prikazuje ispravljene iznose.
- Str. 6: naslov kaže 2023/2024/2025, a legenda 2022/2024/2025 – na stranici je korišćeno **2023 / 2024 / 2025**.
- Str. 11: treća kartica je počinjala nemačkim tekstom („Die aus der Vermietung erzielten…") – prevedeno na srpski.
