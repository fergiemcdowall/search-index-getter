module.exports = function (options) {
  var docGetter = {}
  docGetter.getDoc = function (docID, callback) {
    options.indexes.get('DOCUMENT￮' + docID + '￮', function (err, value) {
      if (err) {
        return callback(err, null);
      }
      else {
        return callback(null, value);
      }
    });
  };
  return docGetter;
}
