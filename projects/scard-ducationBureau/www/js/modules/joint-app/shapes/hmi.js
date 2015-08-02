/**
 * Created by zlbbq on 15-4-23.
 */

define(function(require, exports, module){
    var hmi = oo.definePackage('com.beneverse.diagram.shapes.hmi');

    //check joint has been linked or not
    function checkJointRuntime() {
        if(!(joint && joint.dia && joint.ui)) {
            throw new Error('Can not find joint library, did you forget link it?');
        }
    }



    checkJointRuntime();
    module.exports = {

    };
});
