/**
 * Created by zlbbq on 15-4-23.
 */

define(function(require, exports, module){
    var basic = oo.definePackage('com.beneverse.diagram.shapes.basic');

    //check joint has been linked or not
    function checkJointRuntime() {
        if(!(joint && joint.dia && joint.ui)) {
            throw new Error('Can not find joint library, did you forget link it?');
        }
    }
    checkJointRuntime();

    basic.TextRect = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect/></g><text></text></g>',

        defaults: joint.util.deepSupplement({

            type: 'basic.TextRect',
            attrs: {
                'rect': { fill: '#FFFFFF', stroke: 'black', width: 100, height: 60 },
                'text': { text: '矩形', 'font-size': 14, 'ref-x': .5, 'ref-y': .55, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' }
            }

        }, joint.shapes.basic.Generic.prototype.defaults)
    });

    basic.TextCircle = joint.shapes.basic.Generic.extend({

        markup: '<g class="rotatable"><g class="scalable"><circle/></g><text></text></g>',

        defaults: joint.util.deepSupplement({

            type: 'basic.TextCircle',
            size: { width: 60, height: 60 },
            attrs: {
                'circle': { fill: '#FFFFFF', stroke: 'black', r: 30, transform: 'translate(30, 30)' },
                'text': { text :'圆形', 'font-size': 14, 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .56, ref: 'circle', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' }
            }
        }, joint.shapes.basic.Generic.prototype.defaults)
    });

    basic.TextRhombus = joint.shapes.basic.Path.extend({

        defaults: joint.util.deepSupplement({

            type: 'basic.TextRhombus',
            attrs: {
                'path': { d: 'M 30 0 L 60 30 30 60 0 30 z' },
                'text': { 'ref-y': .55 , 'text' : '菱形'}
            }

        }, joint.shapes.basic.Path.prototype.defaults)
    });

    basic.Path = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><path/></g></g>',
        defaults: joint.util.deepSupplement({

            type: 'basic.Path',
            focusable : false,
            attrs: {
                'path': { fill: 'black', stroke: 'black', 'stroke-width': 2 }
            }
        }, joint.shapes.basic.Generic.prototype.defaults)
    });

    basic.Group = joint.shapes.basic.Generic.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect/></g></g>',

        defaults: joint.util.deepSupplement({

            type: 'basic.Group',
            elements : [],
            attrs: {
                'rect': { fill: 'none', stroke: 'none', width: 100, height: 60 }
            }

        }, joint.shapes.basic.Generic.prototype.defaults)
    });

    module.exports = basic;
});
