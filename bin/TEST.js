require('../src/EasyNode.js');
const logger = using('easynode.framework.Logger').getLogger();
var co = require('co');
var HTTPUtil = using('easynode.framework.util.HTTPUtil');
var net = require('net');
var util = require('util');
var thunkify = require('thunkify');
//var sr = require('sentinel-redis');
//var redis = require('redis');
//var redisClient = redis.createClient(26380, '121.40.202.254');
//redisClient.send_command('SENTINEL', ['get-master-addr-by-name', 'scard-t'], function(err, result){
//        logger.error(result);
//});

//var sentinel = sr([
//        {
//                host : '121.40.202.254', port : 26380
//        },
//        {
//                host : '120.26.112.199', port : 26380
//        },
//        {
//                host : '120.26.112.207', port : 26380
//        }
//]);
//var client = sentinel.createClient('scard-t', {
//        auth_pass : 'zhpwd',
//        db : 0
//});
//
//sentinel.getMaster('scard-t', function(err, master) {
//        logger.error('123456');
//        logger.error(JSON.stringify(master));
//});
//
//client.set('112233', '445566', function(){
//        logger.error('set');
//});


//var ip = '172.16.2.6';
//logger.error(ip.match(/^[172|192|127|10].*$/));
//throw new Error('abc');
co(function * () {
        var Redis = using('easynode.framework.cache.Redis');
        var redis = new Redis();
        redis.initialize('121.40.202.254:26380;120.26.112.199:26380;120.26.112.207:26380;', 0, {
                masterName : 'scard-t',
                auth_pass : 'zhpwd',
                db : 0
        });
        //yield redis.set('112233445566', 'ZLBBQ', 10);
        logger.error(yield redis.get('112233445566'));
}).catch(function (err) {
        logger.error(err);
});
//co(function*() {
//        var o = yield HTTPUtil.getJSON('http://y.c.hzspeed.cn/device/login', 15000, 'POST', {
//                IMEI: '355334050106016',
//                time : new Date().getTime(),
//                modal : 'CBB100-H',
//                sw : '0.0.1'
//        });
//        //var o = yield HTTPUtil.getJSON('http://127.0.0.1:5000/rest/sys/la', 1000, 'GET', {arg:'abc'});
//        logger.error(JSON.stringify(o));
//}).catch(function (err) {
//        logger.error(err);
//});


//var PORT = 3001;
//
//var http = require('http');
//var url = require('url');
//
//var server = http.createServer(function (request, response) {
//        var pathname = url.parse(request.url).pathname;
//        if(pathname == '/index.html') {
//                response.end('Hello');
//        }
//});
//server.listen(PORT);

//var PORT = 3001;
//var koa = require('koa');
//var route = require('koa-route');
//var app = new koa();
//app.use(route.get('/index.html', function * (){
//        this.type = 'html';
//        this.body = 'HELLO, KOA';
//}));
////var staticFileServe = require('koa-static');
////app.use(staticFileServe('/home/zlbbq/development/SVN_40/GitProjects/EasyNode/www'));
//app.listen(PORT);


/**
 * Created by zlbbq on 15-5-7.
 */
//var util = require('util');
//require('../src/EasyNode.js');
//EasyNode.addSourceDirectory('tests/src');
//
//var co = require('co');
//var assert = require('assert');
//var logger = using('easynode.framework.Logger').getLogger();
//var TCRunner = using('easynode.framework.test.TestCaseRunner');
//var net = require('net');
//var MQTTQueue = using('easynode.framework.mq.MQTTQueue');
//var mqtt = new MQTTQueue('mqtt://192.168.0.19');
//var TCPServer = using('easynode.framework.server.tcp.TCPServer');
//var thunkify = require('thunkify');
//
//process.on('uncaughtException', function (err) {
//        logger.error(err);
//});
//
//var packages = [
//        '7E5F00860A02000100333535333334303530303937363630000F060700050E39343630303737303031313139333038004342422D313030480000000000000032303134313232365331310000000000000000000000000000000000000000000000007E'
//        //+ '7E2E001E0306020000333535333334303530303937363630000505020002000000000000000000000000000000000000007E'
//        //+ '7E1D00460301000000333535333334303530303937363630000F0F1F000000007E'
//        + '7E4800C40600020000333535333334303530303937363630000000000000000000000000000000000000000000000000000000000000000000000F06080F383A34363030300000B957A1717E'
//        + '7E4800C40600020000333535333334303530303937363630000000000000000000000000000000000000000000000000000000000000000000000F06080F383A34363030300000B957A1717E'
//        //'7E5F00D00A02000100333535333334303530303937363630000F06090A2B2239343630303235353032333234393039004342422D313030480000000000000032303134313232365331310000000000000000000000000000000000000000000000007E'
//];
//
//var ccms_packages = [
//        '001A000A08002020202020202020202020203135313231303631',
//        '00360005020000000000000000000000000031353132313036310E070F012DF15B00B74D59000010113900070B021C570DAF1C431268',
//        '000C000105000D0A4F4B0D0A'
//
//];
//
//
//co(function * () {
//        var client = net.connect(10089, function () {
//                co(function * () {
//                        logger.error('connected');
//                        client.setNoDelay(true);
//                        //client.setEncoding('hex');
//                        client.write(ccms_packages[0], 'hex');
//                        function sleep(time, cb) {
//                                setTimeout(function () {
//                                        cb(null, null);
//                                }, time);
//                        }
//                        var fnSleep = thunkify(sleep);
//                        yield fnSleep(3000);
//                   //     client.write(ccms_packages[1], 'hex');
//                        yield fnSleep(60*1000);
//                        client.destroy();
//                        logger.error('destroyed');
//                }).catch(function(err){
//                        logger.error(err);
//                });
//        });
//}).catch(function (err) {
//        logger.error(err);
//});

//
//function sleep(time, cb) {
//        setTimeout(function () {
//                cb(null, null);
//        }, time);
//}
//
//var fnSleep = thunkify(sleep);
//
//var obj = {
//        abc: 'ABC',
//        sayHello (hello) {
//                var me = this;
//                return function * () {
//                        logger.error('Original->' + me.abc);
//                        logger.error(hello);
//                        me.abc = 'abc';
//                        return '111';
//                };
//        },
//
//        sayHello2(hello) {
//                logger.error('HELLO2->' + this.abc);
//        }
//};
//
//var AOP = using('easynode.framework.aop.AOP');
//AOP.after(obj, 'sayHello', function (hello) {
//        var me = this;
//        return function * () {
//                logger.error('After->' + me.abc);
//                return [hello + 'PPPPP'];
//        };
//}, AOP.ASYNC);
//
////AOP.after(obj, 'sayHello', function(ret){
////       logger.error('After->' + this.abc);
////       logger.error('RET->' + ret);
////});
//co(function*() {
//        logger.error(yield obj.sayHello('Hello'));
//}).catch(function (err) {
//        logger.error(err);
//});
//co(function * () {
// var counter = 0;
//        while (true) {
//                logger.info('connecting to server...')
//                var client = net.connect(6001, function () {
//                        logger.error('connected');
//                        client.setNoDelay(true);
//                        client.destroy();
//                        logger.error('destroyed');
//                        logger.error('---------->' + counter++);
//                });
//                yield fnSleep(30);
//        }
//});

//co(function * () {
//        var BeanFactory = using('easynode.framework.BeanFactory');
//        yield BeanFactory.initialize('szzh/cbb100-beans.json');
//
//        var queueName = 'DEVICE-DATA-QUEUE';
//        yield BeanFactory.get('redisQueue').subscribe(queueName, {}, {
//                onMessage : function(queueName, msg) {
//                        logger.error('received a message from : ' + queueName)
//                        logger.error(JSON.stringify(msg));
//                }
//        });
//});

//var subscribing = false;
//
//function * ensureSubscribe() {
//        EasyNode.DEBUG && logger.debug('ensure subscribing...');
//        if(subscribing) return ;
//        var obj = yield mqtt.subscribe('test-queue', null, {
//                onMessage: function (queueName, msg) {
//                        logger.error('received a message from ' + queueName + ' : ' + JSON.stringify(msg));
//                },
//
//                onError: function (err) {
//                        err && logger.error(err.message);
//                        subscribing = false;
//                }
//        });
//
//        if(obj != null) {
//                subscribing = true;
//        }
//}

//co(function * () {
//        //setInterval(function () {
//        //        co(function * () {
//        //                var result = yield mqtt.publish('test-queue', null, {name: 'zlbbq'});
//        //                if(result) {
//        //                        logger.info('send message success');
//        //                }
//        //                else {
//        //                        logger.error('send message fail');
//        //                }
//        //        }).catch(function(err){
//        //                logger.error(err);
//        //        });
//        //}, 1000);
//        //
//        //setInterval(function(){
//        //        co(ensureSubscribe).catch(function(err){logger.error(err);});
//        //}, 5000);
//
//
//        //start a simple koa http server
//        //yield TCRunner.run('easynode.tests.SimpleKOAHttpServerTest');
//
//        //mvc-action(Controller)
//        //yield TCRunner.run('easynode.tests.ActionTest');
//
//        //mvc
//        //yield TCRunner.run('easynode.tests.MVCTest');
//
//        //middleware and routes
//        //yield TCRunner.run('easynode.tests.KOAMiddlewareTest');
//
//        //session
//        //yield TCRunner.run('easynode.tests.KOASessionTest');
//
//        //action context
//        //yield TCRunner.run('easynode.tests.ActionContextTest');
//
//        //plugin test
//        //yield TCRunner.run('easynode.tests.PluginTest');
//
//
//        //var server = new TCPServer();
//        //var protocol = using('easynode.framework.server.tcp.protocols.*');
//        //
//        //var decoder = new protocol.JSONDecoder(server);
//        //var encoder = new protocol.JSONEncoder(server);
//        //var handler = new protocol.JSONMessageHandler(server);
//        //
//        //server.setDecoder(decoder).setEncoder(encoder).setMessageHandler(handler);
//        //yield server.start();
//}).catch(function (err) {
//        logger.error(err);
//});


//var CombinedAction = using('easynode.framework.mvc.CombinedAction');
////增加Action
//var ActionFactory = using('easynode.framework.mvc.ActionFactory');
//var Action = using('easynode.framework.mvc.Action');
//var ActionResult = using('easynode.framework.mvc.ActionResult');
//
//var _a1 = new Action();
//_a1.process = function(ctx, preProcessed) {
//        return function * () {
//                logger.info('a1 process');
//                return ActionResult.createSuccessResult();
//        };
//};
//Action.define('demo', 'a1', _a1);
//ActionFactory.register(_a1);
//
//var _a2 = new Action();
//_a2.process = function(ctx, preProcessed) {
//        return function * () {
//                logger.info('a2 process');
//                logger.error(preProcessed);
//                return ActionResult.createErrorResult();
//        };
//};
//
//Action.define('demo', 'a2', _a2);
//ActionFactory.register(_a2);
//
//var _action = new CombinedAction();
//_action.combine('demo', 'a1');
//_action.combine('demo', 'a2');
//
//_action.setProcessListener('before', '*', function(ctx, combinedResult){
//        return function * () {
//                logger.error('before *');
//        };
//});
//_action.setProcessListener('after', '*', function(ctx, combinedResult){
//        return function * () {
//                logger.error('after *');
//                return ActionResult.createErrorResult();
//        };
//});
//_action.setProcessListener('before', 'demo.a1', function(ctx, combinedResult){
//        return function * () {
//                logger.error('before a1');
//        };
//});
//_action.setProcessListener('after', 'demo.a1', function(ctx, combinedResult){
//        return function * () {
//                logger.error('after a1');
//        };
//});
//
//_action.setProcessListener('before', 'demo.a2', function(ctx, combinedResult){
//        return function * () {
//                logger.error('before a2');
//        };
//});
//_action.setProcessListener('after', 'demo.a2', function(ctx, combinedResult){
//        return function * () {
//                logger.error('after a2');
//        };
//});
//
//
//
//
//
//
//Action.define('demoMMM', 'demoAAA', _action);
//ActionFactory.register(_action);
//
//
//var temp = ActionFactory.createActionInstance('demoMMM', 'demoAAA');
//
//var KOAHttpServer = using('easynode.framework.server.http.KOAHttpServer');
//var server = new KOAHttpServer();
//co(function * (){
//
//        server.addMiddleware(function * (next) {
//                if(this.session.user == null) {
//                        logger.info('模拟用户登录');
//                        this.session.user = {
//                                id : 'zlbbq',
//                                name : '张磊'
//                        };
//                }
//
//                if(this.session.SYS == null) {
//                        logger.info('模拟Sys登录');
//                        this.session.SYS = 'sys';
//                }
//                yield next;
//        });
//
//        server.setSessionStorage(KOAHttpServer.SessionSupport.STORAGE_MEMORY);
//        var PluginLoadContext = using('easynode.framework.plugin.PluginLoadContext');
//        var EasyNodePlugin = using('easynode.framework.plugin.EasyNodePlugin');
//        var loadCtx = new PluginLoadContext(null, null, null, server);
//        yield EasyNodePlugin.load(loadCtx);
//        yield server.start();
//}).catch(function(err){
//        logger.error(err);
//});

//process.exit();
/*
 var Memcached = using('easynode.framework.cache.Memcached');
 var cache = new Memcached("192.168.0.25:11211");

 var MySqlDataSource = using('easynode.framework.db.MysqlDataSource');
 var mysqlOptions = {
 host: '192.168.0.25',
 port: 3306,
 user: 'root',
 password: 'zlbbq99',
 database: 'easynode',
 acquireTimeout: 3000,
 waitForConnections: true,
 connectionLimit: 2,
 queueLimit: 2
 };
 var ds = new MySqlDataSource(mysqlOptions);
 ds.initialize();

 var Model = using('easynode.framework.mvc.Model');
 class MyModel extends Model {
 constructor() {
 super('EN_PLUGINS_TEST', 'SELECT * FROM EN_PLUGINS_TEST');
 }

 defineFields() {
 this
 .defineField('recordId', 'int')
 .defineField('pluginName', 'string')
 .defineField('pluginVersion', 'string')
 .defineField('pluginId', 'int')
 .defineField('jsonTest', 'json')
 ;
 }
 }


 // redis session存储
 //server.setSessionStorage(KOAHttpServer.SessionSupport.STORAGE_REDIS, {
 //        host : '127.0.0.1',
 //        port : 6379
 //});

 // memcached session存储
 //server.setSessionStorage(KOAHttpServer.SessionSupport.STORAGE_MEMCACHED, {
 //        host : '127.0.0.1',
 //        port : 11211
 //});

 // memory session 存储
 server.setSessionStorage(KOAHttpServer.SessionSupport.STORAGE_MEMORY);

 //增加一个WEB目录。
 //server.addWebDirs('plugins/demo/www/');

 //增加一个中间件
 //server.addMiddleware(function * (next) {
 //        console.log('this message is printed anytime');
 //        console.log(this.parameter.param('a'));
 //        console.log(this.parameter.param('b'));
 //        console.log(this.parameter.dateParam('c'));
 //        yield next;
 //});

 //增加一个在路由之后的中间件
 //server.addMiddlewareAfterRoutes(function * (next) {
 //        console.log('this message is printed when no route was found');
 //        this.type = 'json';
 //        this.body = {
 //                hello : 'EasyNode'
 //        };
 //        yield next;
 //});

 //增加一个路由
 //server.addRoute('get', '/abc.jsp', function * () {
 //        this.body = 'This is abc.jsp';
 //});

 //设置ContextHook,
 server.setActionContextListener({
 onCreate: function (ctx) {
 return function * () {
 ctx.setCache(cache);
 ctx.setConnection(yield ds.getConnection());
 yield ctx.getConnection().beginTransaction();
 };
 },
 onDestroy: function (ctx) {
 return function * () {
 yield ctx.getConnection().commit();
 yield ds.releaseConnection(ctx.getConnection());
 };
 },

 onError: function (ctx, err) {
 return function * () {
 yield ctx.getConnection().rollback();
 !err.executeResult  && logger.error(err.stack);
 };
 }
 });

 var TemplateView = using('easynode.framework.mvc.TemplateView');
 class MyAction extends Action {
 constructor() {
 super();

 this.addArg('a array(int) commentA');
 //this.setView(new TemplateView('test.mst'));
 }

 process(ctx, a, b) {
 var me = this;
 return function * () {
 me.throwErrorResult(new ActionResult(100, {}, 'HELLO, ERROR'));

 var cache = ctx.cache;
 yield cache.set('111', 'abc');
 var val = yield cache.get('111');
 logger.error(val);
 logger.error(a + '->' + typeof a + '->' + util.isArray(a) + '->' + typeof a[0]);
 logger.error(b);
 var r = new ActionResult();
 r.error(1123);
 var model = new MyModel();
 model.merge({
 pluginName: 'testXX',
 pluginVersion: '0.1.0',
 pluginId: 9,
 jsonTest: {
 name: 'zlbbq'
 }
 });
 //logger.info(yield ctx.getConnection().create(model));
 var data = yield ctx.getConnection().read(model, 1)
 logger.info(data);

 //data.jsonTest = {name : 'ZLBBQ'};
 //model = new MyModel().merge(data);
 //logger.info(yield ctx.getConnection().update(model));

 //yield ctx.getConnection().del(model, [3]);

 var sqlLogic = 'AND ($pluginName$ OR $pluginVersion$) AND $jsonTest$';

 //var res = yield ctx.getConnection().list(model, {
 //        pluginName : {
 //                exp : '$',
 //                value : '100'
 //        },
 //        pluginVersion : {
 //                exp : '-',
 //                value : [100, 200]
 //        }
 //}, null, null, sqlLogic);
 var res = yield ctx.getConnection().list(model, {
 pluginName: {
 exp: 'like',
 value: 'framework'
 }
 }, null, ['pluginName     DESC', 'pluginVersion    ASC']);

 logger.info(res);
 //throw new Error('111111');
 return r;
 };
 }
 }

 Action.define('demoM', 'demoA', MyAction);

 ActionFactory.register(MyAction);

 var MysqlModelGenerator = using('easynode.framework.mvc.spi.MysqlModelGenerator');

 //启动服务
 co(function * () {
 var ActionResult = using('easynode.framework.mvc.ActionResult');

 yield MysqlModelGenerator.generate(ds, 'easynode',
 {name: 'Plugin', table: 'EN_PLUGINS', view: 'EN_PLUGINS'},
 {name: 'CMSContent', table: 'CMS_CONTENT', view: 'CMS_CONTENT'}
 );

 var ModelProxyActionFactory = using('easynode.framework.mvc.ModelProxyActionFactory');

 var factory = new ModelProxyActionFactory({
 getModel: function () {
 return MysqlModelGenerator.getModel('Plugin');
 }
 }, 'demoMPA');

 ActionFactory.register(factory.getCreateAction());
 ActionFactory.register(factory.getReadAction());
 ActionFactory.register(factory.getUpdateAction());
 ActionFactory.register(factory.getDelAction());
 ActionFactory.register(factory.getListAction());

 var conn = yield ds.getConnection();
 //var plugins = yield conn.execQuery('SELECT * FROM EN_PLUGINS WHERE PLUGIN_NAME = #n#', {n: 'basic'});
 //yield conn.beginTransaction();
 //var plugins = yield conn.execQuery('SELECT * FROM EN_PLUGINS');
 //logger.info(JSON.stringify(plugins));
 //
 //
 //var o = yield conn.execUpdate('UPDATE EN_PLUGINS SET PLUGIN_NAME = "BASic" WHERE PLUGIN_NAME = "basic"');
 //logger.info(JSON.stringify(o));

 var model = MysqlModelGenerator.getModel('Plugin');
 var basic = yield conn.read(model, 'basic');
 logger.error(basic);

 model = MysqlModelGenerator.getModel('CMSContent');
 var cmsContent = yield conn.read(model, 6);
 logger.error(cmsContent);

 yield conn.commit();
 yield ds.releaseConnection(conn);
 yield server.start();
 }).catch(onError);

 //错误处理
 function onError(err) {
 logger.error(typeof err.message);
 logger.error(err);
 }
 */