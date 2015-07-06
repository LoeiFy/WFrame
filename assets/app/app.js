
var $ = @@include('base.js')

$.ready(function() {

    $('.app')
    .on('touchstart mouseover', function() {
        $(this).addClass('active')
    })
    .on('touchmove touchend touchcancle mouseout', function() {
        $(this).removeClass('active')
    })

})
