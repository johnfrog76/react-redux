/* global test, expect */
const sum = require('../components/sum.js')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
