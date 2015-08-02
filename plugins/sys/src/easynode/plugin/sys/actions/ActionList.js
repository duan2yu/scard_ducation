var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Action = using('easynode.framework.mvc.Action');
var ActionResult = using('easynode.framework.mvc.ActionResult');
var ActionFactory = using('easynode.framework.mvc.ActionFactory');

(function () {
        /**
         * Class ActionList
         *
         * @class easynode.plugin.sys.actions.ActionList
         * @extends easynode.framework.mvc.Action
         * @since 0.1.0
         * @author zlbbq
         * */
        class ActionList extends Action {
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
                }

                process(ctx) {
                        return function * () {
                                return ActionResult.createSuccessResult(ActionFactory.list(ctx.param('moduleName')));
                        };
                }

                datasourceSupport() {
                        return false;
                }

                getClassName() {
                        return EasyNode.namespace(__filename);
                }

        }
        module.exports = ActionList;
})();