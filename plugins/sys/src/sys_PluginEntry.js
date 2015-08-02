var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var EasyNodePlugin = using('easynode.framework.plugin.EasyNodePlugin');
var ActionFactory = using('easynode.framework.mvc.ActionFactory');
var Sys = using('easynode.plugin.sys.Sys');
var ActionAOP = using('easynode.framework.aop.ActionAOP');

(function () {
        /**
         * Class sys_PluginEntry.js
         *
         * @class sys_PluginEntry.js
         * @extends easynode.GenericObject
         * @since 0.1.0
         * @author zlbbq
         * */
        class sys_PluginEntry extends EasyNodePlugin
        {
                /**
                 * 构造函数。
                 *
                 * @method 构造函数
                 * @since 0.1.0
                 * @author zlbbq
                 * */
                constructor()
                {
                        super(Sys.PLUGIN_NAME, Sys.PLUGIN_VERSION);
                        //调用super()后再定义子类成员。
                }

                initialize (loadCtx) {
                        var me = this;
                        return function * () {
                                if(loadCtx.koaHttpServer) {
                                        yield  ActionFactory.initialize(me.relative('etc/sys-actions.json'));

                                        var rbacPlugin = EasyNodePlugin.getPlugin('rbac');
                                        if(rbacPlugin) {
                                                rbacPlugin.addGuestPermissions('sys.la', 'sys.ad');
                                        }
                                }
                        };
                }

                getClassName()
                {
                        return EasyNode.namespace(__filename);
                }
        }

        module.exports = sys_PluginEntry;
})();