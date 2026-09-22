# Design Tokens — Claude Design Export'undan Ölçülen Değerler

Kaynak: `https://claude.ai/artifact/C167a5rjjkbYDNmiadWxXA` ("Bundled Page" export, Node ile ayrıştırıldı: `__bundler/manifest` + `__bundler/template` bloğu). Tam canvas export'u `full-canvas-export.html`, kare kare izole edilmiş kopyalar `frames/*.html` altında.

Bu dosyadaki değerler tasarımdan **ölçüldü**, tahmin edilmedi. CLAUDE.md'nin orijinal varsayımlarıyla çelişen yerler not edildi — CLAUDE.md güncellenmesi bu ölçümlere dayanıyor.

Not: export'ta `#__claude_design_branding` adlı bir widget var (Claude Design aracının kendi "made with" rozeti, `#D97757` / `#141413` renkleri ondan geliyor) — **tasarımın parçası değil**, aşağıdaki tüm sayımlarda hariç tutuldu.

## Kareler (frames)

| Dosya | İçerik |
|---|---|
| `frames/frame-startseite.html` | Startseite — Desktop (1200px), tam sayfa |
| `frames/frame-hero-2a.html` | Hero alternatifi A — koyu zemin, tam genişlik |
| `frames/frame-hero-2b.html` | Hero alternatifi B — belge/görsel odaklı |
| `frames/frame-hero-2c.html` | Hero alternatifi C — Nachweis-prüfen yolu vurgulu |
| `frames/frame-produktseite.html` | Produktseite — Insolvenzversicherung (Sicherungsschein/Insolvenzabsicherung ortak template referansı) |
| `frames/frame-angebotsformular.html` | Angebot anfordern — 3 adımlı form |
| `frames/frame-mobil-start.html` | Mobil — Startseite yapısı (390px, bağımsız) |
| `frames/frame-mobil-tarife.html` | Mobil — Tarife akordeon |
| `frames/frame-mobil-formular.html` | Mobil — Form adım 1 |

Her dosya bağımsız açılabilir statik HTML'dir (Google Fonts CDN ile — **sadece bu önizleme için**, production'da fontlar self-host edilir, bkz. aşağı). Gerçek uygulama kodunun parçası değildir, yalnızca görsel/ölçü referansıdır.

## Tipografi

- Başlıklar (h1–h4): **Libre Franklin** (400/500/600/700/800 ağırlıklar export'ta mevcut)
- Gövde: **Source Sans 3**
- Tasarım Google Fonts CDN'den çekiyor → production'da DSGVO gereği `@fontsource-variable/libre-franklin` + `@fontsource-variable/source-sans-3` ile self-host edilecek (CLAUDE.md kuralı zaten buydu, sadece font ailesi netleşti — eski metin "Source Sans 3 veya IBM Plex Sans" idi).

**Font-size envanteri** (branding widget hariç, `font:` shorthand + `font-size:` birleşik sayım): 9, 10, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 17, 17.5, 18, 19, 20, 21, 24, 26, 28, 30, 34, 36, 40, 44, 46, 50, 54 px — 30 ayrı değer, serbest kullanılmış (ölçek değil). En küçük değerler (9/10/11) çoğunlukla canvas'ın kendi kare etiketleri ("1", "Vollständige Seite" gibi editör annotasyonları), TSC tasarımının parçası değil.

**Konsolide edilecek ölçek (9 adım):** `12 / 14 / 15 / 17 / 20 / 24 / 30 / 40 / 54` — gövde metni 15px.

## Renkler

Hex sayımı (branding widget hariç, tüm kareler toplam):

| Hex | Sayı | Kullanım | CLAUDE.md eşleşmesi |
|---|---|---|---|
| `#D6E4F0` | 152 | çizgi/border | `--color-border` (zaten tanımlı) |
| `#0B2E59` | 114 | başlık, koyu yüzey | `--color-navy` (zaten tanımlı) |
| `#5B7391` | 82 | ikincil metin | yeni: `--color-slate-500` |
| `#0F5AA6` | 56 | aksiyon/link/primary buton | `--color-blue` (zaten tanımlı) |
| `#BFD6EA` | 36 | güçlü border / navy üzerinde ikincil metin | yeni: `--color-border-strong` |
| `#38557A` | 34 | ara ton yüzey/metin | yeni: `--color-navy-500` |
| `#EAF4FB` | 27 | bölüm arka planı | `--color-sky` (zaten tanımlı) |
| `#7FB0DC` | 15 | **sadece dekoratif** — beyaz üzerinde metin olarak kullanılırsa AA'yı geçmiyor (≈2.2:1) | yeni: `--color-blue-300`, metin olarak KULLANILMAYACAK |
| `#F7FBFE` | 12 | çok açık yüzey | yeni: `--color-surface` |
| `#8AA2BC` | 12 | **sadece çizgi/ikon** — beyaz üzerinde metin olarak AA'yı geçmiyor (≈2.6:1) | yeni: `--color-slate-400`, metin olarak KULLANILMAYACAK |
| `#28527E` | 7 | navy tonu | yeni: `--color-navy-600` |
| `#F2F7FC` | 3 | yüzey | yeni: `--color-surface-2` |
| `#E7F0F8` | 3 | yüzey | yeni: `--color-surface-3` |
| `#13406F` | 3 | navy tonu | yeni: `--color-navy-700` |
| `#EEF1F5` | 1 | canvas zemin (editör arka planı, TSC sayfası değil) | kullanılmayacak |
| `#3C6390` | 1 | ayraç çizgisi (header üst bar) | mevcut token'larla karşılanır, ayrı token açılmadı |
| `#082343` | 1 | en koyu navy | yeni: `--color-navy-900` |

**Kritik bulgu:** `#8AA2BC` ve `#7FB0DC` metin rengi olarak kullanıldıkları her yerde WCAG AA'yı geçmiyor (footer'daki Downloads ekran görüntüsünde görülen sorun tam bu). Uygulamada bu iki renk yalnızca çizgi/ikon/dekorasyon için tutulacak; aynı yerlerdeki metin `#5B7391` (≈4.9:1, AA geçer) ile değiştirilecek.

CLAUDE.md'nin "başka renk ekleme" kuralı, ölçülen 17 renk karşısında sürdürülemez — genişletilmiş ama yine sınırlı bir skala olarak `@theme`'e işlenecek (bkz. onaylı plan, "Renkler" bölümü).

## Border-radius

| Değer | Sayı | Durum |
|---|---|---|
| 6px | 71 | buton/input — CLAUDE.md kuralıyla birebir uyumlu |
| 8px | 24 | kart — CLAUDE.md kuralıyla birebir uyumlu |
| 4px | 17 | badge/küçük öğe — CLAUDE.md'de ayrıca tanımlı değildi, izin verilen aralıkta |
| 2px | 3 | çok küçük öğe (checkbox vb.) |
| 28px | 3 | **kural ihlali** — mobil telefon çerçevesi mockup'ı (dekoratif, gerçek UI değil) → uygulamada yok |
| 20px | 3 | **kural ihlali** — birkaç vurgu kutusu → 8px'e indirilecek |
| 999px | 1 | pill/badge şekli, `50%`/tam yuvarlak muadili → korunacak (CLAUDE.md "hiyerarşiye göre değişsin" ruhuna uygun, tek nokta kullanım) |

Sonuç: CLAUDE.md'nin "6px buton/input, 8px kart, 12px üstü yok" kuralı **büyük ölçüde zaten uyumlu** ölçülüyor; 20/28px'lik 6 istisna (çoğu mobil mockup çerçevesi, gerçek bileşen değil) düzeltilecek.

## Diğer gözlemler

- 17 yerde `text-transform:uppercase` + tracked letter-spacing (eyebrow etiketler) — CLAUDE.md'nin açıkça yasakladığı kalıp, kaldırılacak (bkz. onaylı plan madde 1).
- Sahte "Kundenlogo" bandı (6 kutu) — CLAUDE.md "trusted by sahte logo bandı yok" kuralına aykırı, kaldırılacak.
- Orta nokta ile zincirlenmiş meta bilgiler (`A · B · C`) birden fazla yerde — CLAUDE.md kuralına aykırı, satır satır yazılacak.

Bu belgedeki tüm düzeltme kararlarının gerekçeleri onaylı planda (`~/.claude/plans/plan-claude-md-yi-b-rakt-m-hashed-papert.md`) detaylandırıldı.
