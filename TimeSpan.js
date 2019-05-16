// Javascript Date: 
// * Month is zero-based. Jan = 0, Feb = 1, etc.
// * Other Date numbers like day are 1-based.
// * So new Date(2019, 4, 16) would be 2019-05-16
// * new Date() gets current time
// * new Date().getTime() gets time in milliseconds since 1970 GMT.
//   So Date.getTime() is convenient to use for TimeSpan msec parameter.

// Example:
// var now = new TimeSpan();
// var newYears = new TimeSpan(new Date(2020, 0, 1);
// var isEndOfWorld = now.greaterThanEqualTo(newYears);
function TimeSpan(msec) {
  this.days = 0
  this.hours = 0
  this.minutes = 0
  this.seconds = 0
  this.milliseconds = 0

  // hours, minutes, etc are all converted to milliseconds and totaled
  this.toTotalMilliseconds = function() {
    return (this.days * 24 * 60 * 60 * 1000)
      + (this.hours * 60 * 60 * 1000)
      + (this.minutes * 60 * 1000)
      + (this.seconds * 1000)
      + (this.milliseconds)
  }

  this.greaterThan = function(other/*TimeSpan*/) {
    return this.toTotalMilliseconds() > other.toTotalMilliseconds()
  }

  this.equalTo = function(other) {
    return this.toTotalMilliseconds() == other.toTotalMilliseconds()
  }

  this.greaterThanEqualTo = function(other) {
    return this.greaterThan(other) || this.equalTo(other)
  }

  // initialize
  if (msec == undefined)
    msec = new Date().getTime()
  if (!Number.isInteger(msec))
    return this
  msec = Number(msec)
  if (msec == 0)
    return this

  var day = Math.floor(msec / 1000 / 60 / 60 / 24)
  var hr = Math.floor(msec / 1000 / 60 / 60) - (day * 24)
  var min = Math.floor(msec / 1000 / 60) - (hr * 60) - (day * 24 * 60)
  var sec = Math.floor(msec / 1000) - (min * 60) - (hr * 60 * 60) - (day * 24 * 60 * 60)
  msec = msec - (sec * 1000) - (min * 60 * 1000) - (hr * 60 * 60 * 1000) - (day * 24 * 60 * 60 * 1000)

  this.days = day
  this.hours = hr
  this.minutes = min
  this.seconds = sec
  this.milliseconds = msec
}
