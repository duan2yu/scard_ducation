/**
 * Created by zlbbq on 14-12-4.
 */

define(function (require, exports, module) {
    module.exports.init = function (element, callback) {
            function getOs()
            {
                    var OsObject = "";
                    if(navigator.userAgent.indexOf("MSIE")>0) {
                            return "MSIE";
                    }
                    if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
                            return "Firefox";
                    }
                    if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
                            return "Safari";
                    }
                    if(isCamino=navigator.userAgent.indexOf("Camino")>0){
                            return "Camino";
                    }
                    if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
                            return "Gecko";
                    }

            }
            require('qiniu');
                  var image_key=null;
                   var ui=require('/js/modules/qiniu/demo/js/ui.js');

            var imageInfo=null;
          //  $("#target").addClass('carousel-inner img-responsive img-rounded');
            var jsonAPI=require('json-api');

            // Create variables (in this scope) to hold the API and image size
            var jcrop_api,
                    boundx,
                    boundy,

            // Grab some information about the preview pane
                    $preview = $('#preview-pane'),
                    $pcnt = $('#preview-pane .preview-container'),
                    $pimg = $('#preview-pane .preview-container img'),

                    xsize = $pcnt.width(),
                    ysize = $pcnt.height();

        var mustache=require('mustache');
        var dfmt = require('dateformat');
        var formUtil = require('form-util');
        require('validation');
            var functionality ='CREATE';
        var id=getQueryParam('id');
            var  curPage= getQueryParam('page')||1;
            if(id) functionality ='UPDATE';

        $('#starttime').datepicker({format:'yyyy-mm-dd',autoclose:true,todayBtn:true,appendText:''});
        $('#starttime').bind('change',function(e)
        {
            if($('#starttime').val())
            {
        //        $('#endTime').datepicker({format:'yyyy-mm-dd',autoclose:true,minDate:'2016-10-10'});
            }
            $('#starttime').valid();
        });
        $('#endtime').datepicker({format:'yyyy-mm-dd',autoclose:true});

       $('#endtime').bind('change',function()
        {
            $('#endtime').valid();
        });
            $.validator.addMethod("timeRangeEnd", function (value, element, param) {
                    var b=true;
                            var startTime=$("#starttime").val();
                            if(startTime!=""&&value<startTime)b=false;
                            return this.optional(element) || b;
            });

            $.validator.addMethod("timeRangeStart", function (value, element, param) {
                    var b=true;
                    var endtime=$("#endtime").val();
                    if(endtime!=""&&value>endtime)b=false;
                    return this.optional(element) || b;
            });

            if(getOs()=="Safari")
            {
                    $('#ad-form').validateEx({
                            rules: {
                                    title:
                                    {
                                            maxlength:100
                                    },
                                    url: {
                                            url:'aa'
                                    }
                            }});
            }
            else{
                    $('#ad-form').validateEx({
                            rules: {
                                    title:
                                    {
                                            maxlength:100
                                    },
                                    url: {
                                            url:'aa'
                                    }
                                             ,
                                     endtime:
                                     {
                                     required:true,
                                     timeRangeEnd:'aa'
                                     },
                                     starttime:
                                     {
                                     required:true,
                                     timeRangeStart:'vv'
                                     }
                            },
                            messages: {
                                    endtime:{timeRangeEnd:$.validator.format("结束时间不能小于开始时间"),required:$.validator.format("请输入截至时间")},
                                    starttime:{timeRangeStart:$.validator.format("开始时间不能大于结束时间"),required:$.validator.format("请输入截至时间")}

                            }});
            }




        defineModule({
                cancle:function()
                {
                        window.redirect('#ad_list',{page:curPage});
                }
                ,
                initJcrop:function(cb) {
                        if(jcrop_api)  jcrop_api.destroy();
                        $('#target').Jcrop({
                                onChange: $module.updatePreview,
                                onSelect: $module.updatePreview,
                                aspectRatio: xsize / ysize,
                                allowSelect:false,
                                touchSupport:true,
                                shade:true,
                                minSize:[200,150]
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
                                cb&&cb(jcrop_api);
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
                                 imageInfo=c;
                        }
                },
            onDestroy:function()
            {
            },
            saveOrUpdate:function(){

                    if($('#ad-form').valid())
                {
                        if($("#starttime").val()=="")
                        {
                                $spa.alert("错误","生效时间不能为空",function()
                                {
                                        $("#starttime").focus();
                                });
                                return;
                        }
                        if($("#endtime").val()=="")
                        {
                                $spa.alert("错误","结束时间不能为空",function()
                                {
                                        $("#endtime").focus();
                                });
                                return;
                        }
                        if($("#starttime").val()>$("#endtime").val())
                        {
                                $spa.alert("错误","开始时间不能大于结束时间",function()
                                {
                                        $("#endtime").focus();
                                });
                                return;
                        }
                        $("#test").addClass('collapse');
                    //    $('#submitBtn').button('loading');
                        var param = formUtil.argsFrom('#ad-form');
                        var previewSrc=$('#preview').attr("src");
                        if(previewSrc!=""&&(functionality=='CREATE'||(functionality=='UPDATE'&&image_key!=null)))
                        {
                                var fopArr = [{
                                        fop: 'imageMogr2', // 指定imageMogr2操作
                                        'auto-orient': true,  // 此参数同imageMogr2函数的参数，下同。
                                        strip: true,
                                        crop: '!'+imageInfo.w+'x'+imageInfo.h+'a'+imageInfo.x+'a'+imageInfo.y,
                                        quality:100,
                                        rotate: 0,
                                        format: 'png'
                                },
                                        {
                                                fop: 'imageView2',  // 指定imageView2操作
                                                mode: 2,  // 此参数同imageView2函数的参数，下同
                                                w: 200,
                                                //   h: 100,
                                                q: 100,
                                                format: 'png'
                                        }];
                                var imgLink = Qiniu.pipeline(fopArr, image_key);
                                param.attachment=imgLink;

                        }

                        if(previewSrc=="")
                        {
                                param.attachment= $("#lastImage img").attr("src");
                        }
                    if(functionality=='CREATE')//新增
                    {
                            param.starttime=param.starttime+' 00:00:00';
                            param.endtime=param.endtime+' 23:59:59';
                        jsonAPI.call('ducationAd','C',param, function(err, result){
                            if(jsonAPI.handleErrors(err, result)) {
                                $spa.alert('操作成功', '新增广告成功!',function(){window.redirect('#ad_list',{page:curPage});});
                            }
                        });
                    }
                    else if(functionality=='UPDATE')//修改
                    {
                        param.id=id;
                        jsonAPI.call('ducationAd','U' ,param, function(err, result){
                            if(jsonAPI.handleErrors(err, result)) {
                                $spa.alert('操作成功', '修改广告成功!',function(){ window.redirect('#ad_list',{page:curPage});});
                            }
                        });
                    }
                }
                else {
                    $('#errorAlert').show();
                    $('#errorAlert').fadeOut({
                        duration : 3000
                    });
                }
            },

                initUpload:function(token,domain)
                {
                        var uploader = Qiniu.uploader({
                                runtimes: 'html5,flash,html4',
                                browse_button: 'pickfiles',
                                container: 'container',
                                drop_element: 'container',
                                max_file_size: '100mb',
                                flash_swf_url: 'js/plupload/Moxie.swf',
                                dragdrop: true,
                                chunk_size: '4mb',
                                //    uptoken_url: 'http://localhost:19110/uptoken',
                                //     domain: $('#domain').val(),
                                uptoken:token,
                                domain:domain,
                                auto_start: true,
                                max_file_count: 0,

                                chunk_size: '1mb',
                                unique_names:true,
                                 save_key: false,
                                filters : {
                                        // Maximum file size
                                        max_file_size : '100mb',
                                        // Specify what files to browse for
                                        mime_types: [
                                                {title : "Image files", extensions : "jpg,gif,png"}
                                        ]
                                },
                                init: {
                                        'BeforeUpload': function(up, file) {
                                                // 每个文件上传前,处理相关的事情
                                              //  file.name=new Date().getMilliseconds+""
                                               // debugger;
                                        },
                                        'FileUploaded': function(up, file, info) {
                                                $("#lastImage").hide();
                                                var info=$.parseJSON(info);
                                                image_key=info.key;
                                                var imageInfoObj = Qiniu.imageInfo(image_key);
                                                var maxwidth=imageInfoObj.width-20;
                                                var domain = up.getOption('domain');
                                                var link = domain + image_key;
                                                $('#attachment').val(link);
                                                $('#attachment').valid();
                                                if(maxwidth>800)
                                                {
                                                        alert('上传的图片过大,请重新选择!');
                                                        return;
                                                }
                                                if(maxwidth<200)
                                                {
                                                        $("#lastImage").show();
                                                        $("#lastImage img").attr("src",link);
                                                        $('#target').attr("src", "");
                                                        $('#preview').attr("src", "");
                                                        $("#test").addClass('collapse');
                                                }
                                                else {
                                                        $('#target').attr("src", link);
                                                        $('#preview').attr("src", link);
                                                        if (!jcrop_api)
                                                                $module.initJcrop(function (jcrop_api) {
                                                                        jcrop_api.animateTo([20, 20, maxwidth, (maxwidth / 4) * 3])
                                                                });
                                                        else
                                                                jcrop_api.setImage(link, function (api) {
                                                                        var bounds = api.getBounds();
                                                                        boundx = bounds[0];
                                                                        boundy = bounds[1];
                                                                        // Store the API in the jcrop_api variable
                                                                        jcrop_api.animateTo([20, 20, maxwidth, (maxwidth / 4) * 3], function () {
                                                                        });
                                                                });
                                                        $("#test").removeClass('collapse');
                                                }
                                        },
                                        'Error': function(up, err, errTip) {
                                                debugger;
                                                $spa.alert('错误','上传文件出现一个错误,请联系管理员');
                                        }
                                },
                                'Key': function(up, file) {
                                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                                        // 该配置必须要在 unique_names: false , save_key: false 时才生效
                                        var key = "";
                                        // do something with key here
                                        return new Date().getMilliseconds+"";
                                }
                        });
                }

        });

            jsonAPI.call('qiniu','upToken',{},function(err,result)
            {
                    if(result.code==0) {
                            $module.initUpload(result.result.uptoken,result.result.domain);
                            if(id)
                            {
                                    jsonAPI.call('ducationAd','R', {id : id}, function(err, result){
                                            if(jsonAPI.handleErrors(err, result)) {
                                                    result.result.starttime=dfmt.host2Page(result.result.starttime,'yyyy-MM-dd');
                                                    result.result.endtime=dfmt.host2Page(result.result.endtime,'yyyy-MM-dd');
                                                    var testDate=Date.parse('2015-08-01', 'yyyy-MM-dd');
                                                 //   $('#starttime').datepicker({format:'yyyy-mm-dd',autoclose:true,todayBtn:true,appendText:''});
                                                    $('#starttime').datepicker({ defaultDate: testDate});
                              //                      alert(testDate);
                                                    //   $('#starttime').val(testDate);
                                                  //  $('#endtime').val(testDate);
                                              //      $("#starttime").data('datetimepicker').setDate(testDate);
                                             //       $('#starttime').setDate('2015-08-01');
                                                   formUtil.autoFill("#ad-form",result.result);
                                                    $("#lastImage").show();
                                                    $("#lastImage img").attr("src",result.result.attachment);
                                            }
                                    });
                            }
                    }
                    else{
                            $spa.alert('获取TOKEN失败','请确认是否开启TOKEN服务');
                    }
            })
            var html=$spa.getNavigatorHTML(['首页:#home','发广告:#ad_add']);
            $("#nav").html(html);
        callback();
    };
});
