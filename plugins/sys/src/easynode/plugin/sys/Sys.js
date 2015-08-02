var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');

(function () {
        /**
         * Class Sys
         *
         * @class easynode.plugin.sys.Sys
         * @extends easynode.GenericObject
         * @since 0.1.0
         * @author zlbbq
         * */
        class Sys extends GenericObject {
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
                }

                getClassName() {
                        return EasyNode.namespace(__filename);
                }
        }

        Sys.PLUGIN_NAME = 'sys';
        Sys.PLUGIN_VERSION = '0.1.0';
        Sys.PLUGIN_ACTION_MODULE = Sys.PLUGIN_NAME;

        module.exports = Sys;
})();