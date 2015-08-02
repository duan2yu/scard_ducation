/**
 * Created by zlbbq on 15-4-14.
 */
/**
 * @author zlbbq
 * @class SPADashboard
 * @constructor
 * @class 这个是SPA(Single Page App) Dashboard接口,
 *  不具有dashboard的任何功能, 开发dashboard时, 请实现SPADashboard接口
 * */
function SPADashboard() {
    this.version = '0.1';
}

/**
 * @author zlbbq
 * @class SPADashboard
 * @type String
 * @returns SPADashboard接口版本
 *
 * 获取SPADashboard接口版本号
 * */
SPADashboard.prototype.getVersion = function() {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @type String
 *
 * 设置窗口标题
 * */
SPADashboard.prototype.setTitle = function(title) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {String} title 弹框标题
 * @param {String} text 弹框提示文字
 * @param {function} cb 弹框关闭时的回调函数
 *
 * 显示弹框, 替代window.alert函数以获得更好的UI效果
 * */
SPADashboard.prototype.alert = function(title, text, cb) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {String} msg 错误消息
 * @param {function} cb 弹框关闭时的回调函数
 *
 * 显示错误消息弹框, 替代window.alert函数以获得更好的UI效果
 * */
SPADashboard.prototype.error = function(msg, cb) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {String} msg 需要显示的消息
 * @param {function} cb 弹框关闭时的回调函数
 *
 * 显示消息弹框, 替代window.alert函数以获得更好的UI效果
 * */
SPADashboard.prototype.message = function(msg, cb) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {jquerySelector} trigger 触发元素,通常是一个按钮
 * @param {jquerySelector} input 文件上传时,服务器通常返回一个URI,input表示该URI的值应该如何保存在DOM中
 * @param {String} accept 可上传的文件类型, 默认image/*
 * @param {Object} data 上传时需要带的数据
 * @type Object
 * @returns 文件上传对象Uploader, 需要调用destroy()移除DOM结构并释放资源
 *
 * 使trigger变成文件上传按钮以支持文件上传功能
 * */
SPADashboard.prototype.createUploader = function(trigger, input, accept, data) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {jquerySelector} input 日期值保存DOM元素
 * @param {Object} cfg 日期控件配置
 * @type Object
 * @returns 日期时间选择器对象, 需要调用destroy()移除DOM结构并释放资源
 *
 * 使trigger变成文件上传按钮以支持文件上传功能
 * */
SPADashboard.prototype.createDatetimePicker = function(input, cfg) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {Object} object 通过createXXX返回的对象
 * @returns {Object} 返回对象本身, 为链式调用
 *
 * 释放uploadImmediately创建的资源
 * */
SPADashboard.prototype.destroy = function(object) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {Object} accept 可上传的文件类型, 默认image/*
 * @param {Object} data 上传时需要带的数据
 * @param {function} confirmCallback 确认上传内容的回调函数, 签名: function(uri) {}, uri : 上传成功的文件URI
 * @param {function} successCallback 上传成功的回调函数, 签名: function(uri) {}, uri : 上传成功的文件URI
 *
 * 打开文件上传弹出层
 * */
SPADashboard.prototype.upload = function(accept, data, confirmCallback, successCallback) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {String} title 弹框标题
 * @param {String} text 弹框提示文字
 * @param {function} cbConfirm 点击确认按钮时的回调函数
 * @param {function} cbCancel  点击取消按钮时的回调函数
 *
 * 显示提问弹框, 替代window.confirm函数以获得更好的UI效果
 * */
SPADashboard.prototype.confirm = function(title, text, cbConfirm, cbCancel) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {jquerySelector} selector 弹框的UI组件,通常是一个div
 * @param {function} cbConfirm 点击确认按钮时的回调函数
 * @param {function} cbCancel  点击取消按钮时的回调函数
 *
 * 显示提问弹框, 替代window.confirm函数以获得更好的UI效果
 * */
SPADashboard.prototype.confirmEx = function(selector, cbConfirm, cbCancel) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {Object} paging 分页对象, 原型为:
 *              var paging = {
 *                  page : 1,  //当前页
 *                  pages : 2, //总页数
 *                  rpp : 20,  //每页条数
 *                  rows : 22  //总记录条数
 *              };
 * @param {String} queryFunctionName 分页按钮的查询函数名, 查询函数签名: function() queryFunctionName(page){}
 *
 * 统一分页组件
 * */
SPADashboard.prototype.getPagingHTML = function(paging, queryFunctionName) {};

/**
 * @author zlbbq
 * @class SPADashboard
 * @param {Array} navigations 导航数组, 每个元素为一个string, 格式: $text:$url
 *              $text : 导航显示的文字
 *              $url : 导航链接地址, 为'#'时不创建链接
 *
 * 统一导航组件
 * */
SPADashboard.prototype.getNavigatorHTML = function(navigations) {};