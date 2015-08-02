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


        defineModule({
            query: function (page) {
                _queryUsers(page);
            },
            adDetail: function (id) {
                    window.redirect('#ad_add', {id:id,page:currPage});
            },
            deleteAd:function(id,title)
            {
                    var selectId=id;
                    var selectedName=title;

                    $spa.confirm('删除广告', '您确认要删除广告['+selectedName+']吗？', function() {
                        jsonAPI.call('ducationAd','D', {ids : selectId}, function(err, result){
                            if(jsonAPI.handleErrors(err, result)) {
                                _queryUsers(currPage);
                            }
                        });
                    });
            },

            adLock: function (id, state) {
                var op = state == '0' ? '禁用' : '启用';
                $spa.confirm(op + '广告', '您确认要'+op+'该广告吗?', function () {
                    jsonAPI.call('ducationAd', 'U',{id : id, states : state}, function(err, result){
                        if(jsonAPI.handleErrors(err, result)) {
                            $spa.alert(op + '广告', '广告'+op+'成功', function(){
                                _queryUsers(currPage);
                            });
                        }
                    });
                });
            },
            onDestroy : function() {
            }
        });

        function _queryUsers(page) {
            if (page) {
                currPage = page;
            }
            var param = {
                _page: currPage,
                _rpp:5
            };

            jsonAPI.call('ducationAd','L', param, function (err, result) {
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
                    _queryUsers();
        })();

        var html=$spa.getNavigatorHTML(['首页:#home','广告列表:#ad_list']);
        $("#nav").html(html);
        callback();
    }
});
