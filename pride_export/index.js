const _ = require('lodash');
const fs = require('fs');
const list = JSON.parse(fs.readFileSync('data.json', 'utf8'));
var exec = require('child_process').exec;

function renameAndCopyFile({ file, newFileName }) {
  exec(`cp ./files/${file} ./results/${newFileName}.pdf`, function (error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }

    console.log('complete,' , newFileName);
  });  
}

function convertNewFileName(fileName) {
  const obj = _.find(list.data, { A: fileName});
  const newFileName = `${obj.A}_${obj.D}_${obj.E}`;
  return newFileName;
}


const files = fs.readdirSync('./files');

files.forEach(file => {
  const fileName = file.split('.')[0];
  const newFileName = convertNewFileName(fileName);
  renameAndCopyFile({ file, newFileName });
});