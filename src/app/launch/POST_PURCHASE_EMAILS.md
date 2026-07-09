# LOGO.AI — Post-purchase email flow

Spec + ready-to-use copy for the transactional emails sent after a logo purchase.
Hand this to the backend. **Nothing here is wired yet** — these are templates and
trigger points for the programmer to implement.

## Context that makes our flow different from headshot.ai

headshot.ai is **asynchronous**: you pay, then the AI spends ~15 min generating, so
their "Your headshots are ready!" email is *essential* — it's the only way the user
gets back to the result.

LOGO.AI is **synchronous**: logos are generated live on the results step *before*
payment, and the buyer lands straight on the dashboard with downloads available. So
our critical emails are the **receipt** and a **"your files are ready / re-download
anytime"** record — not a "come back when it's done" ping.

Sender: `LOGO.AI <hello@logo.ai>` · Reply-to a monitored inbox. Plain, branded,
single clear CTA. All "view/download" links require the user to be authenticated.

---

## 1. Payment receipt  — REQUIRED, send immediately

**Trigger (PROGRAMMER):** payment provider webhook `checkout.session.completed`
(or equivalent). Send once per successful charge. Idempotent on the order ID so a
webhook retry never double-sends.

**Subject:** `Your LOGO.AI receipt — {brandName} logo ($49)`
**Preheader:** `Payment confirmed. Your logo & full file kit are ready to download.`

> Hi {firstName},
>
> Thanks for your purchase — your **{brandName}** logo is all yours, forever. No
> subscription, no recurring charges.
>
> **Order summary**
> {brandName} — logo & brand kit … $49.00
> Paid {date} · Order #{orderId}
>
> [Download your files →]({dashboardUrl})
>
> Your invoice is attached as a PDF. You can re-download your logo anytime from your
> dashboard.

**PROGRAMMER:** attach/link the invoice PDF; include VAT/tax lines if collected.

---

## 2. Your files are ready  — REQUIRED, send immediately (can be merged with #1)

A standalone "here's how to get your files" email — useful if the user closed the
tab right after paying. If you'd rather not send two emails back-to-back, fold this
CTA into the receipt and skip a separate send.

**Subject:** `{brandName} is ready to download`
**Preheader:** `Every format — PNG, SVG, PDF, EPS — plus your brand assets.`

> Your **{brandName}** logo is ready in every format you'll need:
>
> - High-res PNG (transparent + white background)
> - Vector SVG, print-ready PDF, EPS
> - Black & white variations
> - Favicon, social avatar, color palette, commercial license
>
> [Open my dashboard →]({dashboardUrl})
>
> Tip: keep the vector (SVG) file — it scales to any size without losing quality.

**PROGRAMMER:** the dashboard link must deep-link to the purchased logo's brand view.

---

## 3. Review nudge  — RECOMMENDED, send ~2 days later

Mirrors the in-app review modal that fires on first download. Send only if the user
has actually downloaded (the "win" moment has happened). One send only — never nag.

**Trigger (PROGRAMMER):** delayed job, +48h after first download. Skip if the user
already left a review.

**Subject:** `How's the new {brandName} logo working out?`
**Preheader:** `A 20-second review helps other founders find us.`

> Hi {firstName},
>
> Hope you're loving the **{brandName}** logo. If it's helped get your brand off the
> ground, would you share a quick review? It takes about 20 seconds and genuinely
> helps other founders find us.
>
> [Leave a review →]({reviewUrl})
>
> Not quite right? [Tell us what's off]({feedbackUrl}) — we read every message.

**PROGRAMMER:** the "not quite right" branch points to /launch/feedback so unhappy
users are routed to support instead of a public review form.

---

## 4. Unlock your other concepts  — OPTIONAL upsell, send ~5–7 days later

Only if the user generated more concepts than they bought (the watermarked previews
in "Other logos"). Skip entirely if they bought everything or generated only one set.

**Subject:** `Your other {brandName} concepts are still waiting`
**Preheader:** `Unlock any of them in HD for $49.`

> You generated a few logo concepts you haven't unlocked yet — they're saved to your
> account as watermarked previews.
>
> [See your concepts →]({conceptsUrl})

**PROGRAMMER:** suppress if no un-purchased concepts exist; cap at one send.

---

## Newsletter (separate from the above)

The dashboard newsletter opt-in is **marketing**, not transactional. Only add the
user to the marketing list if they explicitly checked the box (we default it
unchecked). Keep it on a separate list/consent record from transactional email, and
honor unsubscribe independently.

---

## Implementation checklist (PROGRAMMER)

- [ ] Provider webhook → send #1 (idempotent on order ID).
- [ ] #2 merged into #1, or sent immediately after.
- [ ] Track `firstDownloadAt` per purchase → schedule #3 at +48h.
- [ ] Track `reviewedAt` → suppress #3 if already reviewed.
- [ ] Nightly job for #4, gated on un-purchased concepts existing.
- [ ] Marketing consent flag (newsletter) stored + unsubscribed independently.
- [ ] All dashboard/download links are auth-gated and ownership-checked server-side.
