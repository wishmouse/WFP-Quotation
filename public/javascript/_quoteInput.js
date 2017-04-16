var $ = require('jquery')
var request = require('superagent')


function quoteInput(){
  $("#kw-dropdown").html(dataReturn.kw)
  $("#cleanAir-dropdown").html(dataReturn.cleanAir)
  $("#cleanAirWB-dropdown").html(dataReturn.cleanAirWB)
  $("#rural-dropdown").html(dataReturn.rural)
  $("#ruralWB-dropdown").html(dataReturn.ruralWB)
  $("#hearth-dropdown").html(dataReturn.hearth)
  $("#wallHearth-dropdown").html(dataReturn.wallHearth)
  $("#cornerHearth-dropdown").html(dataReturn.cornerHearth)
  $("#colour-dropdown").html(dataReturn.colour)
  $("#colourPrice-dropdown").html(dataReturn.colourPrice)

}

module.exports = {
      quoteInput:quoteInput,

  }
