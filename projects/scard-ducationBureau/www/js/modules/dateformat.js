/**
 * Created by zlbbq on 14-12-5.
 */

define(function(require, exports, module){
    function _isInvalidDate(d) {
        return d == null || d === 'Invalid Date' || d.getTime() == 0 || isNaN(d.getTime());
    }

    function _page2Host(sDate) {
        var d = Date.parse(sDate, 'yyyy年MM月dd日');
        return d == null ? '' : d.format('yyyyMMdd');
    }

    function _host2Page(sDate,format) {
        format=format||'yyyy年MM月dd日';
        if(!sDate) {
            return '-';
        }
        var d = Date.originalParse(sDate);
        d = new Date(d);
        if(_isInvalidDate(d)) {
            return '-';
        }
        return d.getTime() == 0 ? '' : d.format(format);
    }

    function _page2Host_T(sDate) {
        if(!sDate) {
            return '-';
        }
        var d = Date.parse(sDate, 'yyyy年MM月dd日 HH:mm:ss');
        return d == null ? '' : d.format('yyyyMMddHHmmss');
    }

    function _hostStr2Page_T(sDate, needSeconds) {
        if(!sDate) {
            return '-';
        }
        var d = Date.parse(sDate, 'yyyyMMddHHmmss');
        var fmt = needSeconds === true ? 'yyyy年MM月dd日 HH:mm:ss' : 'yyyy年MM月dd日 HH:mm';
        return d == null ? '' : d.format(fmt);
    }

    function _host2Page_T(sDate, needSeconds) {
        if(!sDate) {
            return '-';
        }
        var d = Date.originalParse(sDate);
        d = new Date(d);
        if(_isInvalidDate(d)) {
            return '-';
        }
        var fmt = needSeconds === true ? 'yyyy年MM月dd日 HH:mm:ss' : 'yyyy年MM月dd日 HH:mm';
        return d == null ? '' : d.format(fmt);
    }

    function _convert2Format(sDate, fmtSrc, fmtDest) {
        if(!sDate) {
            return '-';
        }
        var d = Date.parse(sDate, fmtSrc);
        return d == null ? '' : d.format(fmtDest);
    }

    function _convert2Page(sDate, fmtSrc, needSeconds) {
        if(!sDate) {
            return '-';
        }
        var d = Date.parse(sDate, fmtSrc);
        var fmt = needSeconds === true ? 'yyyy年MM月dd日 HH:mm:ss' : 'yyyy年MM月dd日 HH:mm';
        return d == null ? '' : d.format(fmt);
    }

    function _seconds2Days(time) {
        if(isNaN(time) || time <= 0) {
            return ['', 0, 0, 0, 0];
        }
        time = parseFloat(time);
        var days = 0;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
        if (null != time && "" != time) {
            if(time < 60) {
                seconds = parseInt(time);
            }
            if (time > 60 && time < 60 * 60) {
                minutes = parseInt(time / 60.0);
                seconds = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
            }
            else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                hours = parseInt(time / 3600.0);
                minutes =  parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
                seconds = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
            }
            else {
                hours = parseInt(time / 3600.0);
                minutes =  parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
                seconds = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
                days = parseInt(hours / 24);
                hours = parseInt((parseFloat(hours / 24.0) - parseInt(hours / 24.0)) * 24);
            }
        }
        var s = [];
        if(days > 0) {
            s.push(days + '天');
        }
        if(hours > 0 || s.length > 0) {
            s.push(hours + '小时');
        }
        if(minutes > 0 || s.length > 0) {
            s.push(minutes + '分钟');
        }
        s.push(seconds + '秒');
        var ret = [];
        ret[0] = s.join('');
        ret[1] = days;
        ret[2] = hours;
        ret[3] = minutes;
        ret[4] = seconds;
        return ret;
    }

    module.exports.page2Host = _page2Host;
    module.exports.host2Page = _host2Page;
    module.exports.page2Host_T = _page2Host_T;
    module.exports.hostStr2Page_T = _hostStr2Page_T;
    module.exports.host2Page_T = _host2Page_T;
    module.exports.convert2Format = _convert2Format;
    module.exports.convert2Page = _convert2Page;
    module.exports.seconds2Days = _seconds2Days;
});
