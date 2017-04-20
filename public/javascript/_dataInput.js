var $ = require('jquery')
var request = require('superagent')



function dataEntryButton(){
  $("#quotation").hide()
  $("#fireplace-data-entry").show()
  $("#free-standing-make").hide()
  $("#inbuilt-entry").hide()
  $("#quote-input").hide()
  $("#updated-data-submit").hide()
  $("#data-submit-notification").hide()
  $("#dropdown-selector").hide()
  $("#quote-select").hide()
}

module.exports = {
  dataEntryButton:dataEntryButton,
}
