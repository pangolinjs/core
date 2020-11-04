const RealDate = Date

/**
 * Return static date for `new Date()`
 */
global.Date = class Date {
  constructor (date) {
    if (date) {
      return new RealDate(date)
    }

    return new RealDate('2000-01-01T00:00:00.000Z')
  }
}
