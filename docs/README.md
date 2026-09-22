# docs/ — Eksik: Brief PDF

CLAUDE.md'nin kaynak sırasına göre üçüncü öncelikli kaynak şu dosya olmalı:

```
docs/TSC_Website_Gorselli_Basit_Yazilimci_Taslagi_v2.pdf
```

Bu dosya **henüz projede yok**. Kapsam, sayfa listesi, blok sıraları ve asıl Almanca ekran metinlerinin kaynağı bu PDF olacaktı; CLAUDE.md'nin "Teyit bekleyenler" bölümündeki birçok madde (şirket türü GmbH/AG çelişkisi, gerçek adres, nihai 8 ürün listesi, FAQ cevapları, süreç adımları) bu PDF olmadan çözülemiyor.

## Şu an ne kullanılıyor

MVP (adım 1–6), birincil görsel referans olarak `design-reference/` altındaki Claude Design export'unu kullanıyor. İçerik tarafında ise:

- Uydurma olgu/rakam/isim → görünür placeholder (`[TEXT FEHLT: …]`, `[FEHLT]`)
- Nötr arayüz metni → `i18n/locales/de.json`
- Tanıtım düzyazısı (hero, süreç adımları, FAQ) → `content/de/` altında, `approved: false` ile işaretli

Detaylar için onaylı plan: `~/.claude/plans/plan-claude-md-yi-b-rakt-m-hashed-papert.md`.

## Brief PDF geldiğinde

1. Bu dosyayı `docs/` altına koy.
2. `content/de/` içindeki `approved: false` bloklarını brief'teki gerçek metinle güncelle, `approved: true` yap.
3. "Teyit bekleyenler" listesindeki maddeleri (CLAUDE.md) brief'e göre çöz, CLAUDE.md'yi güncelle.
4. Şirket türü (GmbH/AG), adres, HRB/BaFin numaraları gibi hukuki verileri `content/site.json`'a işle.
