import 'bootstrap';
import './sidebar';


$(window).on("load", function() {
    setTimeout(function() {
        $(".page-loader").fadeOut()
    }, 500)
});

$(document).ready(function() {
    // Initialize the vertical navigation
    $().sidebar();
});