
var $ = require('jquery')
var request = require('superagent')
var _hideShow = require('./_hideShow')
var _dataInput = require('./_dataInput')
var _clearData = require('./_clearData')
//var _quoteInput = require('./_quoteInput')

//quotation submit
var salesman
var airType

// data entry
var fireplaceType
var air
var make
var model
var kw
var cleanAir
var cleanAirWB
var rural
var ruralWB
var hearth
var wallHearth
var cornerHearth
var colour
var colourPrice


//data edit
var editList

 $(document).ready(function(){
    entryTypeController = 'quotation'
     $("#data-entry").hide()
     $("#make").hide()
     $("#dropdown-selector").hide()
     $("#edit-quotation-data").hide()


  $('#salesman').delegate('.border-salesman', 'click', function(e){
         $(".border-salesman").removeClass("selected")
         var select = $(this).addClass("selected")
         var salesmanID = $(this).attr('id')
         salesman = select.text()
       })

       $('#air').delegate('.border-air', 'click', function(e){
              $(".border-air").removeClass("selected")
              var select = $(this).addClass("selected")
              var airID = $(this).attr('id')
              air = select.text()
            })


        $('#fireplace').delegate('.border-fireplace', 'click', function(e){
              _hideShow.hideShow()
               $(".border-fireplace").removeClass("selected")
               var select = $(this).addClass("selected")
               var fireplaceID = $(this).attr('id')
               fireplaceType = select.text()
               if(fireplaceID == 'gas'){
                 _hideShow.gasShow ()
               } else if (fireplaceID == 'wood'){
                  _hideShow.woodShow()
               } else if (fireplaceID == 'electric') {
                 _hideShow.electricShow()
              } else if(fireplaceID == "multi-fuel"){
                 _hideShow.multifuelShow ()
              }else if (fireplaceID == 'biofuel'){
                _hideShow.biofuelShow ()
              } else if (fireplaceID == 'cooker'){
                _hideShow.cookerShow()
              }

             })

         $('#make').delegate('.border-make', 'click', function(e){
            $(".border-make").removeClass("selected")
            var select = $(this).addClass("selected")
            var makeID = $(this).attr('id')
            make = select.text()

            if (entryTypeController == 'quotation'){
                $.ajax({
                url: "/fireplaceData",
                success: function(result){
                  getData = JSON.parse(result)
                  for (i = 0; i < getData.length; i++) {
                    var dataReturn= getData[i]
                    if(fireplaceType == dataReturn.fuel && dataReturn.make == make ){
                        $("#dropdown-selector").show()
                        $(dataReturn).each(function(){
                          var optionModel = $('<option />')
                          optionModel.attr('value', this.model).text(this.model)
                          $('#model-dropdown').append(optionModel)

                      })
                    }

                  }
                }
              })
            }
           })

           $("#model-dropdown" ).change(function() {
             var modelValue = $("#model-dropdown" ).val()
             for (i = 0; i < getData.length; i++) {
               var dataReturn= getData[i]
               console.log(dataReturn)
               if (modelValue == dataReturn.model){
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
             }
           })

//====
//==== Database entry
//====
   $("#data-entry-button").click(function() {
     _dataInput.dataEntryButton()
     entryTypeController = 'data entry'
   });

   $("#quotation-button").click(function() {
     $("#quotation").show()
     $("#data-entry").hide()
   });


//===============
//===============  Ajax data submit
//===============

   $('#data-submit').click(function(e){
     e.preventDefault()
     //make = $("#make").val()
     fuel = fireplaceType
     model = $("#input-model").val()
     kw = $("#input-kw").val()
     cleanAir = $("#input-clean-air").val()
     cleanAirWB = $("#input-clean-air-wb").val()
     rural = $("#input-rural").val()
     ruralWB = $("#input-rural-wb").val()
     hearth = $("#input-hearth").val()
     colour = $("#input-colour-available").val()
     wallHearth = $("#input-wall-hearth").val()
     cornerHearth = $("#input-corner-hearth").val()
     colourPrice = $("#input-colour-price").val()
        $.ajax({
          method: "POST",
          url: "/database",
          data: {
                  fuel:fireplaceType,
                  make: make,
                  model: model,
                  kw: kw,
                  cleanAir: cleanAir,
                  cleanAirWB: cleanAirWB,
                  rural: rural,
                  ruralWB: ruralWB,
                  hearth: hearth,
                  wallHearth: wallHearth,
                  cornerHearth: cornerHearth,
                  colour: colour,
                  colourPrice: colourPrice

                 }
               })

       _clearData.clearDataSubmit()
       _clearData.removeClassSubmit()
       $("#data-submit-notification").show().delay(2000).fadeOut();
   })



   //====
   //==== data edit
   //====
   $('#edit-data-button').click(function(e){
     e.preventDefault()
     _hideShow.dataEditButton()


    editLine = $('#edit-data')

    function displayEdit(edit){
      var editTemplate = ""+
        "<table>" +
          "<tr>"+
            "<th class='table-header'>Edit / Delete</th>" +
            "<th class='table-header'>Fuel</th>" +
            "<th class='table-header'>Make</th>" +
            "<th class='table-header'>Model</th>" +
            "<th class='table-header'>Kw</th>" +
            "<th class='table-header'>Clean Air</th>" +
            "<th class='table-header'>Clean Air WB</th>" +
            "<th class='table-header' >Rural</th>" +
            "<th class='table-header'>Rural WB</th>" +
            "<th class='table-header'>Hearth</th>" +
            "<th class='table-header'>Wall Hearth</th>" +
            "<th class='table-header'>Corner Hearth</th>" +
            "<th class='table-header'>Colour</th>" +
            "<th  class='table-header'>Colour Price</th>" +
          "</tr>"+
          "<tr>"+
            "<td><button class='click-to-edit' data-id ="+editList._id+">Edit</button>" +
            "<button class='click-to-delete' data-id ="+editList._id+">Delete</button>" +
            "</td>"+
            "<td class='table-body'>"+editList.fuel+"</td>" +
            "<td class='table-body'>"+editList.make+"</td>" +
            "<td class='table-body'>"+editList.model+"</td>" +
            "<td class='table-body'>"+editList.kw+"</td>" +
            "<td class='table-body'>"+editList.cleanAir+"</td>" +
            "<td class='table-body'>"+editList.cleanAirWB+"</td>" +
            "<td class='table-body'>"+editList.rural+"</td>" +
            "<td class='table-body'>"+editList.ruralWB+"</td>" +
            "<td class='table-body'>"+editList.hearth+"</td>" +
            "<td class='table-body'>"+editList.wallHearth+"</td>" +
            "<td class='table-body'>"+editList.cornerHearth+"</td>" +
            "<td class='table-body'>"+editList.colour+"</td>" +
            "<td class='table-body'>"+editList.colourPrice+"</td>" +
          "</tr>"+
        "</table>"
      editLine.append(editTemplate, edit)
    }

if(entryTypeController == 'data entry'){
  $.ajax({
    url: "/fireplaceData",
    success: function(result){
          editData = JSON.parse(result)
          for (i = 0; i < editData.length; i++) {
            editList = editData[i]
            displayEdit(editList)

          }
        }
      })
    }
})

 $('#edit-data').delegate('.click-to-edit', 'click', function(){
     clickToEditId = $(this).attr('data-id')

   $.ajax({
     url: "/edit/"+clickToEditId,
     success: function(result){
       editItem = JSON.parse(result)
       for (i = 0; i < editItem.length; i++) {
            editItemNow = editItem[i]
            _hideShow.clickToEdit()

          }
        }
     })
 })


 $('#edit-data').delegate('.click-to-delete', 'click', function(){
     clickToDeleteId = $(this).attr('data-id')
     var removeLi = $(this).closest('li')

     $.ajax({
       url: "/delete/"+clickToDeleteId,
       success: function(result){
           removeLi.fadeOut(300, function(){
             $(this).remove()
           })
          }
       })
   })


   //====
   //==== quotation- entry
   //====

   $('#quotation-submit-button').click(function(e){
     e.preventDefault()

     customerName = $("#customer-name").val()
     quoteDate = $("date").val()
     email = $("#customer-email").val()
     phone = $("#customer-phone").val()
     streetNumber = $("#street_number").val()
     streetName = $("#route").val()
     address1= $("#street_number").val() +' '+ $("#route").val()
     suburb = $("#sublocality_level_1").val()
     city = $("#locality").val()
     postCode = $("#postal_code").val()
     fuel = fireplaceType
     model = $("#model-dropdown").val()
     kw = $("#kw-dropdown").text()
     cleanAir = $("#cleanAir-dropdown").text()
     cleanAirWB = $("#cleanAirWB-dropdown").text()
     rural = $("#rural-dropdown").text()
     ruralWB = $("#ruralWB-dropdown").text()
     hearth = $("#hearth-dropdown").text()
     colour = $("#colour-dropdown").text()
     wallHearth = $("#wallHearth-dropdown").text()
     cornerHearth = $("#cornerHearth-dropdown").text()
     colourPrice = $("#colourPrice-dropdown").text()

       $.ajax({
          method: "POST",
          url: "/quotation",
          data: {
                  customerName: customerName,
                  quoteDate: quoteDate,
                  email: email,
                  phone:phone,
                  streetNumber:streetNumber,
                  streetName:streetName,
                  address1:address1,
                  suburb:suburb,
                  city:city,
                  postcode:postCode,
                  salesman:salesman,
                  type:air,
                  fuel:fireplaceType,
                  make: make,
                  model: model,
                  kw: kw,
                  cleanAir: cleanAir,
                  cleanAirWB: cleanAirWB,
                  rural: rural,
                  ruralWB: ruralWB,
                  hearth: hearth,
                  wallHearth: wallHearth,
                  cornerHearth: cornerHearth,
                  colour: colour,
                  colourPrice: colourPrice

                 }
               })
     _clearData.clearQuotationSubmit()
     _clearData.removeClassSubmit()
     $("#dropdown-selector").hide()
     $("#make").hide()

  })

  $('#edit-quotation-button').click(function(e){
    e.preventDefault()
    _hideShow.editQuoteButton()
  })

    $("#back-to-quote").click(function(){
    _hideShow.backToQuote()

    })

})
