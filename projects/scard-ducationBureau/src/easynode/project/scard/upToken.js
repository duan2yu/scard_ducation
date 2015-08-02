var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var Action = using('easynode.framework.mvc.Action');
var ActionResult = using('easynode.framework.mvc.ActionResult');
var ActionFactory = using('easynode.framework.mvc.ActionFactory');
var EasyNodePlugin = using('easynode.framework.plugin.EasyNodePlugin');
var HTTPUtil = using('easynode.framework.util.HTTPUtil');

var upToken_URL=EasyNode.config('Uptoken_Url');
(function () {
        const timeout =5000;
        const upToken_URL = EasyNode.config('upToken_URL','http://localhost:19110/upToken')
        /**
         * Class SendSMS
         *
         * @class easynode.plugin.sms.actions.SendSMS
         * @extends easynode.framework.mvc.Action
         * @since 0.1.0
         * @author zlbbq
         * */
        class upToken extends Action {
                /**
                 * 构造函数。
                 *
                 * @method 构造函数
                 * @since 0.1.0
                 * @author duansj
                 * */
                constructor() {
                        super();
                        //调用super()后再定义子类成员。
                }

                process(ctx) {
                        return function * () {
                                var param = yield HTTPUtil.getJSON(upToken_URL, timeout, 'GET', {});
                                return ActionResult.createSuccessResult(param);
                        };
                }

                datasourceSupport() {
                        return false;
                }

                getClassName() {
                        return EasyNode.namespace(__filename);
                }

        }
        module.exports = upToken;
})();