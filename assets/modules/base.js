function(_this) {

    var base = function() {
        this.elements = []
    }

    // get dom
    base.prototype.dom = function(s) {
        switch(s.charAt(0)){
            case '#': 
                this.elements.push(document.getElementById(s.substring(1))) 
            break;
            case '.': 
                var all = document.getElementsByClassName(s.substring(1))
                for (var i = 0; i < all.length; i ++) {
                    this.elements.push(all[i])
                }
            break;
            default:
                var tags = document.getElementsByTagName(s)
                for (var j = 0; j < tags.length; j ++) {
                    this.elements.push(tags[j])
                }
        }
        return this;
    }

    // events
    base.prototype.on = function(es, fn) {
        es = es.split(' ');
        for (var i = 0; i < es.length; i ++) {
            for (var j = 0; j < this.elements.length; j ++) {
                this.elements[j].addEventListener(es[i], fn, false)
            }
        }
    }

    // dom ready
    base.prototype.ready = function(fn) {
        if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
            fn()
        } else {
            document.addEventListener('DOMContentLoaded', function() { fn() }, false)
        }
    }

    // class
    base.prototype.addClass = function(s) {
        for (var i = 0; i < this.elements.length; i ++) {
            this.elements[i].classList.add(s)
        }
        return this
    }

    base.prototype.removeClass = function(s) {
        for (var i = 0; i < this.elements.length; i ++) {
            this.elements[i].classList.remove(s)
        }
        return this
    }

    return new base().dom(_this)

};
