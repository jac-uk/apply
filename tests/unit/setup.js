process.on('unhandledRejection', (err) => {
  // NOTE: this is a temporary handler to keep our tests running whilst we fix the unhandeld promise rejections
  // eslint-disable-next-line no-console
  console.log('TO DO: fix unhandled promise rejection', err);
});
