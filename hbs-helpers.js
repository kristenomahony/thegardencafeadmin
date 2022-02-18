const hbs = require('hbs')

hbs.registerHelper('sum', function(array) {
  let s = 0
  for (const i = 0; i < array.length; i++) {
    s = s + array[i]
  }

  return s
})

module.exports = hbs
