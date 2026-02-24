This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Firebase Authentication

The app uses **Firebase Authentication** for sign-in (email/password and Google). To make it work:

1. In [Firebase Console](https://console.firebase.google.com), open your project (or create one).
2. Go to **Build → Authentication → Get started**, then enable:
   - **Email/Password** (and optionally “Email link” if you want).
   - **Google** (add your support email and save).
3. Under **Authentication → Settings → Authorized domains**, ensure `localhost` is listed for local dev (it usually is by default).
4. Optional: copy `.env.example` to `.env.local` and set the `NEXT_PUBLIC_FIREBASE_*` variables from **Project settings → General → Your apps**. If you don’t set them, the app uses built-in defaults for the existing Firebase project.

### Characters & D&D data (Firestore only, no Storage)

Character and D&D 2024 data live in **Firestore** only. **Firebase Storage is not used** (so you don’t need a paid plan). Images are **URL-only**: store any public image link in `character.media.url` (e.g. from [Imgur](https://imgur.com), [imgbb](https://imgbb.com), or any host). When editing a character, paste the image URL there.

**Firestore collections (tables):**

| Collection   | Purpose                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `characters` | Character sheets; references `classId`, `subclassId`, `itemIds`, `cantripIds`, `preparedSpellIds`, `abilityIds` |
| `items`      | Equipment, weapons, armor, magic items (own table)                                                              |
| `spells`     | Spell definitions (own table)                                                                                   |
| `abilities`  | Class features, species traits, feats (own table)                                                               |
| `classes`    | Class definitions and statistics (hit dice, proficiencies, etc.)                                                |
| `subclasses` | Subclass definitions, linked to a class                                                                         |

If `characters` is empty or Firestore is unavailable, the app falls back to mock data.

**Seeding 2024 SRD data:** Open **Seed database (2024 SRD)** from the sidebar (under Tools), or go to `/admin/seed`. Click "Load spells", "Load classes", and "Load subclasses" to write **2024 rules (SRD 5.2)** data from the app into your Firestore. Data is bundled (no external API); it comes from the [SRD 5.2 PDF](https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.pdf) and [5e2025 SRD site](https://5e2025.opengamingnetwork.com/). Do this once to fill the reference tables.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with Plus Jakarta Sans.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
