var assert = require('assert');
var logger = using('easynode.framework.Logger').forFile(__filename);
var GenericObject = using('easynode.GenericObject');
var MysqlModelGenerator = using('easynode.framework.mvc.spi.MysqlModelGenerator');
var ModelProxyActionFactory = using('easynode.framework.mvc.ModelProxyActionFactory');
var ActionFactory = using('easynode.framework.mvc.ActionFactory');
var EasyNodePlugin = using('easynode.framework.plugin.EasyNodePlugin');
var BeanFactory = using('easynode.framework.BeanFactory');
var qiniu = require('qiniu');

(function () {
        /**
         * Class ProjectEntry
         *
         * @class ProjectEntry
         * @extends easynode.GenericObject
         * @since 0.1.0
         * @author duansj
         * */
        class ProjectEntry extends GenericObject {
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

                static launch(ctx) {
                        return function * () {
                                var me = this;
                             //   yield BeanFactory.initialize(me.relative('etc/scard-ducationBureau.json'));
                              /*  qiniu.conf.ACCESS_KEY = EasyNode.config('ACCESS_KEY');
                                qiniu.conf.SECRET_KEY = EasyNode.config('SECRET_KEY');

                                var uptoken = new qiniu.rs.PutPolicy(EasyNode.config('Bucket_Name'));

                              //  logger.error(EasyNode.config('Bucket_Name'));

                                var httpServer=ctx.koaHttpServer;
                                httpServer.addRoute('get', '/uptoken', function * () {
                                        var token = uptoken.token();
                                        logger.error(token);
                                        this.response.header("Cache-Control", "max-age=0, private, must-revalidate");
                                        this.response.header("Pragma", "no-cache");
                                        this.response.header("Expires", 0);
                                        if (token) {
                                                this.response.json({
                                                        uptoken: token
                                                });
                                        }
                                });*/
                                logger.info('initializing project [ducationBureau]...');
                                var mysqlModels = [
                                        {name: 'ducationUser', table: 'scard_ducation_user', view: 'scard_ducation_user'},
                                        {name: 'ducationAd', table: 'scard_ducation_ad', view: 'scard_ducation_ad'},
                                        {name: 'ducationMessage', table: 'scard_ducation_message', view: 'scard_ducation_message'}
                                ];
                                yield MysqlModelGenerator.generate(ctx.datasource, ctx.database, mysqlModels);

                                var factory = new ModelProxyActionFactory({
                                        getModel: function () {
                                                return MysqlModelGenerator.getModel('ducationUser');
                                        }
                                }, 'ducationUser');
                                ActionFactory.register(factory.getCreateAction('*', null,
                                        {
                                                beforeCreate: function (model, ctx) {
                                                        return function *() {
                                                            //    model.merge({orderState: '0'});
                                                        }
                                                }

                                        }), null, null, '新增教育局用户');
                                ActionFactory.register(factory.getReadAction(), null, null, '查询单个教育局用户');
                                ActionFactory.register(factory.getUpdateAction(), null, null, '修改教育局用户');
                                ActionFactory.register(factory.getDelAction(), null, null, '删除教育局用户');
                                var queryAction = factory.getListAction({
                                   /*     'orderCode': 'like',
                                        'orderDate': 'between',
                                        'customerName' : 'like',
                                        'batchNumber': 'like',
                                        'terminalId': 'like',
                                        'simNumber': 'like',
                                        'simEnddate': 'between',
                                        'simBegindate': 'between'*/
                                });
                                ActionFactory.register(queryAction, null, null, '查询教育局用户列表');


                                    factory = new ModelProxyActionFactory({
                                        getModel: function () {
                                                return MysqlModelGenerator.getModel('ducationAd');
                                        }
                                }, 'ducationAd');
                                ActionFactory.register(factory.getCreateAction('*', null,
                                        {
                                                beforeCreate: function (model, ctx) {
                                                     //   logger.error(ctx.param('starttime')+" 00:00:00");
                                                  //      logger.error(Date.parse(ctx.param('starttime')+" 00:00:00",'YYYY-MM-DD HH:mm:ss'))
                                                        return function *() {
                                                                model.merge({
                                                                        createtime: new Date(),
                                                                       // starttime:ctx.param('starttime')+" 00:00:00",
                                                                   //     endtime:ctx.param('endtime')+" 23:59:59",
                                                                        states:0,
                                                                        ducaid:1  //todo 获取登录用户ｉｄ
                                                                });
                                                        }
                                                }

                                        }), null, null, '新增广告');

                                ActionFactory.register(factory.getReadAction(), null, null, '查询广告');
                                ActionFactory.register(factory.getUpdateAction(), null, null, '修改广告');
                                ActionFactory.register(factory.getDelAction(), null, null, '删除广告');
                                var queryAction = factory.getListAction({
                                        /*'rechargeTime': 'between',
                                        'expiryDate': 'between'*/
                                },['states DESC','createtime DESC'])
                                ActionFactory.register(queryAction, null, null, '查询广告列表');


//message
                                var factory = new ModelProxyActionFactory({
                                        getModel: function () {
                                                return MysqlModelGenerator.getModel('ducationMessage');
                                        }
                                }, 'ducationMessage');
                                ActionFactory.register(factory.getCreateAction('*', null,
                                        {
                                                beforeCreate: function (model, ctx) {
                                                        return function *() {
                                                                model.merge({
                                                                                createtime: new Date(),
                                                                                createuerid: '1' //todo 获取登录用户ｉｄ
                                                                        }
                                                                );
                                                        }
                                                }

                                        }), null, null, '新增消息(公告.新闻.通知)');
                                ActionFactory.register(factory.getReadAction(), null, null, '查询消息(公告.新闻.通知)');
                                ActionFactory.register(factory.getUpdateAction(), null, null, '修改消息(公告.新闻.通知)');
                                ActionFactory.register(factory.getDelAction(), null, null, '删除消息(公告.新闻.通知)');
                                var queryAction = factory.getListAction({
                                        'type':'='
                                        /*     'orderCode': 'like',
                                         'orderDate': 'between',
                                         'customerName' : 'like',
                                         'batchNumber': 'like',
                                         'terminalId': 'like',
                                         'simNumber': 'like',
                                         'simEnddate': 'between',
                                         'simBegindate': 'between'*/
                                }, ['status ASC','createtime DESC']);
                                ActionFactory.register(queryAction, null, null, '查询消息(公告.新闻.通知)');


                                yield  ActionFactory.initialize('projects/scard-ducationBureau/etc/scard-actions.json');


                                var rbacPlugin = EasyNodePlugin.getPlugin('rbac');
                                if(rbacPlugin) {
                                        rbacPlugin.addGuestPermissions('ducationAd.L','ducationAd.C','ducationAd.U','ducationAd.D','ducationAd.R');
                                        rbacPlugin.addGuestPermissions('ducationUser.L','ducationUser.C','ducationUser.U','ducationUser.D','ducationUser.R');
                                        rbacPlugin.addGuestPermissions('ducationMessage.L','ducationMessage.C','ducationMessage.U','ducationMessage.D','ducationMessage.R');
                                        rbacPlugin.addGuestPermissions('qiniu.upToken');
                                }



                        };
                }

                getClassName() {
                        return EasyNode.namespace(__filename);
                }
        }

        module.exports = ProjectEntry;
})();