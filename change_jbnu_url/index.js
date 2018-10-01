const fs = require('fs');
const env = require('system').env;

const APP_KEY = '';
const ID = "";
const PW = "";

const APP_URL = "";
const LOGIN_URL = "https://accounts.kakao.com/login?continue=https%3A%2F%2Fbusiness.kakao.com%2F&service=kakaoforbusiness";
const WRITE_PAGE_URL = `https://center-pf.kakao.com/${APP_KEY}/chat/smart/api`;

phantom.casperPath = './node_modules/casperjs';
phantom.injectJs('./node_modules/casperjs/bin/bootstrap.js');
 
const casper = require('casper').create({
    pageSettings: {
        loadImages: false, //The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});


//로그인페이지 접속
casper.start().thenOpen(LOGIN_URL, function() {
    console.log("페이지 접속");
});

//로그인
casper.then(function(){
    console.log("해당 id와 pw로 로그인 합니다.");
    this.evaluate(function(id, pw){
        document.getElementById("loginEmail").value = id;
        document.getElementById("loginPw").value = pw;
        document.querySelector('#login-form > fieldset > button').click()
    }, {
      id: ID,
      pw: PW
    });
});
 
casper.then(function(){ this.wait(3000, function () {} ) });

casper.thenOpen(WRITE_PAGE_URL, function() {
  console.log("글 작성 페이지 접속");
});

casper.then(function(){ this.wait(3000, function () {} ) });

casper.viewport(1400, 800);
// 글 작성 시작
casper.then(function(){
    console.log("3초 후에 글이 작성됩니다.");
    this.evaluate(function(appUrl){
        document.getElementById("appUrl").value = appUrl;
    }, {
      appUrl: APP_URL
    });
});

casper.then(function(){ this.wait(1000, function () {} ) });

casper.then(function(){
    console.log("저장 클릭");
    this.evaluate(function(){
        document.querySelector('#mArticle > div.wrap_btn > button.btn_g.btn_g2.btn_api').click();
    });
});

casper.then(function(){ this.wait(1000, function () {} ) });

casper.then(function(){
    console.log("저장 확인 - 확인 클릭");
    this.evaluate(function(){
        document.querySelector('body > div:nth-child(9) > div:nth-child(2) > div > div.layer_body > div > button.btn_g.btn_g2').click();
    });
});

casper.then(function(){ this.wait(1000, function () {} ) });

casper.then(function(){
    console.log("저장 완료 - 확인 클릭");
    this.evaluate(function(){
        document.querySelector('body > div:nth-child(9) > div:nth-child(2) > div > div > div > div > button').click();
    });
});

casper.run();