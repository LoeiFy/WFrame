function(el, ev, fn) {

    ev = ev.split(' ');

    for (var i = 0; i < ev.length; i ++) {
        
        el.addEventListener(ev[i], fn, false)

    }

};
