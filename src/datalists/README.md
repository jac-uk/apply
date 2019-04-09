# Data Lists

This directory contains lists of data – useful in `<select>` form inputs.

## Example Usage

To create a `<select>` with `<option>`s from a data list:

```vue
<template>
  <select>
    <option v-for="country in commonwealthCountries" :value="country">
      {{country}}
    </option>
  </select>
</template>

<script>
  import commonwealthCountries from '@/datalists/commonwealth-countries';
  
  export default {
      name: 'Example',
      data() {
        return {
          commonwealthCountries,
        };
      },
    }
</script>
```
