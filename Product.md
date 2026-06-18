# apifreely.com — Product Doc

> Direktori + setup-engine buat dapetin akses LLM API gratis, lengkap dengan cara
> pasang ke agent (Cline, Roo, Continue, Hermes, OpenClaw, LibreChat, dll) dan
> prompt siap-paste biar agent user nge-config dirinya sendiri.

Status: **DRAFT v0.1** · Owner: rhystalgie · Last update: 2026-06-16

---

## 1. Masalah & Peluang

- Info "API model gratis" itu **kececer dan cepet basi**. Banyak nyebar di X (Twitter)
  sebagai thread/promo, tapi: susah dicari, ga terstruktur, sering udah expired,
  dan ga ada panduan masangnya ke tools yang dipake orang.
- Yang ada sekarang (mis. repo `free-llm-api-resources`) cuma daftar mentah —
  **ga nyambung ke workflow agent** dan ga ada cara cepet buat langsung kepasang.

**Peluang:** jadi satu tempat yang (a) ngumpulin akses gratis yang **masih hidup**,
(b) kasih **snippet config per-tool**, dan (c) generate **prompt self-install** buat agent.

## 2. Value Proposition

> "Nemu API LLM gratis yang masih jalan, terus kepasang ke agent kamu dalam 30 detik —
> tanpa kami pernah liat API key kamu."

3 lapisan produk:

1. **Directory** — provider + status "masih gratis / masih hidup" (badge).
2. **Setup guides** — snippet config per agent/tool, copy-paste.
3. **Prompt generator** — prompt siap-paste; user isi key sendiri, agent self-config.

Pembeda utama = lapisan #3 (belum ada yang garap rapih).

## 3. Sumber Data (termasuk strategi X)

Bagi jadi 2 kategori biar jelas mana fondasi mana bonus:

### 3a. Fondasi — Free tier RESMI (auto-reliable, legal)
Ini tulang punggung. Stabil, terdokumentasi, ga gampang mati:

- Google AI Studio (Gemini free tier)
- Groq (free, inference cepet)
- OpenRouter (model `:free`)
- Mistral La Plateforme (free tier)
- Cohere (trial key)
- GitHub Models (gratis selama preview)
- Cloudflare Workers AI (free allowance)
- Cerebras Cloud (free tier)
- SambaNova Cloud (free)
- NVIDIA NIM (free credits)
- HuggingFace Inference

### 3b. Bonus — Info dari X (yang jadi concern kamu)
Realita: **scraping X otomatis itu ngelawan ToS + gampang diblok** (Nitter mati,
API resmi mahal ~$100/bln). Jadi jangan andelin scraping liar. Opsi yang realistis:

1. **Community submission (REKOMENDASI #1).** Form submit di situs. User nemu promo
   di X → tempel link + detail → masuk antrian moderasi. Murah, legal, makin rame
   makin idup sendiri. Ini ngeganti scraping.
2. **Kurasi manual dari watchlist akun.** Pantau ~20-50 akun yang sering share,
   input manual / semi-otomatis. Kualitas tinggi, effort rendah di awal.
3. **X API resmi (kalau mau scale).** Tier berbayar buat mantau keyword/akun
   tertentu dalam batas ToS. Pertimbangin nanti, bukan di MVP.

**Moderasi wajib** buat semua entry 3b — karena info promo X sering:
- udah expired → tandain dengan tanggal + auto-expire.
- trik abuse (multi-akun / reset trial massal) → **DITOLAK** (lihat §7).

## 4. Fitur Inti (MVP)

- [ ] Halaman directory: list provider + filter (gratis-selamanya / trial / promo).
- [ ] Halaman detail provider: free tier, link daftar, endpoint (OpenAI-compatible),
      model IDs, rate limit.
- [ ] **Snippet config per-tool** (Cline, Roo, Continue, Cursor, Hermes, OpenClaw,
      LibreChat) — tinggal copy.
- [ ] **Prompt generator**: pilih provider + tool → keluar prompt siap-paste.
- [ ] Form submit komunitas (moderated).
- [ ] Badge status "alive / expired" per entry.

### Nice-to-have (next)
- [ ] Worker health-check: ping endpoint, auto-update badge.
- [ ] Auto-expire entry promo berdasarkan tanggal.
- [ ] Upvote/komentar komunitas.
- [ ] Newsletter / RSS "free credit minggu ini".

## 5. Arsitektur (rencana)

- **Frontend:** Next.js (static-first) + content layer JSON/MD per provider.
- **Data:** tiap provider = 1 file/record terstruktur (lihat §6).
- **Submission backend:** route kecil + tabel "pending submissions" + admin moderasi.
- **Health-check (later):** worker terjadwal, ngecek endpoint masih balikin 200/gratis.
- **Deploy:** Vercel / Cloudflare Pages.

## 6. Skema Data Provider (draft)

```json
{
  "id": "groq",
  "name": "Groq",
  "category": "free-tier",          // free-tier | trial | promo
  "status": "alive",                // alive | expired | unknown
  "signup_url": "https://console.groq.com",
  "free_details": "Free tier, rate-limited, no credit card",
  "openai_compatible": true,
  "base_url": "https://api.groq.com/openai/v1",
  "models": ["llama-3.3-70b-versatile", "..."],
  "rate_limit": "30 req/min (varies)",
  "source": { "type": "official", "url": "https://console.groq.com/docs" },
  "added": "2026-06-16",
  "expires": null,
  "setup": {
    "cline":   "...snippet...",
    "openclaw":"...snippet...",
    "hermes":  "...snippet..."
  }
}
```

## 7. Keamanan & Etika (HARD RULES)

1. **JANGAN PERNAH simpan/handle API key user.** Key tetap di sisi user. Prompt
   generator cuma keluarin teks; user yang masukin key ke agent-nya sendiri.
   Jadiin ini selling point: *"kami ga pernah liat key kamu."*
2. **Tolak konten abuse.** Trik multi-akun, reset trial massal, fake email, pakai
   stolen/leaked key → ditolak. Itu bikin akun user kena ban + naro liability ke kita.
   Fokus ke free tier resmi + promo legit.
3. **Hormati ToS sumber.** Sourcing X lewat submission/kurasi/ API resmi — bukan
   scraping liar.
4. **Transparansi expiry.** Tiap promo ada tanggal + status, biar user ga ketipu info basi.

## 8. Monetisasi (nanti)

- Affiliate / referral link ke provider (yang punya program resmi).
- Tier premium: feed real-time + alert promo baru.
- Sponsored listing buat provider (clearly labeled).

## 9. Risiko

| Risiko | Mitigasi |
|---|---|
| Scraping X diblok / ilegal | Pakai community submission + kurasi, bukan scraping |
| Info cepet basi | Badge status + auto-expire + health-check |
| Disalahgunakan buat abuse | Hard rules §7, moderasi |
| Provider cabut free tier | Banyak provider, komunitas refresh data |
| Liability key user | Ga pernah pegang key (client-side only) |

## 10. Next Steps

1. Finalisasi skema data provider (§6).
2. Isi 5-10 provider free-tier resmi sebagai seed.
3. Scaffold Next.js + halaman directory + detail.
4. Bikin prompt generator (provider × tool).
5. Bikin form submit + flow moderasi.
