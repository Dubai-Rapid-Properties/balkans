# D|R|P – Investitorski landing page (Balkan)

Landing page na srpskom (latinica) napravljen na osnovu PDF-a **„Priručnik za investitore"** – Dubai Rapid Properties.

Čist HTML/CSS/JS, bez build koraka. Otvorite `index.html` u browseru ili postavite folder na bilo koji statički hosting (Netlify, Vercel, GitHub Pages, cPanel…).

```
index.html            – sve sekcije stranice
assets/css/style.css  – dizajn (svetla tema: krem + narandžasto, Playfair Display + Manrope)
assets/js/main.js     – meni, zone tabovi, grafikoni (SVG), kalkulator otplate, kontakt forma
assets/img/           – slike (vidi listu ispod)
```

## Sekcije

1. Hero – „Investirajte u Dubai sa partnerom, ne samo agentom" + ključne brojke
2. Zašto Dubai – bento mreža (viza, porezi, ROI, regulacija, biznis, stil života, sigurnost)
3. Lokacije – mapa + interaktivni tabovi za zone A, B i C
4. Tržište u brojkama – 2 grafikona + stvarni rezultati
5. Plan otplate 70/30 – interaktivni kalkulator (cena, rata posle ključeva, prinos od zakupa) + primer sa 46 rata
6. Prinos kroz vreme – faze i ROI grafikon
7. Izdavanje – dugoročni vs. kratkoročni najam
8. Kako radimo – 6 koraka + potpuno upravljanje
9. O nama, česta pitanja (FAQ), kontakt forma

Grafikoni i ikonice su napravljeni u kodu (SVG), pa za njih ne trebaju slike.

## Slike

Ubacite fajlove u `assets/img/` **tačno sa ovim imenima**. Dok slika ne postoji, na njenom mestu se vidi oznaka „Slika: ime-fajla.jpg".

| Fajl | Gde se koristi | Šta je na slici | Veličina |
|---|---|---|---|
| `dubai-map-zones.jpg` | Lokacije | Mapa sa zonama – **već ubačena** | – |
| `hero-dubai.jpg` ✅ | Hero (luk desno) | Burj Khalifa / Downtown danju | min. 1200×1500 |
| `palm-jumeirah.jpg` ✅ | Velika pločica „Zašto Dubai" | Palm Jumeirah iz vazduha | min. 1400×1200 |
| `villa-pool.jpg` ✅ | Kartica „Kratkoročni najam" | Moderna vila sa bazenom | min. 1200×700 |
| `desert-skyline.jpg` ✅ | Traka „Potpuno upravljanje" | Pustinja + skyline u zalasku | min. 1920×700 |
| `team.jpg` ✅ | O nama (velika slika) | DRP tim ispred kancelarije | min. 1600×1200 |
| `office-interior.jpg` ✅ | O nama (mala slika) | Enterijer DRP kancelarije | min. 800×800 |
| `og-image.jpg` ✅ | Pregled linka na WhatsApp/Facebook/Viber | Logo + naslov | 1200×630 |
| `favicon.png` ✅ | Ikonica u tabu browsera | D\|R\|P znak | 512×512 |

Saveti: JPG ili WebP, kvalitet ~75–80%, svaka slika ispod ~400 KB.
Logo: `logo-dark.png` (header i podnožje) i `logo-white.png` (za tamne pozadine), napravljeni iz originalnog logotipa. Uz favicon postoji i `apple-touch-icon.png`.

## Kontakt i društvene mreže

- Telefon: +971 4 529 4904 · WhatsApp: +971 56 777 0272 · office@dubairapidproperties.com
- Instagram [@drp_dubairapidproperties](https://www.instagram.com/drp_dubairapidproperties/), [LinkedIn](https://www.linkedin.com/company/dubairapidproperties/), [Facebook](https://www.facebook.com/dubairapidproperties/)
- Plutajuće WhatsApp dugme (dole desno) otvara chat sa unapred upisanom porukom.
- **Kontakt forma** – „Pošalji email" otvara email program posetioca sa popunjenim upitom za `office@dubairapidproperties.com`, a „Pošalji na WhatsApp" šalje isti upit na WhatsApp. Za direktno slanje u inbox/CRM povežite formu sa Formspree / Netlify Forms / CRM-om.

## Ispravke u odnosu na PDF

- Str. 7: zbir USD za 70% je u PDF-u **USD 256,767**, a po istom kursu (3.65) iznosi **USD 272,329**; ukupno je **USD 389,041** umesto 373,479. Stranica prikazuje ispravljene iznose.
- Str. 6: naslov kaže 2023/2024/2025, a legenda 2022/2024/2025 – na stranici je korišćeno **2023 / 2024 / 2025**.
- Str. 11: treća kartica je počinjala nemačkim tekstom („Die aus der Vermietung erzielten…") – prevedeno na srpski.
