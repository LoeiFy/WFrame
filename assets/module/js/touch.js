/*
 * touch event
 * 
 * @param   {string}    tag     touch class    
 * 
 */

Util.touch = function(tag) {

    tag = document.getElementsByClassName(tag);

    for (var i = 0; i < tag.length; i ++) {

        on(tag[i], 'touchstart mouseover', function() {

            for (var j = 0; j < tag.length; j ++) {

                tag[j].classList.remove('active')

            }

            this.classList.add('active')

        })

        on(tag[i], 'touchmove touchend touchcancle mouseout', function() {

            this.classList.remove('active')

        })

    }

    function on(el, es, fn) {

        es = es.split(' ');

        for (var i = 0; i < es.length; i ++) {

            el.addEventListener(es[i], fn, false)

        }

    }

}
