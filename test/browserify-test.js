const levelup = require('levelup')
const sia = require('search-index-adder')
const sig = require('../')

var batch = require('../node_modules/reuters-21578-json/data/justTen/justTen.json')
levelup('test/sandbox/simpleIndexing', {
  valueEncoding: 'json',
  db: require('level-js')
}, function (err, db) {
  sia({indexes: db}, function (err, indexer) {  //causes woe in browsers
    indexer.add(batch, {}, function (err) {
      sig({indexes: db}, function (err, getter) {
        getter.getDoc('4', function (err, doc) {
          document.getElementById("result").innerHTML = doc.title
          console.log(doc)
        })
      })
    })
  })
})
