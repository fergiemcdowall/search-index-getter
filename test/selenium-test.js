const test = require('tape')
const fs = require('fs')

test('start server', function(t) {
  t.plan(1)
  server = require('http').createServer(function(req, res) {
    if (req.url == '/bundle.js') {
      fs.readFile('./test/sandbox' + req.url, function(err, file) {
        res.writeHeader(200);  
        res.write(file);  
        res.end();
      })
    }
    else {
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write('<script src="bundle.js"></script>');
      res.write('<div name="result" id="result">waiting...</div>');
      res.end();
    }
  }).listen(8080, function(err) {
    t.error(err)
  });
})

test('connect to test html page', function(t) {
  var webdriver = require('selenium-webdriver'),
  By = require('selenium-webdriver').By,
  until = require('selenium-webdriver').until;

  var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

  t.plan(2)
  driver.get('http://localhost:8080');
  var resultDiv = driver.findElement(By.id('result'))
  resultDiv.getInnerHtml().then(function(html) {
    console.log(html)
    t.equal(html, 'waiting...')
  })
  driver.wait(until.elementTextIs(resultDiv, 'TALKING POINT/BANKAMERICA EQUITY OFFER'), 10000);
  resultDiv.getInnerHtml().then(function(html) {
    console.log(html)
    t.equal(html, 'TALKING POINT/BANKAMERICA <bac> EQUITY OFFER</bac>')
  })
  driver.quit();
})

test('teardown', function (t) {
  server.close()
  t.end()
})
