var bs58check = require('../')
var fixtures = require('./fixtures')
var tape = require('tape')

fixtures.valid.forEach(function (f) {
  tape('decodes ' + f.string, function (t) {
    t.plan(2)
    var actual = bs58check.decode(f.string).toString('hex')

    t.equal(actual, f.payload)

    actual = bs58check.decodeUnsafe(f.string).toString('hex')
    t.equal(actual, f.payload)
  })
})

fixtures.invalid.forEach(function (f) {
  tape('decode throws on ' + f, function (t) {
    t.plan(2)
    t.throws(function () {
      bs58check.decode(f)
    }, /Invalid checksum/)

    t.equal(bs58check.decodeUnsafe(f), undefined)
  })
})

fixtures.valid.forEach(function (f) {
  tape('encodes ' + f.string, function (t) {
    t.plan(1)
    var actual = bs58check.encode(new Buffer(f.payload, 'hex'))

    t.equal(actual, f.string)
  })
})


