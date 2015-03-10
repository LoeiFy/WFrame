var ready = function(callback) {

    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {

        callback()

    } else {

        document.addEventListener('DOMContentLoaded', function(){ callback() }, false)

    }

}

ready(function() {

    Util.touch('app')

    alert('this is a '+ Util.getName() +' test!')

})
