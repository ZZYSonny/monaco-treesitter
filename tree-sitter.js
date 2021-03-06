var Module = void 0 !== Module ? Module : {};
!function (e, t) {
  "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.TreeSitter = t()
}(0, function () {
  var e, t = {};
  for (e in Module)
    Module.hasOwnProperty(e) && (t[e] = Module[e]);
  var r, n, s = [], o = "./this.program", _ = function (e, t) {
    throw t
  }, a = !1, u = !1;
  a = "object" == typeof window,
    u = "function" == typeof importScripts,
    r = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
    n = !a && !r && !u;
  var i, l, d, c, m, f = "";
  r ? (f = u ? require("path").dirname(f) + "/" : __dirname + "/",
    i = function (e, t) {
      return c || (c = require("fs")),
        m || (m = require("path")),
        e = m.normalize(e),
        c.readFileSync(e, t ? null : "utf8")
    }
    ,
    d = function (e) {
      var t = i(e, !0);
      return t.buffer || (t = new Uint8Array(t)),
        N(t.buffer),
        t
    }
    ,
    process.argv.length > 1 && (o = process.argv[1].replace(/\\/g, "/")),
    s = process.argv.slice(2),
    "undefined" != typeof module && (module.exports = Module),
    _ = function (e) {
      process.exit(e)
    }
    ,
    Module.inspect = function () {
      return "[Emscripten Module object]"
    }
  ) : n ? ("undefined" != typeof read && (i = function (e) {
    return read(e)
  }
  ),
    d = function (e) {
      var t;
      return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (N("object" == typeof (t = read(e, "binary"))),
        t)
    }
    ,
    "undefined" != typeof scriptArgs ? s = scriptArgs : void 0 !== arguments && (s = arguments),
    "function" == typeof quit && (_ = function (e) {
      quit(e)
    }
    ),
    "undefined" != typeof print && ("undefined" == typeof console && (console = {}),
      console.log = print,
      console.warn = console.error = "undefined" != typeof printErr ? printErr : print)) : (a || u) && (u ? f = self.location.href : "undefined" != typeof document && document.currentScript && (f = document.currentScript.src),
        f = 0 !== f.indexOf("blob:") ? f.substr(0, f.lastIndexOf("/") + 1) : "",
        i = function (e) {
          var t = new XMLHttpRequest;
          return t.open("GET", e, !1),
            t.send(null),
            t.responseText
        }
        ,
        u && (d = function (e) {
          var t = new XMLHttpRequest;
          return t.open("GET", e, !1),
            t.responseType = "arraybuffer",
            t.send(null),
            new Uint8Array(t.response)
        }
        ),
        l = function (e, t, r) {
          var n = new XMLHttpRequest;
          n.open("GET", e, !0),
            n.responseType = "arraybuffer",
            n.onload = function () {
              200 == n.status || 0 == n.status && n.response ? t(n.response) : r()
            }
            ,
            n.onerror = r,
            n.send(null)
        }
      );
  Module.print || console.log.bind(console);
  var p = Module.printErr || console.warn.bind(console);
  for (e in t)
    t.hasOwnProperty(e) && (Module[e] = t[e]);
  t = null,
    Module.arguments && (s = Module.arguments),
    Module.thisProgram && (o = Module.thisProgram),
    Module.quit && (_ = Module.quit);
  var h = 16;
  var g, w = [];
  function M(e, t) {
    if (!g) {
      g = new WeakMap;
      for (var r = 0; r < H.length; r++) {
        var n = H.get(r);
        n && g.set(n, r)
      }
    }
    if (g.has(e))
      return g.get(e);
    var s = function () {
      if (w.length)
        return w.pop();
      try {
        H.grow(1)
      } catch (e) {
        if (!(e instanceof RangeError))
          throw e;
        throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
      }
      return H.length - 1
    }();
    try {
      H.set(s, e)
    } catch (r) {
      if (!(r instanceof TypeError))
        throw r;
      var o = function (e, t) {
        if ("function" == typeof WebAssembly.Function) {
          for (var r = {
            i: "i32",
            j: "i64",
            f: "f32",
            d: "f64"
          }, n = {
            parameters: [],
            results: "v" == t[0] ? [] : [r[t[0]]]
          }, s = 1; s < t.length; ++s)
            n.parameters.push(r[t[s]]);
          return new WebAssembly.Function(n, e)
        }
        var o = [1, 0, 1, 96]
          , _ = t.slice(0, 1)
          , a = t.slice(1)
          , u = {
            i: 127,
            j: 126,
            f: 125,
            d: 124
          };
        for (o.push(a.length),
          s = 0; s < a.length; ++s)
          o.push(u[a[s]]);
        "v" == _ ? o.push(0) : o = o.concat([1, u[_]]),
          o[1] = o.length - 2;
        var i = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(o, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]))
          , l = new WebAssembly.Module(i);
        return new WebAssembly.Instance(l, {
          e: {
            f: e
          }
        }).exports.f
      }(e, t);
      H.set(s, o)
    }
    return g.set(e, s),
      s
  }
  var y, b = function (e) {
    e
  }, E = Module.dynamicLibraries || [];
  Module.wasmBinary && (y = Module.wasmBinary);
  var v, I = Module.noExitRuntime || !0;
  function S(e, t, r, n) {
    switch ("*" === (r = r || "i8").charAt(r.length - 1) && (r = "i32"),
    r) {
      case "i1":
      case "i8":
        C[e >> 0] = t;
        break;
      case "i16":
        R[e >> 1] = t;
        break;
      case "i32":
        T[e >> 2] = t;
        break;
      case "i64":
        ie = [t >>> 0, (ue = t,
          +Math.abs(ue) >= 1 ? ue > 0 ? (0 | Math.min(+Math.floor(ue / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((ue - +(~~ue >>> 0)) / 4294967296) >>> 0 : 0)],
          T[e >> 2] = ie[0],
          T[e + 4 >> 2] = ie[1];
        break;
      case "float":
        W[e >> 2] = t;
        break;
      case "double":
        L[e >> 3] = t;
        break;
      default:
        ne("invalid type for setValue: " + r)
    }
  }
  function A(e, t, r) {
    switch ("*" === (t = t || "i8").charAt(t.length - 1) && (t = "i32"),
    t) {
      case "i1":
      case "i8":
        return C[e >> 0];
      case "i16":
        return R[e >> 1];
      case "i32":
      case "i64":
        return T[e >> 2];
      case "float":
        return W[e >> 2];
      case "double":
        return L[e >> 3];
      default:
        ne("invalid type for getValue: " + t)
    }
    return null
  }
  "object" != typeof WebAssembly && ne("no native wasm support detected");
  var x = !1;
  function N(e, t) {
    e || ne("Assertion failed: " + t)
  }
  var P = 1;
  var k, C, q, R, T, W, L, Z = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
  function F(e, t, r) {
    for (var n = t + r, s = t; e[s] && !(s >= n);)
      ++s;
    if (s - t > 16 && e.subarray && Z)
      return Z.decode(e.subarray(t, s));
    for (var o = ""; t < s;) {
      var _ = e[t++];
      if (128 & _) {
        var a = 63 & e[t++];
        if (192 != (224 & _)) {
          var u = 63 & e[t++];
          if ((_ = 224 == (240 & _) ? (15 & _) << 12 | a << 6 | u : (7 & _) << 18 | a << 12 | u << 6 | 63 & e[t++]) < 65536)
            o += String.fromCharCode(_);
          else {
            var i = _ - 65536;
            o += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
          }
        } else
          o += String.fromCharCode((31 & _) << 6 | a)
      } else
        o += String.fromCharCode(_)
    }
    return o
  }
  function $(e, t) {
    return e ? F(q, e, t) : ""
  }
  function O(e, t, r, n) {
    if (!(n > 0))
      return 0;
    for (var s = r, o = r + n - 1, _ = 0; _ < e.length; ++_) {
      var a = e.charCodeAt(_);
      if (a >= 55296 && a <= 57343)
        a = 65536 + ((1023 & a) << 10) | 1023 & e.charCodeAt(++_);
      if (a <= 127) {
        if (r >= o)
          break;
        t[r++] = a
      } else if (a <= 2047) {
        if (r + 1 >= o)
          break;
        t[r++] = 192 | a >> 6,
          t[r++] = 128 | 63 & a
      } else if (a <= 65535) {
        if (r + 2 >= o)
          break;
        t[r++] = 224 | a >> 12,
          t[r++] = 128 | a >> 6 & 63,
          t[r++] = 128 | 63 & a
      } else {
        if (r + 3 >= o)
          break;
        t[r++] = 240 | a >> 18,
          t[r++] = 128 | a >> 12 & 63,
          t[r++] = 128 | a >> 6 & 63,
          t[r++] = 128 | 63 & a
      }
    }
    return t[r] = 0,
      r - s
  }
  function U(e, t, r) {
    return O(e, q, t, r)
  }
  function j(e) {
    for (var t = 0, r = 0; r < e.length; ++r) {
      var n = e.charCodeAt(r);
      n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++r)),
        n <= 127 ? ++t : t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4
    }
    return t
  }
  function D(e) {
    var t = j(e) + 1
      , r = De(t);
    return O(e, C, r, t),
      r
  }
  function z(e) {
    k = e,
      Module.HEAP8 = C = new Int8Array(e),
      Module.HEAP16 = R = new Int16Array(e),
      Module.HEAP32 = T = new Int32Array(e),
      Module.HEAPU8 = q = new Uint8Array(e),
      Module.HEAPU16 = new Uint16Array(e),
      Module.HEAPU32 = new Uint32Array(e),
      Module.HEAPF32 = W = new Float32Array(e),
      Module.HEAPF64 = L = new Float64Array(e)
  }
  var G = Module.INITIAL_MEMORY || 33554432;
  (v = Module.wasmMemory ? Module.wasmMemory : new WebAssembly.Memory({
    initial: G / 65536,
    maximum: 32768
  })) && (k = v.buffer),
    G = k.byteLength,
    z(k);
  var H = new WebAssembly.Table({
    initial: 13,
    element: "anyfunc"
  })
    , B = []
    , K = []
    , V = []
    , X = []
    , Q = !1;
  var Y = 0
    , J = null
    , ee = null;
  function te(e) {
    Y++,
      Module.monitorRunDependencies && Module.monitorRunDependencies(Y)
  }
  function re(e) {
    if (Y--,
      Module.monitorRunDependencies && Module.monitorRunDependencies(Y),
      0 == Y && (null !== J && (clearInterval(J),
        J = null),
        ee)) {
      var t = ee;
      ee = null,
        t()
    }
  }
  function ne(e) {
    throw Module.onAbort && Module.onAbort(e),
    p(e += ""),
    x = !0,
    1,
    e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.",
    new WebAssembly.RuntimeError(e)
  }
  Module.preloadedImages = {},
    Module.preloadedAudios = {},
    Module.preloadedWasm = {};
  var se = "data:application/octet-stream;base64,";
  function oe(e) {
    return e.startsWith(se)
  }
  function _e(e) {
    return e.startsWith("file://")
  }
  var ae, ue, ie, le = "tree-sitter.wasm";
  function de(e) {
    try {
      if (e == le && y)
        return new Uint8Array(y);
      if (d)
        return d(e);
      throw "both async and sync fetching of the wasm failed"
    } catch (e) {
      ne(e)
    }
  }
  oe(le) || (ae = le,
    le = Module.locateFile ? Module.locateFile(ae, f) : f + ae);
  var ce = {}
    , me = {
      get: function (e, t) {
        return ce[t] || (ce[t] = new WebAssembly.Global({
          value: "i32",
          mutable: !0
        })),
          ce[t]
      }
    };
  function fe(e) {
    for (; e.length > 0;) {
      var t = e.shift();
      if ("function" != typeof t) {
        var r = t.func;
        "number" == typeof r ? void 0 === t.arg ? H.get(r)() : H.get(r)(t.arg) : r(void 0 === t.arg ? null : t.arg)
      } else
        t(Module)
    }
  }
  function pe(e) {
    var t = 0;
    function r() {
      for (var r = 0, n = 1; ;) {
        var s = e[t++];
        if (r += (127 & s) * n,
          n *= 128,
          !(128 & s))
          break
      }
      return r
    }
    if (e instanceof WebAssembly.Module) {
      var n = WebAssembly.Module.customSections(e, "dylink");
      N(0 != n.length, "need dylink section"),
        e = new Int8Array(n[0])
    } else {
      N(1836278016 == new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer)[0], "need to see wasm magic number"),
        N(0 === e[8], "need the dylink section to be first"),
        t = 9,
        r(),
        N(6 === e[t]),
        N(e[++t] === "d".charCodeAt(0)),
        N(e[++t] === "y".charCodeAt(0)),
        N(e[++t] === "l".charCodeAt(0)),
        N(e[++t] === "i".charCodeAt(0)),
        N(e[++t] === "n".charCodeAt(0)),
        N(e[++t] === "k".charCodeAt(0)),
        t++
    }
    var s = {};
    s.memorySize = r(),
      s.memoryAlign = r(),
      s.tableSize = r(),
      s.tableAlign = r();
    var o = r();
    s.neededDynlibs = [];
    for (var _ = 0; _ < o; ++_) {
      var a = r()
        , u = e.subarray(t, t + a);
      t += a;
      var i = F(u, 0);
      s.neededDynlibs.push(i)
    }
    return s
  }
  var he = 0;
  function ge() {
    return I || he > 0
  }
  function we(e) {
    return 0 == e.indexOf("dynCall_") || ["stackAlloc", "stackSave", "stackRestore"].includes(e) ? e : "_" + e
  }
  function Me(e, t) {
    for (var r in e)
      if (e.hasOwnProperty(r)) {
        Fe.hasOwnProperty(r) || (Fe[r] = e[r]);
        var n = we(r);
        Module.hasOwnProperty(n) || (Module[n] = e[r])
      }
  }
  var ye = {
    nextHandle: 1,
    loadedLibs: {},
    loadedLibNames: {}
  };
  function be(e, t, r) {
    return e.includes("j") ? function (e, t, r) {
      var n = Module["dynCall_" + e];
      return r && r.length ? n.apply(null, [t].concat(r)) : n.call(null, t)
    }(e, t, r) : H.get(t).apply(null, r)
  }
  var Ee = 5250816;
  function ve(e) {
    return ["__cpp_exception", "__wasm_apply_data_relocs", "__dso_handle", "__set_stack_limits"].includes(e)
  }
  function Ie(e, t) {
    var r = {};
    for (var n in e) {
      var s = e[n];
      "object" == typeof s && (s = s.value),
        "number" == typeof s && (s += t),
        r[n] = s
    }
    return function (e) {
      for (var t in e)
        if (!ve(t)) {
          var r = !1
            , n = e[t];
          t.startsWith("orig$") && (t = t.split("$")[1],
            r = !0),
            ce[t] || (ce[t] = new WebAssembly.Global({
              value: "i32",
              mutable: !0
            })),
            (r || 0 == ce[t].value) && ("function" == typeof n ? ce[t].value = M(n) : "number" == typeof n ? ce[t].value = n : p("unhandled export type for `" + t + "`: " + typeof n))
        }
    }(r),
      r
  }
  function Se(e, t) {
    var r, n;
    return t && (r = Fe["orig$" + e]),
      r || (r = Fe[e]),
      r || (r = Module[we(e)]),
      !r && e.startsWith("invoke_") && (n = e.split("_")[1],
        r = function () {
          var e = Ue();
          try {
            return be(n, arguments[0], Array.prototype.slice.call(arguments, 1))
          } catch (t) {
            if (je(e),
              t !== t + 0 && "longjmp" !== t)
              throw t;
            ze(1, 0)
          }
        }
      ),
      r
  }
  function Ae(e, t) {
    var r = pe(e);
    function n() {
      var n = Math.pow(2, r.memoryAlign);
      n = Math.max(n, h);
      var s, o, _, a = (s = function (e) {
        if (Q)
          return $e(e);
        var t = Ee
          , r = t + e + 15 & -16;
        return Ee = r,
          ce.__heap_base.value = r,
          t
      }(r.memorySize + n),
        (o = n) || (o = h),
        Math.ceil(s / o) * o), u = H.length;
      H.grow(r.tableSize);
      for (var i = a; i < a + r.memorySize; i++)
        C[i] = 0;
      for (i = u; i < u + r.tableSize; i++)
        H.set(i, null);
      var l = new Proxy({}, {
        get: function (e, t) {
          switch (t) {
            case "__memory_base":
              return a;
            case "__table_base":
              return u
          }
          if (t in Fe)
            return Fe[t];
          var r;
          t in e || (e[t] = function () {
            return r || (r = function (e) {
              var t = Se(e, !1);
              return t || (t = _[e]),
                t
            }(t)),
              r.apply(null, arguments)
          }
          );
          return e[t]
        }
      })
        , d = {
          "GOT.mem": new Proxy({}, me),
          "GOT.func": new Proxy({}, me),
          env: l,
          wasi_snapshot_preview1: l
        };
      function c(e) {
        for (var n = 0; n < r.tableSize; n++) {
          var s = H.get(u + n);
          s && g.set(s, u + n)
        }
        _ = Ie(e.exports, a),
          t.allowUndefined || Ne();
        var o = _.__wasm_call_ctors;
        return o || (o = _.__post_instantiate),
          o && (Q ? o() : K.push(o)),
          _
      }
      if (t.loadAsync) {
        if (e instanceof WebAssembly.Module) {
          var m = new WebAssembly.Instance(e, d);
          return Promise.resolve(c(m))
        }
        return WebAssembly.instantiate(e, d).then(function (e) {
          return c(e.instance)
        })
      }
      var f = e instanceof WebAssembly.Module ? e : new WebAssembly.Module(e);
      return c(m = new WebAssembly.Instance(f, d))
    }
    return t.loadAsync ? r.neededDynlibs.reduce(function (e, r) {
      return e.then(function () {
        return xe(r, t)
      })
    }, Promise.resolve()).then(function () {
      return n()
    }) : (r.neededDynlibs.forEach(function (e) {
      xe(e, t)
    }),
      n())
  }
  function xe(e, t) {
    "__main__" != e || ye.loadedLibNames[e] || (ye.loadedLibs[-1] = {
      refcount: 1 / 0,
      name: "__main__",
      module: Module.asm,
      global: !0
    },
      ye.loadedLibNames.__main__ = -1),
      t = t || {
        global: !0,
        nodelete: !0
      };
    var r, n = ye.loadedLibNames[e];
    if (n)
      return r = ye.loadedLibs[n],
        t.global && !r.global && (r.global = !0,
          "loading" !== r.module && Me(r.module)),
        t.nodelete && r.refcount !== 1 / 0 && (r.refcount = 1 / 0),
        r.refcount++,
        t.loadAsync ? Promise.resolve(n) : n;
    function s(e) {
      if (t.fs) {
        var r = t.fs.readFile(e, {
          encoding: "binary"
        });
        return r instanceof Uint8Array || (r = new Uint8Array(r)),
          t.loadAsync ? Promise.resolve(r) : r
      }
      return t.loadAsync ? (n = e,
        fetch(n, {
          credentials: "same-origin"
        }).then(function (e) {
          if (!e.ok)
            throw "failed to load binary file at '" + n + "'";
          return e.arrayBuffer()
        }).then(function (e) {
          return new Uint8Array(e)
        })) : d(e);
      var n
    }
    function o() {
      if (void 0 !== Module.preloadedWasm && void 0 !== Module.preloadedWasm[e]) {
        var r = Module.preloadedWasm[e];
        return t.loadAsync ? Promise.resolve(r) : r
      }
      return t.loadAsync ? s(e).then(function (e) {
        return Ae(e, t)
      }) : Ae(s(e), t)
    }
    function _(e) {
      r.global && Me(e),
        r.module = e
    }
    return n = ye.nextHandle++,
      r = {
        refcount: t.nodelete ? 1 / 0 : 1,
        name: e,
        module: "loading",
        global: t.global
      },
      ye.loadedLibNames[e] = n,
      ye.loadedLibs[n] = r,
      t.loadAsync ? o().then(function (e) {
        return _(e),
          n
      }) : (_(o()),
        n)
  }
  function Ne() {
    for (var e in ce)
      if (0 == ce[e].value) {
        var t = Se(e, !0);
        "function" == typeof t ? ce[e].value = M(t, t.sig) : "number" == typeof t ? ce[e].value = t : N(!1, "bad export type for `" + e + "`: " + typeof t)
      }
  }
  Module.___heap_base = Ee;
  var Pe, ke = new WebAssembly.Global({
    value: "i32",
    mutable: !0
  }, 5250816);
  function Ce() {
    ne()
  }
  Module._abort = Ce,
    Ce.sig = "v",
    Pe = r ? function () {
      var e = process.hrtime();
      return 1e3 * e[0] + e[1] / 1e6
    }
      : "undefined" != typeof dateNow ? dateNow : function () {
        return performance.now()
      }
    ;
  var qe = !0;
  function Re(e, t) {
    var r, n;
    if (0 === e)
      r = Date.now();
    else {
      if (1 !== e && 4 !== e || !qe)
        return n = 28,
          T[Oe() >> 2] = n,
          -1;
      r = Pe()
    }
    return T[t >> 2] = r / 1e3 | 0,
      T[t + 4 >> 2] = r % 1e3 * 1e3 * 1e3 | 0,
      0
  }
  function Te(e) {
    try {
      return v.grow(e - k.byteLength + 65535 >>> 16),
        z(v.buffer),
        1
    } catch (e) { }
  }
  function We(e) {
    Ke(e)
  }
  function Le(e) {
    b(e)
  }
  Re.sig = "iii",
    We.sig = "vi",
    Le.sig = "vi";
  var Ze, Fe = {
    __heap_base: Ee,
    __indirect_function_table: H,
    __memory_base: 1024,
    __stack_pointer: ke,
    __table_base: 1,
    abort: Ce,
    clock_gettime: Re,
    emscripten_memcpy_big: function (e, t, r) {
      q.copyWithin(e, t, t + r)
    },
    emscripten_resize_heap: function (e) {
      var t, r, n = q.length;
      if ((e >>>= 0) > 2147483648)
        return !1;
      for (var s = 1; s <= 4; s *= 2) {
        var o = n * (1 + .2 / s);
        if (o = Math.min(o, e + 100663296),
          Te(Math.min(2147483648, ((t = Math.max(e, o)) % (r = 65536) > 0 && (t += r - t % r),
            t))))
          return !0
      }
      return !1
    },
    exit: We,
    memory: v,
    setTempRet0: Le,
    tree_sitter_log_callback: function (e, t) {
      if (dt) {
        const r = $(t);
        dt(r, 0 !== e)
      }
    },
    tree_sitter_parse_callback: function (e, t, r, n, s) {
      var o = lt(t, {
        row: r,
        column: n
      });
      "string" == typeof o ? (S(s, o.length, "i32"),
        function (e, t, r) {
          if (void 0 === r && (r = 2147483647),
            r < 2)
            return 0;
          for (var n = (r -= 2) < 2 * e.length ? r / 2 : e.length, s = 0; s < n; ++s) {
            var o = e.charCodeAt(s);
            R[t >> 1] = o,
              t += 2
          }
          R[t >> 1] = 0
        }(o, e, 10240)) : S(s, 0, "i32")
    }
  }, $e = (function () {
    var e = {
      env: Fe,
      wasi_snapshot_preview1: Fe,
      "GOT.mem": new Proxy(Fe, me),
      "GOT.func": new Proxy(Fe, me)
    };
    function t(e, t) {
      var r = e.exports;
      r = Ie(r, 1024),
        Module.asm = r;
      var n, s = pe(t);
      s.neededDynlibs && (E = s.neededDynlibs.concat(E)),
        Me(r),
        n = Module.asm.__wasm_call_ctors,
        K.unshift(n),
        re()
    }
    function r(e) {
      t(e.instance, e.module)
    }
    function n(t) {
      return function () {
        if (!y && (a || u)) {
          if ("function" == typeof fetch && !_e(le))
            //hack
            return fetch(
              "https://cdn.jsdelivr.net/npm/web-tree-sitter@0.19.4/tree-sitter.wasm"
            ).then(function (e) {
              if (!e.ok)
                throw "failed to load wasm binary file at '" + le + "'";
              return e.arrayBuffer()
            }).catch(function () {
              return de(le)
            });
          if (l)
            return new Promise(function (e, t) {
              l(le, function (t) {
                e(new Uint8Array(t))
              }, t)
            }
            )
        }
        return Promise.resolve().then(function () {
          return de(le)
        })
      }().then(function (t) {
        return WebAssembly.instantiate(t, e)
      }).then(t, function (e) {
        p("failed to asynchronously prepare wasm: " + e),
          ne(e)
      })
    }
    if (te(),
      Module.instantiateWasm)
      try {
        return Module.instantiateWasm(e, t)
      } catch (e) {
        return p("Module.instantiateWasm callback failed with error: " + e),
          !1
      }
    y || "function" != typeof WebAssembly.instantiateStreaming || oe(le) || _e(le) || "function" != typeof fetch ? n(r) : fetch(le, {
      credentials: "same-origin"
    }).then(function (t) {
      return WebAssembly.instantiateStreaming(t, e).then(r, function (e) {
        return p("wasm streaming compile failed: " + e),
          p("falling back to ArrayBuffer instantiation"),
          n(r)
      })
    })
  }(),
    Module.___wasm_call_ctors = function () {
      return (Module.___wasm_call_ctors = Module.asm.__wasm_call_ctors).apply(null, arguments)
    }
    ,
    Module._malloc = function () {
      return ($e = Module._malloc = Module.asm.malloc).apply(null, arguments)
    }
  ), Oe = (Module._ts_language_symbol_count = function () {
    return (Module._ts_language_symbol_count = Module.asm.ts_language_symbol_count).apply(null, arguments)
  }
    ,
    Module._ts_language_version = function () {
      return (Module._ts_language_version = Module.asm.ts_language_version).apply(null, arguments)
    }
    ,
    Module._ts_language_field_count = function () {
      return (Module._ts_language_field_count = Module.asm.ts_language_field_count).apply(null, arguments)
    }
    ,
    Module._ts_language_symbol_name = function () {
      return (Module._ts_language_symbol_name = Module.asm.ts_language_symbol_name).apply(null, arguments)
    }
    ,
    Module._ts_language_symbol_for_name = function () {
      return (Module._ts_language_symbol_for_name = Module.asm.ts_language_symbol_for_name).apply(null, arguments)
    }
    ,
    Module._ts_language_symbol_type = function () {
      return (Module._ts_language_symbol_type = Module.asm.ts_language_symbol_type).apply(null, arguments)
    }
    ,
    Module._ts_language_field_name_for_id = function () {
      return (Module._ts_language_field_name_for_id = Module.asm.ts_language_field_name_for_id).apply(null, arguments)
    }
    ,
    Module._memcpy = function () {
      return (Module._memcpy = Module.asm.memcpy).apply(null, arguments)
    }
    ,
    Module._free = function () {
      return (Module._free = Module.asm.free).apply(null, arguments)
    }
    ,
    Module._calloc = function () {
      return (Module._calloc = Module.asm.calloc).apply(null, arguments)
    }
    ,
    Module._ts_parser_delete = function () {
      return (Module._ts_parser_delete = Module.asm.ts_parser_delete).apply(null, arguments)
    }
    ,
    Module._ts_parser_reset = function () {
      return (Module._ts_parser_reset = Module.asm.ts_parser_reset).apply(null, arguments)
    }
    ,
    Module._ts_parser_set_language = function () {
      return (Module._ts_parser_set_language = Module.asm.ts_parser_set_language).apply(null, arguments)
    }
    ,
    Module._ts_parser_timeout_micros = function () {
      return (Module._ts_parser_timeout_micros = Module.asm.ts_parser_timeout_micros).apply(null, arguments)
    }
    ,
    Module._ts_parser_set_timeout_micros = function () {
      return (Module._ts_parser_set_timeout_micros = Module.asm.ts_parser_set_timeout_micros).apply(null, arguments)
    }
    ,
    Module._memcmp = function () {
      return (Module._memcmp = Module.asm.memcmp).apply(null, arguments)
    }
    ,
    Module._ts_query_new = function () {
      return (Module._ts_query_new = Module.asm.ts_query_new).apply(null, arguments)
    }
    ,
    Module._ts_query_delete = function () {
      return (Module._ts_query_delete = Module.asm.ts_query_delete).apply(null, arguments)
    }
    ,
    Module._iswspace = function () {
      return (Module._iswspace = Module.asm.iswspace).apply(null, arguments)
    }
    ,
    Module._iswalnum = function () {
      return (Module._iswalnum = Module.asm.iswalnum).apply(null, arguments)
    }
    ,
    Module._ts_query_pattern_count = function () {
      return (Module._ts_query_pattern_count = Module.asm.ts_query_pattern_count).apply(null, arguments)
    }
    ,
    Module._ts_query_capture_count = function () {
      return (Module._ts_query_capture_count = Module.asm.ts_query_capture_count).apply(null, arguments)
    }
    ,
    Module._ts_query_string_count = function () {
      return (Module._ts_query_string_count = Module.asm.ts_query_string_count).apply(null, arguments)
    }
    ,
    Module._ts_query_capture_name_for_id = function () {
      return (Module._ts_query_capture_name_for_id = Module.asm.ts_query_capture_name_for_id).apply(null, arguments)
    }
    ,
    Module._ts_query_string_value_for_id = function () {
      return (Module._ts_query_string_value_for_id = Module.asm.ts_query_string_value_for_id).apply(null, arguments)
    }
    ,
    Module._ts_query_predicates_for_pattern = function () {
      return (Module._ts_query_predicates_for_pattern = Module.asm.ts_query_predicates_for_pattern).apply(null, arguments)
    }
    ,
    Module._ts_tree_copy = function () {
      return (Module._ts_tree_copy = Module.asm.ts_tree_copy).apply(null, arguments)
    }
    ,
    Module._ts_tree_delete = function () {
      return (Module._ts_tree_delete = Module.asm.ts_tree_delete).apply(null, arguments)
    }
    ,
    Module._ts_init = function () {
      return (Module._ts_init = Module.asm.ts_init).apply(null, arguments)
    }
    ,
    Module._ts_parser_new_wasm = function () {
      return (Module._ts_parser_new_wasm = Module.asm.ts_parser_new_wasm).apply(null, arguments)
    }
    ,
    Module._ts_parser_enable_logger_wasm = function () {
      return (Module._ts_parser_enable_logger_wasm = Module.asm.ts_parser_enable_logger_wasm).apply(null, arguments)
    }
    ,
    Module._ts_parser_parse_wasm = function () {
      return (Module._ts_parser_parse_wasm = Module.asm.ts_parser_parse_wasm).apply(null, arguments)
    }
    ,
    Module._ts_language_type_is_named_wasm = function () {
      return (Module._ts_language_type_is_named_wasm = Module.asm.ts_language_type_is_named_wasm).apply(null, arguments)
    }
    ,
    Module._ts_language_type_is_visible_wasm = function () {
      return (Module._ts_language_type_is_visible_wasm = Module.asm.ts_language_type_is_visible_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_root_node_wasm = function () {
      return (Module._ts_tree_root_node_wasm = Module.asm.ts_tree_root_node_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_edit_wasm = function () {
      return (Module._ts_tree_edit_wasm = Module.asm.ts_tree_edit_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_get_changed_ranges_wasm = function () {
      return (Module._ts_tree_get_changed_ranges_wasm = Module.asm.ts_tree_get_changed_ranges_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_new_wasm = function () {
      return (Module._ts_tree_cursor_new_wasm = Module.asm.ts_tree_cursor_new_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_delete_wasm = function () {
      return (Module._ts_tree_cursor_delete_wasm = Module.asm.ts_tree_cursor_delete_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_reset_wasm = function () {
      return (Module._ts_tree_cursor_reset_wasm = Module.asm.ts_tree_cursor_reset_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_goto_first_child_wasm = function () {
      return (Module._ts_tree_cursor_goto_first_child_wasm = Module.asm.ts_tree_cursor_goto_first_child_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_goto_next_sibling_wasm = function () {
      return (Module._ts_tree_cursor_goto_next_sibling_wasm = Module.asm.ts_tree_cursor_goto_next_sibling_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_goto_parent_wasm = function () {
      return (Module._ts_tree_cursor_goto_parent_wasm = Module.asm.ts_tree_cursor_goto_parent_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_current_node_type_id_wasm = function () {
      return (Module._ts_tree_cursor_current_node_type_id_wasm = Module.asm.ts_tree_cursor_current_node_type_id_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_current_node_is_named_wasm = function () {
      return (Module._ts_tree_cursor_current_node_is_named_wasm = Module.asm.ts_tree_cursor_current_node_is_named_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_current_node_is_missing_wasm = function () {
      return (Module._ts_tree_cursor_current_node_is_missing_wasm = Module.asm.ts_tree_cursor_current_node_is_missing_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_current_node_id_wasm = function () {
      return (Module._ts_tree_cursor_current_node_id_wasm = Module.asm.ts_tree_cursor_current_node_id_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_start_position_wasm = function () {
      return (Module._ts_tree_cursor_start_position_wasm = Module.asm.ts_tree_cursor_start_position_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_end_position_wasm = function () {
      return (Module._ts_tree_cursor_end_position_wasm = Module.asm.ts_tree_cursor_end_position_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_start_index_wasm = function () {
      return (Module._ts_tree_cursor_start_index_wasm = Module.asm.ts_tree_cursor_start_index_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_end_index_wasm = function () {
      return (Module._ts_tree_cursor_end_index_wasm = Module.asm.ts_tree_cursor_end_index_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_current_field_id_wasm = function () {
      return (Module._ts_tree_cursor_current_field_id_wasm = Module.asm.ts_tree_cursor_current_field_id_wasm).apply(null, arguments)
    }
    ,
    Module._ts_tree_cursor_current_node_wasm = function () {
      return (Module._ts_tree_cursor_current_node_wasm = Module.asm.ts_tree_cursor_current_node_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_symbol_wasm = function () {
      return (Module._ts_node_symbol_wasm = Module.asm.ts_node_symbol_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_child_count_wasm = function () {
      return (Module._ts_node_child_count_wasm = Module.asm.ts_node_child_count_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_named_child_count_wasm = function () {
      return (Module._ts_node_named_child_count_wasm = Module.asm.ts_node_named_child_count_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_child_wasm = function () {
      return (Module._ts_node_child_wasm = Module.asm.ts_node_child_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_named_child_wasm = function () {
      return (Module._ts_node_named_child_wasm = Module.asm.ts_node_named_child_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_child_by_field_id_wasm = function () {
      return (Module._ts_node_child_by_field_id_wasm = Module.asm.ts_node_child_by_field_id_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_next_sibling_wasm = function () {
      return (Module._ts_node_next_sibling_wasm = Module.asm.ts_node_next_sibling_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_prev_sibling_wasm = function () {
      return (Module._ts_node_prev_sibling_wasm = Module.asm.ts_node_prev_sibling_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_next_named_sibling_wasm = function () {
      return (Module._ts_node_next_named_sibling_wasm = Module.asm.ts_node_next_named_sibling_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_prev_named_sibling_wasm = function () {
      return (Module._ts_node_prev_named_sibling_wasm = Module.asm.ts_node_prev_named_sibling_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_parent_wasm = function () {
      return (Module._ts_node_parent_wasm = Module.asm.ts_node_parent_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_descendant_for_index_wasm = function () {
      return (Module._ts_node_descendant_for_index_wasm = Module.asm.ts_node_descendant_for_index_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_named_descendant_for_index_wasm = function () {
      return (Module._ts_node_named_descendant_for_index_wasm = Module.asm.ts_node_named_descendant_for_index_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_descendant_for_position_wasm = function () {
      return (Module._ts_node_descendant_for_position_wasm = Module.asm.ts_node_descendant_for_position_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_named_descendant_for_position_wasm = function () {
      return (Module._ts_node_named_descendant_for_position_wasm = Module.asm.ts_node_named_descendant_for_position_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_start_point_wasm = function () {
      return (Module._ts_node_start_point_wasm = Module.asm.ts_node_start_point_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_end_point_wasm = function () {
      return (Module._ts_node_end_point_wasm = Module.asm.ts_node_end_point_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_start_index_wasm = function () {
      return (Module._ts_node_start_index_wasm = Module.asm.ts_node_start_index_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_end_index_wasm = function () {
      return (Module._ts_node_end_index_wasm = Module.asm.ts_node_end_index_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_to_string_wasm = function () {
      return (Module._ts_node_to_string_wasm = Module.asm.ts_node_to_string_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_children_wasm = function () {
      return (Module._ts_node_children_wasm = Module.asm.ts_node_children_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_named_children_wasm = function () {
      return (Module._ts_node_named_children_wasm = Module.asm.ts_node_named_children_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_descendants_of_type_wasm = function () {
      return (Module._ts_node_descendants_of_type_wasm = Module.asm.ts_node_descendants_of_type_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_is_named_wasm = function () {
      return (Module._ts_node_is_named_wasm = Module.asm.ts_node_is_named_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_has_changes_wasm = function () {
      return (Module._ts_node_has_changes_wasm = Module.asm.ts_node_has_changes_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_has_error_wasm = function () {
      return (Module._ts_node_has_error_wasm = Module.asm.ts_node_has_error_wasm).apply(null, arguments)
    }
    ,
    Module._ts_node_is_missing_wasm = function () {
      return (Module._ts_node_is_missing_wasm = Module.asm.ts_node_is_missing_wasm).apply(null, arguments)
    }
    ,
    Module._ts_query_matches_wasm = function () {
      return (Module._ts_query_matches_wasm = Module.asm.ts_query_matches_wasm).apply(null, arguments)
    }
    ,
    Module._ts_query_captures_wasm = function () {
      return (Module._ts_query_captures_wasm = Module.asm.ts_query_captures_wasm).apply(null, arguments)
    }
    ,
    Module._iswdigit = function () {
      return (Module._iswdigit = Module.asm.iswdigit).apply(null, arguments)
    }
    ,
    Module._iswalpha = function () {
      return (Module._iswalpha = Module.asm.iswalpha).apply(null, arguments)
    }
    ,
    Module._iswlower = function () {
      return (Module._iswlower = Module.asm.iswlower).apply(null, arguments)
    }
    ,
    Module._towupper = function () {
      return (Module._towupper = Module.asm.towupper).apply(null, arguments)
    }
    ,
    Module.___errno_location = function () {
      return (Oe = Module.___errno_location = Module.asm.__errno_location).apply(null, arguments)
    }
  ), Ue = (Module._memchr = function () {
    return (Module._memchr = Module.asm.memchr).apply(null, arguments)
  }
    ,
    Module._strlen = function () {
      return (Module._strlen = Module.asm.strlen).apply(null, arguments)
    }
    ,
    Module.stackSave = function () {
      return (Ue = Module.stackSave = Module.asm.stackSave).apply(null, arguments)
    }
  ), je = Module.stackRestore = function () {
    return (je = Module.stackRestore = Module.asm.stackRestore).apply(null, arguments)
  }
    , De = Module.stackAlloc = function () {
      return (De = Module.stackAlloc = Module.asm.stackAlloc).apply(null, arguments)
    }
    , ze = Module._setThrew = function () {
      return (ze = Module._setThrew = Module.asm.setThrew).apply(null, arguments)
    }
    ;
  Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = function () {
    return (Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm).apply(null, arguments)
  }
    ,
    Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = function () {
      return (Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev).apply(null, arguments)
    }
    ,
    Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = function () {
      return (Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm).apply(null, arguments)
    }
    ,
    Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = function () {
      return (Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm).apply(null, arguments)
    }
    ,
    Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = function () {
      return (Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc).apply(null, arguments)
    }
    ,
    Module.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = function () {
      return (Module.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = Module.asm._ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm).apply(null, arguments)
    }
    ,
    Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = function () {
      return (Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev).apply(null, arguments)
    }
    ,
    Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = function () {
      return (Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw).apply(null, arguments)
    }
    ,
    Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_ = function () {
      return (Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_ = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_).apply(null, arguments)
    }
    ,
    Module.__Znwm = function () {
      return (Module.__Znwm = Module.asm._Znwm).apply(null, arguments)
    }
    ,
    Module.__ZdlPv = function () {
      return (Module.__ZdlPv = Module.asm._ZdlPv).apply(null, arguments)
    }
    ,
    Module.__ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv = function () {
      return (Module.__ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv = Module.asm._ZNKSt3__220__vector_base_commonILb1EE20__throw_length_errorEv).apply(null, arguments)
    }
    ,
    Module._orig$ts_parser_timeout_micros = function () {
      return (Module._orig$ts_parser_timeout_micros = Module.asm.orig$ts_parser_timeout_micros).apply(null, arguments)
    }
    ,
    Module._orig$ts_parser_set_timeout_micros = function () {
      return (Module._orig$ts_parser_set_timeout_micros = Module.asm.orig$ts_parser_set_timeout_micros).apply(null, arguments)
    }
    ;
  function Ge(e) {
    this.name = "ExitStatus",
      this.message = "Program terminated with exit(" + e + ")",
      this.status = e
  }
  Module.allocate = function (e, t) {
    var r;
    return r = t == P ? De(e.length) : $e(e.length),
      e.subarray || e.slice ? q.set(e, r) : q.set(new Uint8Array(e), r),
      r
  }
    ;
  ee = function e() {
    Ze || Be(),
      Ze || (ee = e)
  }
    ;
  var He = !1;
  function Be(e) {
    function t() {
      Ze || (Ze = !0,
        Module.calledRun = !0,
        x || (Q = !0,
          fe(K),
          fe(V),
          Module.onRuntimeInitialized && Module.onRuntimeInitialized(),
          Ve && function (e) {
            var t = Module._main;
            if (t) {
              var r = (e = e || []).length + 1
                , n = De(4 * (r + 1));
              T[n >> 2] = D(o);
              for (var s = 1; s < r; s++)
                T[(n >> 2) + s] = D(e[s - 1]);
              T[(n >> 2) + r] = 0;
              try {
                Ke(t(r, n), !0)
              } catch (e) {
                if (e instanceof Ge)
                  return;
                if ("unwind" == e)
                  return;
                var a = e;
                e && "object" == typeof e && e.stack && (a = [e, e.stack]),
                  p("exception thrown: " + a),
                  _(1, e)
              } finally {
                !0
              }
            }
          }(e),
          function () {
            if (Module.postRun)
              for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length;)
                e = Module.postRun.shift(),
                  X.unshift(e);
            var e;
            fe(X)
          }()))
    }
    e = e || s,
      Y > 0 || !He && (function () {
        if (E.length) {
          if (!d)
            return te(),
              void E.reduce(function (e, t) {
                return e.then(function () {
                  return xe(t, {
                    loadAsync: !0,
                    global: !0,
                    nodelete: !0,
                    allowUndefined: !0
                  })
                })
              }, Promise.resolve()).then(function () {
                re(),
                  Ne()
              });
          E.forEach(function (e) {
            xe(e, {
              global: !0,
              nodelete: !0,
              allowUndefined: !0
            })
          }),
            Ne()
        } else
          Ne()
      }(),
        He = !0,
        Y > 0) || (!function () {
          if (Module.preRun)
            for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length;)
              e = Module.preRun.shift(),
                B.unshift(e);
          var e;
          fe(B)
        }(),
          Y > 0 || (Module.setStatus ? (Module.setStatus("Running..."),
            setTimeout(function () {
              setTimeout(function () {
                Module.setStatus("")
              }, 1),
                t()
            }, 1)) : t()))
  }
  function Ke(e, t) {
    e,
      t && ge() && 0 === e || (ge() || (!0,
        Module.onExit && Module.onExit(e),
        x = !0),
        _(e, new Ge(e)))
  }
  if (Module.run = Be,
    Module.preInit)
    for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); Module.preInit.length > 0;)
      Module.preInit.pop()();
  var Ve = !0;
  Module.noInitialRun && (Ve = !1),
    Be();
  const Xe = Module
    , Qe = {}
    , Ye = 4
    , Je = 5 * Ye
    , et = 2 * Ye
    , tt = 2 * Ye + 2 * et
    , rt = {
      row: 0,
      column: 0
    }
    , nt = /[\w-.]*/g
    , st = 1
    , ot = 2
    , _t = /^_?tree_sitter_\w+/;
  var at, ut, it, lt, dt, ct = new Promise(e => {
    Module.onRuntimeInitialized = e
  }
  ).then(() => {
    it = Xe._ts_init(),
      at = A(it, "i32"),
      ut = A(it + Ye, "i32")
  }
  );
  class Parser {
    static init() {
      return ct
    }
    constructor() {
      if (null == it)
        throw new Error("You must first call Parser.init() and wait for it to resolve.");
      Xe._ts_parser_new_wasm(),
        this[0] = A(it, "i32"),
        this[1] = A(it + Ye, "i32")
    }
    delete() {
      Xe._ts_parser_delete(this[0]),
        Xe._free(this[1]),
        this[0] = 0,
        this[1] = 0
    }
    setLanguage(e) {
      let t;
      if (e) {
        if (e.constructor !== Language)
          throw new Error("Argument must be a Language");
        {
          t = e[0];
          const r = Xe._ts_language_version(t);
          if (r < ut || at < r)
            throw new Error(`Incompatible language version ${r}. ` + `Compatibility range ${ut} through ${at}.`)
        }
      } else
        t = 0,
          e = null;
      return this.language = e,
        Xe._ts_parser_set_language(this[0], t),
        this
    }
    getLanguage() {
      return this.language
    }
    parse(e, t, r) {
      if ("string" == typeof e)
        lt = ((t, r, n) => e.slice(t, n));
      else {
        if ("function" != typeof e)
          throw new Error("Argument must be a string or a function");
        lt = e
      }
      this.logCallback ? (dt = this.logCallback,
        Xe._ts_parser_enable_logger_wasm(this[0], 1)) : (dt = null,
          Xe._ts_parser_enable_logger_wasm(this[0], 0));
      let n = 0
        , s = 0;
      if (r && r.includedRanges) {
        n = r.includedRanges.length;
        let e = s = Xe._calloc(n, tt);
        for (let t = 0; t < n; t++)
          vt(e, r.includedRanges[t]),
            e += tt
      }
      const o = Xe._ts_parser_parse_wasm(this[0], this[1], t ? t[0] : 0, s, n);
      if (!o)
        throw lt = null,
        dt = null,
        new Error("Parsing failed");
      const _ = new Tree(Qe, o, this.language, lt);
      return lt = null,
        dt = null,
        _
    }
    reset() {
      Xe._ts_parser_reset(this[0])
    }
    setTimeoutMicros(e) {
      Xe._ts_parser_set_timeout_micros(this[0], e)
    }
    getTimeoutMicros() {
      return Xe._ts_parser_timeout_micros(this[0])
    }
    setLogger(e) {
      if (e) {
        if ("function" != typeof e)
          throw new Error("Logger callback must be a function")
      } else
        e = null;
      return this.logCallback = e,
        this
    }
    getLogger() {
      return this.logCallback
    }
  }
  class Tree {
    constructor(e, t, r, n) {
      pt(e),
        this[0] = t,
        this.language = r,
        this.textCallback = n
    }
    copy() {
      const e = Xe._ts_tree_copy(this[0]);
      return new Tree(Qe, e, this.language, this.textCallback)
    }
    delete() {
      Xe._ts_tree_delete(this[0]),
        this[0] = 0
    }
    edit(e) {
      !function (e) {
        let t = it;
        bt(t, e.startPosition),
          bt(t += et, e.oldEndPosition),
          bt(t += et, e.newEndPosition),
          S(t += et, e.startIndex, "i32"),
          S(t += Ye, e.oldEndIndex, "i32"),
          S(t += Ye, e.newEndIndex, "i32"),
          t += Ye
      }(e),
        Xe._ts_tree_edit_wasm(this[0])
    }
    get rootNode() {
      return Xe._ts_tree_root_node_wasm(this[0]),
        wt(this)
    }
    getLanguage() {
      return this.language
    }
    walk() {
      return this.rootNode.walk()
    }
    getChangedRanges(e) {
      if (e.constructor !== Tree)
        throw new TypeError("Argument must be a Tree");
      Xe._ts_tree_get_changed_ranges_wasm(this[0], e[0]);
      const t = A(it, "i32")
        , r = A(it + Ye, "i32")
        , n = new Array(t);
      if (t > 0) {
        let e = r;
        for (let r = 0; r < t; r++)
          n[r] = It(e),
            e += tt;
        Xe._free(r)
      }
      return n
    }
  }
  class Node {
    constructor(e, t) {
      pt(e),
        this.tree = t
    }
    get typeId() {
      return gt(this),
        Xe._ts_node_symbol_wasm(this.tree[0])
    }
    get type() {
      return this.tree.language.types[this.typeId] || "ERROR"
    }
    get endPosition() {
      return gt(this),
        Xe._ts_node_end_point_wasm(this.tree[0]),
        Et(it)
    }
    get endIndex() {
      return gt(this),
        Xe._ts_node_end_index_wasm(this.tree[0])
    }
    get text() {
      return mt(this.tree, this.startIndex, this.endIndex)
    }
    isNamed() {
      return gt(this),
        1 === Xe._ts_node_is_named_wasm(this.tree[0])
    }
    hasError() {
      return gt(this),
        1 === Xe._ts_node_has_error_wasm(this.tree[0])
    }
    hasChanges() {
      return gt(this),
        1 === Xe._ts_node_has_changes_wasm(this.tree[0])
    }
    isMissing() {
      return gt(this),
        1 === Xe._ts_node_is_missing_wasm(this.tree[0])
    }
    equals(e) {
      return this.id === e.id
    }
    child(e) {
      return gt(this),
        Xe._ts_node_child_wasm(this.tree[0], e),
        wt(this.tree)
    }
    namedChild(e) {
      return gt(this),
        Xe._ts_node_named_child_wasm(this.tree[0], e),
        wt(this.tree)
    }
    childForFieldId(e) {
      return gt(this),
        Xe._ts_node_child_by_field_id_wasm(this.tree[0], e),
        wt(this.tree)
    }
    childForFieldName(e) {
      const t = this.tree.language.fields.indexOf(e);
      if (-1 !== t)
        return this.childForFieldId(t)
    }
    get childCount() {
      return gt(this),
        Xe._ts_node_child_count_wasm(this.tree[0])
    }
    get namedChildCount() {
      return gt(this),
        Xe._ts_node_named_child_count_wasm(this.tree[0])
    }
    get firstChild() {
      return this.child(0)
    }
    get firstNamedChild() {
      return this.namedChild(0)
    }
    get lastChild() {
      return this.child(this.childCount - 1)
    }
    get lastNamedChild() {
      return this.namedChild(this.namedChildCount - 1)
    }
    get children() {
      if (!this._children) {
        gt(this),
          Xe._ts_node_children_wasm(this.tree[0]);
        const e = A(it, "i32")
          , t = A(it + Ye, "i32");
        if (this._children = new Array(e),
          e > 0) {
          let r = t;
          for (let t = 0; t < e; t++)
            this._children[t] = wt(this.tree, r),
              r += Je;
          Xe._free(t)
        }
      }
      return this._children
    }
    get namedChildren() {
      if (!this._namedChildren) {
        gt(this),
          Xe._ts_node_named_children_wasm(this.tree[0]);
        const e = A(it, "i32")
          , t = A(it + Ye, "i32");
        if (this._namedChildren = new Array(e),
          e > 0) {
          let r = t;
          for (let t = 0; t < e; t++)
            this._namedChildren[t] = wt(this.tree, r),
              r += Je;
          Xe._free(t)
        }
      }
      return this._namedChildren
    }
    descendantsOfType(e, t, r) {
      Array.isArray(e) || (e = [e]),
        t || (t = rt),
        r || (r = rt);
      const n = []
        , s = this.tree.language.types;
      for (let t = 0, r = s.length; t < r; t++)
        e.includes(s[t]) && n.push(t);
      const o = Xe._malloc(Ye * n.length);
      for (let e = 0, t = n.length; e < t; e++)
        S(o + e * Ye, n[e], "i32");
      gt(this),
        Xe._ts_node_descendants_of_type_wasm(this.tree[0], o, n.length, t.row, t.column, r.row, r.column);
      const _ = A(it, "i32")
        , a = A(it + Ye, "i32")
        , u = new Array(_);
      if (_ > 0) {
        let e = a;
        for (let t = 0; t < _; t++)
          u[t] = wt(this.tree, e),
            e += Je
      }
      return Xe._free(a),
        Xe._free(o),
        u
    }
    get nextSibling() {
      return gt(this),
        Xe._ts_node_next_sibling_wasm(this.tree[0]),
        wt(this.tree)
    }
    get previousSibling() {
      return gt(this),
        Xe._ts_node_prev_sibling_wasm(this.tree[0]),
        wt(this.tree)
    }
    get nextNamedSibling() {
      return gt(this),
        Xe._ts_node_next_named_sibling_wasm(this.tree[0]),
        wt(this.tree)
    }
    get previousNamedSibling() {
      return gt(this),
        Xe._ts_node_prev_named_sibling_wasm(this.tree[0]),
        wt(this.tree)
    }
    get parent() {
      return gt(this),
        Xe._ts_node_parent_wasm(this.tree[0]),
        wt(this.tree)
    }
    descendantForIndex(e, t = e) {
      if ("number" != typeof e || "number" != typeof t)
        throw new Error("Arguments must be numbers");
      gt(this);
      let r = it + Je;
      return S(r, e, "i32"),
        S(r + Ye, t, "i32"),
        Xe._ts_node_descendant_for_index_wasm(this.tree[0]),
        wt(this.tree)
    }
    namedDescendantForIndex(e, t = e) {
      if ("number" != typeof e || "number" != typeof t)
        throw new Error("Arguments must be numbers");
      gt(this);
      let r = it + Je;
      return S(r, e, "i32"),
        S(r + Ye, t, "i32"),
        Xe._ts_node_named_descendant_for_index_wasm(this.tree[0]),
        wt(this.tree)
    }
    descendantForPosition(e, t = e) {
      if (!ht(e) || !ht(t))
        throw new Error("Arguments must be {row, column} objects");
      gt(this);
      let r = it + Je;
      return bt(r, e),
        bt(r + et, t),
        Xe._ts_node_descendant_for_position_wasm(this.tree[0]),
        wt(this.tree)
    }
    namedDescendantForPosition(e, t = e) {
      if (!ht(e) || !ht(t))
        throw new Error("Arguments must be {row, column} objects");
      gt(this);
      let r = it + Je;
      return bt(r, e),
        bt(r + et, t),
        Xe._ts_node_named_descendant_for_position_wasm(this.tree[0]),
        wt(this.tree)
    }
    walk() {
      return gt(this),
        Xe._ts_tree_cursor_new_wasm(this.tree[0]),
        new TreeCursor(Qe, this.tree)
    }
    toString() {
      gt(this);
      const e = Xe._ts_node_to_string_wasm(this.tree[0])
        , t = function (e) {
          for (var t = ""; ;) {
            var r = q[e++ >> 0];
            if (!r)
              return t;
            t += String.fromCharCode(r)
          }
        }(e);
      return Xe._free(e),
        t
    }
  }
  class TreeCursor {
    constructor(e, t) {
      pt(e),
        this.tree = t,
        yt(this)
    }
    delete() {
      Mt(this),
        Xe._ts_tree_cursor_delete_wasm(this.tree[0]),
        this[0] = this[1] = this[2] = 0
    }
    reset(e) {
      gt(e),
        Mt(this, it + Je),
        Xe._ts_tree_cursor_reset_wasm(this.tree[0]),
        yt(this)
    }
    get nodeType() {
      return this.tree.language.types[this.nodeTypeId] || "ERROR"
    }
    get nodeTypeId() {
      return Mt(this),
        Xe._ts_tree_cursor_current_node_type_id_wasm(this.tree[0])
    }
    get nodeId() {
      return Mt(this),
        Xe._ts_tree_cursor_current_node_id_wasm(this.tree[0])
    }
    get nodeIsNamed() {
      return Mt(this),
        1 === Xe._ts_tree_cursor_current_node_is_named_wasm(this.tree[0])
    }
    get nodeIsMissing() {
      return Mt(this),
        1 === Xe._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0])
    }
    get nodeText() {
      Mt(this);
      const e = Xe._ts_tree_cursor_start_index_wasm(this.tree[0])
        , t = Xe._ts_tree_cursor_end_index_wasm(this.tree[0]);
      return mt(this.tree, e, t)
    }
    get startPosition() {
      return Mt(this),
        Xe._ts_tree_cursor_start_position_wasm(this.tree[0]),
        Et(it)
    }
    get endPosition() {
      return Mt(this),
        Xe._ts_tree_cursor_end_position_wasm(this.tree[0]),
        Et(it)
    }
    get startIndex() {
      return Mt(this),
        Xe._ts_tree_cursor_start_index_wasm(this.tree[0])
    }
    get endIndex() {
      return Mt(this),
        Xe._ts_tree_cursor_end_index_wasm(this.tree[0])
    }
    currentNode() {
      return Mt(this),
        Xe._ts_tree_cursor_current_node_wasm(this.tree[0]),
        wt(this.tree)
    }
    currentFieldId() {
      return Mt(this),
        Xe._ts_tree_cursor_current_field_id_wasm(this.tree[0])
    }
    currentFieldName() {
      return this.tree.language.fields[this.currentFieldId()]
    }
    gotoFirstChild() {
      Mt(this);
      const e = Xe._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
      return yt(this),
        1 === e
    }
    gotoNextSibling() {
      Mt(this);
      const e = Xe._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
      return yt(this),
        1 === e
    }
    gotoParent() {
      Mt(this);
      const e = Xe._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
      return yt(this),
        1 === e
    }
  }
  class Language {
    constructor(e, t) {
      pt(e),
        this[0] = t,
        this.types = new Array(Xe._ts_language_symbol_count(this[0]));
      for (let e = 0, t = this.types.length; e < t; e++)
        Xe._ts_language_symbol_type(this[0], e) < 2 && (this.types[e] = $(Xe._ts_language_symbol_name(this[0], e)));
      this.fields = new Array(Xe._ts_language_field_count(this[0]) + 1);
      for (let e = 0, t = this.fields.length; e < t; e++) {
        const t = Xe._ts_language_field_name_for_id(this[0], e);
        this.fields[e] = 0 !== t ? $(t) : null
      }
    }
    get version() {
      return Xe._ts_language_version(this[0])
    }
    get fieldCount() {
      return this.fields.length - 1
    }
    fieldIdForName(e) {
      const t = this.fields.indexOf(e);
      return -1 !== t ? t : null
    }
    fieldNameForId(e) {
      return this.fields[e] || null
    }
    idForNodeType(e, t) {
      const r = j(e)
        , n = Xe._malloc(r + 1);
      U(e, n, r + 1);
      const s = Xe._ts_language_symbol_for_name(this[0], n, r, t);
      return Xe._free(n),
        s || null
    }
    get nodeTypeCount() {
      return Xe._ts_language_symbol_count(this[0])
    }
    nodeTypeForId(e) {
      const t = Xe._ts_language_symbol_name(this[0], e);
      return t ? $(t) : null
    }
    nodeTypeIsNamed(e) {
      return !!Xe._ts_language_type_is_named_wasm(this[0], e)
    }
    nodeTypeIsVisible(e) {
      return !!Xe._ts_language_type_is_visible_wasm(this[0], e)
    }
    query(e) {
      const t = j(e)
        , r = Xe._malloc(t + 1);
      U(e, r, t + 1);
      const n = Xe._ts_query_new(this[0], r, t, it, it + Ye);
      if (!n) {
        const t = A(it + Ye, "i32")
          , n = $(r, A(it, "i32")).length
          , s = e.substr(n, 100).split("\n")[0];
        let o, _ = s.match(nt)[0];
        switch (t) {
          case 2:
            o = new RangeError(`Bad node name '${_}'`);
            break;
          case 3:
            o = new RangeError(`Bad field name '${_}'`);
            break;
          case 4:
            o = new RangeError(`Bad capture name @${_}`);
            break;
          case 5:
            o = new TypeError(`Bad pattern structure at offset ${n}: '${s}'...`),
              _ = "";
            break;
          default:
            o = new SyntaxError(`Bad syntax at offset ${n}: '${s}'...`),
              _ = ""
        }
        throw o.index = n,
        o.length = _.length,
        Xe._free(r),
        o
      }
      const s = Xe._ts_query_string_count(n)
        , o = Xe._ts_query_capture_count(n)
        , _ = Xe._ts_query_pattern_count(n)
        , a = new Array(o)
        , u = new Array(s);
      for (let e = 0; e < o; e++) {
        const t = Xe._ts_query_capture_name_for_id(n, e, it)
          , r = A(it, "i32");
        a[e] = $(t, r)
      }
      for (let e = 0; e < s; e++) {
        const t = Xe._ts_query_string_value_for_id(n, e, it)
          , r = A(it, "i32");
        u[e] = $(t, r)
      }
      const i = new Array(_)
        , l = new Array(_)
        , d = new Array(_)
        , c = new Array(_)
        , m = new Array(_);
      for (let e = 0; e < _; e++) {
        const t = Xe._ts_query_predicates_for_pattern(n, e, it)
          , r = A(it, "i32");
        c[e] = [],
          m[e] = [];
        const s = [];
        let o = t;
        for (let t = 0; t < r; t++) {
          const t = A(o, "i32")
            , r = A(o += Ye, "i32");
          if (o += Ye,
            t === st)
            s.push({
              type: "capture",
              name: a[r]
            });
          else if (t === ot)
            s.push({
              type: "string",
              value: u[r]
            });
          else if (s.length > 0) {
            if ("string" !== s[0].type)
              throw new Error("Predicates must begin with a literal value");
            const t = s[0].value;
            let r = !0;
            switch (t) {
              case "not-eq?":
                r = !1;
              case "eq?":
                if (3 !== s.length)
                  throw new Error(`Wrong number of arguments to \`#eq?\` predicate. Expected 2, got ${s.length - 1}`);
                if ("capture" !== s[1].type)
                  throw new Error(`First argument of \`#eq?\` predicate must be a capture. Got "${s[1].value}"`);
                if ("capture" === s[2].type) {
                  const t = s[1].name
                    , n = s[2].name;
                  m[e].push(function (e) {
                    let s, o;
                    for (const r of e)
                      r.name === t && (s = r.node),
                        r.name === n && (o = r.node);
                    return s.text === o.text === r
                  })
                } else {
                  const t = s[1].name
                    , n = s[2].value;
                  m[e].push(function (e) {
                    for (const s of e)
                      if (s.name === t)
                        return s.node.text === n === r;
                    return !1
                  })
                }
                break;
              case "not-match?":
                r = !1;
              case "match?":
                if (3 !== s.length)
                  throw new Error(`Wrong number of arguments to \`#match?\` predicate. Expected 2, got ${s.length - 1}.`);
                if ("capture" !== s[1].type)
                  throw new Error(`First argument of \`#match?\` predicate must be a capture. Got "${s[1].value}".`);
                if ("string" !== s[2].type)
                  throw new Error(`Second argument of \`#match?\` predicate must be a string. Got @${s[2].value}.`);
                const n = s[1].name
                  , o = new RegExp(s[2].value);
                m[e].push(function (e) {
                  for (const t of e)
                    if (t.name === n)
                      return o.test(t.node.text) === r;
                  return !1
                });
                break;
              case "set!":
                if (s.length < 2 || s.length > 3)
                  throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${s.length - 1}.`);
                if (s.some(e => "string" !== e.type))
                  throw new Error('Arguments to `#set!` predicate must be a strings.".');
                i[e] || (i[e] = {}),
                  i[e][s[1].value] = s[2] ? s[2].value : null;
                break;
              case "is?":
              case "is-not?":
                if (s.length < 2 || s.length > 3)
                  throw new Error(`Wrong number of arguments to \`#${t}\` predicate. Expected 1 or 2. Got ${s.length - 1}.`);
                if (s.some(e => "string" !== e.type))
                  throw new Error(`Arguments to \`#${t}\` predicate must be a strings.".`);
                const _ = "is?" === t ? l : d;
                _[e] || (_[e] = {}),
                  _[e][s[1].value] = s[2] ? s[2].value : null;
                break;
              default:
                c[e].push({
                  operator: t,
                  operands: s.slice(1)
                })
            }
            s.length = 0
          }
        }
        Object.freeze(i[e]),
          Object.freeze(l[e]),
          Object.freeze(d[e])
      }
      return Xe._free(r),
        new Query(Qe, n, a, m, c, Object.freeze(i), Object.freeze(l), Object.freeze(d))
    }
    static load(e) {
      let t;
      if (e instanceof Uint8Array)
        t = Promise.resolve(e);
      else {
        const r = e;
        if ("undefined" != typeof process && process.versions && process.versions.node) {
          const e = require("fs");
          t = Promise.resolve(e.readFileSync(r))
        } else
          t = fetch(r).then(e => e.arrayBuffer().then(t => {
            if (e.ok)
              return new Uint8Array(t);
            {
              const r = new TextDecoder("utf-8").decode(t);
              throw new Error(`Language.load failed with status ${e.status}.\n\n${r}`)
            }
          }
          ))
      }
      const r = "function" == typeof loadSideModule ? loadSideModule : Ae;
      return t.then(e => r(e, {
        loadAsync: !0
      })).then(e => {
        const t = Object.keys(e)
          , r = t.find(e => _t.test(e) && !e.includes("external_scanner_"));
        r || console.log(`Couldn't find language function in WASM file. Symbols:\n${JSON.stringify(t, null, 2)}`);
        const n = e[r]();
        return new Language(Qe, n)
      }
      )
    }
  }
  class Query {
    constructor(e, t, r, n, s, o, _, a) {
      pt(e),
        this[0] = t,
        this.captureNames = r,
        this.textPredicates = n,
        this.predicates = s,
        this.setProperties = o,
        this.assertedProperties = _,
        this.refutedProperties = a,
        this.exceededMatchLimit = !1
    }
    delete() {
      Xe._ts_query_delete(this[0]),
        this[0] = 0
    }
    matches(e, t, r) {
      t || (t = rt),
        r || (r = rt),
        gt(e),
        Xe._ts_query_matches_wasm(this[0], e.tree[0], t.row, t.column, r.row, r.column);
      const n = A(it, "i32")
        , s = A(it + Ye, "i32")
        , o = A(it + 2 * Ye, "i32")
        , _ = new Array(n);
      this.exceededMatchLimit = !!o;
      let a = 0
        , u = s;
      for (let t = 0; t < n; t++) {
        const r = A(u, "i32")
          , n = A(u += Ye, "i32");
        u += Ye;
        const s = new Array(n);
        if (u = ft(this, e.tree, u, s),
          this.textPredicates[r].every(e => e(s))) {
          _[a++] = {
            pattern: r,
            captures: s
          };
          const e = this.setProperties[r];
          e && (_[t].setProperties = e);
          const n = this.assertedProperties[r];
          n && (_[t].assertedProperties = n);
          const o = this.refutedProperties[r];
          o && (_[t].refutedProperties = o)
        }
      }
      return _.length = a,
        Xe._free(s),
        _
    }
    captures(e, t, r) {
      t || (t = rt),
        r || (r = rt),
        gt(e),
        Xe._ts_query_captures_wasm(this[0], e.tree[0], t.row, t.column, r.row, r.column);
      const n = A(it, "i32")
        , s = A(it + Ye, "i32")
        , o = A(it + 2 * Ye, "i32")
        , _ = [];
      this.exceededMatchLimit = !!o;
      const a = [];
      let u = s;
      for (let t = 0; t < n; t++) {
        const t = A(u, "i32")
          , r = A(u += Ye, "i32")
          , n = A(u += Ye, "i32");
        if (u += Ye,
          a.length = r,
          u = ft(this, e.tree, u, a),
          this.textPredicates[t].every(e => e(a))) {
          const e = a[n]
            , r = this.setProperties[t];
          r && (e.setProperties = r);
          const s = this.assertedProperties[t];
          s && (e.assertedProperties = s);
          const o = this.refutedProperties[t];
          o && (e.refutedProperties = o),
            _.push(e)
        }
      }
      return Xe._free(s),
        _
    }
    predicatesForPattern(e) {
      return this.predicates[e]
    }
    didExceedMatchLimit() {
      return this.exceededMatchLimit
    }
  }
  function mt(e, t, r) {
    const n = r - t;
    let s = e.textCallback(t, null, r);
    for (t += s.length; t < r;) {
      const n = e.textCallback(t, null, r);
      if (!(n && n.length > 0))
        break;
      t += n.length,
        s += n
    }
    return t > r && (s = s.slice(0, n)),
      s
  }
  function ft(e, t, r, n) {
    for (let s = 0, o = n.length; s < o; s++) {
      const o = A(r, "i32")
        , _ = wt(t, r += Ye);
      r += Je,
        n[s] = {
          name: e.captureNames[o],
          node: _
        }
    }
    return r
  }
  function pt(e) {
    if (e !== Qe)
      throw new Error("Illegal constructor")
  }
  function ht(e) {
    return e && "number" == typeof e.row && "number" == typeof e.column
  }
  function gt(e) {
    let t = it;
    S(t, e.id, "i32"),
      S(t += Ye, e.startIndex, "i32"),
      S(t += Ye, e.startPosition.row, "i32"),
      S(t += Ye, e.startPosition.column, "i32"),
      S(t += Ye, e[0], "i32")
  }
  function wt(e, t = it) {
    const r = A(t, "i32");
    if (0 === r)
      return null;
    const n = A(t += Ye, "i32")
      , s = A(t += Ye, "i32")
      , o = A(t += Ye, "i32")
      , _ = A(t += Ye, "i32")
      , a = new Node(Qe, e);
    return a.id = r,
      a.startIndex = n,
      a.startPosition = {
        row: s,
        column: o
      },
      a[0] = _,
      a
  }
  function Mt(e, t = it) {
    S(t + 0 * Ye, e[0], "i32"),
      S(t + 1 * Ye, e[1], "i32"),
      S(t + 2 * Ye, e[2], "i32")
  }
  function yt(e) {
    e[0] = A(it + 0 * Ye, "i32"),
      e[1] = A(it + 1 * Ye, "i32"),
      e[2] = A(it + 2 * Ye, "i32")
  }
  function bt(e, t) {
    S(e, t.row, "i32"),
      S(e + Ye, t.column, "i32")
  }
  function Et(e) {
    return {
      row: A(e, "i32"),
      column: A(e + Ye, "i32")
    }
  }
  function vt(e, t) {
    bt(e, t.startPosition),
      bt(e += et, t.endPosition),
      S(e += et, t.startIndex, "i32"),
      S(e += Ye, t.endIndex, "i32"),
      e += Ye
  }
  function It(e) {
    const t = {};
    return t.startPosition = Et(e),
      e += et,
      t.endPosition = Et(e),
      e += et,
      t.startIndex = A(e, "i32"),
      e += Ye,
      t.endIndex = A(e, "i32"),
      t
  }
  return Parser.Language = Language,
    Parser.Parser = Parser,
    Parser
});
