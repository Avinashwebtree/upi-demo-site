# UPI Pay Demo

A single static HTML page that lets someone enter an amount and pay directly to a UPI ID
using any UPI app (GPay, PhonePe, Paytm, BHIM, etc.) — either via the `upi://pay` deep
link ("Pay with UPI App" button, works on mobile) or a scannable QR code (works from
desktop too).

No backend, no payment gateway, no data collection — it's just a link/QR generator.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Host for free (GitHub Pages)

1. Push this repo to GitHub.
2. Repo Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your page will be live at `https://<username>.github.io/<repo>/`.

## Notes

- The UPI ID is hardcoded in `index.html` (`PAYEE_VPA`). Edit it there if it changes.
- `upi://pay` links only open a UPI app chooser on **mobile devices** with a UPI app
  installed — on desktop, use the QR code instead.
- This is a demo/testing tool, not a production payment integration (no verification,
  no receipt, no callback — you'll only know a payment succeeded via your UPI app's
  own notification).
