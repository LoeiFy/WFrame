/*
 * touch event
 * 
 * @param   {string}    tag     touch class    
 * 
 */

Util.touch = function(tags) {

    tags = document.getElementsByClassName(tags);

    for (var i = 0; i < tags.length; i ++) {

        on(tags[i], 'touchstart mouseover', tgClass(tags[i]))

        on(tags[i], 'touchmove touchend touchcancle mouseout', function() {

            this.classList.remove('active')

        })

    }

    function tgClass(tag) {

        for (var i = 0; i < tag.length; i ++) {

            tags[i].classList.remove('active')

        }

        tag.classList.add('active')

    }

    function on(el, es, fn) {

        es = es.split(' ');

        for (var i = 0; i < es.length; i ++) {

            el.addEventListener(es[i], fn, false)

        }

    }

}
