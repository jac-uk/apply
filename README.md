## Apply

This is the Vue SPA for candidate applications.

We have 2 Firebase projects:
- [Staging](https://console.firebase.google.com/project/digital-platform-staging/settings/general/web:Y2VjMDAyZjktNTIzOS00MWY2LWJiOWMtMmJiNjQ3YjJlMjVl)
- [Production](https://console.firebase.google.com/project/platform-production-9207d/settings/general/web:MmE0ODEzYjgtNzg3Mi00ZGYyLTg0Y2QtZTZiNTZkYzc3ZWUx)

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
npm run build-staging
```

### Compiles and minifies for production
```
npm run build-production
```

### Compiles and minifies for staging and deploys to Firebase project `Platform - Staging`
```
npm run deploy-staging
```

### Compiles and minifies for production and deploys to Firebase project `Platform - Production`
```
npm run deploy-production
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
npm run deploy-staging
```

### Manually deploy to production

```
firebase use production
npm run deploy-production
```
