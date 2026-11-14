# NexusShop — Technical & Functional Audit
Requested by: Peace (Marketing Nigeria) · Run by: Founder · Cycle: v15-v16

| # | Item (as written by auditor) | Status | Evidence | Open action |
|---|---|---|---|---|
| 1 | Sellers can register & create functional online stores | PASS (beta) | seller.html + Seller Center CRUD on Supabase | email-verify step |
| 2 | Products uploaded, edited, displayed correctly | PASS | seller center → home grid → detail view | image compression for 3G |
| 3 | WhatsApp ordering works seamlessly | PASS | wa.me checkout with full cart payload | iOS deep-link fallback |
| 4 | Administrators can manage entire marketplace | PARTIAL | admin rows (imported sellers), catalog & theme control | full admin panel = next sprint |
| 5 | Complete experience tested on mobile AND desktop | MOBILE PASS · DESKTOP SCHEDULED | daily Android/Chrome 4G tests | desktop pass this week (Chrome "Desktop site" + PC) |
| 6 | Domain spelling (nexusshoop) vs brand (NexusShop) | OPEN | beta subdomain vs brand | nexusshop.* migration in progress; explained in-app FAQ |
| 7 | "What does the COD mean?" (clarity) | PASS in v16 | plain-language replacements + FAQ entry | — |

Method: checklist executed after every deploy (curl gate + manual flow: browse → detail → cart → WhatsApp → seller center → settings). Desktop proxy: Chrome ⋮ → "Desktop site" until PC pass.
Sign-off: Founder · Market advisor Nigeria: Peace
