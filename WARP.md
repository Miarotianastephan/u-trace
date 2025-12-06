# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling and Commands

This is an Ionic React + Vite + TypeScript app with Vitest for unit tests, Cypress for E2E tests, Tailwind CSS for styling, Redux Toolkit for state, and Capacitor for native packaging.

### Install dependencies

```bash path=null start=null
npm install
```

### Run the dev server

```bash path=null start=null
npm run dev
```

Vite runs on port 5173 by default and is configured with `server.host = true` so it can be accessed from other devices on the network (useful for testing on mobile).

### Build

```bash path=null start=null
npm run build
```

This runs TypeScript (`tsc`) and then `vite build`, producing a production bundle in `dist/` (used by Capacitor via `capacitor.config.ts`).

### Lint

```bash path=null start=null
npm run lint
```

Runs ESLint over the TypeScript/React source using the config implied by `eslint` and `eslint-plugin-react` dependencies.

### Unit tests (Vitest)

Vitest is configured in `vite.config.ts` with a jsdom environment and `src/setupTests.ts` (Testing Library + `matchMedia` polyfill).

Run the full unit test suite:

```bash path=null start=null
npm run test.unit
```

Run a single unit test file (example):

```bash path=null start=null
npm run test.unit -- src/App.test.tsx
```

You can also filter by test name with Vitest's `-t`/`--testNamePattern` flags as needed.

### End-to-end tests (Cypress)

Cypress is configured in `cypress.config.ts` with `baseUrl: "http://localhost:5173"` and a simple example spec in `cypress/e2e/test.cy.ts`.

1. In one terminal, start the dev server:

   ```bash path=null start=null
   npm run dev
   ```

2. In another terminal, run the Cypress tests:

   ```bash path=null start=null
   npm run test.e2e
   ```

To run a single Cypress spec:

```bash path=null start=null
npm run test.e2e -- --spec cypress/e2e/test.cy.ts
```

## High-level Architecture

### Entry point and shell

- `src/main.tsx` is the React entry point. It creates the root with `createRoot` and renders `<App />`, importing global styles from `src/main.css`.
- `src/App.tsx` sets up the application shell:
  - Initializes Ionic via `setupIonicReact()`.
  - Wraps the app with a Redux `Provider` using the store from `src/utils/redux.ts`.
  - Uses `IonApp` and `IonReactRouter` (`react-router-dom` v5) with a top-level `IonRouterOutlet`.
  - Defines top-level routes:
    - `/login` → `Login` page.
    - `/home` → `Home` page (which itself contains nested routes for the main app sections).
    - `/register` → `Register` page.
    - `/` redirects to `/login`.

### Routing and layout

- `src/pages/Home.tsx` acts as the main authenticated layout:
  - Renders an `IonPage` containing a flex column layout: a custom `Header`, a central `IonRouterOutlet`, and a bottom `Footer`.
  - Inside the nested `IonRouterOutlet`, it defines routes under `/home/...`:
    - `/home/colisRecus` → `ColisRecus` (received parcels list).
    - `/home/colis` → `NewColis` (create a new parcel).
    - `/home/recherche` → `Recherches` (search UI with filters).
    - `/home/recuperer` → `Recuperer` (mark parcels as picked up).
    - `/home/listType` → `ListType` (manage parcel/product types).
    - `/home/newType` → `NewType` (create a new type).
    - `/home/admin` → `Admin` (admin view of parcels list).
    - `/home` (exact) → placeholder `IonPage` with "Home" text.
  - Uses `useHistory()` to implement a back button in `Header`.

- `src/component/component.tsx` contains the shared UI building blocks used across pages:
  - `ListComp`: generic list/table component that can render either a list of parcels (`colisT`) or a list of types (`listTypeT`). It:
    - Chooses column headers and layout based on a `type` prop (parcel vs type list).
    - For parcel lists, optionally renders a checkbox column and uses `toMoney` for price formatting.
    - For type lists, shows name/code and placeholder edit/delete actions.
  - `Header`: simple top bar with a back arrow; delegates navigation logic via a `headerF` callback.
  - `Footer`: bottom navigation bar used in `Home`, exposing three main sections and navigating with `IonButton` `routerLink`s:
    - Index 0 → `/home/admin` (parcels list).
    - Index 1 → `/home/colis` (new parcel).
    - Index 2 → `/home/listType` (type list).
  - `StatusChoice`: three-button status selector used by `ColisRecus`, `Recherches`, and `Recuperer` to switch between parcel status filters.

This separation means page components are mostly responsible for page-specific layout and state, while reusable list/layout behaviors live in `component.tsx`.

### State management and domain types

- `src/utils/redux.ts` defines the global Redux store using Redux Toolkit:
  - `stateSlice` holds:
    - `user`: currently `null` and not yet wired to login, but typed via `usersType` (`username`, `role`, `id`).
    - `theme`: boolean, initialized via `spaghetti(false)` to align with the system dark-mode preference.
  - Reducers:
    - `changeTheme(boolean)`: calls `FDarkT` to update the document's `dark` class and stores the new theme flag.
  - Exports:
    - `store`: the configured store used in `App.tsx`.
    - `changeTheme` action.
    - `userState` and `themeState` selectors.

- `src/utils/type.ts` centralizes simple domain types:
  - `colisT`: `{ status: boolean; qnt: number; track: string; pds: number; prix: number }` for parcel items.
  - `listTypeT`: `{ nom: string; code: string }` for parcel/product types.

These types are shared across pages (`Admin`, `ColisRecus`, `Recherches`, `Recuperer`, `ListType`) and `ListComp`, keeping list rendering and page logic consistent.

### Utility functions and theming

- `src/utils/function.ts` holds cross-cutting UI utilities:
  - `spaghetti(theme: boolean)`: computes the initial dark-mode state based on a provided flag and `window.matchMedia('(prefers-color-scheme: dark)')`, toggling the `dark` class on `document.documentElement` and returning the effective boolean.
  - `FDarkT(theme: boolean)`: explicit dark-mode toggle; adds or removes the `dark` class and returns the theme flag.
  - `toMoney(n: number)`: formats numbers with a thin space as the thousands separator (used in list UIs for prices).

- `src/main.css` configures Tailwind 4:
  - Uses `@import "tailwindcss";` and defines a custom `dark` variant based on the `.dark` class.
  - Registers a `roboto` font via `@font-face`, using the font file at `src/theme/Font/Roboto-VariableFont_wdth,wght.ttf`.

- Ionic theming:
  - `App.tsx` imports the standard Ionic CSS (`core`, `structure`, `typography`, and optional utilities) and `@ionic/react/css/palettes/dark.system.css` for system-driven dark mode.
  - `src/theme/variables.css` is available for additional Ionic theme variables (currently boilerplate).

### Pages and data flow

Most pages currently focus on UI layout with local, in-memory data rather than real backend integration:

- `Login` (`src/pages/Login.tsx`):
  - Manages theme via Redux (`changeTheme`, `themeState`).
  - Uses `useRef` to access username and password inputs.
  - Contains substantial placeholder logic to normalize API-like data from `data_test.json` into user, video, and post structures (currently used only for console logging).
  - References `URLHOST` from `src/utils/conf.ts` and includes a commented-out example `axios.post` call for syncing data.
  - The "Connexion" button navigates to `/home/admin` via `routerLink`, independent of input validation.

- `Register` (`src/pages/Register.tsx`):
  - Uses `Header` for navigation back behavior.
  - Provides a registration form UI without wired API calls.

- Parcel and type management pages:
  - `Admin`: shows a static list of parcels using a custom table layout and a `Button` component.
  - `ColisRecus`, `Recherches`, `Recuperer`: use `StatusChoice` and `ListComp` to display parcel lists, with some pages allowing status toggling via local state.
  - `NewColis` and `NewType`: simple forms for creating parcels/types; currently only manage input fields and submit buttons without persistence.
  - `ListType`: shows a list of types using `ListComp` with `type=2`.

This structure makes it straightforward to later replace the local mock data and placeholder transformations with real API calls and to connect them to the shared Redux store.

### Configuration relevant to agents

- `vite.config.ts`:
  - Plugins: React, legacy browser support, and Tailwind (`@tailwindcss/vite`).
  - Test configuration for Vitest (`globals`, `jsdom` environment, `setupFiles: './src/setupTests.ts'`).
  - `server.host = true` to expose the dev server on the local network.

- `cypress.config.ts`:
  - `e2e.baseUrl = 'http://localhost:5173'`.
  - Loads global Cypress support code from `cypress/support/e2e.ts`, which in turn imports `./commands`.

- `capacitor.config.ts`:
  - Sets `appId`, `appName`, and `webDir: 'dist'` for Capacitor. Mobile platform builds (iOS/Android) are expected to consume the production build in `dist/` created by `npm run build`.

- `src/utils/conf.ts` contains local development host/port and database parameters used by the example login/sync logic. If you introduce new API calls, consider centralizing base URLs here for consistency.
