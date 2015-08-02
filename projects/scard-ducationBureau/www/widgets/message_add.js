/**
 * Created by zlbbq on 14-12-4.
 */

define(function (require, exports, module) {
    module.exports.init = function (element, callback) {
                  require('qiniu');
                  var image_key=null;
            var ui=require('/js/modules/qiniu/demo/js/ui.js');


            var imageInfo=null;
            var jsonAPI=require('json-api');


        var mustache=require('mustache');
        var dfmt = require('dateformat');
        var formUtil = require('form-util');
        require('validation');
            var functionality ='CREATE';
        var id=getQueryParam('id');
            var currentPage=getQueryParam('page')||1;
        $('#message-form').validateEx();
        defineModule({
                cancle:function()
                {
                        window.redirect('#message_list',{page:currentPage});
                },
                addUploadColumn:function(url)
                {
                     //   var imgs=$("#images").find("tr");
                        var tr='<tr><td> <input type="text"  style="width:500px" value="'+url+'"></td> </tr>';
                        $("#images").append(tr);
                },
                addColumn:function()
                {
                   //     var imgs=$("#images").find("tr");
                        var tr='<tr><td> <input type="text"  style="width:500px"></td> </tr>';
                        $("#images").append(tr);
                  //      this.trggileButtonStatus();
                },
                deleteColumn:function()
                {
                        $("#images tr:last").remove();
                   //     this.trggileButtonStatus();
                },
                trggileButtonStatus:function()
                {
                        var length=$("#images").find("tr").length;
                        if(length==1)
                        {
                                $("#deleteButton").attr('disabled','disabled');
                        }
                        else
                        $("deleteButton").removeAttr('disabled');
                        if(length==6)
                        {
                                $("#addButton").attr('disabled', 'disabled');
                                alert($("#addButton").attr('disabled'));
                        }
                        else
                        $("addButton").removeAttr('disabled');

                },
            onDestroy:function()
            {
            },
            saveOrUpdate:function(states){

                    if($('#message-form').valid())
                {
                    //$('#submitBtn').button('loading');
                        var param = formUtil.argsFrom('#message-form');
                        param.content=$("#contents").val();
                        param.content=$("#contents").val();

                        var array=[];
                        $("#images input").each(function(index,input)
                        {
                                var val=$(this).val();
                                if(val&&val.trim()!="")
                                {
                                        array.push(val);
                                }
                        })
                        param.images=JSON.stringify(array);
                        param.status=states;
                        param.type=$('input:radio:checked').val();
                    if(functionality=='CREATE')//新增
                    {
                        jsonAPI.call('ducationMessage','C',param, function(err, result){
                            if(jsonAPI.handleErrors(err, result)) {
                                $spa.alert('操作成功', '新增发布信息成功!',function(){window.redirect('#message_list',{type:param.type,page:currentPage});});
                            }
                        });
                    }
                    else if(functionality=='UPDATE')//修改
                    {
                            if(param.status==1)
                            delete param.status;
                        param.id=id;
                        jsonAPI.call('ducationMessage','U',param, function(err, result){
                            if(jsonAPI.handleErrors(err, result)) {
                                $spa.alert('操作成功', '修改发布信息成功!',function(){ window.redirect('#message_list',{type:param.type,page:currentPage});});
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

                initUploader:function(token,domain)
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
                                unique_names:true,
                                save_key: false,
                                //    uptoken_url: 'http://localhost:19110/uptoken',
                                //     domain: $('#domain').val(),
                                uptoken:token,
                                domain:domain,
                                auto_start: true,
                                max_file_count: 0,

                                chunk_size: '1mb',
                                filters : {
                                        max_file_size : '100mb',
                                        mime_types: [
                                                {title : "Image files", extensions : "jpg,gif,png"}
                                        ]
                                },
                                init: {
                                        'FileUploaded': function(up, file, info) {
                                                var info=$.parseJSON(info);
                                                image_key=info.key;
                                                var imageInfoObj = Qiniu.imageInfo(image_key);
                                                var maxwidth=imageInfoObj.width-20;
                                                var domain = up.getOption('domain');
                                                var link = domain + image_key;
                                                $module.addUploadColumn(link);
                                        },
                                        'Error': function(up, err, errTip) {
                                                $spa.alert("错误","密钥已过期,图片无法上传,请联系管理员");
                                        }
                                }
                        });
                }


        });

            jsonAPI.call('qiniu','upToken',{},function(err,result) {
                    if (result.code == 0) {
                            $module.initUploader(result.result.uptoken,result.result.domain);

                            if(id)
                            {
                                    functionality ='UPDATE';
                                    jsonAPI.call('ducationMessage','R', {id : id}, function(err, result){
                                            if(jsonAPI.handleErrors(err, result)) {
                                                    $("input:radio[value="+result.result.type+"]").attr("checked",true);
                                                    formUtil.autoFill("#message-form",result.result);
                                                    $("#contents").val(result.result.content);
                                                    var images=JSON.parse(result.result.images);
                                                    for(var i=0;i<images.length;i++)
                                                    {
                                                            $module.addUploadColumn(images[i]);
                                                    }
                                                    if(result.result.status==2)
                                                    {
                                                            $("#publishBtn").hide();
                                                    }
                                            }
                                    });

                            }
                    }
                    else
                            $spa.alert('获取TOKEN失败','请确认是否开启TOKEN服务');

            });

            var html=$spa.getNavigatorHTML(['首页:#home','发布信息:#message_add']);
            $("#nav").html(html);

        callback();
    };
});
