// var $ = ...
@@include('base.js', {"def": "$"})

// var debug = ...
@@include('debug.js', {"def": "debug"})

document.addEventListener('DOMContentLoaded', function() {

    debug('h1')

    $('.app').on('touchstart mouseover', function() {
        this.classList.add('active')
    })
    
    $('.app').on('touchmove touchend touchcancle mouseout', function() {
        this.classList.remove('active')
    })

})
