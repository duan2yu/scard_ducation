define("arale/base/1.1.1/base", ["arale/class/1.1.0/class", "arale/events/1.1.0/events", "./aspect", "./attribute"], function (a, b, c) {
        function d(a, b) {
                for (var c in b)if (b.hasOwnProperty(c)) {
                        var d = "_onChange" + e(c);
                        a[d] && a.on("change:" + c, a[d])
                }
        }

        function e(a) {
                return a.charAt(0).toUpperCase() + a.substring(1)
        }

        var f = a("arale/class/1.1.0/class"), g = a("arale/events/1.1.0/events"), h = a("./aspect"), i = a("./attribute");
        c.exports = f.create({
                Implements: [g, h, i], initialize: function (a) {
                        this.initAttrs(a), d(this, this.attrs)
                }, destroy: function () {
                        this.off();
                        for (var a in this)this.hasOwnProperty(a) && delete this[a];
                        this.destroy = function () {
                        }
                }
        })
}), define("arale/base/1.1.1/aspect", [], function (a, b) {
        function c(a, b, c, g) {
                for (var h, i, j = b.split(f); h = j.shift();)i = d(this, h), i.__isAspected || e.call(this, h), this.on(a + ":" + h, c, g);
                return this
        }

        function d(a, b) {
                var c = a[b];
                if (!c)throw new Error("Invalid method name: " + b);
                return c
        }

        function e(a) {
                var b = this[a];
                this[a] = function () {
                        var c = Array.prototype.slice.call(arguments), d = ["before:" + a].concat(c);
                        if (this.trigger.apply(this, d) !== !1) {
                                var e = b.apply(this, arguments), f = ["after:" + a, e].concat(c);
                                return this.trigger.apply(this, f), e
                        }
                }, this[a].__isAspected = !0
        }

        b.before = function (a, b, d) {
                return c.call(this, "before", a, b, d)
        }, b.after = function (a, b, d) {
                return c.call(this, "after", a, b, d)
        };
        var f = /\s+/
}), define("arale/base/1.1.1/attribute", [], function (a, b) {
        function c(a) {
                return "[object String]" === t.call(a)
        }

        function d(a) {
                return "[object Function]" === t.call(a)
        }

        function e(a) {
                return null != a && a == a.window
        }

        function f(a) {
                if (!a || "[object Object]" !== t.call(a) || a.nodeType || e(a))return !1;
                try {
                        if (a.constructor && !u.call(a, "constructor") && !u.call(a.constructor.prototype, "isPrototypeOf"))return !1
                } catch (b) {
                        return !1
                }
                var c;
                if (s)for (c in a)return u.call(a, c);
                for (c in a);
                return void 0 === c || u.call(a, c)
        }

        function g(a) {
                if (!a || "[object Object]" !== t.call(a) || a.nodeType || e(a) || !a.hasOwnProperty)return !1;
                for (var b in a)if (a.hasOwnProperty(b))return !1;
                return !0
        }

        function h(a, b) {
                var c, d;
                for (c in b)if (b.hasOwnProperty(c)) {
                        if (d = b[c], v(d))d = d.slice(); else if (f(d)) {
                                var e = a[c];
                                f(e) || (e = {}), d = h(e, d)
                        }
                        a[c] = d
                }
                return a
        }

        function i(a, b, c) {
                for (var d = [], e = b.constructor.prototype; e;)e.hasOwnProperty("attrs") || (e.attrs = {}), k(c, e.attrs, e), g(e.attrs) || d.unshift(e.attrs), e = e.constructor.superclass;
                for (var f = 0, i = d.length; i > f; f++)h(a, o(d[f]))
        }

        function j(a, b) {
                h(a, o(b, !0))
        }

        function k(a, b, c, d) {
                for (var e = 0, f = a.length; f > e; e++) {
                        var g = a[e];
                        c.hasOwnProperty(g) && (b[g] = d ? b.get(g) : c[g])
                }
        }

        function l(a, b) {
                for (var c in b)if (b.hasOwnProperty(c)) {
                        var e, f = b[c].value;
                        d(f) && (e = c.match(x)) && (a[e[1]](m(e[2]), f), delete b[c])
                }
        }

        function m(a) {
                var b = a.match(y), c = b[1] ? "change:" : "";
                return c += b[2].toLowerCase() + b[3]
        }

        function n(a, b, c) {
                var d = {silent: !0};
                a.__initializingAttrs = !0;
                for (var e in c)c.hasOwnProperty(e) && b[e].setter && a.set(e, c[e], d);
                delete a.__initializingAttrs
        }

        function o(a, b) {
                var c = {};
                for (var d in a) {
                        var e = a[d];
                        c[d] = !b && f(e) && p(e, z) ? e : {value: e}
                }
                return c
        }

        function p(a, b) {
                for (var c = 0, d = b.length; d > c; c++)if (a.hasOwnProperty(b[c]))return !0;
                return !1
        }

        function q(a) {
                return null == a || (c(a) || v(a)) && 0 === a.length || g(a)
        }

        function r(a, b) {
                if (a === b)return !0;
                if (q(a) && q(b))return !0;
                var c = t.call(a);
                if (c != t.call(b))return !1;
                switch (c) {
                        case"[object String]":
                                return a == String(b);
                        case"[object Number]":
                                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                        case"[object Date]":
                        case"[object Boolean]":
                                return +a == +b;
                        case"[object RegExp]":
                                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
                        case"[object Array]":
                                var d = a.toString(), e = b.toString();
                                return -1 === d.indexOf("[object") && -1 === e.indexOf("[object") && d === e
                }
                if ("object" != typeof a || "object" != typeof b)return !1;
                if (f(a) && f(b)) {
                        if (!r(w(a), w(b)))return !1;
                        for (var g in a)if (a[g] !== b[g])return !1;
                        return !0
                }
                return !1
        }

        b.initAttrs = function (a) {
                var b = this.attrs = {}, c = this.propsInAttrs || [];
                i(b, this, c), a && j(b, a), n(this, b, a), l(this, b), k(c, this, b, !0)
        }, b.get = function (a) {
                var b = this.attrs[a] || {}, c = b.value;
                return b.getter ? b.getter.call(this, c, a) : c
        }, b.set = function (a, b, d) {
                var e = {};
                c(a) ? e[a] = b : (e = a, d = b), d || (d = {});
                var g = d.silent, i = d.override, j = this.attrs, k = this.__changedAttrs || (this.__changedAttrs = {});
                for (a in e)if (e.hasOwnProperty(a)) {
                        var l = j[a] || (j[a] = {});
                        if (b = e[a], l.readOnly)throw new Error("This attribute is readOnly: " + a);
                        l.setter && (b = l.setter.call(this, b, a));
                        var m = this.get(a);
                        !i && f(m) && f(b) && (b = h(h({}, m), b)), j[a].value = b, this.__initializingAttrs || r(m, b) || (g ? k[a] = [b, m] : this.trigger("change:" + a, b, m, a))
                }
                return this
        }, b.change = function () {
                var a = this.__changedAttrs;
                if (a) {
                        for (var b in a)if (a.hasOwnProperty(b)) {
                                var c = a[b];
                                this.trigger("change:" + b, c[0], c[1], b)
                        }
                        delete this.__changedAttrs
                }
                return this
        }, b._isPlainObject = f;
        var s, t = Object.prototype.toString, u = Object.prototype.hasOwnProperty;
        !function () {
                function a() {
                        this.x = 1
                }

                var b = [];
                a.prototype = {valueOf: 1, y: 1};
                for (var c in new a)b.push(c);
                s = "x" !== b[0]
        }();
        var v = Array.isArray || function (a) {
                        return "[object Array]" === t.call(a)
                }, w = Object.keys;
        w || (w = function (a) {
                var b = [];
                for (var c in a)a.hasOwnProperty(c) && b.push(c);
                return b
        });
        var x = /^(on|before|after)([A-Z].*)$/, y = /^(Change)?([A-Z])(.*)/, z = ["value", "getter", "setter", "readOnly"]
});
