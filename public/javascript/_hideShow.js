var $ = require('jquery')
var request = require('superagent')


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

    function backToQuote(){
      $("#quotation").show()
      $("#fireplace").show()
      $("#air").show()
      $("#make").show()
      $("#back-to-quote").hide()
    }

    function editQuoteButton(){
      $("#quotation").hide()
      $("#fireplace").hide()
      $("#quote-select").hide()
      $("#make").hide()
      $("#edit-quotation-data").show()
      $("#quotation-submit-button").hide()

    }

    function dataSalesmanButton(){
      $("#quotation").hide()
      $("#fireplace").hide()
      $("#quote-select").hide()
      $("#make").hide()
      $("#edit-salemsan-data").show()
      $("#quotation-submit-button").hide()
      $("#edit-salemsan-data").show()

    }

    function clickToEdit(){
      $('#edit-data').hide()
      $("#fireplace-data-entry").show()
      $("#updated-data-submit").show()
      $("#fireplace").show()
      $("#air").show()
      $("#data-submit").hide()
      $("#quotation-button").hide()
      $("#edit-data-button").hide()
    }

    function dataEditButton(){
      $("#fireplace-data-entry").hide()
      $("#fireplace").hide()
      $("#air").hide()
      $("#make").hide()

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

    function wetbackTypeShow(){
      $("#ruralWB-dropdown").show()
      $("#cleanAirWB-dropdown").show()
    }


    module.exports = {
      hideShow:hideShow,
      gasShow:gasShow,
      woodShow:woodShow,
      electricShow:electricShow,
      multifuelShow:multifuelShow,
      biofuelShow:biofuelShow,
      cookerShow:cookerShow,
      backToQuote:backToQuote,
      editQuoteButton:editQuoteButton,
      dataSalesmanButton:dataSalesmanButton, 
      clickToEdit:clickToEdit,
      dataEditButton:dataEditButton,
      airTypeShow:airTypeShow,
      hearthTypeShow:hearthTypeShow,
      wetbackTypeShow:wetbackTypeShow,
    }
