var $ = require('jquery')
var request = require('superagent')



function clearDataSubmit (){
  type =$("#input-type").removeClass("selected")
  make = $("#make").val('')//hmmmmm
  model = $("#input-model").val('')
  kw = $("#input-kw").val('')
  cleanAir = $("#input-clean-air").val('')
  cleanAirWB = $("#input-clean-air-wb").val('')
  rural = $("#input-rural").val('')
  ruralWB = $("#input-rural-wb").val('')
  hearth = $("#input-hearth").val()//hnnnn
  colour = $("#input-colour-available").val()//hmmmmm
  wallHearth = $("#input-wall-hearth").val('')
  cornerHearth = $("#input-corner-hearth").val('')
  colourPrice = $("#input-colour-price").val('')
}

module.exports = {
  clearDataSubmit:clearDataSubmit,
}
