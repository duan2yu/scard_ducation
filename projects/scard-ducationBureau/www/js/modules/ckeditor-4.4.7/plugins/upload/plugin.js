/**
 * Created by zlbbq on 15-4-2.
 */

(function(){
    var pluginName = 'upload';
    CKEDITOR.plugins.add(pluginName,
        {
            init : function (editor)
            {
                //给自定义插件注册一个调用命令
                editor.addCommand( pluginName, {
                    exec : function(editor) {
                        if(typeof editor.uploadHandler == 'function') {
                            editor.uploadHandler();
                        }
                        else if(typeof window.amUpload == 'function') {
                            window.amUpload(editor);
                        }
                        else {
                            console.log('没有找到文件上传按钮的功能函数，请定义editor.uploadHandler或window.amUpload函数')
                        }
                    }
                } );
                //注册一个按钮，来调用自定义插件
                editor.ui.addButton(pluginName,
                    {
                        //editor.lang.mine是在zh-cn.js中定义的一个中文项，
                        //这里可以直接写英文字符，不过要想显示中文就得修改zh-cn.js
                        label : '上传文件到服务器',
                        icon: this.path + 'upload.png',
                        command : pluginName
                    });
            }
        }
    );
})();