const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.jbnu.ac.kr/kor/?menuID=10&pid=254';

request({
  uri: url,
  method: 'GET',
  headers: {
    'Accept-Charset': 'utf-8'
  }
}, function (err, res, body) {
  const $ = cheerio.load(body, {
    decodeEntities: false
  });

  const rows = $('#print_area > div:nth-child(3) > div.subtable.orgtable > table > tbody > tr');

  rows.each(function () {
    const colums = $(this).find('td');
    const name = $(colums[0]).text().trim();
    const location = $(colums[1]).text().trim();
    const number = $(colums[2]).text().trim().replace(/\s/g, '');

    console.log(name, location, number);
  });
});