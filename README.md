## Apply 

[![CircleCI](https://circleci.com/gh/jac-uk/apply.svg?style=svg)](https://circleci.com/gh/jac-uk/apply)

This is the Vue SPA for candidate applications. By default, it deploys to `digital-staging-apply`.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Project deploy 

By default `firebase deploy` deploys to `staging`.

### Manually deploy to production

To manually deploy to production use either: 

```
firebase deploy --project production
```

**or** 

```
firebase use production
firebase deploy
```

### Continuous deployment

Merging to `master` automatically triggers a deploy to `production`.

Merging to `staging` automatically triggers a deploy to `staging`.


### CircleCI configuration 

The CircleCI instance has to have a `FIREBASE_DEPLOY_TOKEN` set.  This is tied to a specific firebase user.  If that user leaves
the organisation, the token will need to be reset.  To do so run `firebase login:ci` and follow the instructions there and then on
CircleCI.

CircleCI environment variables are defined here:

https://circleci.com/gh/jac-uk/apply/edit#env-vars

Firebase environment variables bound to the CircleCI environment variables defined here:

https://console.firebase.google.com/project/platform-production-9207d/settings/general/web:OTI4N2U1OGEtY2RkMi00ZTdjLWJiOWEtYWEyNjM1ZjhkNjJk



