# CLAUDE.md — TSC Versicherung Website

Bu dosya projenin kalıcı hafızası. Her oturumda önce bunu oku. Burada yazmayan bir kararı kendi başına verme, sor.

## Proje nedir

TSC Versicherung, Almanya'da seyahat sektörüne sigorta satan bir şirket. Site bir **lead toplama / tanıtım sitesi**: ziyaretçi bilgi alır, form doldurur, TSC satış ekibi iletişime geçer. Online satış, ödeme, fiyat hesaplama yok.

- **Ana ürün (B2B):** Sicherungsschein ve Insolvenzabsicherung. Paket tur satan şirketler § 651r BGB gereği müşteri parasını kendi iflaslarına karşı güvenceye almak zorunda. Yıllık cirosu 10 Mio. € üzerindekiler Deutscher Reisesicherungsfonds'a giriyor; altındakiler TSC gibi sigortacılardan alıyor. **Hedef kitle: cirosu 10 Mio. € altındaki Reiseveranstalter ve kendi paketini kuran Online-Reisebüros.** Ziyaretçi tatilci değil, yasal zorunluluğu olan şirket sahibi.
- **Destek ürün (B2C):** 8 seyahat sigortası, sadece vitrin kartı olarak.

## Kaynaklar ve öncelik sırası

1. **Bu dosya (CLAUDE.md)** — kurallar. Diğer her şeyle çeliştiğinde bu kazanır.
2. **Claude Design tasarımı** — görsel referans. Startseite başta olmak üzere tasarım Claude Design'da hazırlandı ve **birincil görsel referans odur**. Export edilmiş hali `design-reference/` klasöründe (HTML/CSS ve ekran görüntüleri). Layout, renk kullanımı, boşluklar, tipografi ölçeği, component görünümü buradan alınır. Orijinal proje: `https://claude.ai/artifact/C167a5rjjkbYDNmiadWxXA` (giriş gerektirir, Claude Code açamaz; her zaman klasördeki export'u kullan).
3. **Brief PDF** — `docs/TSC_Website_Gorselli_Basit_Yazilimci_Taslagi_v2.pdf`. Kapsam, sayfalar, blok sıraları ve Almanca ekran metinleri buradan gelir.
4. **Sektör standartları** — aşağıdaki bölüm.

Tasarım referansı ile brief arasında **içerik/kapsam** çelişkisi olursa brief kazanır (tasarım aracı bazı link ve şirket verileri uydurdu, bkz. "Teyit bekleyenler"). **Görsel** konularda tasarım referansı kazanır, bu dosyadaki kurallarla çelişmediği sürece. Tasarım referansında bu dosyanın kurallarını ihlal eden bir şey görürsen (düşük kontrast, ALL-CAPS etiketler, 12px üstü radius vb.) kurala uygun hale getirerek uygula ve bana söyle.

## Sektör standartları: ilham kaynağı ve sınırlar

Bu site, aynı ürünü satan mevcut Alman sigortacıların sitelerinden ilham alınarak tasarlandı. Hedef: sektörün tanıdık, güven veren dilinden **kopmadan** daha temiz ve modern bir uygulama. Farkımız şıklıkta ve kullanım kolaylığında olacak; alışılmış kalıpları bozmakta değil. Ziyaretçi bir sigorta sitesinde olduğunu ilk saniyede anlamalı.

Referans siteler (rakipler, aynı ürün):
- **ruv.de** — R+V Kautionsversicherung für Reiseanbieter (en yakın referans)
- **zurich.de** — Kundengeldabsicherung / Reisepreisabsicherung, teklif için gereken belgeler yapısı
- **buergschaft24.de** — "Das Wichtigste in Kürze" kutusu, § 651r/651w atıfları
- **ipzv-versicherungen.de** — TSC ölçeğine yakın küçük oyuncu
- **hansemerkur.de, ergo.de** — B2C seyahat sigortası kartları

Korunacak sektör kalıpları:
- **"Das Wichtigste in Kürze"**: B2B ürün sayfalarının başında 3-4 maddelik özet kutusu
- **Yasal atıfların görünür olması** (§ 651r BGB gibi); gizlenmez, güven verir
- **Checkmark'lı fayda listeleri**, her yerde kart grid'i yerine
- **Kimin için olduğunun erken söylenmesi**: 10 Mio. € ciro eşiği ilk ekranda
- **Skip link** ve erişilebilirlik (Alman sigorta sitelerinde standart)
- **Net, tek anlamlı CTA'lar**: "Sicherungsschein anfragen", "Angebot anfordern", "Jetzt prüfen"
- **Sakin, kurumsal ton**: parlak renk, oyuncu illüstrasyon, agresif animasyon yok
- **Footer'da hukuki linkler** (Impressum, Datenschutz, AGB) her sayfada erişilebilir

Bir tasarım kararı sektör standardından belirgin şekilde sapıyorsa (alışılmadık navigasyon, gizlenmiş iletişim bilgisi, deneysel layout) uygulamadan önce sor.

## Stack

- Nuxt 4 (`app/` dizin yapısı), Vue 3, TypeScript
- Tailwind CSS v4, token'lar `app/assets/css/main.css` içinde `@theme` ile
- `@nuxt/content` v3: sayfa metinleri, ürünler, FAQ, hukuki metinler
- `@nuxtjs/i18n`: `de` (yayın dili) + `tr` (sadece geliştirici için, bkz. "Dil: DE / TR")
- Nitro server routes (`server/api/`): formlar ve doğrulama modülü
- PostgreSQL + Drizzle ORM (doğrulama modülü ve admin panel için)
- `nuxt-auth-utils`: admin panel session auth
- Zod: tüm form ve API validasyonu (client + server aynı şema)
- Deploy: Docker Compose (app + postgres), AB içi VPS

Ayrı bir NestJS backend **kurma**. Her şey tek Nuxt projesi içinde kalır.

## Klasör yapısı

```
app/
  components/
    base/       BaseButton, BaseCard, BaseInput, BaseTextarea, BaseAccordion, BaseBadge
    layout/     TheHeader, TheFooter, TheContainer, TheBreadcrumb, SkipLink
    sections/   HeroSection, TrustIcons, KeyFacts, ProcessSteps, CtaSection
    product/    ProductCard, ProductGrid, PriceDisplay
    forms/      NachweisForm, KontaktForm, AngebotForm
    admin/      CompanyTable, CompanyForm, PdfUpload
  layouts/      default.vue, admin.vue
  pages/        (URL listesine bak)
  assets/css/   main.css
content/
  de/                     ASIL İÇERİK (yayına giden)
    pages/                sicherungsschein.md, insolvenzabsicherung.md, ueber-uns.md, service.md
    products.json
    faq.json
    legal/                impressum.md, datenschutz.md, agb.md
  tr/                     de/ ile aynı yapı, sadece geliştirici için Türkçe karşılık
  site.json               şirket bilgileri, telefon, e-posta, adres (tek kaynak, dile bağlı değil)
i18n/locales/
  de.json                 UI metinleri (buton, label, hata mesajı), asıl
  tr.json                 de.json ile aynı anahtarlar, Türkçe karşılık
design-reference/         Claude Design export'u (HTML/CSS + ekran görüntüleri)
docs/                     brief PDF
server/
  api/          kontakt.post.ts, angebot.post.ts, nachweis.post.ts, admin/*
  db/           schema.ts, migrations
  utils/        mail.ts, rateLimit.ts
storage/pdfs/   doğrulama PDF'leri (web root DIŞINDA, git'e girmez)
```

## Sayfalar ve URL'ler

| URL | Sayfa |
|---|---|
| `/` | Startseite |
| `/sicherungsschein` | Sicherungsschein |
| `/insolvenzabsicherung` | Insolvenzabsicherung |
| `/reiseversicherungen` | Reiseversicherungen |
| `/angebote` | Angebote |
| `/nachweis-pruefen` | Nachweis prüfen |
| `/service` | Service (sadece yönlendirme merkezi) |
| `/ueber-uns` | Über uns |
| `/kontakt` | Kontakt |
| `/faq` | FAQ |
| `/impressum`, `/datenschutz`, `/agb` | Hukuki |
| `/admin/*` | Doğrulama paneli (korumalı) |

Bu listede olmayan bir sayfa veya link ekleme. Tasarım referansında listede olmayan bir link görürsen (aşağıdaki "Teyit bekleyenler") placeholder bırak ve bana söyle.

**Menü (kesinleşti, brief sayfa 14):** Startseite · Sicherungsschein · Insolvenzabsicherung · Reiseversicherungen · Angebote · Service · Über uns · Kontakt — düz liste, dropdown yok. Sağda iki sabit aksiyon butonu: "Nachweis prüfen" ve "Angebot anfordern" (bu ikinci buton `/kontakt`'a gider, ayrı bir Angebot formu yok). Mobilde hamburger, aynı sıra, "Nachweis prüfen" ayrı belirgin buton.

Sicherungsschein ve Insolvenzabsicherung aynı sayfa template'ini kullanır, sadece içerik değişir.

## İçerik kuralları (kritik)

- **Bileşenlerin içine metin gömme.** Her metin `content/` ya da `i18n/locales/de.json` içinden gelir. İleride Nuxt Studio gibi bir editör eklenebilmesi buna bağlı.
- **Almanca metin üretme, "iyileştirme", yeniden yazma.** Sigorta düzenlemeye tabi bir alan. Almanca metinler brief'ten veya müşteriden gelir. Eksik metin için görünür placeholder kullan: `[TEXT FEHLT: FAQ-Antwort 3]`. (Almancadan Türkçeye geliştirici çevirisi serbest, bkz. aşağısı.)
- **Şirket verisi uydurma.** Adres, telefon, HRB numarası, BaFin/Vermittler register numarası, Geschäftsführer adı, USt-IdNr asla uydurulmaz. Hepsi `content/site.json`'dan gelir; değer yoksa `[FEHLT]` basılır.
- Hukuki sayfalar (Impressum, Datenschutz, AGB) müşteriden gelen metnin olduğu gibi yerleştirilmesidir. İçeriğine karışma.
- Sayı ve para formatı her zaman `Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })`. Elle format yok.

## Dil: DE / TR

Geliştirici Almanca bilmiyor. Sitede neyin nerede yazdığını anlayabilmesi için **ilk günden** bir DE/TR dil seçeneği kurulur. Bu yapı iskeletle birlikte kurulur, sonraya bırakılmaz.

- **Almanca (`de`) asıl dildir.** Yayına giden, müşterinin onayladığı tek dil. Default locale, URL prefix'siz.
- **Türkçe (`tr`) sadece geliştirici içindir.** Almanca metnin anlamını görmek için. Müşteriye veya ziyaretçiye asla gösterilmez.
- Görünürlük env flag ile: `NUXT_PUBLIC_DEV_LOCALE_TR=true`. Flag kapalıyken `tr` locale'i hiç yüklenmez, `/tr` route'ları üretilmez, dil değiştirici görünmez.
- Flag **sadece lokal geliştirmede açık.** Müşteriye gönderilen staging ve production'da kapalı.
- Flag açıkken header'ın en üstünde küçük bir `DE | TR` değiştirici görünür, yanında "Dev" etiketi. Tasarımın parçası değil, sade tut.
- `tr` sayfalarına `noindex` eklenir (flag yanlışlıkla açık kalırsa diye).
- Türkçe metinler Almancanın çevirisidir; tersine akış yoktur. Almanca bir metin değişirse Türkçe karşılığı da aynı commit'te güncellenir.
- Almanca placeholder (`[TEXT FEHLT: ...]`) varsa Türkçesi de placeholder kalır: `[METİN YOK: ...]`.
- Türkçe çeviriler Claude tarafından yapılabilir; amaç anlamak, cilalı metin değil. Hukuki metinlerde (Impressum, Datenschutz, AGB) Türkçe karşılık kısa özet olarak yeterli.
- `de.json` ve `tr.json` aynı anahtar setine sahip olmalı. Eksik anahtar build'de uyarı versin.

## Ürün ve fiyat kuralı

`content.config.ts` ürün şeması:

```ts
const product = z.object({
  slug: z.string(),
  name: z.string(),
  icon: z.string(),
  benefit: z.string(),
  price: z.number().nullable(),
  period: z.enum(['pro Jahr', 'pro Reise', 'je nach Tarif']).nullable(),
  badge: z.enum(['Top Preis', 'Beliebt', 'Neu', 'Bestseller']).nullable(),
  approved: z.boolean().default(false),
  featured: z.boolean().default(false)
})
```

`PriceDisplay` tek kural uygular: `approved && price !== null` ise "ab 19,00 €" + periyot; aksi halde "Preis auf Anfrage" + "Individuelles Angebot" butonu. **Onaysız fiyat hiçbir koşulda ekrana basılmaz.** Brief'teki fiyatlar rakip benchmarkıdır, TSC tarifesi değildir; varsayılan olarak hepsi `approved: false`.

Ana sayfada `featured: true` olan 8 ürün 4+4 grid. Mobilde 2 kolon veya yatay scroll.

## Doğrulama modülü (Nachweis prüfen)

~28 firma, her birinde sorgu numarası, firma adı ve bir PDF. Dış API yok; veriyi TSC admin panelden girer.

```ts
companies: id, queryNumber (unique), companyName, companyNameNormalized,
           pdfPath, isActive, createdAt, updatedAt
```

Public sorgu endpoint'i (`POST /api/nachweis`) kuralları:
- Numara **ve** firma adı birlikte eşleşmeli. Tek başına numarayla sonuç dönmez (enumeration koruması). Ad karşılaştırması normalize edilmiş (küçük harf, boşluk/noktalama temizlenmiş) değer üzerinden.
- IP başına rate limit.
- Cevap minimal: bulunduysa firma adı + kısa ömürlü imzalı PDF indirme linki; bulunmadıysa sadece "Kein Eintrag gefunden". Hangi alanın yanlış olduğu söylenmez.
- PDF'ler `storage/pdfs/` altında, public klasörde değil. Sadece geçerli imzalı link ile servis edilir. Dosya adları tahmin edilemez (uuid).

Form, bileşen olarak üç yerde kullanılır: Startseite, Sicherungsschein, Insolvenzabsicherung. Ayrıca `/nachweis-pruefen` bağımsız sayfası vardır.

## Admin panel

Kapsam bilerek küçük tutuldu. Sadece:
- Giriş (session, 1-2 admin kullanıcı, parolalar hash'li)
- Firma listesi tablosu, arama
- Firma ekle / düzenle / pasifleştir / sil
- PDF yükle / değiştir (sadece `application/pdf`, boyut sınırı)

Dashboard grafiği, rol sistemi, davet akışı, tema seçici, aktivite akışı **yok**. Panel sade ve kullanışlı; public sitenin tasarım token'larını kullanır ama pazarlama görselleri içermez.

## Formlar

Kontakt, Nachweis prüfen. (Brief'te ayrı bir çok adımlı "Angebot anfordern" formu yok — `/angebote` bir fiyat/kampanya vitrini, tüm "Angebot anfordern" CTA'ları Kontakt formuna gider.)
- Zod şeması client ve server'da ortak
- Honeypot alanı + IP rate limit (captcha yok)
- DSGVO onay checkbox'ı, Datenschutz sayfasına link
- Mail gönderimi SMTP ile (`server/utils/mail.ts`), bilgiler `.env`'den
- Her formda loading, success, error state'leri; hata mesajları ne olduğunu ve nasıl düzeltileceğini söyler
- Kontakt alanları: Name, E-Mail, Unternehmen, Anliegen, Nachricht

## Design system

### Renkler

```
--color-navy:     #0B2E59   dominant, başlıklar, koyu yüzeyler
--color-blue:     #0F5AA6   aksiyon, link, primary buton
--color-sky:      #EAF4FB   bölüm arka planı, az kullan
--color-white:    #FFFFFF
--color-border:   #D6E4F0
```

Form durumları için bir başarı ve bir hata rengi ekle, başka renk ekleme.

### Kurallar

- **Gradient yok.** Arka planda, metinde, butonda.
- **Glassmorphism / blur yok.**
- **Border-radius:** kartlar 8px, buton ve input 6px. Hiçbir yerde 12px üstü yok. Her şeye aynı radius verme, hiyerarşiye göre değişsin.
- **Gölge:** varsayılan yok, 1px `--color-border` kullan. Gölge sadece hover'da, çok hafif.
- **Hero sol hizalı**, asimetrik. Ortalanmış hero + yan yana iki buton kalıbı yok.
- **İkonlar:** tek set, line stil, tek stroke kalınlığı (1.5px). Emoji yok, dolu/line karışık yok.
- **Kontrast:** tüm metinler WCAG AA'yı geçer. Footer dahil. Açık mavi metni beyaz zemin üzerinde kullanma.
- Max içerik genişliği 1200px.
- Buton ve input min yükseklik 46px.
- Breakpoint'ler: 0-767 mobil (1 kolon), 768-1023 tablet (2 kolon), 1024+ desktop.
- Mobil masaüstünün küçültülmüş hali değil: hero görseli metnin altına düşer, CTA tam genişlik, formlar alt alta, FAQ ve footer accordion.

### "AI şablonu gibi durmasın" kuralları

- Her bölüm aynı ritimde olmasın. İkon + başlık + iki satır kartının sayfa boyunca tekrarı yasak. Bir bölüm liste, biri 2 kolon, biri tam genişlik; dikey boşluk 96-128px arasında değişken.
- Her başlığın üstüne tracked-out ALL-CAPS etiket (eyebrow) koyma. Footer kolon başlıkları dahil.
- Meta bilgileri orta nokta ile zincirleme (`A · B · C`) yazma, satır satır yaz.
- Başlıkta tek kelimeyi farklı renk/italik yapma.
- Numaralı işaretler (01/02/03) sadece gerçekten sıralı içerikte (başvuru adımları).
- Hareket: hover ve accordion açılışı yeterli. Her bölüme fade-in/slide-up ekleme. `prefers-reduced-motion` respekt edilir.
- "Trusted by" sahte logo bandı yok.

### Tipografi

- Tasarım referansındaki font ailesini kullan; referans netleşmemişse gövde için Source Sans 3 veya IBM Plex Sans. Inter, Poppins, Montserrat kullanma.
- Fontlar **self-host** edilir (`@fontsource` veya `public/fonts`). Google Fonts CDN yok.
- Almanca uzun kelimeler (Insolvenzabsicherung, Reiseversicherungen): başlıklarda satır taşmasını test et, gerekirse `hyphens: auto` + `lang="de"`.
- ä, ö, ü, ß glifleri seçilen fontta düzgün olmalı.
- El yazısı aksanlar ("Gemeinsam mehr möglich" vb.) brief'in parçası, tek bir script font ile ve seyrek kullan.
- Gövde satır uzunluğu 80 karakteri geçmesin.

### Görseller

- B2B sayfalarında (Startseite hero, Sicherungsschein, Insolvenzabsicherung) iş/ofis/profesyonel tonlu fotoğraf. B2C ürün kartlarında seyahat fotoğrafı.
- Brief'teki görseller AI mockup'ıdır, kullanılmaz. Lisanslı görsel gelene kadar nötr placeholder.
- Logo SVG olarak gelecek; PDF'ten kesilmiş logo kullanılmaz.

## Erişilebilirlik ve SEO

- İlk odaklanabilir öğe skip link: "Zum Hauptinhalt springen"
- `<html lang="de">`, semantik landmark'lar, görünür focus state, tam klavye navigasyonu
- Accordion'lar `button` + `aria-expanded`
- Her sayfada title/description, sitemap, robots, Organization ve FAQPage structured data
- Lighthouse hedefi: tüm kategorilerde 90+

## Gizlilik (DSGVO)

- Üçüncü taraf istek yok: CDN font yok, gömülü harita yok, analytics yok. Böylece cookie banner'a gerek kalmaz. Bunlardan biri eklenecekse önce sor.
- Form verisi sadece mail olarak gönderilir, veritabanında saklanmaz.
- Loglarda form içeriği tutulmaz.

## Kapsam dışı (ilk sürüm)

- Kundenportal (brief'te "Faz 2", sadece header'da yeri ayrılır, link yok)
- Online satın alma, ödeme, fiyat hesaplama, filtre, karşılaştırma motoru
- Ziyaretçiye açık çoklu dil (yayında sadece `de`; `tr` yalnızca geliştirici görünümü)
- CMS (içerik dosyada; gerekirse sonra Nuxt Studio eklenir)

## Teyit bekleyenler

Brief PDF'i geldi (`docs/TSC_Website_Gorselli_Basit_Yazilimci_Taslagi_v2.pdf`, 17 sayfa) — aşağıdaki maddelerin çoğu bu belgeyle çözüldü. Kalan gerçek belirsizlikler için placeholder bırak, yanına `<!-- TODO(TSC): teyit bekliyor -->` yaz.

**Çözüldü:**
- **Şirket türü:** GmbH kesinleşti (brief tutarlı şekilde "TSC Versicherung GmbH" kullanıyor; tasarım aracının "AG"si yanlıştı).
- **Tasarımda olup brief'te olmayan linkler:** Rechtsgrundlagen, Downloads, Maklerportal, Schadenmeldung, Gruppen- & Incoming, Aktuelles, Karriere — brief'in 13 sayfalık site haritasında (bölüm 14) hiçbiri yok, **kesin red**. Nav/footer'da placeholder olarak bile durmuyorlar, tamamen kaldırıldılar.
- **Menü yapısı:** kesinleşti, bkz. yukarıdaki "Menü" satırı.
- **Nihai 8 ürün listesi:** brief'te iki farklı liste vardı (bölüm 04 vitrin listesi vs. bölüm 15 fiyat tablosu listesi); bölüm 04 listesi esas alındı: Auslandskrankenversicherung, Reiserücktrittversicherung, Reiseabbruchversicherung, Reisegepäckversicherung, Fahrradschutz, Mietwagen-Selbstbehalt, Jahres-Reiseversicherung, Geschäftsreiseversicherung.
- **`/angebote` sayfasının anlamı:** fiyat/kampanya vitrini (8 ürünün büyük kart hali), form değil.

**Hâlâ açık:**
- **Tasarım footer'ındaki uydurma veriler:** Kurfürstendamm 214 Berlin adresi, HRB 184 226 B, BaFin-Register 5100-VU — tasarım aracının uydurduğu değerler, koda **geçirilmez**. Brief'teki adres (Am Flughafen 6, 36110 Schlitz), telefon (+49 221 123 456 0), e-posta (info@tsc-versicherung.de) ve Geschäftsführer adı ("Max Mustermann") de placeholder — brief'in kendi notu: *"Gerçek şirket bilgileri yayından önce TSC tarafından doğrulanıp girilecek."* HRB/BaFin-Register/USt-IdNr brief'te hiç verilmiyor.
- **Fiyatlar:** brief "rakip piyasa benchmarkı" olarak 7-8 örnek fiyat veriyor (bölüm 15) ama kendi notu da diyor ki bunlar TSC'nin onaylı tarifesi değil. CLAUDE.md kuralı kazanır: onaylı tarife gelene kadar hepsi `approved: false`, ekranda hiçbir fiyat basılmaz.
- **Eksik içerik:** FAQ cevapları (5/6 soru brief'te var, cevapları yok), Service sayfası detayı, "Für wen ist der Sicherungsschein?" tam metni, ürün fayda cümleleri (`benefit` alanları), hukuki metinler (Impressum/Datenschutz/AGB gövdesi), "Warum TSC?" madde metinleri, logo SVG, lisanslı fotoğraflar.

## Yapım sırası

1. İskelet: Nuxt, Tailwind token'ları, content şeması, klasörler, **i18n (DE asıl + TR geliştirici görünümü, env flag'li değiştirici)**, `design-reference/` içeriğini incele ve token'ları oradan çıkar
2. Base component'ler (Button, Card, Input, Accordion, Badge)
3. Layout: Header, Footer, Container, Breadcrumb, SkipLink
4. **Startseite tam kalitede** (placeholder içerik, final tasarım) → staging → müşteri onayı
5. Sicherungsschein + Insolvenzabsicherung (ortak template)
6. Reiseversicherungen, Angebote (ProductCard + PriceDisplay)
7. Formlar ve mail
8. Doğrulama modülü + admin panel + DB
9. İkincil ve hukuki sayfalar, 404
10. SEO, erişilebilirlik taraması, Lighthouse, deploy

## Çalışma kuralları

- Bir component veya bölüm yazmadan önce `design-reference/` içindeki karşılığına bak; renk, boşluk ve oranları oradan al. Karşılığı yoksa (tasarımı yapılmamış sayfalar) aynı tasarım dilini ve sektör standartlarını takip et, yeni bir görsel dil icat etme.
- Tasarım referansında bir değer bu dosyanın kurallarıyla çelişiyorsa kural kazanır; ne değiştirdiğini commit mesajında veya bana yazarak belirt.
- Yeni bağımlılık eklemeden önce sor.
- Commit mesajları Conventional Commits formatında (`feat:`, `fix:`, `chore:` ...).
- Emin olmadığın bir iş kuralında tahmin yürütme, sor.
