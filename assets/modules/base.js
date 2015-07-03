function(_this) {

    var base = function() {
        this.elements = []
    }

    // get dom
    base.prototype.dom = function(s) {
        switch(s.charAt(0)){
            case '#': 
                this.elements.push(document.getElementById(s.substring(1))) 
                return this;
            break;
            case '.': 
                var all = document.getElementsByClassName(s.substring(1))
                for (var i = 0; i < all.length; i ++) {
                    this.elements.push(all[i])
                }
                return this;
            break;
            default:
                var tags = document.getElementsByTagName(s)
                for (var i = 0; i < tags.length; i ++) {
                    this.elements.push(tags[i])
                }
                return this;
            break;
        }
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
            fn
        } else {
            document.addEventListener('DOMContentLoaded', fn, false)
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

}
