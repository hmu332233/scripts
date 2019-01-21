/* NodeJs 샘플 코드 */


const request = require('request');

const url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth';
const SERVICE_KEY = '';
const searchDate = '2019-01-21';
const InformCode = 'PM10';

const queryString = getQueryString({
  serviceKey: SERVICE_KEY,
  searchDate,
  InformCode
})

request({
    url: `${url}?${queryString}` ,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});

function getQueryString({ serviceKey, searchDate, informCode }) {
  const queryString = ['_returnType=json'];

  serviceKey && queryString.push(`serviceKey=${serviceKey}`);
  searchDate && queryString.push(`searchDate=${searchDate}`);
  informCode && queryString.push(`InformCode=${informCode}`);
  
  return queryString.join('&');
}