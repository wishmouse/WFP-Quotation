
var $ = require('jquery')
var request = require('superagent')
var _hideShow = require('./_hideShow')
var _dataInput = require('./_dataInput')
var _clearData = require('./_clearData')
var PDFDocument = require('pdfkit')
var doc = new PDFDocument
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
     $("#fireplace-data-entry").hide()
     $("#make").hide()
     $("#dropdown-selector").hide()
     $("#edit-quotation-data").hide()
     $("#colour-price").hide()
     $("#quotation-comments").hide()
     $("#edit-salesman-data").hide()
/*
       $.ajax({
         url: "/salesman",
         success: function(result){
               salemanData = JSON.parse(result)
               for (i = 0; i < salesmanData.length; i++) {
                 salesmanList = salesmanData[i]
                 console.log(salesmanList)
                 displayEdit(salesmanList)

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

    $('#hearth').delegate('.border-hearth', 'click', function(e){
           $(".border-hearth").removeClass("selected")
           var select = $(this).addClass("selected")
           var hearthID = $(this).attr('id')
           hearth = select.text()
          _clearData.changeTypes()
          _hideShow.hearthTypeShow()
         })

  $('#colour-price').delegate('.border-colour', 'click', function(e){
           $(".border-colour").removeClass("selected")
           var select = $(this).addClass("selected")
           var colourID = $(this).attr('id')
           colour = parseInt(select.text())

          function colourPrice(){
            var editTemplate = ""+
                "<tr>"+
                  "<td class='table-colour-description'>"+ "Additional colour:    "+"<input id='colour-comment' class='colour-comment' placeholder='Colour?'/>"+"</td>" +
                  "<td class='table-colour-quanity'>"+'1'+"</td>" +
                  "<td class='table-colour-price'>"+colour+"</td>" +
                  "<td class='table-colour-total'>"+'00.00'+"</td>" +
                "</tr>"
            quoteLine.append(editTemplate)
          }
          colourPrice()
           _clearData.changeTypes()
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
                $("#quotation-comments").show()
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

           $("#model-dropdown" ).change(function() {
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
                   hearthCost =dataReturn.cornerHearth
                 }else if(hearth == 'Wall Hearth'){
                   hearthCost =dataReturn.wallHearth
                 }
                 quotationDisplay()

                 if(dataReturn.colour == "Yes"){
                   $("#colour-price").show()
                   $("#colourPrice-extra").html(dataReturn.colourPrice)
                 }
               }
             }



             function quotationDisplay(){
               quoteLine = $('#quotation-display')
               var editTemplate = ""+
                 "<table>" +
                   "<tr>"+
                     "<th class='table-header-description'>Description</th>" +
                     "<th class='table-header'>Quanity</th>" +
                     "<th class='table-header'>Price</th>" +
                     "<th class='table-header'>Total</th>" +
                   "</tr>"+
                   "<tr>"+
                     "<td class='table-fireplace-description'>"+make+' '+dataReturn.model+ "</td>" +
                     "<td class='table-body'>"+'1'+"</td>" +
                     "<td class='table-body'>"+parseInt(fireplaceCost)+ "</td>" +"</td>" +
                     "<td class='table-body'>"+parseInt(fireplaceCost)+"</td>"
                   "</tr>"+
                 "</table>"
               quoteLine.append(editTemplate)
             }

           })



//====
//==== Database entry
//====
   $("#data-entry-button").click(function() {
     $("#quotation-submit-button").hide()
     _dataInput.dataEntryButton()
     entryTypeController = 'data entry'
   });

   $("#quotation-button").click(function() {
     $("#quotation").show()
     $("#quotation-submit-button").show()
     $("#fireplace-data-entry").hide()
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
      $("#make").hide()
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
    alert(entryTypeController)
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
alert("hre")
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
     alert("here number 2")
     $("#dropdown-selector").hide()
     $("#make").hide()

  })

  $('#edit-quotation-button').click(function(e){
    e.preventDefault()
      _hideShow.editQuoteButton()
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

    $("#back-to-quote").click(function(){
    _hideShow.backToQuote()

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

         $.ajax({
            method: "POST",
            url: "/salesman",
            data: {
                salesmanName:salesmanName,
                salesmanEmail:salesmanEmail,
                salesmanPhone:salesmanPhone,
              }
         })


         $('#edit-salesman-data')[0].reset();

         $("#salesman-submit-notification").show().delay(2000).fadeOut();
    })


 $('#edit-salesman-button').click(function(e){
    e.preventDefault()
    $("#edit-salesman-data").hide()

    editSalemanLine =$("#edit-salesman")

    function displaySalesmanData(editSalesman){
      var editSalesmanTemplate = ""+
        "<table class='to-delete"+editSalesmanList._id+"'>" +
          "<tr>"+
            "<th class='table-header'></th>"+
            "<th class='table-header'>Name</th>"+
            "<th class='table-header'>Email</th>"+
            "<th class='table-header'>Phone Number</th>"+
          "</tr>"+
          "<tr>"+
            "<td><button class='click-to-edit-salesman' data-id ="+editSalesmanList._id+">Edit</button>" +
            "<button class='click-to-delete-salesman' data-id ="+editSalesmanList._id+">Delete</button>" +
            "</td>"+
            "<td class='table-body'>"+editSalesmanList.salesmanName+"</td>"+

            "<td class='table-body'>"+editSalesmanList.salesmanEmail+"</td>"+
            "<td class='table-body'>"+editSalesmanList.salesmanPhone+"</td>"+

            "</tr>"+
          "</table>"

        editSalemanLine.append(editSalesmanTemplate, editSalesman)
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


})//document ready
