
var $ = require('jquery')
var request = require('superagent')

var fireplaceType
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

 $(document).ready(function(){
     $("#data-entry").hide()



   $("#salesman-1").click(function(){
          $("#salesman-1").addClass("selected");
          $("#salesman-2").removeClass("selected");
          $("#salesman-3").removeClass("selected");
      });

    $("#salesman-2").click(function(){
           $("#salesman-2").addClass("selected");
           $("#salesman-1").removeClass("selected");
           $("#salesman-3").removeClass("selected");
       });

   $("#salesman-3").click(function(){
          $("#salesman-3").addClass("selected");
          $("#salesman-2").removeClass("selected");
          $("#salesman-1").removeClass("selected");
      });

    $("#clean-air").click(function(){
           $("#clean-air").addClass("selected");
           $("#rural").removeClass("selected");
       });

   $("#rural").click(function(){
          $("#rural").addClass("selected");
          $("#clean-air").removeClass("selected");
      });

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

    $("#gas").click(function(){
          hideShow()
          fireplaceType = ""
           $("#gas").addClass("selected");
           $("#wood").removeClass("selected");
           $("#electric").removeClass("selected");
           $("#multi-fuel").removeClass("selected");
           $("#biofuel").removeClass("selected");
           $("#cookers").removeClass("selected");
           $("#heat-glo" ).show()
           $("#gazco" ).show()
           $("#escea" ).show()
           $("#living-flame" ).show()
           $("#warmington" ).show()
           $("#realfires" ).show()
           $("#ortal" ).show()
           $("#blank").hide()

           fireplaceType = $("#gas").text()
           console.log('fireplaceType', fireplaceType)
       });

   $("#wood").click(function(){
   fireplaceType = ""
         hideShow()
          $("#wood").addClass("selected");
          $("#gas").removeClass("selected");
          $("#electric").removeClass("selected");
          $("#multi-fuel").removeClass("selected");
          $("#biofuel").removeClass("selected");
          $("#cookers").removeClass("selected");


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

          fireplaceType = $("#wood").text();
          console.log('fireplaceType', fireplaceType)
      });

  $("#electric").click(function(){
    fireplaceType = ""
        hideShow()
         $("#electric").addClass("selected");
         $("#gas").removeClass("selected");
         $("#wood").removeClass("selected");
         $("#multi-fuel").removeClass("selected");
         $("#biofuel").removeClass("selected");
         $("#cookers").removeClass("selected");

        $("#gazco").show()
        $("#esse").show()
        $("#bromic").show()
        $("#blank").hide()

        fireplaceType = $("#electric").text();
        console.log('fireplaceType', fireplaceType)
     });

 $("#multi-fuel").click(function(){
       hideShow()
       fireplaceType = ""
        $("#multi-fuel").addClass("selected");
        $("#gas").removeClass("selected");
        $("#electric").removeClass("selected");
        $("#wood").removeClass("selected");
        $("#biofuel").removeClass("selected");
        $("#cookers").removeClass("selected");

        $("#fisher").show()
        $("#firenzo").show()
        $("#esse").show()
        $("#yunca").show()
        $("#blank").hide()

        fireplaceType = $("#multi-fuel").text();
        console.log('fireplaceType', fireplaceType)

    });

$("#biofuel").click(function(){
      hideShow()
       $("#biofuel").addClass("selected");
       $("#gas").removeClass("selected");
       $("#electric").removeClass("selected");
       $("#multi-fuel").removeClass("selected");
       $("#wood").removeClass("selected");
       $("#cookers").removeClass("selected");
       $("#the-bio-flame").show()
       $("#blank").hide()

       fireplaceType = $("#biofuel").text();
   });

$("#cookers").click(function(){
      hideShow()
      $("#cookers").addClass("selected");
      $("#gas").removeClass("selected");
      $("#electric").removeClass("selected");
      $("#multi-fuel").removeClass("selected");
      $("#biofuel").removeClass("selected");
      $("#wood").removeClass("selected");
      $("#esse").show()
      $("#trendz").show()
      $("#cast-iron-chiminea").show()
      $("#blank").hide()

      fireplaceType = $("#cookers").text();
  });



   $("#data-entry-button").click(function() {
     $("#quotation").hide()
     $("#data-entry").show()
     $("#free-standing-make").hide()
     $("#inbuilt-entry").hide()

   });

   $("#quotation-button").click(function() {
     $("#quotation").show()
     $("#data-entry").hide()
   });




   $('#data-submit').click(function(e){
     e.preventDefault()
     make = $("#input-make").val()
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
                  type:fireplaceType,
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

   })


   $('#quotation-submit').click(function(e){
     e.preventDefault()
     customerName = $("#customer-name").val()
     quoteDate = $("date").val()
     email = $("#customer-email").val()
     phone = $("#customer-phone").val()
     console.log("customerName", customerName)

        $.ajax({
          method: "POST",
          url: "/quotation",
          data: { customerName: customerName,
                  quoteDate: quoteDate,
                  email: email,
                  phone:phone
                 }
               })

  })
})
