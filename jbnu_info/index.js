const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.jbnu.ac.kr/kor/?menuID=10&pid=256';

request({
  uri: url,
  method: 'GET',
  headers: {
    'Accept-Charset': 'utf-8'
  }
}, function (err, res, body) {
  const infos = parseHtml(body);
  console.log(infos);
});

function parseHtml(html) {
  const $ = cheerio.load(html, {
    decodeEntities: false
  });

  const rows = $('#print_area > div:nth-child(3) > div.subtable.orgtable > table > tbody > tr');
  const infos = rows.map(function () {
    const colums = $(this).find('td');
    const name = $(colums[0]).text().trim();
    const location = $(colums[1]).text().trim();
    const number = $(colums[2]).text().trim().replace(/\s/g, '');
    return { name, location, number};
  }).get();

  return infos;
}