# Raventure: Book of Quests

React Native app — interactive mythology stories, quiz, characters, and artifacts.

## Project structure

```
src/
  app/navigation/     # Root stack, tabs, route names, typed navigation
  features/           # Screens by feature (tales, quiz, saved, …)
  content/            # Static data (stories, quiz, characters, artifacts)
  shared/
    components/       # UI kit and layout
    theme/            # Colors, typography, spacing
    constants/        # Asset registry
    lib/              # Storage, helpers, shuffle
    types/            # Domain types
tools/                # Dev scripts only (e.g. check:words)
assets/               # Images
```

## Scripts

```sh
npm start
npm run ios
npm run android
npm run typecheck
npm run check:words
npm test
```

Imports use **relative paths** within `src/` (Metro resolves them reliably).
