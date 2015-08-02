var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Action = using('easynode.framework.mvc.Action');
var ActionResult = using('easynode.framework.mvc.ActionResult');
var ActionFactory = using('easynode.framework.mvc.ActionFactory');
var S = require('string');
var _ = require('underscore');

(function () {
        /**
         * Class ActionDetail
         *
         * @class easynode.plugin.sys.actions.ActionDetail
         * @extends easynode.framework.mvc.Action
         * @since 0.1.0
         * @author zlbbq
         * */
        class ActionDetail extends Action {
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
                        this.addArg({name : 'moduleName', type : 'string',comment:'模块名称'});
                        this.addArg({name : 'actionName', type : 'string',comment:'action名称'});
                }

                process(ctx) {
                        return function * () {
                                var m=ctx.param('moduleName');
                                var a=ctx.param('actionName');
                                assert(typeof m == 'string' && typeof a == 'string', 'Invalid arguments');
                                assert(!S(m).isEmpty() && !S(a).isEmpty(), 'Invalid arguments');
                                var action=ActionFactory.createActionInstance(m,a,null);
                                assert(action instanceof Action,'没有找到对应的aciton');
                                return ActionResult.createSuccessResult(action.getArgs());
                        };
                }

                datasourceSupport() {
                        return false;
                }

                getClassName() {
                        return EasyNode.namespace(__filename);
                }

        }



        module.exports = ActionDetail;
})();