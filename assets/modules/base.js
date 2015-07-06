function(_this) {

    function base() {
        this.elements = [];

        this.dom = function(s) {
        if (typeof(s) === 'string') {
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
            return this
        }

        if (typeof(s) === 'object') {
            return s
        }
        if (s === null) {
            return this
        }
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

    return new base().dom(_this)

};
