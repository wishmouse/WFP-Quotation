var $ = require('jquery')
var request = require('superagent')

function dataReturnFunction(){
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

}

module.exports = {
      dataReturnFunction:dataReturnFunction,

  }
