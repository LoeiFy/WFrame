
var $ = @@include('base.js')

document.addEventListener('DOMContentLoaded', function() {

var debug = @@include('debug.js')

    debug('h1')

    $('.app').on('touchstart mouseover', function() {
        this.classList.add('active')
    })
    
    $('.app').on('touchmove touchend touchcancle mouseout', function() {
        this.classList.remove('active')
    })

})
