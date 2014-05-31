API.touch = function(tag) {
    $(tag).on({
        'touchstart mouseover': function() {
            $(tag).removeClass('active')
            $(this).addClass('active')
        },
        'touchmove touchend touchcancle mouseout': function() {
            $(this).removeClass('active')
        }
    })
};
