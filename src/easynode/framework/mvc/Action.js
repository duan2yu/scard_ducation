var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var S = require('string');
var JSONView = using('easynode.framework.mvc.JSONView');
var ActionResult = using('easynode.framework.mvc.ActionResult');

(function () {
        /**
         * Action抽象类。定义了Action的一些抽象函数，子类需要实现这些抽象函数。Action的子类的构造器只能传递一个类型为ActionContext的参数。
         * 同时，Action的子类应具有module和name两个静态属性对应于添加到ActionFactory时的module和name.
         * <h5>示例</h5>
         *
         *      //sample
         *      var Action = using('easynode.framework.mvc.Action');
         *      class MyAction extends Action {
         *              constructor (ctx) {
         *                      super(ctx);
         *              }
         *      }
         *
         *      // 访问：http://localhost:5000/rest/demoM/demoA
         *      MyAction.module = 'demoM';
         *      MyAction.action = 'demoA';
         *
         *      // 与如下语句相同。
         *      Action.define('demoM', 'demoA', MyAction);
         *
         *
         * @class easynode.framework.mvc.Action
         * @extends easynode.GenericObject
         * @abstract
         * @since 0.1.0
         * @author zlbbq
         * */
        class Action extends GenericObject {
                /**
                 * 构造函数。
                 *
                 * @method 构造函数
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                constructor() {
                        super();
                        //调用super()后再定义子类成员。
                        /**
                         * easynode.framework.mvc.ActionContext实例
                         *
                         * @property ctx
                         * @protected
                         * @type easynode.framework.mvc.ActionContext
                         * @since 0.1.0
                         * @author zlbbq
                         * */
                        this.ctx = null;

                        /**
                         * Action参数
                         *
                         * @property args
                         * @protected
                         * @type {Array}  Element Notation :
                         *                              {
                         *                                       name : '参数名'
                         *                                       type : '参数类型'
                         *                                       comment : '参数注释'
                         *                              }
                         * @since 0.1.0
                         * @author zlbbq
                         * */
                        this.args = [];

                        /**
                         * 视图
                         *
                         * @property view
                         * @protected
                         * @type {easynode.framework.mvc.View}
                         * @default new easynode.framework.mvc.JSONView
                         * @since 0.1.0
                         * @author zlbbq
                         * */
                        this.view = new JSONView();
                        /**
                         * 视图渲染参数
                         *
                         * @property viewOptions
                         * @protected
                         * @type {Object}
                         * @default {}
                         * @since 0.1.0
                         * @author zlbbq
                         * */
                        this.viewOptions = {};
                }

                /**
                 * 设置视图。
                 *
                 * @method setView
                 * @param {easynode.framework.mvc.View} view 视图
                 * @param {Object} opts 视图渲染参数
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                setView (view, opts={}) {
                        assert(view, 'Invalid argument');
                        this.view = view;
                        this.viewOptions = opts;
                }

                /**
                 * 获得视图。
                 *
                 * @method getView
                 * @return {easynode.framework.mvc.View} 当前Action的视图
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                getView () {
                        return this.view;
                }

                /**
                 * 获得视图渲染参数。
                 *
                 * @method getViewOptions
                 * @return {Object} opts 视图渲染参数
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                getViewOptions () {
                        return this.viewOptions;
                }

                /**
                 * 获取Action全名。
                 *
                 * @method getFullName
                 * @return {String} Action全名，$module.$action
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                getFullName () {
                        return this.module + '.' + this.action;
                }

                /**
                 * 设置Action的执行上下文环境。
                 *
                 * @method setContext
                 * @param {easynode.framework.mvc.ActionContext} ctx Action执行上下文环境
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                setContext (ctx) {
                        this.ctx = ctx;
                }

                /**
                 * 获取Action的执行上下文环境。
                 *
                 * @method getContext
                 * @return {easynode.framework.mvc.ActionContext} Action执行上下文环境
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                getContext () {
                        return this.ctx;
                }

                /**
                 * 设置模块名，框架内使用，请不要在任何地方调用此函数。
                 *
                 * @method setModule
                 * @param {String} m 模块名
                 * @private
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                setModule (m) {
                        assert(typeof m == 'string' && S(m).trim().length > 0, 'Invalid module name');
                        this.module = m;
                }

                /**
                 * 获取Action的模块名。
                 *
                 * @method getModule
                 * @return {String} Action模块名
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                getModule() {
                        return this.getModule();
                }

                /**
                 * 设置Action名，框架内使用，请不要在任何地方调用此函数。
                 *
                 * @method setActionName
                 * @param {String} a Action名
                 * @private
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                setActionName (a) {
                        assert(typeof a == 'string' && S(a).trim().length > 0, 'Invalid action name');
                        this.action = a;
                }

                /**
                 * 获取Action名。
                 *
                 * @method getActionName
                 * @return {String} Action名
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                getActionName () {
                        return this.action;
                }

                /**
                 * 获取Action参数列表。
                 *
                 * @method getArgs
                 * @return {Array} Action参数列表，参考args(protected)属性。
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                getArgs () {
                        return this.args || [];
                }

                /**
                 * 增加一个或多个参数。可链式调用。
                 *
                 * @method addArg
                 * @param {...} o 接受多参，string或JSON对象，对象Notation:
                 *                              {
                 *                                      name : '',
                 *                                      type : '',
                 *                                      comment : ''
                 *                              }
                 *                              type表示实际值类型，默认'string'。
                 *                              当元素为string型时，接受$name $type $comment格式的简化定义方式，用空格分开名称、类型和备注
                 * @return {Action} 返回this, 可链式调用。
                 * @since 0.1.0
                 * @author zlbbq
                 * @example
                 *      this.addArg('field1', 'field2');                                                //field1 with type string
                 *      this.addArg({name : 'field1', type : 'int'});                           //field1 with type int
                 *      // 支持的类型有：
                 *      string，字符串类型，默认
                 *      int，     整数型
                 *      float(x)，浮点数型，保留x位小数
                 *      array，   数组，每个元素使用","(逗号)分隔
                 *      date,       日期型
                 *      datetime,       日期时间型，精确到分钟
                 *      datetimeS,     日期时间型，精确到秒
                 *      json,       JSON对象
                 * */
                addArg (...o) {
                        o.forEach(a => {
                                if(typeof a == 'string') {
                                        var regExp = /^(\w+)\s([\w|\(|\)]+)\s?(.*)$/;
                                        if(a.match(regExp)) {
                                                var parsed = regExp.exec(a);
                                                a = {
                                                        name: parsed[1],
                                                        type : parsed[2],
                                                        comment : parsed[3] || ''
                                                };
                                        }
                                        else {
                                                a = {
                                                        name: a
                                                };
                                        }
                                }
                                assert(a.name, 'Invalid argument');
                                a.type = a.type || 'string';
                                a.comment = a.comment || '';
                                if(this.hasArg(a.name)) {
                                        logger.warn(`Duplicate definition of arg [${a.name}]`);
                                }
                                this.args.push(a);
                        });
                        return this;
                }

                /**
                 *  是否定义了名为name的参数。
                 *
                 * @method hasArg
                 * @param {String} name 参数名
                 * @return {boolean} 是否包含名为name的参数。
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                hasArg(name) {
                        this.args.forEach(arg => {
                                if(arg.name == name) {
                                        return true;
                                }
                        });
                        return false;
                }

                /**
                 * 验证Action的调用上下文环境，通常用于验证上下文环境中的输入参数。
                 *
                 * @method validate
                 * @return {Object/boolean} 返回boolean时，true表示验证参数成功，false表示验证失败。返回对象的示例：
                 *              {
                 *                      result : true/false,            //同boolean返回值
                 *                      msg : '错误消息',               //错误消息，返回到前端
                 *              }
                 * @async
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                validate (ctx, ...args) {
                        return function * () {
                                return ctx != null;
                        }
                }

                /**
                 * 验证Action的调用权限。建议通过RBAC插件统一设置权限校验函数。
                 *
                 * @method validate
                 * @return {Object/boolean} 返回boolean时，true表示验证权限成功，false表示验证权限失败。返回对象的示例：
                 *              {
                 *                      result : true/false,            //同boolean返回值
                 *                      msg : '错误消息',               //错误消息，返回到前端
                 *              }
                 * @async
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                authorize(ctx, ...args) {
                        return function * () {
                                return true;
                        }
                }

                /**
                 * 执行Action处理过程。
                 *
                 * @method process
                 * @param {easynode.framework.mvc.ActionContext} ctx ActionContext实例
                 * @param {...} args 参数表，参数顺序与类型取决于args属性
                 * @return {Object/boolean} 返回boolean时，true表示验证参数成功，false表示验证失败。
                 * @async
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                process (ctx, ...args) {
                        return function * () {
                                return ActionResult.createNoImplementationError();
                        };
                }


                /**
                 * 中断Action的执行，并且抛出异常结果，通常使用在process函数中需要直接返回错误结果的情况。在执行Action时，如果
                 * 捕获到的异常是ActionResult实例，则应直接将此ActionResult渲染后返回给客户端。
                 *
                 * @method throwErrorResult
                 * @param {easynode.framework.mvc.ActionResult} actionResult ActionResult实例
                 * @throws Error 总是会抛出一个异常。该异常具有一个executeResult属性，传递ActionResult结果。
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                throwErrorResult(actionResult=ActionResult.createErrorResult()) {
                        var err = new Error(actionResult);
                        var me = this;
                        err.executeResult = {
                                action : me,
                                actionResult : actionResult
                        };
                        throw err;
                }

                /**
                 * Action是否需要数据源支持。默认返回true。
                 *
                 * @method datasourceSupport
                 * @return {boolean} 返回该Action是否需要数据源支持，需要数据库支持时，ActionListener根据此选项连接数据库并自动开启和关闭数据库事务
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                datasourceSupport() {
                        return true;
                }


                /**
                 * 定义某个类为Action类，为其绑定module和action属性。
                 *
                 * @method define
                 * @param {String} m 模块名
                 * @param {String} a Action名
                 * @param {Class} Action实现类
                 * @static
                 * @since 0.1.0
                 * @author zlbbq
                 * @example
                 *      var Action = using('easynode.framework.mvc.Action');
                 *      class MyAction extends Action {
                 *              constructor (env) {
                 *                      super(env);
                 *              }
                 *      }
                 *
                 *      // 访问：http://localhost:5000/rest/demoM/demoA
                 *      Action.define('demoM', 'demoA', MyAction);
                 * */
                static define(m, a, actionClass) {
                        actionClass.module = m;
                        actionClass.action = a;
                }

                getClassName() {
                        return EasyNode.namespace(__filename);
                }
        }

        module.exports = Action;
})();