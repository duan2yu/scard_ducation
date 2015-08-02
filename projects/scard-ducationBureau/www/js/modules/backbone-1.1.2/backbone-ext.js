/**
 * Created by zlbbq on 15-4-28.
 */

define(function(require, exports, module){
    var mustache = require('mustache');
    var Backbone = require('./backbone-min.js');
    var formUtil = require('form-util');
    var jsonAPI = require('json-api');
    var $ = require('jquery');

    //CRUD模块的模型支持
    Backbone.CRUDModel = Backbone.Model.extend({
        defaults : {
            read : {},
            list : {}
        },


        initialize : function(cfg) {
            Backbone.Model.prototype.initialize.apply(this, arguments);
            this.module = cfg.module || '';
            this.identity = cfg.idField || 'recordId';
        },

        _getRealArg : function(arg) {
            if(typeof arg == 'string') {
                return formUtil.argsFrom(arg);
            }
            else {
                return arg || {};
            }
        },

        _getCallback : function(cb) {
            cb = cb || function(err, result){
                return jsonAPI.handleErrors(err, result);
            };
            return cb.bind(this);
        },

        _getJSONRestAPI : function(type){
            return '/' + this.module + '/' + type;
        },

        C : function(arg, cb) {
            arg = this._getRealArg(arg);
            cb = this._getCallback(cb);
            var me = this;
            jsonAPI.rest(this._getJSONRestAPI('C'), arg, function(err, result){
                var ret = cb(err, result);
                if(ret === true && result && result.result) {
                    me.trigger('crud', 'C', result.result.insertRowId, arg);
                    me.trigger('crud:C', result.result.insertRowId, arg);
                }
            });
        },

        R : function(id, cb) {
            var arg = {};
            arg[this.idField] = id;
            cb = this._getCallback(cb);
            var me = this;
            jsonAPI.rest(this._getJSONRestAPI('R'), arg, function(err, result){
                var ret = cb(err, result);
                if(ret === true && result && result.result) {
                    me.set({read : result.result});
                    me.trigger('crud', 'R', result.result);
                    me.trigger('crud:R', result.result);
                }
            });
        },

        U : function(arg, cb) {
            arg = this._getRealArg(arg);
            cb = this._getCallback(cb);
            var me = this;
            jsonAPI.rest(this._getJSONRestAPI('U'), arg, function(err, result){
                var ret = cb(err, result);
                if(ret === true && result && result.result) {
                    me.trigger('crud', 'U', arg);
                    me.trigger('crud:U', arg);
                }
            });
        },

        D : function(ids, cb) {
            if(typeof ids == 'number') {
                ids = [ids];            //convert to an array
            }
            var arg = {};
            arg[this.idField + 's'] = ids;
            cb = this._getCallback(cb);
            var me = this;
            jsonAPI.rest(this._getJSONRestAPI('D'), arg, function(err, result){
                var ret = cb(err, result);
                if(ret === true && result && result.result) {
                    me.trigger('crud', 'D', ids);
                    me.trigger('crud:D', ids);
                }
            });
        },

        L : function(arg, order, cb) {
            if(arguments.length == 0) {
                arg = {};
            }
            else if(arguments.length == 1 && typeof arg == 'function') {
                cb = arg;
                arg = {};
            }
            else if(arguments.length == 2 && typeof order == 'function') {
                cb = order;
                order = null;
            }
            cb = this._getCallback(cb);
            arg = this._getRealArg(arg);
            if(order) {
                arg._orderBy = order;
            }
            var me = this;
            jsonAPI.rest(this._getJSONRestAPI('L'), arg, function(err, result){
                var ret = cb(err, result);
                if(ret === true && result && result.result) {
                    me.set({list : result.result});
                    me.trigger('crud', 'L', result.result);
                    me.trigger('crud:L', result.result);
                }
            });
        }
    });


    //支持属性：tpl，支持id, class和属性selector，不支持标签selector
    Backbone.MustacheView = Backbone.View.extend({
        initialize: function(cfg) {
            Backbone.View.prototype.initialize.apply(this, arguments);
            cfg = cfg || {};
            this._mustacheTpl = cfg.tpl || '';
            if(/^[\#\.\[].*/.test(this._mustacheTpl)) {
                this._tplType = 'SELECTOR';
            }
            else {
                this._tplType = 'TEXT';
            }
        },

        render : function() {
            var tpl = this._mustacheTpl;
            if(this._tplType == 'SELECTOR') {
                var o = $(this._mustacheTpl);
                if(o.length == 0) {
                    tpl = '没有找到Mustache模板['+this._mustacheTpl+']';
                }
                else if(o.length > 1) {
                    tpl = '指定的Mustache模块在页面中不是唯一的';
                }
                else {
                    tpl = o.val() || o.html() || '模板的DOM元素不支持val()函数或html()函数，建议使用textarea元素';
                }
            }
            this.$el.html(mustache.render(tpl, mustache.normalizeInput(this.model.attributes)));
            return this;
        }
    });

    module.exports = Backbone;
});
