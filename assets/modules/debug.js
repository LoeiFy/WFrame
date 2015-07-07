var @@def = function(s) {

    var i = 0;

    $(s).on('click', function() {
        i ++;

        if (i == 5) {
            i = 0;

            var ip = prompt('ip', '');
            if (!ip) return;

            var e = document.createElement('script');
            e.setAttribute('src', 'http://'+ ip +':8080/target/target-script-min.js')
            document.getElementsByTagName('body')[0].appendChild(e)
        }
    })

};
