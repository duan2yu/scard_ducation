window.EasyNode = {};

(function execPolyFillAction() {
        window.EasyNode.action = {
                defaults: {
                        ACTION_URI: '/action',
                        ACTION_SUCCESS_CODE: 0,
                        ACTION_TIME_OUT: 5000
                },
                request: function (uri, args, method, timeout, callback) {
                        if (arguments.length == 2 && typeof args == 'function') {
                                callback = args;
                                args = null;
                        }
                        else if (arguments.length == 3 && typeof method == 'function') {
                                callback = method;
                                method = null;
                        }
                        else if (arguments.length == 4 && typeof timeout == 'function') {
                                callback = timeout;
                                timeout = 0;
                        }
                        args = args || {};
                        method = method || 'GET';
                        timeout = timeout || window.EasyNode.action.defaults.ACTION_TIME_OUT;
                        var originalCallback = callback || function () {
                                        console.log('unhandled action callback [' + uri + ']');
                                };
                        callback = function (err, result) {
                                if (window.EasyNode.action.handleErrors(err, result)) {
                                        originalCallback(result.result);
                                }
                                else {
                                        console.error(window.EasyNode.action.error(err, result));
                                }
                        };
                        if (/\/[a-zA-Z]+[a-zA-Z0-9\-_]*\/[a-zA-Z]+[a-zA-Z0-9\-_]*\??.*/.test(uri)) {
                                var options = {};
                                options.url = window.EasyNode.action.defaults.ACTION_URI + uri;
                                options.type = method;
                                options.data = args;
                                options.dataType = 'json';
                                options.timeout = timeout;
                                options.error = function (xmlHttpRequest, msg, err) {
                                        if (err && err.message) {
                                                switch (msg) {
                                                        case 'timeout':
                                                        {
                                                                msg = 'JSON API请求超时, 超过设定值[' + (timeout / 1000) + ']秒, 请求参数: [' + $.toJSON(args) + ']';
                                                                break;
                                                        }
                                                        case 'error':
                                                        {
                                                                msg = 'JSON API请求发生异常[' + err.message + ']';
                                                                break;
                                                        }
                                                }
                                                var error = new Error(msg);
                                                callback && callback(error, null);
                                        }
                                        else {
                                                callback && callback(new Error('网络或服务错误'));
                                        }
                                };
                                options.success = function (actionResult) {
                                        callback && callback(null, actionResult);
                                };
                                $.ajax(options);
                        }
                        else {
                                var err = new Error('错误的Restful地址: ' + uri);
                                callback && callback(err, null);
                        }
                },
                error: function (err, result) {
                        if (err) {
                                return err.message;
                        }
                        else if (result) {
                                return result.msg + '(' + result.code + ')';
                        }
                        else {
                                return 'Unknown Error';
                        }
                },
                success: function (err, result) {
                        if (!err && result && result.code === window.EasyNode.action.defaults.ACTION_SUCCESS_CODE) {
                                return true;
                        }
                },
                handleErrors: function (err, result) {
                        if (window.EasyNode.action.success(err, result)) {
                                return true;
                        }
                        else {
                                //TODO handle general errors
                                return false;
                        }
                }
        };
})();

(function execPolyFillDateUtils() {
        //使用npm->date-utils日期库
        !function () {
                function e(e, t) {
                        for (e = String(e); e.length < t;)e = "0" + e;
                        return e
                }

                function t(e, t) {
                        void 0 === Date.prototype[e] && (Date.prototype[e] = t)
                }

                var n = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], r = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], s = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], i = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], u = {
                        su: 0,
                        sun: 0,
                        sunday: 0,
                        mo: 1,
                        mon: 1,
                        monday: 1,
                        tu: 2,
                        tue: 2,
                        tuesday: 2,
                        we: 3,
                        wed: 3,
                        wednesday: 3,
                        th: 4,
                        thu: 4,
                        thursday: 4,
                        fr: 5,
                        fri: 5,
                        friday: 5,
                        sa: 6,
                        sat: 6,
                        saturday: 6
                }, o = r.concat(n), a = ["su", "sun", "sunday", "mo", "mon", "monday", "tu", "tue", "tuesday", "we", "wed", "wednesday", "th", "thu", "thursday", "fr", "fri", "friday", "sa", "sat", "saturday"], h = {
                        jan: 0,
                        january: 0,
                        feb: 1,
                        february: 1,
                        mar: 2,
                        march: 2,
                        apr: 3,
                        april: 3,
                        may: 4,
                        jun: 5,
                        june: 5,
                        jul: 6,
                        july: 6,
                        aug: 7,
                        august: 7,
                        sep: 8,
                        september: 8,
                        oct: 9,
                        october: 9,
                        nov: 10,
                        november: 10,
                        dec: 11,
                        december: 11
                }, l = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], g = function (e) {
                        return e.match(/^(\d+)$/) ? !0 : !1
                }, d = function (e, t, n, r) {
                        for (var s = r; s >= n; s--) {
                                var i = e.substring(t, t + s);
                                if (i.length < n)return null;
                                if (g(i))return i
                        }
                        return null
                }, f = Date.parse, c = function (e, t) {
                        e += "", t += "";
                        for (var n, r, s = 0, i = 0, u = "", h = "", l = new Date, g = l.getYear(), f = l.getMonth() + 1, c = 1, M = 0, D = 0, m = 0, y = ""; i < t.length;) {
                                for (u = t.charAt(i), h = ""; t.charAt(i) === u && i < t.length;)h += t.charAt(i++);
                                if ("yyyy" === h || "yy" === h || "y" === h) {
                                        if ("yyyy" === h && (n = 4, r = 4), "yy" === h && (n = 2, r = 2), "y" === h && (n = 2, r = 4), g = d(e, s, n, r), null === g)return 0 / 0;
                                        s += g.length, 2 === g.length && (g = g > 70 ? 1900 + (g - 0) : 2e3 + (g - 0))
                                } else if ("MMM" === h || "NNN" === h) {
                                        f = 0;
                                        for (var v = 0; v < o.length; v++) {
                                                var T = o[v];
                                                if (e.substring(s, s + T.length).toLowerCase() === T.toLowerCase() && ("MMM" === h || "NNN" === h && v > 11)) {
                                                        f = v + 1, f > 12 && (f -= 12), s += T.length;
                                                        break
                                                }
                                        }
                                        if (1 > f || f > 12)return 0 / 0
                                } else if ("EE" === h || "E" === h)for (var C = 0; C < a.length; C++) {
                                        var U = a[C];
                                        if (e.substring(s, s + U.length).toLowerCase() === U.toLowerCase()) {
                                                s += U.length;
                                                break
                                        }
                                } else if ("MM" === h || "M" === h) {
                                        if (f = d(e, s, h.length, 2), null === f || 1 > f || f > 12)return 0 / 0;
                                        s += f.length
                                } else if ("dd" === h || "d" === h) {
                                        if (c = d(e, s, h.length, 2), null === c || 1 > c || c > 31)return 0 / 0;
                                        s += c.length
                                } else if ("hh" === h || "h" === h) {
                                        if (M = d(e, s, h.length, 2), null === M || 1 > M || M > 12)return 0 / 0;
                                        s += M.length
                                } else if ("HH" === h || "H" === h) {
                                        if (M = d(e, s, h.length, 2), null === M || 0 > M || M > 23)return 0 / 0;
                                        s += M.length
                                } else if ("KK" === h || "K" === h) {
                                        if (M = d(e, s, h.length, 2), null === M || 0 > M || M > 11)return 0 / 0;
                                        s += M.length
                                } else if ("kk" === h || "k" === h) {
                                        if (M = d(e, s, h.length, 2), null === M || 1 > M || M > 24)return 0 / 0;
                                        s += M.length, M--
                                } else if ("mm" === h || "m" === h) {
                                        if (D = d(e, s, h.length, 2), null === D || 0 > D || D > 59)return 0 / 0;
                                        s += D.length
                                } else if ("ss" === h || "s" === h) {
                                        if (m = d(e, s, h.length, 2), null === m || 0 > m || m > 59)return 0 / 0;
                                        s += m.length
                                } else if ("a" === h) {
                                        if ("am" === e.substring(s, s + 2).toLowerCase())y = "AM"; else {
                                                if ("pm" !== e.substring(s, s + 2).toLowerCase())return 0 / 0;
                                                y = "PM"
                                        }
                                        s += 2
                                } else {
                                        if (e.substring(s, s + h.length) !== h)return 0 / 0;
                                        s += h.length
                                }
                        }
                        if (s !== e.length)return 0 / 0;
                        if (2 === f)if (g % 4 === 0 && g % 100 !== 0 || g % 400 === 0) {
                                if (c > 29)return 0 / 0
                        } else if (c > 28)return 0 / 0;
                        if ((4 === f || 6 === f || 9 === f || 11 === f) && c > 30)return 0 / 0;
                        12 > M && "PM" === y ? M = M - 0 + 12 : M > 11 && "AM" === y && (M -= 12);
                        var w = new Date(g, f - 1, c, M, D, m);
                        return w.getTime()
                };
                Date.parse = function (e, t) {
                        if (t)return c(e, t);
                        var n, r = f(e), s = 0;
                        return isNaN(r) && (n = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(e)) && ("Z" !== n[8] && (s = 60 * +n[10] + +n[11], "+" === n[9] && (s = 0 - s)), n[7] = n[7] || "000", r = Date.UTC(+n[1], +n[2] - 1, +n[3], +n[4], +n[5] + s, +n[6], +n[7].substr(0, 3))), r
                }, Date.today = function () {
                        return (new Date).clearTime()
                }, Date.UTCtoday = function () {
                        return (new Date).clearUTCTime()
                }, Date.tomorrow = function () {
                        return Date.today().add({days: 1})
                }, Date.UTCtomorrow = function () {
                        return Date.UTCtoday().add({days: 1})
                }, Date.yesterday = function () {
                        return Date.today().add({days: -1})
                }, Date.UTCyesterday = function () {
                        return Date.UTCtoday().add({days: -1})
                }, Date.validateDay = function (e, t, n) {
                        var r = new Date(t, n, e);
                        return r.getFullYear() === t && r.getMonth() === n && r.getDate() === e
                }, Date.validateYear = function (e) {
                        return e >= 0 && 9999 >= e
                }, Date.validateSecond = function (e) {
                        return e >= 0 && 60 > e
                }, Date.validateMonth = function (e) {
                        return e >= 0 && 12 > e
                }, Date.validateMinute = function (e) {
                        return e >= 0 && 60 > e
                }, Date.validateMillisecond = function (e) {
                        return e >= 0 && 1e3 > e
                }, Date.validateHour = function (e) {
                        return e >= 0 && 24 > e
                }, Date.compare = function (e, t) {
                        return e.valueOf() < t.valueOf() ? -1 : e.valueOf() > t.valueOf() ? 1 : 0
                }, Date.equals = function (e, t) {
                        return e.valueOf() === t.valueOf()
                }, Date.equalsDay = function (e, t) {
                        return e.toYMD() === t.toYMD()
                }, Date.getDayNumberFromName = function (e) {
                        return u[e.toLowerCase()]
                }, Date.getMonthNumberFromName = function (e) {
                        return h[e.toLowerCase()]
                }, Date.getMonthNameFromNumber = function (e) {
                        return r[e]
                }, Date.getMonthAbbrFromNumber = function (e) {
                        return n[e]
                }, Date.isLeapYear = function (e) {
                        return 29 === new Date(e, 1, 29).getDate()
                }, Date.getDaysInMonth = function (e, t) {
                        return 1 === t ? Date.isLeapYear(e) ? 29 : 28 : l[t]
                }, t("getMonthAbbr", function () {
                        return n[this.getMonth()]
                }), t("getMonthName", function () {
                        return r[this.getMonth()]
                }), t("getLastMonthName", function () {
                        var e = this.getMonth();
                        return e = 0 == e ? 11 : e - 1, r[e]
                }), t("getUTCOffset", function () {
                        var t = e(Math.abs(this.getTimezoneOffset() / .6), 4);
                        return this.getTimezoneOffset() > 0 && (t = "-" + t), t
                }), t("toCLFString", function () {
                        return e(this.getDate(), 2) + "/" + this.getMonthAbbr() + "/" + this.getFullYear() + ":" + e(this.getHours(), 2) + ":" + e(this.getMinutes(), 2) + ":" + e(this.getSeconds(), 2) + " " + this.getUTCOffset()
                }), t("toYMD", function (t) {
                        return t = "undefined" == typeof t ? "-" : t, this.getFullYear() + t + e(this.getMonth() + 1, 2) + t + e(this.getDate(), 2)
                }), t("toDBString", function () {
                        return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1, 2) + "-" + e(this.getUTCDate(), 2) + " " + e(this.getUTCHours(), 2) + ":" + e(this.getUTCMinutes(), 2) + ":" + e(this.getUTCSeconds(), 2)
                }), t("clearTime", function () {
                        return this.setHours(0), this.setMinutes(0), this.setSeconds(0), this.setMilliseconds(0), this
                }), t("clearUTCTime", function () {
                        return this.setUTCHours(0), this.setUTCMinutes(0), this.setUTCSeconds(0), this.setUTCMilliseconds(0), this
                }), t("add", function (e) {
                        return void 0 !== e.milliseconds && this.setMilliseconds(this.getMilliseconds() + e.milliseconds), void 0 !== e.seconds && this.setSeconds(this.getSeconds() + e.seconds), void 0 !== e.minutes && this.setMinutes(this.getMinutes() + e.minutes), void 0 !== e.hours && this.setHours(this.getHours() + e.hours), void 0 !== e.days && this.setDate(this.getDate() + e.days), void 0 !== e.weeks && this.setDate(this.getDate() + 7 * e.weeks), void 0 !== e.months && this.setMonth(this.getMonth() + e.months), void 0 !== e.years && this.setFullYear(this.getFullYear() + e.years), this
                }), t("addMilliseconds", function (e) {
                        return this.add({milliseconds: e})
                }), t("addSeconds", function (e) {
                        return this.add({seconds: e})
                }), t("addMinutes", function (e) {
                        return this.add({minutes: e})
                }), t("addHours", function (e) {
                        return this.add({hours: e})
                }), t("addDays", function (e) {
                        return this.add({days: e})
                }), t("addWeeks", function (e) {
                        return this.add({days: 7 * e})
                }), t("addMonths", function (e) {
                        return this.add({months: e})
                }), t("addYears", function (e) {
                        return this.add({years: e})
                }), t("remove", function (e) {
                        return void 0 !== e.seconds && this.setSeconds(this.getSeconds() - e.seconds), void 0 !== e.minutes && this.setMinutes(this.getMinutes() - e.minutes), void 0 !== e.hours && this.setHours(this.getHours() - e.hours), void 0 !== e.days && this.setDate(this.getDate() - e.days), void 0 !== e.weeks && this.setDate(this.getDate() - 7 * e.weeks), void 0 !== e.months && this.setMonth(this.getMonth() - e.months), void 0 !== e.years && this.setFullYear(this.getFullYear() - e.years), this
                }), t("removeMilliseconds", function () {
                        throw new Error("Not implemented")
                }), t("removeSeconds", function (e) {
                        return this.remove({seconds: e})
                }), t("removeMinutes", function (e) {
                        return this.remove({minutes: e})
                }), t("removeHours", function (e) {
                        return this.remove({hours: e})
                }), t("removeDays", function (e) {
                        return this.remove({days: e})
                }), t("removeWeeks", function (e) {
                        return this.remove({days: 7 * e})
                }), t("removeMonths", function (e) {
                        return this.remove({months: e})
                }), t("removeYears", function (e) {
                        return this.remove({years: e})
                }), t("addWeekdays", function (e) {
                        var t = this.getDay();
                        0 === t && (t = 7);
                        var n = e, r = Math.floor((e + t - 1) / 5);
                        return e > 0 ? (n += 2 * r, t > 5 && (n -= t - 5)) : (n += Math.min(2 * r, 0), t > 6 && (n -= 1)), this.addDays(n)
                }), t("setTimeToNow", function () {
                        var e = new Date;
                        this.setMilliseconds(e.getMilliseconds()), this.setSeconds(e.getSeconds()), this.setMinutes(e.getMinutes()), this.setHours(e.getHours())
                }), t("clone", function () {
                        return new Date(this.valueOf())
                }), t("between", function (e, t) {
                        return this.valueOf() >= e.valueOf() && this.valueOf() <= t.valueOf()
                }), t("compareTo", function (e) {
                        return Date.compare(this, e)
                }), t("equals", function (e) {
                        return Date.equals(this, e)
                }), t("equalsDay", function (e) {
                        return Date.equalsDay(this, e)
                }), t("isToday", function () {
                        return Date.equalsDay(this, Date.today())
                }), t("isAfter", function (e) {
                        return e = e ? e : new Date, this.compareTo(e) > 0
                }), t("isBefore", function (e) {
                        return e = e ? e : new Date, this.compareTo(e) < 0
                }), t("isWeekend", function () {
                        return this.getDay() % 6 === 0
                }), t("getDaysBetween", function (e) {
                        return (e.clone().valueOf() - this.valueOf()) / 864e5 | 0
                }), t("getHoursBetween", function (e) {
                        return (e.clone().valueOf() - this.valueOf()) / 36e5 | 0
                }), t("getMinutesBetween", function (e) {
                        return (e.clone().valueOf() - this.valueOf()) / 6e4 | 0
                }), t("getSecondsBetween", function (e) {
                        return (e.clone().valueOf() - this.valueOf()) / 1e3 | 0
                }), t("getMillisecondsBetween", function (e) {
                        return e.clone().valueOf() - this.valueOf() | 0
                }), t("getMonthsBetween", function (e) {
                        var t, n, r = Math.ceil(new Date(e - this).getUTCDate() / 31), s = new Date(this.getTime()), i = Date.getDaysInMonth;
                        for (s.setUTCMonth(s.getUTCMonth() + r); s.getTime() < e.getTime();)s.setUTCMonth(s.getUTCMonth() + 1), r++;
                        return s.getTime() !== e.getTime() && (s.setUTCMonth(s.getUTCMonth() - 1), r--), e.getUTCMonth() === s.getUTCMonth() ? (t = new Date(e - s).getUTCDate(), n = i(s.getUTCFullYear(), s.getUTCMonth()), r + t / n) : (n = i(s.getUTCFullYear(), s.getUTCMonth()), t = n - s.getUTCDate() + 1, r + +(t / n).toFixed(5) + +(e.getUTCDate() / i(e.getUTCFullYear(), e.getUTCMonth())).toFixed(5))
                }), t("getOrdinalNumber", function () {
                        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 864e5) + 1
                }), t("toFormat", function (e) {
                        return M(e, D(this))
                }), t("toUTCFormat", function (e) {
                        return M(e, m(this))
                }), t("getWeekNumber", function () {
                        var e = new Date(this.getFullYear(), 0, 1);
                        return Math.ceil(((this - e) / 864e5 + e.getDay() + 1) / 7)
                }), t("getFullWeekNumber", function () {
                        var e = "" + this.getWeekNumber();
                        return 1 === e.length && (e = "0" + e), e
                });
                var M = function (e, t) {
                        var n, r, s, i = [e], u = function (e, t) {
                                for (var n, r, s, u = 0, o = i.length, a = []; o > u; u++)if ("string" == typeof i[u]) {
                                        for (s = i[u].split(e), n = 0, r = s.length - 1; r > n; n++)a.push(s[n]), a.push([t]);
                                        a.push(s[r])
                                } else a.push(i[u]);
                                i = a
                        };
                        for (n in t)u(n, t[n]);
                        for (s = "", n = 0, r = i.length; r > n; n++)s += "string" == typeof i[n] ? i[n] : i[n][0];
                        return i.join("")
                }, D = function (t) {
                        var u = t.getHours() % 12 ? t.getHours() % 12 : 12;
                        return {
                                YYYY: t.getFullYear(),
                                YY: String(t.getFullYear()).slice(-2),
                                MMMM: r[t.getMonth()],
                                MMM: n[t.getMonth()],
                                MM: e(t.getMonth() + 1, 2),
                                MI: e(t.getMinutes(), 2),
                                M: t.getMonth() + 1,
                                DDDD: i[t.getDay()],
                                DDD: s[t.getDay()],
                                DD: e(t.getDate(), 2),
                                D: t.getDate(),
                                HH24: e(t.getHours(), 2),
                                HH: e(u, 2),
                                H: u,
                                SS: e(t.getSeconds(), 2),
                                PP: t.getHours() >= 12 ? "PM" : "AM",
                                P: t.getHours() >= 12 ? "pm" : "am",
                                LL: e(t.getMilliseconds(), 3)
                        }
                }, m = function (t) {
                        var u = t.getUTCHours() % 12 ? t.getUTCHours() % 12 : 12;
                        return {
                                YYYY: t.getUTCFullYear(),
                                YY: String(t.getUTCFullYear()).slice(-2),
                                MMMM: r[t.getUTCMonth()],
                                MMM: n[t.getUTCMonth()],
                                MM: e(t.getUTCMonth() + 1, 2),
                                MI: e(t.getUTCMinutes(), 2),
                                M: t.getUTCMonth() + 1,
                                DDDD: i[t.getUTCDay()],
                                DDD: s[t.getUTCDay()],
                                DD: e(t.getUTCDate(), 2),
                                D: t.getUTCDate(),
                                HH24: e(t.getUTCHours(), 2),
                                HH: e(u, 2),
                                H: u,
                                SS: e(t.getUTCSeconds(), 2),
                                PP: t.getUTCHours() >= 12 ? "PM" : "AM",
                                P: t.getUTCHours() >= 12 ? "pm" : "am",
                                LL: e(t.getUTCMilliseconds(), 3)
                        }
                }
        }();

        window.EasyNode.dateUtil = {
                toString: function (d, pattern, error) {
                        if (arguments.length == 0) {
                                d = new Date();
                        }
                        pattern = pattern || 'YYYY-MM-DD HH24:MI:SS';
                        error = error || 'N/A';
                        if (d.getTime() > 0) {
                                return d.toFormat(pattern);
                        }
                        else {
                                return error;
                        }
                },

                serverDate2String: function (s, pattern) {
                        return this.toString(new Date(s), pattern);
                },

                toLong: function (d) {
                        d = d || new Date();
                        return d.getTime();
                },

                parse: function (string) {
                        return new Date(Date.parse(string));
                }
        };

        window.EasyNode.alert = function (title, text, cb) {
                cb = cb || function () {
                        };
                $('#_alert [title]').text(title);
                $('#_alert [text]').text(text);
                $('#_alert [close]').hide();
                $('#_alert [primary]').one('click', function () {
                        cb && cb();
                        $('#_alert').modal('hide');

                });
                $('#_alert').one('hidden.bs.modal', function () {
                        $('#_alert [primary]').unbind('click');

                })
                $('#_alert').modal({backdrop: 'static'});

        }
        window.EasyNode.confirm= function (title, text, cbConfirm, cbCancel) {

                $('#_alert [title]').text(title);
                $('#_alert [text]').text(text);
                var _isConfirm;
                $('#_alert [primary]').one('click',function(){
                        _isConfirm=true;
                        $('#_alert').modal('hide');
                });
                $('#_alert').one('hidden.bs.modal',function(){
                        $('#_alert [primary]').unbind('click');
                        if(_isConfirm){
                                cbConfirm&&cbConfirm();
                        }
                        else{
                                cbCancel&&cbCancel();
                        }
                })
                $('#_alert').modal({backdrop:'static'});
        }


})();