The project is a survey builder that allows creating surveys based on configurable questions and info screen(s) - using a [`config.ts`](src/app/data/config.ts) file.

Info screens do not impact questions branching, - intended branching is persisted.

The project utilizes static site generation, using `Next.js getStaticPaths`

Configuration supports the following question types:
- `text` - a classic text input
- `singleChoice` - clicked button registers the answer
- `multipleChoice` - all checked choices are registered.

Functionality supports:
- purging the onward answers when the user goes back to a previous question and changes the answer
- persisting the answers with redux store
- a summary screen with all the answers registered
- a reset to clear the answers and start over

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
