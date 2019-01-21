const cron = require('node-cron');
const sendWeatherMessage = require('./modules/weatherBot');
cron.schedule('30 7 * * *', () => {
  sendWeatherMessage();
});

cron.schedule('0 19 * * *', () => {
  sendWeatherMessage();
});
