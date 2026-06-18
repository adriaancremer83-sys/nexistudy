# Google "Sign in with Google" — setup

Google SSO is **code-complete but dormant** until you add OAuth credentials. The
app runs normally (password login works) while it's off; the Google buttons only
appear once you flip `NEXT_PUBLIC_GOOGLE_ENABLED=true`.

## 1. Create OAuth credentials (Google Cloud Console)

1. <https://console.cloud.google.com> → create/select a project.
2. **APIs & Services → OAuth consent screen**: choose **External**, fill app name
   (NexiStudy), support email, developer email. Scopes needed are only the basic
   `email`, `profile`, `openid` — these are **non-sensitive**, so no Google app
   verification is required. While testing, add yourself as a test user.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**
   - **Authorised redirect URIs** — add both:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://nexistudy.vercel.app/api/auth/callback/google`
   - Copy the **Client ID** and **Client secret**.

## 2. Environment variables

Add to `.env.local` (local) **and** Vercel project env (production), then redeploy:

```
GOOGLE_CLIENT_ID=<your client id>
GOOGLE_CLIENT_SECRET=<your client secret>
NEXT_PUBLIC_GOOGLE_ENABLED=true
```

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — server-side; the provider only
  mounts when both are present (`lib/auth.ts`).
- `NEXT_PUBLIC_GOOGLE_ENABLED` — client-side flag that shows the buttons
  (`components/GoogleSignInButton.tsx`). Keep it unset/false until the creds are in.

> `NEXTAUTH_URL` must match the origin you're testing on (already set), and
> `NEXTAUTH_SECRET` must be set (already is).

## How it behaves

- **/teachers** Google button → creates/links a **teacher** account → `/teachers/dashboard`.
- **/login** and **/signup** Google buttons → **learner** account → `/dashboard`
  (new learners still pass through onboarding).
- Accounts link **by email** into the existing Supabase `users` table — no separate
  OAuth table, no next-auth adapter. A returning Google user keeps their stored role.
- The intended role is carried in a short-lived `nexi_oauth_role` cookie the
  sign-in button sets; the next-auth `signIn` callback reads it (defaults to learner).
