module.exports = function (givenOptions, callback) {
  var docGetter = {}
  getOptions(givenOptions, function(err, options) {
    docGetter.getDoc = function (docID, callback) {
      options.indexes.get('DOCUMENT￮' + docID + '￮', function (err, value) {
        if (err) {
          return callback(err, null);
        }
        else {
          return callback(null, value);
        }
      })
    }

    return callback(err, docGetter);

  })
}

var getOptions = function(givenOptions, callback) {
  if (!givenOptions.indexes) {
    levelup(givenOptions.indexPath || 'si', {
      valueEncoding: 'json'
    }, function(err, db) {
      givenOptions.indexes = db
      callback(null, givenOptions)
    })
  }
  else {
    callback(null, givenOptions)
  }
}
