/**
 * Created by zlbbq on 15-5-6.
 */
define(function(require, exports, module){
    require('$');
    require('bootstrap2');
    require('./assets/javascripts/plugins/mobile_events/jquery.mobile-events.min.js');
//    require('./assets/javascripts/jquery/jquery-migrate.min.js');
    require('./assets/javascripts/jquery_ui/jquery-ui.min.js');
//    require('./assets/javascripts/plugins/flot/excanvas.js');
//    require('./assets/javascripts/plugins/sparklines/jquery.sparkline.min.js');
//    require('./assets/javascripts/plugins/flot/flot.min.js');
//    require('./assets/javascripts/plugins/flot/flot.resize.js');
//    require('./assets/javascripts/plugins/flot/flot.pie.js');
//    require('./assets/javascripts/plugins/bootstrap_switch/bootstrapSwitch.min.js');
//    require('./assets/javascripts/plugins/fullcalendar/fullcalendar.min.js');
      require('./assets/javascripts/plugins/datatables/jquery.dataTables.min.js');
//    require('./assets/javascripts/plugins/datatables/jquery.dataTables.columnFilter.js');
//    require('./assets/javascripts/plugins/common/wysihtml5.min.js');
//    require('./assets/javascripts/plugins/common/bootstrap-wysihtml5.js');
      require('./assets/javascripts/plugins/select2/select2.js');
//    require('./assets/javascripts/plugins/bootstrap_colorpicker/bootstrap-colorpicker.min.js');
//    require('./assets/javascripts/plugins/mention/mention.min.js');
//    require('./assets/javascripts/plugins/input_mask/bootstrap-inputmask.min.js');
    require('./assets/javascripts/plugins/fileinput/bootstrap-fileinput.js');
//    require('./assets/javascripts/plugins/modernizr/modernizr.min.js');
//    require('./assets/javascripts/plugins/retina/retina.js');
    require('./assets/javascripts/plugins/fileupload/tmpl.min.js');
    require('./assets/javascripts/plugins/fileupload/load-image.min.js');
    require('./assets/javascripts/plugins/fileupload/canvas-to-blob.min.js');
   require('./assets/javascripts/plugins/fileupload/jquery.iframe-transport.min.js');
    require('./assets/javascripts/plugins/fileupload/jquery.fileupload.min.js');
    require('./assets/javascripts/plugins/fileupload/jquery.fileupload-fp.min.js');
    require('./assets/javascripts/plugins/fileupload/jquery.fileupload-ui.min.js');
      require('./assets/javascripts/plugins/fileupload/jquery.fileupload-init.js');
 //   require('./assets/javascripts/plugins/timeago/jquery.timeago.js');
//    require('./assets/javascripts/plugins/slimscroll/jquery.slimscroll.min.js');
//    require('./assets/javascripts/plugins/autosize/jquery.autosize-min.js');
//    require('./assets/javascripts/plugins/charCount/charCount.js');
//    require('./assets/javascripts/plugins/validate/jquery.validate.min.js');
//    require('./assets/javascripts/plugins/validate/additional-methods.js');
      require('./assets/javascripts/plugins/naked_password/naked_password-0.2.4.min.js');
//    require('./assets/javascripts/plugins/nestable/jquery.nestable.js');
//    require('./assets/javascripts/plugins/tabdrop/bootstrap-tabdrop.js');
//    require('./assets/javascripts/plugins/jgrowl/jquery.jgrowl.min.js');
//    require('./assets/javascripts/plugins/bootbox/bootbox.min.js');
      require('./assets/javascripts/plugins/xeditable/bootstrap-editable.min.js');
//    require('./assets/javascripts/plugins/xeditable/wysihtml5.js');
//    require('ckeditor');            //CKEditor is defined yet
      require('./assets/javascripts/plugins/dynatree/jquery.dynatree.min.js');
//    require('./assets/javascripts/plugins/bootstrap_datetimepicker/bootstrap-datetimepicker.js');
//    require('./assets/javascripts/plugins/bootstrap_daterangepicker/moment.min.js');
//    require('./assets/javascripts/plugins/bootstrap_daterangepicker/bootstrap-daterangepicker.js');
//    require('./assets/javascripts/plugins/bootstrap_maxlength/bootstrap-maxlength.min.js');
//    require('./assets/javascripts/plugins/bootstrap_hover_dropdown/twitter-bootstrap-hover-dropdown.min.js');
//    require('./assets/javascripts/plugins/slider_nav/slidernav-min.js');
//    require('./assets/javascripts/plugins/fuelux/wizard.js');
    //require('./assets/javascripts/nav.js');
    //require('./assets/javascripts/tables.js');
    //require('./assets/javascripts/theme.js');
    //require('./assets/javascripts/demo/jquery.mockjax.js');
    //require('./assets/javascripts/demo/inplace_editing.js');
    //require('./assets/javascripts/demo/charts.js');
    //require('./assets/javascripts/demo/demo.js');

    /**Amaze UI extension*/
    (function(){
        /**
         * 使AmazeUI的selected控件支持动态改变值
         * */
        $.fn.changeSelectedIndex = function(idx) {
            if(this.is('select')) {
                var btn = this.next().find(':first-child');
                if(btn.is('button') && btn.hasClass('selected-btn')) {
                    var val = this.find('option').eq(idx).attr('value');
                    var itemLi = this.next().find('div > ul > li[data-value='+val+']');
                    itemLi.click();
                }
                else {
                    this.find('option').eq(idx).attr('selected', true);
                }
            }
        };

        $.fn.changeSelectedVal = function(val) {
            if(this.is('select')) {
                var btn = this.next().find(':first-child');
                if(btn.is('button') && btn.hasClass('selected-btn')) {
                    var itemLi = this.next().find('div > ul > li[data-value='+val+']');
                    itemLi.click();
                }
                else {
                    this.find('option[value='+val+']').attr('selected', true);
                }
            }
        };


        $.fn.hideSelect = function(){
            if(this.is('select')) {
                var btn = this.next().find(':first-child');
                if(btn.is('button') && btn.hasClass('selected-btn')) {
                    this.next().hide();
                }
                else {
                    this.hide();
                }
            }
        };

        $.fn.showSelect = function(){
            if(this.is('select')) {
                var btn = this.next().find(':first-child');
                if(btn.is('button') && btn.hasClass('selected-btn')) {
                    this.next().show();
                }
                else {
                    this.show();
                }
            }
        };
        $.fn.disableSelect = function(){
            if(this.is('select')) {
                var btn = this.next().find(':first-child');
                if(btn.is('button') && btn.hasClass('selected-btn')) {
                    btn.attr("disabled",true);
                }
            }
        };
        $.fn.enableSelect = function(){
            if(this.is('select')) {
                var btn = this.next().find(':first-child');
                if(btn.is('button') && btn.hasClass('selected-btn')) {
                    btn.attr("disabled",false);
                }
            }
        };
    })($)
});