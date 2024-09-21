# React + TypeScript + Vite

## How to run project

**Package Manager**
In the project directory, you can use npm as the package manager. First, run:

    npm i

This command installs all the project's dependencies. To start the local development server, use the following command:

    npm run dev

The project will be accessible at [http://localhost:3000](http://localhost:3000/).
To build the project for production use the following command:

    npm run build

To serve the production build, you can use the following command:

    npm run preview

Again, the project will be accessible at [http://localhost:3000](http://localhost:3000/).

**Docker**
To run the project in a Docker container, execute the following command to create an image and run a container:

    docker compose up

Now the project is available at [http://localhost:3000](http://localhost:3000/).
If you need to stop the container, first, get a list of running containers using:

    docker container ls

Then stop the container using:

    docker stop <container-name>

## Folder structure

the structure of the project is inspired by Atomic Design.


        .
        └── src/
            ├── components/
            │   ├── elements/
            │   │   ├── button/
            │   │   │   ├── Button.tsx
            │   │   │   └── Button.test.tsx
            │   │   ├── input/
            │   │   │   └── Input.tsx
            │   │   ├── ...
            │   │   └── index.ts
            │   ├── fragments/
            │   │   ├── postCard/
            │   │   │   ├── PostCard.tsx
            │   │   │   └── PostCard.test.tsx
            │   │   ├── ...
            │   │   └── index.ts
            │   └── layouts/
            │       ├── header/
            │       │   └── Header.tsx
            │       ├── ...
            │       └── layout/
            │           └── Layout.tsx
            ├── designTokens/
            │   ├── fontSizes.ts
            │   └── ...
            ├── pages/
            │   ├── PostListPage.tsx
            │   ├── ...
            │   └── index.ts
            ├── styles/
            │   ├── button.css
            │   └── ...
            ├── utils/
            │   ├── strings
            │   └── ...
            └── queries/
                ├── postsQuery.ts
                ├── ...
                └── index.ts

components folder divided to four modules as following:


1.  Elements: This folder contains shared components, also known as common components, that cannot be further divided into smaller independent components.
2.  Fragments: Fragments are reusable components that are built using elements. They combine multiple elements to form more complex and self-contained components.
3.  Layouts: The layouts folder encompasses components related to the overall layout and container structure of the application. These components define the high-level structure and positioning of other components.
4.  Pages: The pages folder contains components specific to individual pages. These components are unique to a particular.


Within this structure, each module has its own index file that serves as a central point of export for all the components within that module.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
