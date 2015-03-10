/*
 * touch event
 * 
 * @param   {string}    tags     touch class    
 * 
 */

Util.touch = function(tags) {

    tags = document.getElementsByClassName(tags);

    for (var i = 0; i < tags.length; i ++) {

        on(tags[i], 'touchstart mouseover', function() {

            this.classList.add('active')

        })

        on(tags[i], 'touchmove touchend touchcancle mouseout', function() {
        
            this.classList.remove('active')

        })

    }

    function on(el, es, fn) {

        es = es.split(' ');

        for (var k = 0; k < es.length; k ++) {

            el.addEventListener(es[k], fn, false)

        }

    }

}
