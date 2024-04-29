The project is a survey builder that allows creating surveys based on configurable questions and info screen(s) - configured by a [`config.ts`](src/app/data/config.ts) file.

[Deployed on Vercel](https://survey-builder.vercel.app/)

Traditionally, run `npm install` and `npm run dev` to start the project locally.

This Next.js project utilizes:
- TypeScript;
- static site generation, using `Next.js getStaticPaths`;
- Material-UI for styling;
- Redux for state management with state persist.

Configuration supports the following question types:
- `text` - a classic text input
- `singleChoice` - clicked button registers the answer
- `multipleChoice` - all checked choices are registered.

Functionality incudes:
- purging the onward answers when the user goes back to a previous question and changes the answer
- persisting the answers with redux store
- a summary screen with all the answers registered
- a reset to clear the answers and start over
