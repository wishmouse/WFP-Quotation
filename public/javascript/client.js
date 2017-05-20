
var $ = require('jquery')
var request = require('superagent')
var _hideShow = require('./_hideShow')
var _dataInput = require('./_dataInput')
var _clearData = require('./_clearData')
var _quoteInput = require('./_quoteInput')
var PDFDocument = require('pdfkit')
var doc = new PDFDocument
//var _quoteInput = require('./_quoteInput')

//quotation submit
var salesman
var airType
var vatRate=15
vatFireplaceText = 0
gtF =0

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
     $("#fireplace-data-entry").hide()
     $("#make").hide()
     $("#dropdown-selector").hide()
     $("#edit-quotation-data").hide()
     $("#colour-price").hide()
     $("#edit-salesman-data").hide()
     $('#quotation-display-data').empty()
     $("#enter-hearth-data").hide()
     $("#hearth-tile-price").hide()
     $('#model-dropdown-hearth').hide()
     $('#enter-flue-data').hide()

    quotationTemplate()
/*

       $.ajax({
         url: "/salesman",
         success: function(result){
               salesmanData = JSON.parse(result)
               for (i = 0; i < salesmanData.length; i++) {
                 salesmanList = salesmanData[i]
                 salesmanDisplay(salesmanList)

                 function salesmanDisplay(displaySalesman){
                   var displaySalesmanTemplate ='' +
                 	  "<div id='salesman-"+ salesmanList.salesmanName+"' class='border-salesman' >"+salesmanList.salesmanName +"</div>"
                 $("#salesman").append(displaySalesmanTemplate, displaySalesman)
                 }

               }
             }
           })
           */




  $('#salesman').delegate('.border-salesman', 'click', function(e){
         $(".border-salesman").removeClass("selected")
         var select = $(this).addClass("selected")
         var salesmanID = $(this).attr('id')
         salesman = select.text()
       })

   $('#air').delegate('.border-air-wetback', 'click', function(e){
          $(".border-air-wetback").removeClass("selected")
          var select = $(this).addClass("selected")
          var airID = $(this).attr('id')
          air = select.text()
         _clearData.changeTypes()
         _hideShow.airTypeShow()
        })


  $('#hearth-tile-price').delegate('.hearth-tile-border-colour', 'click', function(e){
           $(".hearth-tile-border-colour").removeClass("selected")
           var select = $(this).addClass("selected")
           var hearthTileID = $(this).attr('id')
           hearthTileText = parseInt(select.text())

          function hearthTile(){
            var editTemplate = ""+
                "<tr class='delete-tile-table'>"+
                  "<td class='delete-tile-button w3-padding w3-xlarge fa fa-trash'></td>"+
                  "<td class='table-description'>"+ "Additional Tile colour:    "+"<input id='colour-comment' class='colour-comment' placeholder='Colour?'/>"+"</td>" +
                  "<td class='table-quantity'>"+'1'+"</td>" +
                  "<td class='table-price' unit-price='"+hearthTileText+"'><input type='number' class='excl-price' id='hearth-colour-price-text' value="+hearthTileText+"></input></td>" +
                  "<td class='table-vat' id='hearth-colour-vat-text'>0</td>" +
                  "<td class='table-total' id='hearth-colour-total-text'></td>" +
                "</tr>"
            quoteLine.append(editTemplate)
          }
          hearthTile()
          calculateTotalTile()
           _clearData.changeTypes()
         })


function add(){
		var exclSum = 0
    var vatSum = 0
    var grandSum = 0

   $(".table-vat").each(function() {
       var value = $(this).text()
       if(!isNaN(value) && value.length != 0) {
           vatSum += parseFloat(value)
       }
        $("#quotation-vat-total").html(vatSum.toFixed(2))
   })

		$(".excl-price").each(function() {
			if(this.value && this.value.length!=0) {
				exclSum += parseFloat(this.value)
			}
      $("#quotation-excl-total").html(exclSum.toFixed(2))
		})



    $(".table-total").each(function() {
      var value = $(this).text()
      if(!isNaN(value) && value.length != 0) {
          grandSum += parseFloat(value)
      }
    $("#quotation-grand-total").html(grandSum.toFixed(2))
   })

}

     function calculateTotalTile(num){
       var num = parseInt($('#hearth-colour-price-text').val())
       var vatCalcTiles = num / 100*vatRate
       vatTilesText = $('#hearth-colour-vat-text').html(vatCalcTiles.toFixed(2))
       var grandTotalTiles = num + vatCalcTiles
       $('#hearth-colour-total-text').html(grandTotalTiles.toFixed(2))

   }

     $('#quotation-display-data').delegate('.delete-tile-button', 'click', function(){
          var removeTable = $(this).closest('tr')
          removeTable.remove()
          add()
       })


       $('#hearth-style').delegate('.border-style-hearth', 'click', function(e){
              $(".border-style-hearth").removeClass("selected")
              var select = $(this).addClass("selected")
              var hearthID = $(this).attr('id')
              hearthStyle = select.text()

             _clearData.changeTypes()
             _hideShow.hearthTypeShow()
        })

        $('#display-hearth-make').delegate('.border-make-hearth-display', 'click', function(e){
               $(".border-make-hearth-display").removeClass("selected")
               var select = $(this).addClass("selected")
               var hearthMakeID = $(this).attr('id')
               hearthMakeDisplay = select.text()

              _clearData.changeTypes()
              _hideShow.hearthTypeShow()

              if (entryTypeController == 'quotation'){
                  $.ajax({
                  url: "/getHearthData",
                  success: function(result){
                    $('#model-dropdown-hearth').html('')
                    getHearthData = JSON.parse(result)
                    for (i = 0; i < getHearthData.length; i++) {
                       hearthDataReturn = getHearthData[i]
                      if(hearthMakeDisplay == hearthDataReturn.hearthMake){
                          $("#dropdown-selector").show()
                          $(hearthDataReturn).each(function(){
                            var hearthOptionModel = $('<option />')
                            hearthOptionModel.attr('value', this.hearthModel).text(this.hearthModel)
                            $('#model-dropdown-hearth').append(hearthOptionModel)
                          })
                      }

                    }
                  }
                })
            }
          })

      $("#model-dropdown-hearth").change(function() {
        var modelHearthValue = $("#model-dropdown-hearth" ).val()
          for (i = 0; i < getHearthData.length; i++){
              hearthModelReturn = getHearthData[i]
            if(hearthModelReturn.hearthModel == modelHearthValue ){
              hearthPrice()
              if(hearthModelReturn.hearthAddFinish == "Yes" ){
                $("#hearth-tile-price").show()
                $("#hearth-tile-extra").html(hearthModelReturn.hearthAddFinishPrice)
               }
            }
          }
        })


        $('#colour-price').delegate('.border-colour', 'click', function(e){
                 $(".border-colour").removeClass("selected")
                 var select = $(this).addClass("selected")
                 var colourID = $(this).attr('id')
                 colour = parseInt(select.text())

                function colourPrice(){
                  var editTemplate = ""+
                      "<tr class='delete-colour-table'>"+
                        "<td> <div class='delete-colour-button w3-padding w3-xlarge fa fa-trash'></div></td>"+
                        "<td class='table-description'>"+ "Additional colour:    "+"<input id='colour-comment' class='colour-comment' placeholder='Colour?'/>"+"</td>" +
                        "<td class='table-quantity'>"+'1'+"</td>" +
                        "<td class='table-price'><input type='number'  class='excl-price' id='colour-price-text' value="+colour+"></input></td>" +
                        "<td class='table-vat' id='colour-vat-text'>0</td>" +
                        "<td class='table-total' id='colour-total-text'></td>" +
                      "</tr>"
                  quoteLine.append(editTemplate)
                }
                colourPrice()
                calculateTotalColour()
                add()
                 _clearData.changeTypes()
          })

    function calculateTotalColour(num){
      var num = parseInt($('#colour-price-text').val())
      var vatCalcColour = num / 100*vatRate
      vatColourText = $('#colour-vat-text').html(vatCalcColour.toFixed(2))
      var grandTotalColour = num + vatCalcColour
      $('#colour-total-text').html(grandTotalColour.toFixed(2))
  }


        $('#quotation-display-data').delegate('.delete-colour-button', 'click', function(){
             var removeTable = $(this).closest('tr')
             removeTable.remove()
             add()
          })

      function hearthPrice(){
        var editTemplate = ""+
            "<tr class='delete-hearth-table'>"+
              "<td> <div class='delete-hearth-button w3-padding w3-xlarge fa fa-trash'></div></td>"+
              "<td class='table-description'>"+ hearthDataReturn.hearthMake +" " + hearthDataReturn.hearthModel +"<input id='hearth-comment' class='colour-comment' placeholder='notes'/>"+"</td>" +
              "<td class='table-quantity'>"+'1'+"</td>" +
              "<td class='table-price'><input type='number'  class='excl-price' id='heart-price-text' value="+hearthDataReturn.hearthPrice+"></input></td>" +
              "<td class='table-vat' id='hearth-vat-text'>0</td>" +
              "<td class='table-total' id='hearth-total-text'></td>" +
            "</tr>"
        quoteLine.append(editTemplate)
        calculateTotalHearth()
        add()
       _clearData.changeTypes()
    }

    function calculateTotalHearth(num){
      var num = parseInt($('#heart-price-text').val())
      vatCalcHearth = num / 100*vatRate
      vatHearthText = $('#hearth-vat-text').html(vatCalcHearth.toFixed(2))
      var grandTotalHearth = num + vatCalcHearth
      $('#hearth-total-text').html(grandTotalHearth.toFixed(2))

  }

    $('#quotation-display-data').delegate('.delete-hearth-button', 'click', function(){
         var removeTable = $(this).closest('tr')
         removeTable.remove()
         $('.delete-tile-table').remove()
         add()
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
              $('#model-dropdown').html('')
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

       $("#model-dropdown").change(function() {
         var modelValue = $("#model-dropdown" ).val()
         for (i = 0; i < getData.length; i++) {
           var dataReturn= getData[i]
           if (modelValue == dataReturn.model){
             $("#kw-dropdown").html(dataReturn.kw)
             if(air == "Clean Air"){
              fireplaceCost = dataReturn.cleanAir
             } else if(air == 'Rural'){
                fireplaceCost = dataReturn.rural
             }
             if(air == 'Clean Air wetback'){
              fireplaceCost = dataReturn.cleanAirWB
             }else if (air == "Rural wetback"){
                fireplaceCost = dataReturn.ruralWB
             }
             if(hearth == 'Corner Hearth'){
               cornerHearth =dataReturn.cornerHearth

             }else if(hearth == 'Wall Hearth'){
               wallHearth =dataReturn.wallHearth
             }
             quotationDisplay()

             if(dataReturn.colour == "Yes"){
               $("#colour-price").show()
               $("#colourPrice-extra").html(dataReturn.colourPrice)
             }
           }
         }


         function quotationDisplay(){

           var editTemplate = ""+
               "<tr class='delete-fireplace-table'>"+
                 "<td class='delete-fireplace-button 3-padding w3-xlarge fa fa-trash'></td>"+
                 "<td class='table-description'>"+make+' '+dataReturn.model+ "</td>" +
                 "<td class='table-quantity'>"+'1'+"</td>" +
                 "<td class='table-price'><input type='number' class='excl-price' id='fireplace-price-text' value="+fireplaceCost+"></input></td>" +
                 "<td class='table-vat'<div id='fireplace-vat-text'>0</div></td>" +
                 "<td class='table-total' id='fireplace-total-text' alt=''></td>"+
               "</tr>"
           quoteLine.append(editTemplate)
          }
         calculateTotalFireplace()
         add()
       })

       function quotationTemplate(){
         quoteLine = $('#quotation-display-data')
         var editTemplate = ""+
           "<table>" +
             "<tr>"+
               "<td></td>"+
               "<th class='table-header-description'>Description</th>" +
               "<th class='table-header-quantity'>Quanity</th>" +
               "<th class='table-header-price'>Price</th>" +
               "<th class='table-header-vat'>VAT</th>" +
               "<th class='table-header-total'>Total</th>" +
             "</tr>"
           "</table>"
         quoteLine.append(editTemplate)

       }



   function calculateTotalFireplace(num){

     var num = parseInt($('#fireplace-price-text').val())
     vatCalcFireplace = num / 100*vatRate
     $(".table-vat").attr('value', vatCalcFireplace)
     $('#fireplace-vat-text').html(vatCalcFireplace.toFixed(2))
     grandTotalFireplace = num + vatCalcFireplace

     $(".table-total").attr('value','grandTotalFireplace')
     $('#fireplace-total-text').html(grandTotalFireplace.toFixed(2))
   }


    $('#quotation-display-data').delegate('.delete-fireplace-button', 'click', function(){
         var removeTable = $(this).closest('tr')
         removeTable.remove()
         $('.delete-colour-table').remove()
         add()
      })

//===============
// flue quotation
//===============

  $('#flue-style-wrapper').delegate('.border-style-flue', 'click', function(e){
     $(".border-style-flue").removeClass("selected")
     var select = $(this).addClass("selected")
     var flueStyleId = $(this).attr('id')
     flueStyle = select.text()


  })
   $('#flue-source-wrapper').delegate('.border-source-flue', 'click', function(e){
      $(".border-source-flue").removeClass("selected")
      var select = $(this).addClass("selected")
      var flueSourceId = $(this).attr('id')
      flueSource = select.text()

    })
    $('#flue-make').delegate('.flue-border-make', 'click', function(e){
       $(".flue-border-make").removeClass("selected")
       var select = $(this).addClass("selected")
       var flueMakeId = $(this).attr('id')
       flueMake = select.text()

           $.ajax({
           url: "/getFlueData",
           success: function(result){
             $('#model-dropdown-flue').html('')
             getFlueData = JSON.parse(result)
             console.log(getFlueData)
             for (i = 0; i < getFlueData.length; i++) {
               var dataReturn= getFlueData[i]
               if(flueMake == dataReturn.flueMake){
                   $(dataReturn).each(function(){
                     var optionModel = $('<option />')
                     optionModel.attr('value', this.flueModel).text(this.flueModel)
                     $('#model-dropdown-flue').append(optionModel)
                   })
               }
             }
           }
       })
     })


//====
//==== Database entry
//====
   $("#data-entry-button").click(function() {
     $("#quotation-submit-button").hide()
     _dataInput.dataEntryButton()
     entryTypeController = 'data entry'
   });



//===============
//===============  Ajax data submit
//===============

   $('#fireplace-data-submit').click(function(e){
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
     colourPrice =$("#input-colour-price").val()
        $.ajax({
          method: "POST",
          url: "/fireplaceDatabase",

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
      $("#make").hide()
       _clearData.removeClassSubmit()
       $(".submit-notification").show().delay(2000).fadeOut();
   })



   //====
   //==== data edit
   //====
   $('#edit-data-button').click(function(e){
     e.preventDefault()
     _hideShow.dataEditButton()
     editLine = $('#edit-data')
     entryTypeController = 'data entry'


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

// delete fireplace
 $('#edit-data').delegate('.click-to-delete', 'click', function(){
     clickToDeleteId = $(this).attr('data-id')
     var removeLi = $(this).closest('tr')

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
     colourComment = $("#colour-comment").val()
     comments = $("#quotation-comments").val()
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
                  fireplaceCost:fireplaceCost,
                  hearth: hearth,
                  wallHearth: wallHearth,
                  cornerHearth: cornerHearth,
                  colour: colour,
                  colourComment: colourComment,
                  comments: comments,

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
      $("#edit-quotation").empty()
      entryTypeController = 'quotation'
      editQuotationLine =$("#edit-quotation")

      function displayEditQuotation(editQuotation){
        var editQuotationTemplate = ""+
          "<table>" +
            "<tr>"+
              "<th class='table-header'></th>"+
              "<th class='table-header'>customerName</th>"+
              "<th class='table-header'>quoteDate </th>"+
              "<th class='table-header'>email</th>"+
              "<th class='table-header'>phone</th>"+
              "<th class='table-header'>streetNumber</th>"+
              "<th class='table-header'>streetName</th>"+
              "<th class='table-header'>address1</th>"+
              "<th class='table-header'>suburb</th>"+
              "<th class='table-header'>city</th>"+
              "<th class='table-header'>postcode</th>"+
              "<th class='table-header'>salesman</th>"+
              "<th class='table-header'>type</th>"+
              "<th class='table-header'>fuel</th>"+
              "<th class='table-header'>make</th>"+
              "<th class='table-header'>model</th>"+
              "<th class='table-header'>fireplaceCost</th>"+
              "<th class='table-header'>hearth</th>"+
              "<th class='table-header'>wallHearth</th>"+
              "<th class='table-header'>cornerHearth</th>"+
              "<th class='table-header'>colour</th>"+
              "<th class='table-header'>colourComment</th>"+
              "<th class='table-header'>comments</th>"+
            "</tr>"+
            "<tr>"+
              "<td><button class='click-to-edit-email' data-id ="+editQuotationList._id+">Email</button>" +
              "<button class='click-to-delete-quotation' data-id ="+editQuotationList._id+">Delete</button>" +
              "</td>"+
              "<td class='table-body'>"+editQuotationList.customerName+"</td>"+
              "<td class='table-body'>"+editQuotationList.quoteDate +"</td>"+
              "<td class='table-body'>"+editQuotationList.email+"</td>"+
              "<td class='table-body'>"+editQuotationList.phone+"</td>"+
              "<td class='table-body'>"+editQuotationList.streetNumber+"</td>"+
              "<td class='table-body'>"+editQuotationList.streetName+"</td>"+
              "<td class='table-body'>"+editQuotationList.address1+"</td>"+
              "<td class='table-body'>"+editQuotationList.suburb+"</td>"+
              "<td class='table-body'>"+editQuotationList.city+"</td>"+
              "<td class='table-body'>"+editQuotationList.postcode+"</td>"+
              "<td class='table-body'>"+editQuotationList.salesman+"</td>"+
              "<td class='table-body'>"+editQuotationList.type+"</td>"+
              "<td class='table-body'>"+editQuotationList.fuel+"</td>"+
              "<td class='table-body'>"+editQuotationList.make+"</td>"+
              "<td class='table-body'>"+editQuotationList.model+"</td>"+
              "<td class='table-body'>"+editQuotationList.fireplaceCost+"</td>"+
              "<td class='table-body'>"+editQuotationList.hearth+"</td>"+
              "<td class='table-body'>"+editQuotationList.wallHearth+"</td>"+
              "<td class='table-body'>"+editQuotationList.cornerHearth+"</td>"+
              "<td class='table-body'>"+editQuotationList.colour+"</td>"+
              "<td class='table-body'>"+editQuotationList.colourComment+"</td>"+
              "<td class='table-body'>"+editQuotationList.comments+"</td>"+

              "</tr>"+
            "</table>"

          editQuotationLine.append(editQuotationTemplate, editQuotation)
      }

      if(entryTypeController == 'quotation'){
        $.ajax({
          url: "/quotation",
          success: function(result){
                editQuotationData = JSON.parse(result)
                console.log(editQuotationData)
                for (i = 0; i < editQuotationData.length; i++) {
                  editQuotationList = editQuotationData[i]
                  displayEditQuotation(editQuotationList)
              }
            }
          })
        }
    })

    $('#edit-quotation').delegate('.click-to-delete-quotation', 'click', function(){
        deleteQuotationId = $(this).attr('data-id')
        var removeLi = $(this).closest('li')

        $.ajax({
          url: "/deleteQuotation/"+deleteQuotationId,
          success: function(result){
              removeLi.fadeOut(300, function(){
                $(this).remove()
              })
             }
          })
      })




    //==================
    //================== salesperson data
    //==================

    $('#salesman').delegate('.border-salesman', 'click', function(e){
           $(".border-salesman").removeClass("selected")
           var select = $(this).addClass("selected")
           var salesmanID = $(this).attr('id')
           salesman = select.text()
         })

     $('#entry-salesman-button').click(function(e){
       e.preventDefault()
       _hideShow.dataSalesmanButton()


       })

     $("#salesman-back-to-quotation").click(function(e){
       e.preventDefault()
       _hideShow.backToSalesButton

      })


     $('#submit-salesman-button').click(function(e){
       e.preventDefault()

       salesmanName = $("#salesman-name").val()
       salesmanEmail = $("#salesman-email").val()
       salesmanPhone = $("#salesman-phone").val()
       salesmanActive =$("#salesman-active").val()


     $.ajax({
            method: "POST",
            url: "/salesman",
            data: {
                salesmanName:salesmanName,
                salesmanEmail:salesmanEmail,
                salesmanPhone:salesmanPhone,
                salesmanActive:salesmanActive,
              }
         })

         $('#edit-salesman-data')[0].reset();

         $("#salesman-submit-notification").show().delay(2000).fadeOut();

    })


 $('#edit-salesman-button').click(function(e){
   e.preventDefault()
   $("#edit-salesman-data").hide()


   editSalesmanLine =$("#edit-salesman")

   function displaySalesmanData(editSalesman){
     var editSalesmanTemplate = ""+
       "<table class='to-delete"+editSalesmanList._id+"'>" +
         "<tr>"+
           "<th class='table-header'></th>"+
           "<th class='table-header'>Name</th>"+
           "<th class='table-header'>Email</th>"+
           "<th class='table-header'>Phone Number</th>"+
           "<th class='table-header'>Active</th>"+
         "</tr>"+
         "<tr>"+
           "<td><button class='click-to-edit-salesman' data-id ="+editSalesmanList._id+">Edit</button>" +
           "<button class='click-to-delete-salesman' data-id ="+editSalesmanList._id+">Delete</button>" +
           "</td>"+
           "<td class='table-body'>"+editSalesmanList.salesmanName+"</td>"+

           "<td class='table-body'>"+editSalesmanList.salesmanEmail+"</td>"+
           "<td class='table-body'>"+editSalesmanList.salesmanPhone+"</td>"+
           "<td class='table-body'>"+editSalesmanList.salesmanActive+"</td>"+

           "</tr>"+
         "</table>"
       editSalesmanLine.append(editSalesmanTemplate, editSalesman)
   }
     $.ajax({
       url: "/salesman",
       success: function(result){
             editSalesmanData = JSON.parse(result)
             console.log(editSalesmanData)
             for (i = 0; i < editSalesmanData.length; i++) {
               editSalesmanList = editSalesmanData[i]
               displaySalesmanData(editSalesmanList)
           }
         }
       })
  })


  $('#edit-salesman').delegate('.click-to-delete-salesman', 'click', function(){
      deleteSalesmanId = $(this).attr('data-id')
      $( ".to-delete"+deleteSalesmanId ).fadeOut("slow")

      $.ajax({
        url: "/deleteSalesman/"+deleteSalesmanId,
        success: function(result){
           }
        })

    })

//==============
//==============hearth data entry
//==============
$("#entry-hearth-button").click(function(){
  _hideShow.dataHearthButton()
  $(".submit-notification").hide()
})

$("#hearth-make").delegate('.border-make-hearth', 'click', function(e){
       $(".border-make-hearth").removeClass("selected")
       var select = $(this).addClass("selected")
       var hearthMakeID = $(this).attr('id')
       hearthMake = select.text()
     })

$('#hearth-data-submit').click(function(e){
  e.preventDefault()

  hearthModel = $("#input-model-hearth").val()
  hearthFinish = $("#hearth-finish").val()
  hearthPrice =$("#input-price-hearth").val()
  hearthAddFinish =$("#input-additional-finish-hearth").val()
  hearthAddFinishPrice =$("#input-price-hearth-add-finish").val()
  hearthStyle = $("#hearth-style").val()

    $.ajax({
       method: "POST",
       url: "/hearth",
       data: {
         hearthMake:hearthMake,
         hearthModel:hearthModel,
         hearthFinish:hearthFinish,
         hearthPrice:hearthPrice,
         hearthAddFinish:hearthAddFinish,
         hearthAddFinishPrice:hearthAddFinishPrice,
         hearthStyle:hearthStyle,
         }
    })
    $('#enter-hearth-data')[0].reset();

    $(".submit-notification").show().delay(2000).fadeOut();
})


$('#edit-hearth-button').click(function(e){
   e.preventDefault()
   $("#enter-hearth-data").hide()
   $("#edit-hearth-view").show()

   editHearthLine =$("#edit-hearth-view")

   function displayHearthData(editHearth){
     var editHearthTemplate = ""+
       "<table class='to-delete"+editHearthList._id+"'>" +
         "<tr>"+
           "<th class='table-header'></th>"+
           "<th class='table-header'>Make</th>"+
           "<th class='table-header'>Model</th>"+
           "<th class='table-header'>Style</th>"+
           "<th class='table-header'>Finish</th>"+
           "<th class='table-header'>Price</th>"+
           "<th class='table-header'>Add Finish</th>"+
           "<th class='table-header'>Add Finish Price</th>"+
         "</tr>"+
         "<tr>"+
           "<td><button class='click-to-edit-hearth' data-id ="+editHearthList._id+">Edit</button>" +
           "<button class='click-to-delete-hearth' data-id ="+editHearthList._id+">Delete</button>" +
           "</td>"+
           "<td class='table-body'>"+editHearthList.hearthMake+"</td>"+
           "<td class='table-body'>"+editHearthList.hearthModel+"</td>"+
           "<td class='table-body'>"+editHearthList.hearthFinish+"</td>"+
           "<td class='table-body'>"+editHearthList.hearthStyle+"</td>"+
           "<td class='table-body'>"+editHearthList.hearthPrice+"</td>"+
           "<td class='table-body'>"+editHearthList.hearthAddFinish+"</td>"+
           "<td class='table-body'>"+editHearthList.hearthAddFinishPrice+"</td>"+

           "</tr>"+
         "</table>"

       editHearthLine.append(editHearthTemplate, editHearth)
   }
     $.ajax({
       url: "/getHearthData",
       success: function(result){
             editHearthData = JSON.parse(result)
             console.log(editHearthData)
             for (i = 0; i < editHearthData.length; i++) {
               editHearthList = editHearthData[i]
               displayHearthData(editHearthList)
           }
         }
       })
 })


 $('#edit-hearth-view').delegate('.click-to-delete-hearth', 'click', function(){
     deleteHearthId = $(this).attr('data-id')
     $( ".to-delete"+deleteHearthId ).fadeOut("slow")

     $.ajax({
       url: "/deleteHearth/"+deleteHearthId,
       success: function(result){
          }
       })

   })

   $("#row-delete").click(function(e) {
     e.preventDefault
     $('#table-delete').remove()

   })

   //==============
   //==============flue data entry
   //==============
   $("#entry-flue-button").click(function(e){
     e.preventDefault
     _hideShow.dataFlueButton()
   })

   $("#flue-enter-options").change(function() {
     var flueOption = $("#flue-enter-options" ).val()
     if(flueOption == "Inner flue"){
        $("#flue-inner-options").show()
     }
     if(flueOption == "Outer flue"){
        $("#flue-outer-options").show()
     }
     if(flueOption == "Flue liner"){
        $("#flue-liner-options").show()
     }
     if(flueOption == "Cowel"){
       $("#flue-cowel-options").show()
     }
     if(flueOption == "Spider"){
       $("#flue-spider-options").show()
     }
     if(flueOption == "Guides"){
       $("#flue-guides-options")

     }
     })
   $('#flue-data-inner-submit').click(function(e){
     e.preventDefault()

     flueFuel = $("#flue-fuel").val()
     flueStyle = $("#flue-style").val()
     flueSource = $("#flue-source").val()
     flueInner = $("#flue-inner").val()
     fluePrice = $("#input-price-flue").val()


       $.ajax({
          method: "POST",
          url: "/flueInner",
          data: {
            flueFuel:flueFuel,
            flueStyle:flueStyle,
            flueSource:flueSource,
            flueInner: flueInner,
            fluePrice:fluePrice,
            }
       })
      // $('#enter-flue-data')[0].reset();

       $(".submit-notification").show().delay(200).fadeOut();
   })

   $("#edit-flue-button").click(function(){
     _hideShow.editFlueButton()

     editFlueLine =$("#edit-flue-view")
     flueTemplate()
     function flueTemplate(){
       editFlueLine =$("#edit-flue-view")
       var editFlueTemplate = ""+
         "<table>" +
           "<tr>"+
             "<th class='table-header'></th>"+
             "<th class='table-header'>Make</th>"+
             "<th class='table-header'>Model</th>"+
             "<th class='table-header'>Finish</th>"+
             "<th class='table-header'>Size</th>"+
             "<th class='table-header'>Shield</th>"+
             "<th class='table-header'>Price</th>"+
           "</tr>"+
          "</table>"
          editFlueLine.append(editFlueTemplate)
      }

      function displayFlueData(){
        var editFlueTemplate = ""+
        "<tr>"+
            "<td>"+
              "<button class='click-to-edit-flue' data-id ="+editFlueList._id+">Edit</button>" +
              "<button class='click-to-delete-flue' data-id ="+editFlueList._id+">Delete</button>" +
            "</td>"+
            "<td class='table-body'>"+editFlueList.flueMake+"</td>"+

            "<td class='table-body'>"+editFlueList.flueModel+"</td>"+
            "<td class='table-body'>"+editFlueList.flueFinish+"</td>"+
            "<td class='table-body'>"+editFlueList.flueSize+"</td>"+
            "<td class='table-body'>"+editFlueList.flueShield+"</td>"+
            "<td class='table-body'>"+editFlueList.fluePrice+"</td>"+
          "</tr>"
        editFlueLine.append(editFlueTemplate)
       }


      $.ajax({
        url: "/getFlueData",
        success: function(result){
              editFlueData = JSON.parse(result)
              for (i = 0; i < editFlueData.length; i++) {
                editFlueList = editFlueData[i]
                displayFlueData(editFlueList)
            }
          }
        })
   })

   $('#edit-flue-view').delegate('.click-to-delete-flue', 'click', function(){
       deleteFlueId = $(this).attr('data-id')
       $( ".to-delete"+deleteFlueId )
       $.ajax({
         url: "/deleteFlue/"+deleteFlueId,
         success: function(result){
            }
         })

     })




})//document ready
