/**
 * Created by zlbbq on 14-12-4.
 */

define(function (require, exports, module) {
        module.exports.init = function (element, callback) {
              //  require('plupload');
                var jcrop_api,
                        boundx,
                        boundy,

                // Grab some information about the preview pane
                        $preview = $('#preview-pane'),
                        $pcnt = $('#preview-pane .preview-container'),
                        $pimg = $('#preview-pane .preview-container img'),

                        xsize = $pcnt.width(),
                        ysize = $pcnt.height();
                require('validation');


                $('#startTime').datepicker({format:'yyyy-mm-dd',autoclose:true,todayBtn:true,appendText:''});
                $('#startTime').bind('change',function(e)
                {
                        if($('#startTime').val())
                        {
                                //        $('#endTime').datepicker({format:'yyyy-mm-dd',autoclose:true,minDate:'2016-10-10'});
                        }
                        $('#startTime').valid();
                });
                $('#endTime').datepicker({format:'yyyy-mm-dd',autoclose:true,maxDate:'2016-10-10'});
                $('#endTime').bind('change',function()
                {
                        $('#endTime').valid();
                });
                $('#ad-form').validateEx();
                defineModule({

                        initJcrop:function() {
                                if(jcrop_api)  jcrop_api.destroy();
                                $('#target').Jcrop({
                                        onChange: $module.updatePreview,
                                        onSelect: $module.updatePreview,
                                        aspectRatio: xsize / ysize,
                                        allowSelect:true,
                                        touchSupport:true	,
                                        shade:true
                                        //     boxWidth:1000,
                                        //    boxHeight:500
                                },function(){
                                        // Use the API to get the real image size
                                        var bounds = this.getBounds();
                                        boundx = bounds[0];
                                        boundy = bounds[1];
                                        // Store the API in the jcrop_api variable
                                        jcrop_api = this;
                                        $preview.appendTo(jcrop_api.ui.holder);
                                });
                        },
                        updatePreview:function(c)
                        {
                                if (parseInt(c.w) > 0)
                                {
                                        var rx = xsize / c.w;
                                        var ry = ysize / c.h;

                                        $pimg.css({
                                                width: Math.round(rx * boundx) + 'px',
                                                height: Math.round(ry * boundy) + 'px',
                                                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                                                marginTop: '-' + Math.round(ry * c.y) + 'px'
                                        });
                                        var imageInfo=c;
                                }
                        }


                });


                callback();
        };
});
