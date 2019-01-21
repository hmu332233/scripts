const request = require('request');

const url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth';
const SERVICE_KEY = process.env.WEATHER_SERVICE_KEY;
const searchDate = getDate();
// const searchDate = '2019-01-21';
const InformCode = 'PM10';

const queryString = getQueryString({
  serviceKey: SERVICE_KEY,
  searchDate,
  InformCode
});

request({
  url: `${url}?${queryString}` ,
  method: 'GET'
}, function (error, response, body) {
  const { list } = JSON.parse(body);
  const message = [
    '대벌대벌!\n',
    list[0].dataTime,
    list[0].informCause,
    list[0].informOverall,
    list[0].informGrade.split(',')[0]
  ].join('\n');

  sendMessage(message);
});

function sendMessage(message) {
  const options = {
    method: 'POST',
    url: process.env.WEATHER_SLACK_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      text: message
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    // console.log(response);
  });
}

function getQueryString({ serviceKey, searchDate, informCode }) {
  const queryString = ['_returnType=json'];

  serviceKey && queryString.push(`serviceKey=${serviceKey}`);
  searchDate && queryString.push(`searchDate=${searchDate}`);
  informCode && queryString.push(`InformCode=${informCode}`);
  
  return queryString.join('&');
}

function getDate() {
  const date = new Date();
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();

  return [date.getFullYear(),
    (mm>9 ? '' : '0') + mm,
    (dd>9 ? '' : '0') + dd
  ].join('-');
}