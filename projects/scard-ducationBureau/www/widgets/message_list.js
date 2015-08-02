/**
 * Created by dsj on 15-4-21.
 */

define(function (require, exports, module) {
    module.exports.init = function (element, callback) {
        var $ = require('$');
        var jsonAPI = require('json-api');
        var mustache = require('mustache');
        var dateFormat = require('dateformat');
        var  currPage= getQueryParam('page')||1;

        var type=getQueryParam('type');
        if(!type) type=1;


        defineModule({
            query: function (page) {
                _queryMessage(page);
            },
            updateMessage: function (id) {
            //    var selected=_getSelectedUser('#userDG','修改用户');
                    window.redirect('#message_add', {id: id,page:currPage});
            },
            deleteMessage:function(id,name)
            {
                    var selectId=id;
                    var selectedName=name;
                    $spa.confirm('删除发布信息', '您确认要删除发布['+selectedName+']吗？', function() {
                        jsonAPI.call('ducationMessage','D', {ids : selectId}, function(err, result){
                            if(jsonAPI.handleErrors(err, result)) {
                                _queryMessage(currPage);
                            }
                        });
                    });
            },
            publishMessage:function(id,name)
            {
                    var selectId=id;
                    var selectedName=name;
                    $spa.confirm('发布信息', '您确认要发布信息['+selectedName+']吗？', function() {
                        jsonAPI.call('ducationMessage','U', {id : selectId,status:2}, function(err, result){
                            if(jsonAPI.handleErrors(err, result)) {
                                _queryMessage(currPage);
                            }
                        });
                    });
            },

            onDestroy : function() {
            }
        });

        function _queryMessage(page) {
            if (page) {
                currPage = page;
            }
            var param = {
                _page: currPage,
                type:type,
                _rpp:5
            };

            jsonAPI.call('ducationMessage','L', param, function (err, result) {
                if (jsonAPI.handleErrors(err, result)) {
                    var tpl = $('#tplDG').val();
                    var content = mustache.render(tpl, mustache.normalizeInput(result.result));
                    $('#userDG').html(content);
                    var pageing={
                        rows:result.result.rows,
                        pages:result.result.pages,
                        page:result.result.page,
                        rpp:result.result.rpp
                    }
                    var pagingHTML =$spa.getPagingHTML(pageing);
                    $('#pagination').html(pagingHTML);
                }
            });
        }


        (function(){
            _queryMessage();
        })();

        var nav=['首页:#home','公告列表:#messsage_list?type=1'];
        if(type==2) nav=['首页:#home','通知列表:#messsage_list?type=2'];
        if(type==3) nav=['首页:#home','新闻列表:#messsage_list?type=3'];

        var html=$spa.getNavigatorHTML(nav);
        $("#nav").html(html);
        callback();
    }
});
