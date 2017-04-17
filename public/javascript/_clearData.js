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
  hearth = $("#input-hearth").val('')//hnnnn
  colour = $("#input-colour-available").val()//hmmmmm
  wallHearth = $("#input-wall-hearth").val('')
  cornerHearth = $("#input-corner-hearth").val('')
  colourPrice = $("#input-colour-price").val('')
}

function removeClassSubmit(){
  $(".border-air").removeClass("selected")
  $(".border-fireplace").removeClass("selected")
  $(".border-make").removeClass("selected")

}

function changeAirType(){
  kw = $("#kw-dropdown").text("")
  cleanAir = $("#cleanAir-dropdown").text("")
  cleanAirWB = $("#cleanAirWB-dropdown").text("")
  rural = $("#rural-dropdown").text("")
  ruralWB = $("#ruralWB-dropdown").text("")
  hearth = $("#hearth-dropdown").text("")
  colour = $("#colour-dropdown").text("")
  wallHearth = $("#wallHearth-dropdown").text("")
  cornerHearth = $("#cornerHearth-dropdown").text("")
  colourPrice = $("#colourPrice-dropdown").text("")
}

function clearQuotationSubmit(){
  customerName = $("#customer-name").val('')
  quoteDate = $("#date").val('')
  email = $("#customer-email").val('')
  phone = $("#customer-phone").val('')
  autocomplete = $("#autocomplete").val("")
  streetNumber = $("#street_number").val('')
  streetName = $("#route").val('')
  address1= $("#street_number").val('') +' '+ $("#route").val('')
  suburb = $("#sublocality_level_1").val('')
  city = $("#locality").val('')
  postCode = $("#postal_code").val('')
  model = $("#model-dropdown").val('')
  kw = $("#kw-dropdown").text("")
  cleanAir = $("#cleanAir-dropdown").text("")
  cleanAirWB = $("#cleanAirWB-dropdown").text("")
  rural = $("#rural-dropdown").text("")
  ruralWB = $("#ruralWB-dropdown").text("")
  hearth = $("#hearth-dropdown").text("")
  colour = $("#colour-dropdown").text("")
  wallHearth = $("#wallHearth-dropdown").text("")
  cornerHearth = $("#cornerHearth-dropdown").text("")
  colourPrice = $("#colourPrice-dropdown").text("")
   $("#salesman-1").removeClass("selected");
   $("#salesman-2").removeClass("selected");
   $("#salesman-3").removeClass("selected");
   salesman = ""
}



module.exports = {
  clearDataSubmit:clearDataSubmit,
  removeClassSubmit:removeClassSubmit,
  clearQuotationSubmit:clearQuotationSubmit,
  changeAirType:changeAirType,
}
