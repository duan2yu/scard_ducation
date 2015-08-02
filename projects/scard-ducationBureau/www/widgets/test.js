define(function(require, exports, module){
    exports.init = function(element, cb) {
     //   alert('js');
       // alert($('#parent').find('.childNode').length);
        $('#fileupload').fileupload({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
//        url: 'server/php/'
        });

        cb && cb();
    };
});