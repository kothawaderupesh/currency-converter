'use strict';

let convertButton = document.getElementById('convert');
let inputValue = document.getElementById('amount');
inputValue.onkeypress = function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

convertButton.onclick = function(element) {

  var currVal = $("#conversionRate");
  currVal.val("");

  var currFrSelect = $("#fromCurrency");
  var fr = currFrSelect.val();

  var currToSelect = $("#toCurrency");
  var to = currToSelect.val();


  var currId = fr + "_" + to; 
  var protocol = window.location.protocol.replace(/:/g,'');

  currVal.attr("placeholder", "Converting....");
  $.getJSON("http://free.currencyconverterapi.com/api/v5/convert?q=" + currId + "&compact=y",
    function(data){
      try {
        console.log(document.getElementById("amount").value);
        console.log(currId);
       var currFrVal = parseFloat(document.getElementById("amount").value);       
      //  currVal.val(numeral(currFrVal * data[currId].val).format("0,0.00[0]"));
       currVal.val(currFrVal * data[currId].val);

     } catch (e) {
      alert("Please select From/To Country to convert!");
    }
  });

}

let dropdownTo = $('#toCurrency');
let dropdownFrom = $('#fromCurrency');

dropdownTo.empty();
dropdownFrom.empty();

dropdownFrom.append('<option selected="true" disabled>From</option>');
dropdownTo.append('<option selected="true" disabled>To</option>');
dropdownFrom.prop('selectedIndex', 0);
dropdownTo.prop('selectedIndex', 0);


$.getJSON('countries.json', function (data) {
  $.each(data, function (key, entry) {
    dropdownFrom.append($('<option></option>').attr('value', entry.currency_code).text(entry.country));
    dropdownTo.append($('<option></option>').attr('value', entry.currency_code).text(entry.country));
  })
});
