const cheerio = require('cheerio');
const { promisify } = require('util');
const { get } = require('request');
const [ getPm ] = [get].map(promisify);
const fs = require('fs');

const pidList = [
  254,
  256,
  269,
  286,
  336,
  320,
  314,
  247,
  302,
  326,
  299,
  318,
  310,
  1686,
  1776,
  1778
];

(async function() {
  let infos = [];
  for (const pid of pidList) {
    const url = getUrl(pid);
    const { body } = await getPm(url);
    infos = infos.concat(parseHtml(body));
  }

  console.log(infos);
  fs.writeFile ('output.json', JSON.stringify(infos), function(err) {
    if (err) throw err;
    console.log('complete');
  });
})();
function getUrl(pid = 254) {
  return `https://www.jbnu.ac.kr/kor/?menuID=10&pid=${pid}`;
}

function parseHtml(html) {
  const $ = cheerio.load(html, {
    decodeEntities: false
  });

  const rows = $('#print_area > div:nth-child(3) > div.subtable.orgtable > table > tbody > tr');
  const infos = rows.map(function() {
    const colums = $(this).find('td');
    const name = $(colums[0]).text().trim();
    const location = $(colums[1]).text().trim();
    const number = $(colums[2]).text().trim().replace(/\s/g, '');
    return { name, location, number };
  }).get();

  return infos;
}
