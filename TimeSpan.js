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
