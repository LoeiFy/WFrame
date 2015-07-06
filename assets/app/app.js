
var $ = @@include('base.js')

document.addEventListener('DOMContentLoaded', function() {

    $('.app').on('touchstart mouseover', function() {
        this.classList.add('active')
    })
    
    $('.app').on('touchmove touchend touchcancle mouseout', function() {
        this.classList.remove('active')
    })

})
