
$(document).ready(function(){
  //loop through all .quy-item divs and calculate teh tola items from teh data properties
  var total_items = 0;
  $('.qty-item').each(function(){
    var qty = $(this).data('qty');
    var items = $(this).data('packof');
    var total = qty * items;
    total_items += total;
  });
  // if the total-items is greater than 180 then alert 'Too much'
  if(total_items > 180){
    $('#checkout').attr('disabled', 'disabled');
    $('#limit-notice').show();
  } else {
    $('#checkout').removeAttr('disabled');
    $('#limit-notice').hide();
  }
});
