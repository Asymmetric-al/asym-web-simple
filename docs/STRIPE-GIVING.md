# Stripe giving setup (Asymmetric.al)

This site uses **Stripe Checkout (embedded page UI)** on `/give` for **monthly recurring** and **one-time** tax-deductible gifts to **Global Fellowship Inc.** (project: Asymmetric.al). The API sets `ui_mode: embedded_page` and returns a `client_secret` for Stripe.js embedded checkout.

## 1. Environment

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable key (`pk_test_...` / `pk_live_...`) |
| `STRIPE_SECRET_KEY` | Secret key (`sk_test_...` / `sk_live_...`) — **server only** |
| `STRIPE_WEBHOOK_SECRET` | Signing secret from the webhook endpoint (`whsec_...`) |
| `STRIPE_PRICE_RECURRING_25` | Price ID for $25/month recurring |
| `STRIPE_PRICE_RECURRING_50` | Price ID for $50/month recurring |
| `STRIPE_PRICE_RECURRING_100` | Price ID for $100/month recurring |

`NEXT_PUBLIC_SITE_URL` must match your deployed origin (e.g. `http://localhost:3000` in dev) so `return_url` for embedded Checkout is correct.

## 2. Dashboard: products and prices

1. Open [Stripe Dashboard → Products](https://dashboard.stripe.com/products) (Test mode while developing).
2. Create a **Product** for monthly support, e.g. name: **Monthly support — Asymmetric.al**, description mentioning Global Fellowship Inc. and EIN **68-0214543**.
3. Add **three recurring prices** (USD, monthly): **$25**, **$50**, **$100** flat rate.
4. Copy each **Price ID** (`price_...`) into the matching `STRIPE_PRICE_RECURRING_*` env vars.

One-time gifts use **`price_data`** in code (no extra Dashboard products required) for a fixed set of amounts shown on the page.

## 3. Customer portal (manage recurring gifts)

1. [Settings → Billing → Customer portal](https://dashboard.stripe.com/settings/billing/portal).
2. Enable what donors need: update payment method, cancel subscription, view invoices.
3. Set a **Default return URL** to your site (e.g. `https://asymmetric.al/give`).

The success page calls the API to create a **Billing Portal session** so donors can manage recurring support.

## 4. Webhook

1. [Developers → Webhooks](https://dashboard.stripe.com/webhooks) → **Add endpoint**.
2. **URL**: `https://<your-domain>/api/webhooks/stripe` (local: use Stripe CLI — see below).
3. **Events** (minimum): `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`.
4. Copy the **Signing secret** into `STRIPE_WEBHOOK_SECRET`.

### Local testing with Stripe CLI

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Use the `whsec_...` the CLI prints as `STRIPE_WEBHOOK_SECRET` in `.env.local` while testing.

## 5. Testing cards

Use [Stripe test cards](https://docs.stripe.com/testing#cards): e.g. `4242 4242 4242 4242`, any future expiry, any CVC.

## 6. Go-live checklist

- Switch to **live** API keys and live Price IDs.
- Create the webhook endpoint on the **live** Stripe account with the production URL.
- Confirm Customer portal and branding in Dashboard.
- Rotate any keys that were ever committed or shared.

## References

- [Checkout Sessions API](https://docs.stripe.com/api/checkout/sessions/create)
- [Embedded Checkout](https://docs.stripe.com/checkout/embedded)
- [Subscriptions with Checkout](https://docs.stripe.com/billing/subscriptions/build-subscriptions?ui=stripe-hosted)
