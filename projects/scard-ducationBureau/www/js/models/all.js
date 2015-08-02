define(function(require, exports, module){
    var Backbone = require('backbone');
    var $ = require('jquery');
    var formUtil = require('form-util');

    //================================CRUD BASIC-DEPT=====================================//
    exports.createBasicDeptModel = function(){
        return new Backbone.CRUDModel({
            module : 'BASIC-DEPT',
            identity : 'deptId'
        });
    };

    exports.BasicDept = function(o) {
        if(o && typeof o == 'string') {
            o = formUtil.argsFrom($(o));
        }
        else {
            o = o || {};
        }
        this.deptId = 0;        //TYPE, COMMENT
        this.parentId = 0;
        this.deptCode = '';
        $.extend(this, o);
    };

    exports.BasicDeptQP = function(o) {
        if(o && typeof o == 'string') {
            o = formUtil.argsFrom($(o));
        }
        else {
            o = o || {};
        }
        this.deptName = '';     //TYPE, 部门名称, 查询条件表达式：LIKE %deptName%
        this.page = 1;
        this.rpp = 20;
    };

    //================================CRUD BASIC-USER=====================================//
    exports.createUserModel = function(){
        return new Backbone.CRUDModel({
            module : 'BASIC-USER',
            identity : 'userId'
        });
    };
});
