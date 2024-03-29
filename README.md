## Apply 

[![CircleCI](https://circleci.com/gh/jac-uk/apply.svg?style=svg)](https://circleci.com/gh/jac-uk/apply)

This is the Vue SPA for candidate applications.

We have 2 Firebase projects:
- [Staging](https://console.firebase.google.com/project/digital-platform-staging/settings/general/web:Y2VjMDAyZjktNTIzOS00MWY2LWJiOWMtMmJiNjQ3YjJlMjVl)
- [Production](https://console.firebase.google.com/project/platform-production-9207d/settings/general/web:MmE0ODEzYjgtNzg3Mi00ZGYyLTg0Y2QtZTZiNTZkYzc3ZWUx)


When installing on Apple M1 you will need to run the following (see: https://github.com/Automattic/node-canvas/issues/1733#issuecomment-905414545):

> arch -arm64 brew install pkg-config cairo pango libpng jpeg giflib librsvg

## Clone repository onto local machine
```
git clone git@github.com:jac-uk/apply.git
```
### Change directory into project directory
```
cd apply
```
## Project setup
```
npm install
```
### Add environment variables to project

create .env file in root directory + credentials

### Compiles and hot-reloads for local development (If you're new, copy another developer's `.env` file)
```
npm run serve
```

### Compiles and minifies for staging
```
npm run staging:build
```

### Compiles and minifies for production
```
npm run production:build
```

### Compiles and minifies for staging and deploys to Firebase project `Platform - Staging`
```
npm run staging:deploy
```

### Compiles and minifies for production and deploys to Firebase project `Platform - Production`
```
npm run production:deploy
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Manually deploy to staging

```
firebase use staging
npm run staging:deploy
```

### Manually deploy to production

```
firebase use production
npm run production:deploy
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



