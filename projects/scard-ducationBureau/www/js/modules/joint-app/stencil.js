define(function(require, exports, module){
    var diagram = oo.definePackage('com.beneverse.diagram');

    //check joint has been linked or not
    function checkJointRuntime() {
        if(!(joint && joint.dia && joint.ui)) {
            throw new Error('Can not find joint library, did you forget link it?');
        }
    }
    checkJointRuntime();

    /**
     *
     * cfg.el = '#div';      //jQuery selector pointer to the DOM canvas
     * cfg.cols = 2;         //cols of canva
     * cfg.marginH = 10;     //margin of every shape in horizontal direction
     * cfg.marginV = 10;     //margin of every share in vertical direction
     * cfg.width = 50;       //width of every shape
     * cfg.height = 30;      //height of every shape
     * */
    diagram.Stencil = function(canvas, cfg) {
        cfg = cfg || {};
        this.cols = cfg.cols ? cfg.cols : 3;
        this.marginH = cfg.marginH ? cfg.marginH : 10;
        this.marginV = cfg.marginV ? cfg.marginV : 10;
        this.shapeWidth = cfg.width ? cfg.width : 50;
        this.shapeHeight = cfg.height ? cfg.height : 30;
        this.el = cfg.el;       //where to place the paper, it's a jQuery selector
        this.shapeTypes = [];
        this.canvas = canvas;
        this.graph = null;
        this.paper = null;
    };

    /**
     * @argument {Array} shapeTypes, shape classes to add to the stencil, note : every element of passed array is
     * shape class not an instance of shape class.
     * */
    diagram.Stencil.prototype.load = function(shapeTypes) {
        this.shapeTypes = this.shapeTypes.concat(shapeTypes);
        return this;
    };

    diagram.Stencil.prototype._getDimension = function() {
        var totalRows = parseInt(this.shapeTypes.length / this.cols);
        var mod = this.shapeTypes.length % this.cols;
        totalRows = mod == 0 ? totalRows : totalRows + 1;
        var height = this.marginV + (this.shapeHeight + this.marginV) * totalRows; //top margin + row height
        var width = this.marginH + (this.shapeWidth + this.marginH) * this.cols;
        return  {width : width, height : height};
        //return {width : 300, height: 200};
    };

    diagram.Stencil.prototype.render = function() {
        var me = this;
        var dimension = this._getDimension();
        var StaticElementView = joint.dia.ElementView.extend({
            pointermove: function(evt, x, y) {}
        });
        this.graph = new joint.dia.Graph();
        this.paper = new joint.dia.Paper({
            el: $(me.el),
            width: dimension.width,
            height: dimension.height,
            model: me.graph,
            gridSize: 1,
            elementView: StaticElementView
        });

        for(var i = 0;i<this.shapeTypes.length;i++) {
            var row = parseInt(i / this.cols);
            var col = i % this.cols;
            var x = this.marginH + (this.shapeWidth + this.marginH) * col;
            var y = this.marginV + (this.shapeHeight + this.marginV) * row;
            var rect = {
                x : x,
                y : y,
                w : this.shapeWidth,
                h : this.shapeHeight
            };
            var shape = new this.shapeTypes[i]({
                position: { x: rect.x, y: rect.y }, size: { width: rect.w, height: rect.h }
            });
            this.graph.addCell(shape);
        }

        //this.paper.$el.css('pointer-events', 'none');         //shutdown all events
        this.paper.on('cell:pointerdblclick', function(cellView, event, x, y) {
            var elementModel = cellView.model;
            var element = elementModel.clone();
            me.canvas.model.addCell(element);
            element.resize(me.shapeWidth * 2, me.shapeHeight * 2);
            element.translate();
            element.translate(5, 5);
            me.canvas.selectSingle(element);
        });
    };



    module.exports = diagram.Stencil;
});