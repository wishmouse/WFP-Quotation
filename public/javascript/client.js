
var $ = require('jquery')
var request = require('superagent')
var _hideShow = require('./_hideShow')
var _dataInput = require('./_dataInput')
var _clearData = require('./_clearData')
//var _dataReturn = require('./_dataReturn')



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
                    dataReturn= getData[i]
                    if(fireplaceType == dataReturn.fuel && air == dataReturn.type && dataReturn.make == make  )
                      $("#dropdown-selector").show()
                      $(dataReturn).each(function(){
                        var optionModel = $('<option />');
                        optionModel.attr('value', this.model).text(this.model);
                        $('#make-dropdown').append(optionModel);
                        var optionCorner = $('<option />');
                        optionCorner.attr('value', this.cornerHearth).text(this.cornerHearth);
                        $('#cornerHearth-dropdown').append(optionCorner);

                        var optionKw = $('<option />');
                        optionKw.attr('value', this.kw).text(this.kw);
                        $('#kw-dropdown').append(optionKw);

                        var optionCleanAir = $('<option />');
                        optionCleanAir.attr('value', this.cleanAir).text(this.cleanAir);
                        $('#cleanAir-dropdown').append(optionCleanAir);

                        var optionRural = $('<option />');
                        optionRural.attr('value', this.rural).text(this.rural);
                        $('#rural-dropdown').append(optionRural);

                        var optionRuralWB = $('<option />');
                        optionRuralWB.attr('value', this.ruralWB).text(this.ruralWB);
                        $('#ruralWB-dropdown').append(optionRuralWB);

                        var optionHearth = $('<option />');
                        optionHearth.attr('value', this.hearth).text(this.hearth);
                        $('#hearth-dropdown').append(optionHearth);

                        var optionWallHearth = $('<option />');
                        optionWallHearth.attr('value', this.wallHearth).text(this.wallHearth);
                        $('#wallHearth-dropdown').append(optionWallHearth);

                        var optionColour = $('<option />');
                        optionColour.attr('value', this.colour).text(this.colour);
                        $('#colour-dropdown').append(optionColour);

                        var optionColourPrice= $('<option />');
                        optionColourPrice.attr('value', this.colourPrice).text(this.colourPrice);
                        $('#colourPrice-dropdown').append(optionColourPrice);
                      });
                  }
                }
              })
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

       _clearData.clearDataSubmit()
   })



   //====
   //==== data edit
   //====
   $('#edit-data-button').click(function(e){
     e.preventDefault()
     $("#data-entry").hide()
     $("#fireplace").hide()
     $("#air").hide()
     $("#make").hide()


    editLine = $('#edit-data')

    function displayEdit(edit){
      var editTemplate = ""+
        "<table>" +
          "<tr>"+
            "<th class='table-header'>Edit / Delete</th>" +
            "<th class='table-header'>Type</th>" +
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
            "<td class='table-body'>"+editList.type+"</td>" +
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
            console.log("editItemNow", editItemNow)

            $('#edit-data').hide()
            $("#data-entry").show()
            $("#updated-data-submit").show()
            $("#fireplace").show()
            $("#air").show()
            $("#data-submit").hide()
            $("#quotation-button").hide()
            $("#edit-data-button").hide()
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

   $('#quotation-submit').click(function(e){
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

      /*  $.ajax({
          method: "POST",
          url: "/quotation",
          data: { customerName: customerName,
                  quoteDate: quoteDate,
                  email: email,
                  phone:phone
                 }
               })
               */
     clearQuotationSubmit()
  })


 function clearQuotationSubmit(){
   $("#salesman-1").removeClass("selected");
   $("#salesman-2").removeClass("selected");
   $("#salesman-3").removeClass("selected");
   salesman = ""
 }


})
