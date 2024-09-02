
$(document).ready(function(){
    $('#fact').click(function() {
        $('#kerala').animate({
            width: "700px",
            height: "700px"
        }, 1000).css('cursor', 'zoom-out'); 
    });
});
$(document).click(function(event) {
    if (!$(event.target).closest('#kerala').length) {
        $('#kerala').animate({
            width: "400px", 
            height: "440px" 
        }, 1000).css('cursor', 'auto'); 
    }
});