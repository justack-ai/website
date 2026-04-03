# Contributing to justack.ai

Thank you for your interest in contributing to justack.ai. This project builds open source tools to improve access to justice — starting with the Housing & Tenancy Navigator for Ontario tenants, InstructIT for lawyers, and the broader A2Jai legal navigation platform.

Contributions of all kinds are welcome: code, content, bug reports, accessibility improvements, legal knowledge review, and documentation.

## Table of Contents

- [Local Setup](#local-setup)
- [Fork, Branch, and PR Workflow](#fork-branch-and-pr-workflow)
- [Code Style](#code-style)
- [Testing and Linting](#testing-and-linting)
- [Developer Certificate of Origin](#developer-certificate-of-origin-dco)
- [License](#license)
- [Responsible Use](#responsible-use)
- [How to Get Help](#how-to-get-help)

---

## Local Setup

You will need: **Node.js 20+**, **npm**, and a **Supabase account** (for InstructIT features).

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/website.git
cd website

# 2. Install dependencies
npm install

# 3. Copy the environment variable template
cp .env.local.example .env.local

# 4. Open .env.local and fill in the required values (see table below)

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site should load immediately. Most pages work without any environment variables. The blog and Sanity Studio require Sanity credentials. InstructIT features require Supabase credentials.

### Environment Variables

| Variable | Required | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For blog/CMS | [sanity.io/manage](https://sanity.io/manage) — use project ID `b0kmw4n5` for the production dataset, or create your own |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production` |
| `SANITY_API_TOKEN` | For Studio writes | Sanity project settings > API > Tokens |
| `NEXT_PUBLIC_SUPABASE_URL` | For InstructIT | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For InstructIT | Your Supabase project anon key |

If you are contributing to non-CMS, non-InstructIT pages (homepage, `/help`, `/build`, `/a2jai`, etc.), you do not need any credentials.

### Sanity Studio

If you are working on blog content or CMS schemas:

```bash
# 6. Access the embedded Sanity Studio
open http://localhost:3000/studio
```

### Supabase (InstructIT only)

The `supabase/` directory contains database migrations. If you are working on InstructIT:

```bash
# 7. Apply database migrations (requires Supabase CLI)
npx supabase db push
```

---

## Fork, Branch, and PR Workflow

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally (`git clone ...`).
3. **Create a branch** from `main` with a descriptive name:
   ```bash
   git checkout -b fix/housing-page-aria-labels
   # or
   git checkout -b feat/ltb-form-t2-wizard
   ```
   Branch naming conventions:
   - `fix/` — bug fixes
   - `feat/` — new features
   - `docs/` — documentation only
   - `refactor/` — code changes with no behaviour change
   - `a11y/` — accessibility improvements

4. **Make your changes.** Keep commits focused and atomic. One logical change per commit.

5. **Sign off every commit** (required — see [DCO section](#developer-certificate-of-origin-dco)):
   ```bash
   git commit -s -m "fix: add aria-label to navigation toggle button"
   ```

6. **Push** your branch to your fork:
   ```bash
   git push origin fix/housing-page-aria-labels
   ```

7. **Open a pull request** against `main` on `justack-ai/website`. Use the PR template — fill in the description, what changed, and how to verify it.

8. **Respond to review.** A maintainer will review your PR. Address feedback with additional commits (do not force-push after review begins).

### Commit message format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description

Longer explanation if needed. What changed, why, and any relevant context.

Signed-off-by: Your Name <your.email@example.com>
```

Types: `fix`, `feat`, `docs`, `refactor`, `test`, `chore`, `a11y`, `style`

---

## Code Style

This project uses **TypeScript**, **Next.js 16 App Router**, **Tailwind CSS v4**, and **React 19**.

### General

- **TypeScript everywhere.** No `.js` files in `src/`. Use strict types — avoid `any`.
- **Functional components only.** No class components.
- **Named exports for pages, default exports for page components** (Next.js convention).
- **Apache license header** on every new source file. Copy the header from any existing file in `src/`.

### File structure

```
src/
  app/
    (site)/          # Public-facing pages
      page-name/
        page.tsx     # Route component
        ComponentName.tsx  # Co-located components
    (studio)/        # Sanity Studio embedding
  components/        # Shared components (Nav, Footer, etc.)
  lib/               # Utilities and service clients
    instructit/      # InstructIT domain logic
```

### Tailwind

- Use Tailwind utility classes directly. No custom CSS files unless necessary.
- Dark theme is the default. The site uses a dark background (`#0a0a0a`).
- Use `glass` utility class for frosted-glass card surfaces (defined in `globals.css`).

### Component conventions

- One component per file when the component is reused. Co-locate single-use components with their route.
- Props interfaces should be named `ComponentNameProps`.
- Use `"use client"` directive only when client-side interactivity is required. Prefer Server Components.

### Content and legal text

- Legal disclaimers must remain accurate and complete. Do not edit disclaimer copy without flagging it for maintainer review.
- This project serves people in vulnerable legal situations. Write UI copy that is clear, plain, and non-alarmist.

---

## Testing and Linting

Before submitting a PR, run:

```bash
# Type checking
npm run build

# Linting
npm run lint
```

Both must pass with no errors. Fix all TypeScript errors and ESLint warnings before opening your PR.

There are currently no automated test suites. If you are adding new logic (utilities, API routes, classification functions), please add tests. We use the standard Node.js test runner or Vitest — open an issue to discuss if you are unsure.

---

## Developer Certificate of Origin (DCO)

All contributions must include a DCO sign-off. This certifies that you have the right to submit your contribution under the project's open source license.

Add a `Signed-off-by` line to every commit message:

```
Signed-off-by: Your Name <your.email@example.com>
```

The easiest way is the `-s` flag:

```bash
git commit -s -m "Description of your change"
```

Your sign-off must use your real name and a valid email address. By signing off, you certify the statements in the [Developer Certificate of Origin](DCO).

---

## License

This project is licensed under the **Mozilla Public License 2.0 (MPL-2.0)**. By contributing, you agree that your contributions will be licensed under the same terms.

See [LICENSE](LICENSE) and [NOTICE](NOTICE) for details.

---

## Responsible Use

This project includes a [Responsible Use Addendum](RESPONSIBLE-USE.md) that prohibits certain uses of the software — including using it to intimidate tenants, generate frivolous legal filings, or undermine access to justice in any way.

Please read [RESPONSIBLE-USE.md](RESPONSIBLE-USE.md) before contributing. Contributions that circumvent or weaken these restrictions will not be accepted.

---

## How to Get Help

- **Bug reports and feature requests:** [Open an issue](https://github.com/justack-ai/website/issues)
- **Questions and discussion:** [GitHub Discussions](https://github.com/justack-ai/website/discussions)
- **Legal content questions:** Open an issue tagged `legal-review` — we want input from legal professionals
- **Security issues:** Email [michael@justack.ai](mailto:michael@justack.ai) — do not post security vulnerabilities publicly

---

## Disclaimer

justack.ai is a product of Humilitas Group Limited, a technology company. It is not a law firm and does not provide legal advice or legal services.
