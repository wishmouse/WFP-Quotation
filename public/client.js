
var $ = require('jquery')
var request = require('superagent')
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
     $("#data-entry").hide()

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
              alert(air)
            })

      function hideShow(){
            $("#jayline").hide()
            $("#fisher" ).hide()
            $("#gazco" ).hide()
            $("#jetmaster" ).hide()
            $("#escea" ).hide()
            $("#living-flame" ).hide()
            $("#bosca" ).hide()
            $("#pyroclassic" ).hide()
            $("#metro" ).hide()
            $("#firenzo" ).hide()
            $("#woodsman" ).hide()
            $("#quadra-fire" ).hide()
            $("#esse" ).hide()
            $("#yunca" ).hide()
            $("#ethos" ).hide()
            $("#warmington" ).hide()
            $("#quadrafire" ).hide()
            $("#kent" ).hide()
            $("#stovax" ).hide()
            $("#mitsubishi" ).hide()
            $("#beef-eater" ).hide()
            $("#ortal" ).hide()
            $("#heat-glo" ).hide()
            $("#trendz" ).hide()
            $("#bromic" ).hide()
            $("#realfires" ).hide()
            $("#the-fireplace" ).hide()
            $("#cast-iron-chiminea").hide()
            $("#the-bio-flame").hide()
            $("#fogata").hide()
          }

          $('#fireplace').delegate('.border-fireplace', 'click', function(e){
                hideShow()
                 $(".border-fireplace").removeClass("selected")
                 var select = $(this).addClass("selected")
                 var fireplaceID = $(this).attr('id')
                 fireplaceType = select.text()
                 if(fireplaceID == 'gas'){
                   $("#heat-glo" ).show()
                   $("#gazco" ).show()
                   $("#escea" ).show()
                   $("#living-flame" ).show()
                   $("#warmington" ).show()
                   $("#realfires" ).show()
                   $("#ortal" ).show()
                   $("#blank").hide()
                 } else if (fireplaceID == 'wood'){
                   $("#jayline").show()
                   $("#gazco").show()
                   $("#jetmaster").show()
                   $("#escea").show()
                   $("#bosca").show()
                   $("#pyroclassic").show()
                   $("#metro").show()
                   $("#firenzo").show()
                   $("#woodsman").show()
                   $("#esse").show()
                   $("#yunca").show()
                   $("#ethos").show()
                   $("#warmington").show()
                   $("#quadrafire").show()
                   $("#kent").show()
                   $("#stovax").show()
                   $("#mitsubishi").show()
                   $("#trendz").show()
                   $("#cast-iron-chiminea").show()
                   $("#fogata").show()
                   $("#blank").hide()
                 } else if (fireplaceID == 'electric') {
                  $("#gazco").show()
                  $("#esse").show()
                  $("#bromic").show()
                  $("#blank").hide()
                } else if(fireplaceID == "multi-fuel"){
                  $("#fisher").show()
                  $("#firenzo").show()
                  $("#esse").show()
                  $("#yunca").show()
                  $("#blank").hide()

                }else if (fireplaceID == 'biofuel'){
                  $("#the-bio-flame").show()
                  $("#blank").hide()
                } else if (fireplaceID == 'cooker'){
                  $("#fisher").show()
                  $("#firenzo").show()
                  $("#esse").show()
                  $("#yunca").show()
                  $("#blank").hide()
                }
               })




//==
// ====

//====
//==== Database entry
//====
   $("#data-entry-button").click(function() {
     $("#quotation").hide()
     $("#data-entry").show()
     $("#free-standing-make").hide()
     $("#inbuilt-entry").hide()
     $("#quote-input").hide()
     $("#updated-data-submit").hide()

   });

   $("#quotation-button").click(function() {
     $("#quotation").show()
     $("#data-entry").hide()
   });




   $('#data-submit').click(function(e){
     e.preventDefault()
     make = $("#make").val()
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

     clearDataSubmit()

   })

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
            "<th>Edit / Delete</th>" +
            "<th>Type</th>" +
            "<th>Make</th>" +
            "<th>Model</th>" +
            "<th>Kw</th>" +
            "<th>Clean Air</th>" +
            "<th>Clean Air WB</th>" +
            "<th>Rural</th>" +
            "<th>Rural WB</th>" +
            "<th>Hearth</th>" +
            "<th>Wall Hearth</th>" +
            "<th>Corner Hearth</th>" +
            "<th>Model</th>" +
            "<th>Colour</th>" +
            "<th>Colour Price</th>" +
          "</tr>"+
          "<tr>"+
            "<td><button class='click-to-edit' data-id ="+editList._id+">Edit Entry</button>" +
            "<button class='click-to-delete' data-id ="+editList._id+">Delete Entry</button>" +
            "</td>"+
            "<td>"+editList.type+"</td>" +
            "<td>"+editList.fuel+"</td>" +
            "<td>"+editList.make+"</td>" +
            "<td>"+editList.model+"</td>" +
            "<td>"+editList.kw+"</td>" +
            "<td>"+editList.cleanAir+"</td>" +
            "<td>"+editList.cleanAirWB+"</td>" +
            "<td>"+editList.rural+"</td>" +
            "<td>"+editList.ruralWB+"</td>" +
            "<td>"+editList.hearth+"</td>" +
            "<td>"+editList.wallHearth+"</td>" +
            "<td> "+editList.cornerHearth+"</td>" +
            "<td>"+editList.colour+"</td>" +
            "<td>"+editList.colourPrice+"</td>" +
          "</tr>"+
        "</table>"
      editLine.append(editTemplate, edit)
    }


    /*
  function displayEdit(edit){
    var editTemplate = ""+
      "<li>" +
      "<button class='click-to-edit' data-id ="+editList._id+">Edit Entry</button>" +
      "<button class='click-to-delete' data-id ="+editList._id+">Delete Entry</button>" +
      "<p>Make: "+editList.make+"</p>" +
      "<p>Model: "+editList.model+"</p>" +
      "<p>type: "+editList.type+"</p>" +
      "</li>"
    editLine.append(editTemplate, edit)
  }
*/
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
       console.log("clickToDelteID", clickToDeleteId)
       removeLi.remove()

        }
     })
 })

/*
        $.ajax({
          url: "/edit/" +$(this).attr(),
          success: function(result){
            editItem = JSON.parse(result)
            for (i = 0; i < editItem.length; i++) {
                 editItemNow = editItem[i]
               }
             }
*/

/*
       $.ajax({
         url: "/fireplaceData",
         success: function(result){
           editData = JSON.parse(result)
           for (i = 0; i < editData.length; i++) {
                editList = editData[i]
                var tbody = $('<a href=/edit/'+editList._id+'/>').appendTo($("<table class='table'/>", {
                    "cellspacing" : "0",
                    "cellpadding" : "0",
                    "border" : "0",
                    "width" : "100%"

                }).appendTo("body"))

                $.each(editList, function(key, val) {
                  return tbody
                  //.append($("<tr/>"))
                  .append($("<td/>").html(val))
                })
              }
            }
          })
        })
*/

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
