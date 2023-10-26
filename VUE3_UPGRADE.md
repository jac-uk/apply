# Mirgrate from Vue 2 to Vue 3

## Replace vuexfire with vuexfireJAC

1. Remove vuexfire as it does not support Vuex 4

    ```
    npm uninstall vuexfire
    ```

2. Copy `@/helpers/vuexfireJAC` from admin site

3. Update all store files

    ```js
    import { firestoreAction } from '@/helpers/vuexfireJAC';

    export default {
      mutations: {
        set(state, { name, value }) {
          state[name] = value;
        },
      },
    };
    ```

## Other changes

### Vue warn

Change `false` to `null`.
#### Deprecation ATTR_FALSE_VALUE

Before:
```html
<input :aria-describedby="hint ? hintId : false" >
```

After:
```html
<input :aria-describedby="hint ? hintId : null" >
```

#### Deprecation INSTANCE_EVENT_EMITTER

1. Install mitt: npm i mitt
2. Set up in main.js

Before:
```js
this.$root.$on()
this.$root.$off()
this.$root.$emit()
```

After:
```js
this.emitter.on()
this.emitter.off()
this.emitter.emitter()
```

#### Deprecation COMPILER_NATIVE_TEMPLATE

Before:
```html
<Banner v-if="hasCompleted" status="information">
  <template>
    You have already finished this test.
  </template>
</Banner>
```

After:
```html
<Banner v-if="hasCompleted" status="information">
  You have already finished this test.
</Banner>
```
