var $ = require('jquery')
var request = require('superagent')

function entryHideShow(){
      $("#entry-jayline").hide()
      $("#entry-fisher" ).hide()
      $("#entry-gazco" ).hide()
      $("#entry-jetmaster" ).hide()
      $("#entry-escea" ).hide()
      $("#entry-living-flame" ).hide()
      $("#entry-bosca" ).hide()
      $("#entry-pyroclassic" ).hide()
      $("#entry-metro" ).hide()
      $("#entry-firenzo" ).hide()
      $("#entry-woodsman" ).hide()
      $("#entry-quadra-fire" ).hide()
      $("#entry-esse" ).hide()
      $("#entry-yunca" ).hide()
      $("#entry-ethos" ).hide()
      $("#entry-warmington" ).hide()
      $("#entry-quadrafire" ).hide()
      $("#entry-kent" ).hide()
      $("#entry-stovax" ).hide()
      $("#entry-mitsubishi" ).hide()
      $("#entry-beef-eater" ).hide()
      $("#entry-ortal" ).hide()
      $("#entry-heat-glo" ).hide()
      $("#entry-trendz" ).hide()
      $("#entry-bromic" ).hide()
      $("#entry-realfires" ).hide()
      $("#entry-the-fireplace" ).hide()
      $("#entry-cast-iron-chiminea").hide()
      $("#entry-the-bio-flame").hide()
      $("#entry-fogata").hide()
    }

    function entryGasShow (){
     $("#entry-make").show()
     $("#entry-heat-glo" ).show()
     $("#entry-gazco" ).show()
     $("#entry-escea" ).show()
     $("#entry-living-flame" ).show()
     $("#entry-warmington" ).show()
     $("#entry-realfires" ).show()
     $("#entry-ortal" ).show()
     $("#entry-blank").hide()
   }

   function entryWoodShow(){
     $("#entry-make").show()
     $("#entry-jayline").show()
     $("#entry-gazco").show()
     $("#entry-jetmaster").show()
     $("#entry-escea").show()
     $("#entry-bosca").show()
     $("#entry-pyroclassic").show()
     $("#entry-metro").show()
     $("#entry-firenzo").show()
     $("#entry-woodsman").show()
     $("#entry-esse").show()
     $("#entry-yunca").show()
     $("#entry-ethos").show()
     $("#entry-warmington").show()
     $("#entry-quadrafire").show()
     $("#entry-kent").show()
     $("#entry-stovax").show()
     $("#entry-mitsubishi").show()
     $("#entry-trendz").show()
     $("#entry-cast-iron-chiminea").show()
     $("#entry-fogata").show()
     $("#entry-blank").hide()
   }

   function entryElectricShow (){
     $("#entry-make").show()
     $("#entry-gazco").show()
     $("#entry-esse").show()
     $("#entry-bromic").show()
     $("#entry-blank").hide()
   }

   function entryMultifuelShow(){
     $("#entry-make").show()
     $("#entry-fisher").show()
     $("#entry-firenzo").show()
     $("#entry-esse").show()
     $("#entry-yunca").show()
     $("#entry-blank").hide()
   }

   function entryBiofuelShow(){
     $("#entry-make").show()
     $("#entry-the-bio-flame").show()
     $("#entry-blank").hide()
   }

   function entryCookerShow (){
    $("#entry-make").show()
     $("#entry-fisher").show()
     $("#entry-firenzo").show()
     $("#entry-esse").show()
     $("#entry-yunca").show()
     $("#entry-blank").hide()
   }

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


    function gasShow (){
      $("#make").show()
      $("#heat-glo" ).show()
      $("#gazco" ).show()
      $("#escea" ).show()
      $("#living-flame" ).show()
      $("#warmington" ).show()
      $("#realfires" ).show()
      $("#ortal" ).show()
      $("#blank").hide()
    }

    function woodShow(){
      $("#make").show()
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
    }

    function electricShow (){
      $("#make").show()
      $("#gazco").show()
      $("#esse").show()
      $("#bromic").show()
      $("#blank").hide()
    }

    function multifuelShow(){
      $("#make").show()
      $("#fisher").show()
      $("#firenzo").show()
      $("#esse").show()
      $("#yunca").show()
      $("#blank").hide()
    }

    function biofuelShow(){
      $("#make").show()
      $("#the-bio-flame").show()
      $("#blank").hide()
    }

    function cookerShow (){
     $("#make").show()
      $("#fisher").show()
      $("#firenzo").show()
      $("#esse").show()
      $("#yunca").show()
      $("#blank").hide()
    }

    function reset(){
      $(".border-air-wetback").removeClass("selected")
      $(".border-fireplace").removeClass("selected")
      $(".border-make").removeClass("selected")
      $(".colour-price").removeClass("selected")
      $("#colourPrice-extra").empty()
      $(".border-colour").removeClass("selected")
      $(".border-style-hearth").removeClass("selected")
      $(".border-make-hearth-display").removeClass("selected")
      $("#model-dropdown-hearth").empty()
      $(".hearth-tile-border-colour").removeClass("selected")
      $("#hearth-tile-extra").empty()
      $("#dropdown-selector").hide()
    }


    function dataFlueButton(){
      $("#quotation").hide()
      $("#fireplace").hide()
      $("#air").hide()
      $("#dropdown-selector").hide()
      dataFlueChange()
    }

    function dataFlueChange(){
      $("#flue-inner-options").hide()
      $("#flue-outer-options").hide()
      $("#flue-liner-options").hide()
      $("#flue-cowel-options").hide()
      $("#flue-guides-options").hide()
      $("#flue-spider-options").hide()
    }



    function airTypeShow(){
      $("#cleanAir-dropdown").show()
      $("#cleanAirWB-dropdown").show()
      $("#rural-dropdown").show()
      $("#ruralWB-dropdown").show()
    }

    function hearthTypeShow(){
      $("#wallHearth-dropdown").show()
      $("#cornerHearth-dropdown").show()
    }

    function hearthModelShow(){
      $('#model-dropdown-hearth').show()
    }

    function wetbackTypeShow(){
      $("#ruralWB-dropdown").show()
      $("#cleanAirWB-dropdown").show()
    }



    module.exports = {
        entryHideShow:entryHideShow,
        entryGasShow:entryGasShow,
        entryWoodShow:entryWoodShow,
        entryElectricShow:entryElectricShow,
        entryMultifuelShow:entryMultifuelShow,
        entryBiofuelShow:entryBiofuelShow,
        entryCookerShow:entryCookerShow,
        hideShow:hideShow,
        gasShow:gasShow,
        woodShow:woodShow,
        electricShow:electricShow,
        multifuelShow:multifuelShow,
        biofuelShow:biofuelShow,
        cookerShow:cookerShow,
        reset:reset,
        airTypeShow:airTypeShow,
        hearthTypeShow:hearthTypeShow,
        wetbackTypeShow:wetbackTypeShow,
        dataFlueButton:dataFlueButton,
        dataFlueChange:dataFlueChange,
        hearthModelShow:hearthModelShow
    }
