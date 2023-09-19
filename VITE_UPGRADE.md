# Migrate from Vue CLI to Vite

## Update Dependencies

Remove Vue CLI related dependencies from `package.json`.

```
"@vue/cli-plugin-eslint": "^5.0.8",
"@vue/cli-plugin-unit-jest": "~5.0.8",
"@vue/cli-service": "~5.0.8",
```

Remove the sass-loader as Vite provides built in support for the most common pre-processors.

```
"sass-loader": "^10.2.0",
```

Remove Babel from dependencies.

```
"core-js": "^3.23.2",
"@babel/eslint-parser": "7.22.10",
"@vue/babel-preset-app": "^5.0.8",
```

Remove `@babel/eslint-parser` as a parser from `.eslintrc`.

```
"parserOptions": {
  "parser": "@babel/eslint-parser",
},
```

Add the environment es2022 as the src of the project to `.eslintrc`.

```
"env": {
  "es2022": true,
},
```

Add Vite as a dependency, as well as the Vue plugin component for Vite to support Single File Components.

```
npm install vite @vitejs/plugin-vue
```

## Add Vite Config

Remove `vue.config.js` and add `vite.config.js` file in the root of the project.

## Move `index.html`

Move `./public/index.html` to `./index.html`.

The JavaScript application is no longer auto injected so we need to include it like this:

```
<script type="module" src="/src/main.js"></script>
```

## Update the Scripts

Change the old vue-cli-service commands to Vite specific commands in `package.json`.

```
"serve": "vue-cli-service serve", // remove
"build": "vue-cli-service build", // remove
"dev": "vite",
"build": "vite build",
"serve": "vite preview",
```

## Upate Environment Variables

Replace `process.env` with `import.meta.env`.

## Add `.vue` extension to SFC imports

In Vite, importing Vue components requires an explicit .vue extension.

Before:

```
import ComponentA from './ComponentA'
```

After:

```
import ComponentA from './ComponentA.vue'
```
