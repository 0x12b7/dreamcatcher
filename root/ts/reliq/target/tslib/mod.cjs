"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/mod.ts
var mod_exports = {};
__export(mod_exports, {
  Assert: () => Assert,
  Err: () => Err,
  Float: () => Float,
  I: () => I,
  MAX_128: () => MAX_128,
  MAX_16: () => MAX_16,
  MAX_256: () => MAX_256,
  MAX_32: () => MAX_32,
  MAX_64: () => MAX_64,
  MAX_8: () => MAX_8,
  MAX_SAFE_FLOAT: () => MAX_SAFE_FLOAT,
  MIN_128: () => MIN_128,
  MIN_16: () => MIN_16,
  MIN_256: () => MIN_256,
  MIN_32: () => MIN_32,
  MIN_64: () => MIN_64,
  MIN_8: () => MIN_8,
  MIN_SAFE_FLOAT: () => MIN_SAFE_FLOAT,
  MathError: () => MathError,
  None: () => None,
  Ok: () => Ok,
  Option: () => Option6,
  Restorable: () => Restorable,
  Result: () => Result3,
  Some: () => Some,
  Unsafe: () => Unsafe,
  Vec: () => Vec,
  assert: () => assert,
  clone: () => clone,
  err: () => err,
  flag: () => flag,
  flagAsync: () => flagAsync,
  isBranded: () => isBranded,
  isIndex: () => isIndex,
  isMutableCollection: () => isMutableCollection,
  isPolymorph: () => isPolymorph,
  isSequence: () => isSequence,
  isSpan: () => isSpan,
  isVec: () => isVec,
  isWrapper: () => isWrapper,
  mapErr: () => mapErr,
  none: () => none,
  ok: () => ok,
  panic: () => panic,
  require: () => require2,
  some: () => some,
  toString: () => toString,
  wrap: () => wrap,
  wrapAsync: () => wrapAsync
});
module.exports = __toCommonJS(mod_exports);

// src/core/base/ds/collection/is_vec.ts
function isVec(v) {
  if (isIndex(v) && isMutableCollection(v) && isSequence(v) && isSpan(v) && isPolymorph(v)) return true;
  else return false;
}

// src/core/base/ds/collection/vec.ts
function Vec(_v) {
  let _instance;
  {
    _instance = {
      unwrap,
      toArray,
      toString: toString2,
      toLocaleString,
      concat,
      pop,
      push,
      reverse,
      shift,
      unshift,
      splice,
      length,
      at,
      has,
      positionOf,
      find,
      join,
      slice,
      sort,
      map
    };
    return _instance;
  }
  function unwrap() {
    return _v;
  }
  function toArray() {
    return [...unwrap()];
  }
  function toString2() {
    return _v.toString();
  }
  function toLocaleString() {
    return _v.toLocaleString();
  }
  function concat(...items) {
    return Vec(_v.concat(...items));
  }
  function pop() {
    let item = _v.pop();
    if (item) return Some(item);
    return None;
  }
  function push(...items) {
    let n = _v.push(...items);
    return BigInt(n);
  }
  function reverse() {
    _v.reverse();
    return _instance;
  }
  function shift() {
    let x = _v.shift();
    if (x) return Some(x);
    return None;
  }
  function unshift(...items) {
    let n = _v.unshift(...items);
    return BigInt(n);
  }
  function splice(k, deleteCount) {
    let x = _v.splice(Number(k), deleteCount ? Number(deleteCount) : void 0);
    return Vec(x);
  }
  function length() {
    let n = _v.length;
    return BigInt(n);
  }
  function at(k) {
    let x = _v.at(Number(k));
    if (x) return Some(x);
    return None;
  }
  function has(v, k0) {
    return _v.includes(v, Number(k0));
  }
  function positionOf(v, fromPosition) {
    let n = _v.indexOf(v, fromPosition ? Number(fromPosition) : void 0);
    if (n === -1) return None;
    return Some(BigInt(n));
  }
  function find(op) {
    let x = _v.find((v, k) => op(v, BigInt(k)));
    if (x) return Some(x);
    return None;
  }
  function join(separator) {
    return _v.join();
  }
  function slice(startPosition, endPosition) {
    let x = _v.slice(startPosition ? Number(startPosition) : void 0, endPosition ? Number(endPosition) : void 0);
    return Vec(x);
  }
  function sort(op) {
    if (op) {
      let x2 = _v.sort((x3, y) => Number(op(x3, y)));
      return Vec(x2);
    }
    let x = _v.sort();
    return Vec(x);
  }
  function map(op) {
    let result = Vec([]);
    _v.map((v, k) => result.push(op(v, BigInt(k))));
    return result;
  }
}

// src/core/base/math/constant.ts
var MAX_256 = 2n ** 256n - 1n;
var MAX_128 = 2n ** 128n - 1n;
var MAX_64 = 2n ** 64n - 1n;
var MAX_32 = 2n ** 32n - 1n;
var MAX_16 = 2n ** 16n - 1n;
var MAX_8 = 2n ** 8n - 1n;
var MIN_256 = -MAX_256;
var MIN_128 = -MAX_128;
var MIN_64 = -MAX_64;
var MIN_32 = -MAX_32;
var MIN_16 = -MAX_16;
var MIN_8 = -MAX_8;
var MAX_SAFE_FLOAT = Number.MAX_SAFE_INTEGER;
var MIN_SAFE_FLOAT = Number.MIN_SAFE_INTEGER;

// src/core/base/math/math_error.ts
function MathError(_instance) {
  {
    return _instance;
  }
}

// src/core/base/math/float/float.ts
function Float(_v) {
  {
    let checkOpR = _check(_v);
    if (checkOpR.err()) return checkOpR;
    return Ok({
      type,
      unwrap,
      add,
      sub,
      mul,
      div,
      pow
    });
  }
  function type() {
    return "FLOAT";
  }
  function unwrap() {
    return _v;
  }
  function eq(v) {
    if (isBranded(v, "I")) return _v === Number(v.unwrap());
    if (isBranded(v, "U")) return _v === Number(v.unwrap());
    if (isBranded(v, "FLOAT")) return _v === Number(v.unwrap());
    if (typeof v === "number") return _v === v;
    if (typeof v === "bigint") return _v === Number(v);
    return false;
  }
  function lt(v) {
    if (isBranded(v, "I")) return _v < Number(v.unwrap());
    if (isBranded(v, "U")) return _v < Number(v.unwrap());
    if (isBranded(v, "FLOAT")) return _v < Number(v.unwrap());
    if (typeof v === "number") return _v < v;
    if (typeof v === "bigint") return _v < Number(v);
    return false;
  }
  function gt(v) {
    if (isBranded(v, "I")) return _v > Number(v.unwrap());
    if (isBranded(v, "U")) return _v > Number(v.unwrap());
    if (isBranded(v, "FLOAT")) return _v > Number(v.unwrap());
    if (typeof v === "number") return _v > v;
    if (typeof v === "bigint") return _v > Number(v);
    return false;
  }
  function add(v) {
    let x = v.unwrap();
    let checkOpR = _check(x);
    if (checkOpR.err()) return checkOpR;
    return Float(_v + x);
  }
  function sub(v) {
    let x = v.unwrap();
    let checkOpR = _check(x);
    if (checkOpR.err()) return checkOpR;
    return Float(_v - x);
  }
  function mul(v) {
    let x = v.unwrap();
    let checkOpR = _check(x);
    if (checkOpR.err()) return checkOpR;
    return Float(_v * x);
  }
  function div(v) {
    let x = v.unwrap();
    if (x === 0) return Err(MathError({ code: "MATH.ERR_DIVISION_BY_ZERO", message: "" }));
    let checkOpR = _check(x);
    if (checkOpR.err()) return checkOpR;
    return Float(_v / x);
  }
  function pow(v) {
    let x = v.unwrap();
    let checkOpR = _check(x);
    if (checkOpR.err()) return checkOpR;
    return Float(_v ** x);
  }
  function _check(v) {
    if (v > MAX_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_OVERFLOW", message: "" }));
    if (v < MIN_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_UNDERFLOW", message: "" }));
    if (!isFinite(v)) return Err(MathError({ code: "MATH.ERR_NOT_FINITE", message: "" }));
    if (isNaN(v)) return Err(MathError({ code: "MATH.ERR_NOT_A_NUMBER", message: "" }));
    return Ok(void 0);
  }
}

// src/core/base/math/signed/i.ts
function I(_number) {
  let _v;
  {
    if (isBranded(_number, "I")) _v = _number.unwrap();
    else if (isBranded(_number, "U")) _v = _number.unwrap();
    else if (isBranded(_number, "FLOAT")) _v = BigInt(_number.unwrap());
    else if (typeof _number === "number") _v = BigInt(_number);
    else _v = _number;
    return {
      type,
      unwrap,
      add,
      sub,
      mul,
      div,
      pow
    };
  }
  function type() {
    return "I";
  }
  function unwrap() {
    return _v;
  }
  function add(v) {
    let n = v.unwrap();
    return Ok(I(_v + n));
  }
  function sub(v) {
    let n = v.unwrap();
    return Ok(I(_v - n));
  }
  function mul(v) {
    let n = v.unwrap();
    return Ok(I(_v * n));
  }
  function div(v) {
    let n = v.unwrap();
    if (n === 0n) return Err(MathError({ code: "MATH.ERR_DIVISION_BY_ZERO", message: None }));
    return Ok(I(_v / n));
  }
  function pow(v) {
    let n = v.unwrap();
    return Ok(I(_v ** n));
  }
}

// src/core/base/misc/is_index.ts
function isIndex(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "has" in v && "positionOf" in v && "find" in v && typeof v.has === "function" && typeof v.positionOf === "function" && typeof v.find === "function") return true;
  return false;
}

// src/core/base/misc/is_mutable_collection.ts
function isMutableCollection(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "concat" in v && "pop" in v && "push" in v && "reverse" in v && "shift" in v && "unshift" in v && "splice" in v && typeof v.concat === "function" && typeof v.pop === "function" && typeof v.push === "function" && typeof v.reverse === "function" && typeof v.shift === "function" && typeof v.unshift === "function" && typeof v.splice === "function") return true;
  return false;
}

// src/core/base/misc/is_polymorph.ts
function isPolymorph(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "toArray" in v && "toString" in v && "toLocaleString" in v && typeof v.toArray === "function" && typeof v.toString === "function" && typeof v.toLocaleString === "function") return true;
  else return false;
}

// src/core/base/misc/is_sequence.ts
function isSequence(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "join" in v && "slice" in v && "sort" in v && "map" in v && typeof v.join === "function" && typeof v.slice === "function" && typeof v.sort === "function" && typeof v.map === "function") return true;
  return false;
}

// src/core/base/misc/is_span.ts
function isSpan(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "length" in v && "at" in v && typeof v.length === "function" && typeof v.at === "function" && typeof v.length() === "bigint" && typeof v.at() === "object") return true;
  else return false;
}

// src/err/assertion/assert.ts
var Assert = (() => {
  {
    return { some: some2, none: none2, mapErr: mapErr2 };
  }
  function some2(v) {
    let match = v !== null && v !== void 0;
    return match;
  }
  function none2(v) {
    let match = v === null && v === void 0;
    return match;
  }
  function mapErr2(e, errcode, handler) {
    let match = e !== null && e !== void 0 && typeof e === "object" && "message" in e && typeof e.message === "string" && e.message === errcode;
    if (match) {
      return Some(handler());
    }
    return None;
  }
})();
function assert(condition, errcode) {
  if (condition) return;
  let e = Error(errcode);
  Error.captureStackTrace(e, assert);
  throw e;
}

// src/err/assertion/panic.ts
function panic(msg) {
  let e = Error(msg);
  Error.captureStackTrace(e, panic);
  throw e;
}

// src/err/assertion/require.ts
function require2(condition, errcode) {
  if (condition) return;
  let e = Error(errcode);
  Error.captureStackTrace(e, require2);
  throw e;
}

// src/err/assertion/restorable.ts
function Restorable(_v) {
  {
    return {
      get,
      mut,
      mutAsync
    };
  }
  function get() {
    return _v;
  }
  function mut(op) {
    let snapshot = clone(_v).unwrap();
    try {
      op(get());
    } catch (e) {
      _v = snapshot;
      throw e;
    }
  }
  async function mutAsync(op) {
    let snapshot = clone(_v).unwrap();
    try {
      await op(get());
    } catch (e) {
      _v = snapshot;
      throw e;
    }
  }
}

// src/err/assertion/shorthand.ts
var mapErr = Assert.mapErr;

// src/err/result/err/err.ts
function Err(_v) {
  let _instance;
  let _stack;
  {
    _instance = {
      type,
      ok: ok2,
      err: err2,
      val,
      stack,
      expect,
      expectErr,
      unwrap,
      unwrapOr,
      andThen,
      map,
      mapErr: mapErr2,
      toOption,
      toString: toString2
    };
    let content = Error().stack.split("\n").slice(2);
    let match = content && content.length > 0 && content[0].includes("Err");
    if (match) content.shift();
    _stack = content.join("\n");
    return _instance;
  }
  function type() {
    return "ERR";
  }
  function ok2() {
    return false;
  }
  function err2() {
    return true;
  }
  function val() {
    return _v;
  }
  function stack() {
    return _stack;
  }
  function expect(msg) {
    throw `${msg}
${stack()}`;
  }
  function expectErr(__) {
    return val();
  }
  function unwrap() {
    throw `${val()}
${stack()}`;
  }
  function unwrapOr(v) {
    return v;
  }
  function andThen(__) {
    return _instance;
  }
  function map(__) {
    return _instance;
  }
  function mapErr2(op) {
    return Err(op(val()));
  }
  function toOption() {
    return None;
  }
  function toString2() {
    return `Err(${toString(val())})`;
  }
}

// src/err/result/none/none.ts
var None = (() => {
  let _instance;
  {
    _instance = {
      type,
      some: some2,
      none: none2,
      expect,
      unwrap,
      unwrapOr,
      andThen,
      map,
      toResult,
      toString: toString2
    };
    return _instance;
  }
  function type() {
    return "NONE";
  }
  function some2() {
    return false;
  }
  function none2() {
    return true;
  }
  function expect(msg) {
    throw `${msg}`;
  }
  function unwrap() {
    throw `${"NONE"}
${Error().stack}`;
  }
  function unwrapOr(v) {
    return v;
  }
  function andThen(__) {
    return _instance;
  }
  function map(__) {
    return _instance;
  }
  function toResult(e) {
    return Err(e);
  }
  function toString2() {
    return "None";
  }
})();

// src/err/result/ok/ok.ts
function Ok(_v) {
  let _instance;
  {
    _instance = {
      type,
      ok: ok2,
      err: err2,
      val,
      expect,
      expectErr,
      unwrap,
      unwrapOr,
      unwrapSafely,
      andThen,
      map,
      mapErr: mapErr2,
      toOption,
      toString: toString2
    };
    return _instance;
  }
  function type() {
    return "OK";
  }
  function ok2() {
    return true;
  }
  function err2() {
    return false;
  }
  function val() {
    return _v;
  }
  function expect(__) {
    return val();
  }
  function expectErr(msg) {
    return panic(msg);
  }
  function unwrap() {
    return val();
  }
  function unwrapOr(__) {
    return val();
  }
  function unwrapSafely() {
    return val();
  }
  function andThen(op) {
    return op(val());
  }
  function map(op) {
    return Ok(op(val()));
  }
  function mapErr2(__) {
    return _instance;
  }
  function toOption() {
    return Some(val());
  }
  function toString2() {
    return `Ok(${toString(val())})`;
  }
}

// src/err/result/option/option.ts
var Option6 = (() => {
  {
    return {
      match,
      some: some2,
      none: none2,
      all,
      any,
      wrap: wrap2,
      wrapAsync: wrapAsync2
    };
  }
  function match(unknown) {
    return some2(unknown) || none2(unknown);
  }
  function some2(unknown) {
    let match2 = unknown !== void 0 && unknown !== null && typeof unknown === "object" && "some" in unknown && "none" in unknown && "val" in unknown && "expect" in unknown && "unwrap" in unknown && "unwrapOr" in unknown && "unwrapSafely" in unknown && "andThen" in unknown && "map" in unknown && "toResult" in unknown && "toString" in unknown && typeof unknown.some === "function" && typeof unknown.none === "function" && typeof unknown.val === "function" && typeof unknown.expect === "function" && typeof unknown.unwrap === "function" && typeof unknown.unwrapOr === "function" && typeof unknown.unwrapSafely === "function" && typeof unknown.andThen === "function" && typeof unknown.map === "function" && typeof unknown.toResult === "function" && typeof unknown.toString === "function" && typeof unknown.some() === "boolean" && typeof unknown.none() === "boolean" && typeof unknown.toString() === "string" && unknown.some() === true && unknown.none() === false;
    return match2;
  }
  function none2(unknown) {
    let match2 = unknown !== void 0 && unknown !== null && typeof unknown === "object" && "some" in unknown && "none" in unknown && "val" in unknown && "expect" in unknown && "unwrap" in unknown && "unwrapOr" in unknown && "unwrapSafely" in unknown && "andThen" in unknown && "map" in unknown && "toResult" in unknown && "toString" in unknown && typeof unknown.some === "function" && typeof unknown.none === "function" && typeof unknown.val === "function" && typeof unknown.expect === "function" && typeof unknown.unwrap === "function" && typeof unknown.unwrapOr === "function" && typeof unknown.unwrapSafely === "function" && typeof unknown.andThen === "function" && typeof unknown.map === "function" && typeof unknown.toResult === "function" && typeof unknown.toString === "function" && typeof unknown.some() === "boolean" && typeof unknown.none() === "boolean" && typeof unknown.toString() === "string" && unknown.some() === false && unknown.none() === true;
    return match2;
  }
  function all(...options) {
    let out = [];
    let i = 0n;
    while (i < options.length) {
      let option = options[Number(i)];
      if (option.some()) out.push(option.val());
      else return option;
      i++;
    }
    return Some(out);
  }
  function any(...options) {
    let i = 0n;
    while (i < options.length) {
      let option = options[Number(i)];
      if (option.some()) return option;
      else return option;
    }
    return None;
  }
  function wrap2(op, ...args) {
    try {
      return Some(op(...args));
    } catch {
      return None;
    }
  }
  async function wrapAsync2(op, ...args) {
    try {
      return Some(await op(...args));
    } catch {
      return None;
    }
  }
})();

// src/err/result/result/result.ts
var Result3 = (() => {
  {
    return {
      match,
      ok: ok2,
      err: err2,
      all,
      any,
      wrap: wrap2,
      wrapAsync: wrapAsync2
    };
  }
  function match(unknown) {
    return ok2(unknown) || err2(unknown);
  }
  function ok2(unknown) {
    let match2 = unknown !== void 0 && unknown !== null && typeof unknown === "object" && "ok" in unknown && "err" in unknown && "val" in unknown && "expect" in unknown && "expectErr" in unknown && "unwrap" in unknown && "unwrapOr" in unknown && "unwrapSafely" in unknown && "andThen" in unknown && "map" in unknown && "mapErr" in unknown && "toOption" in unknown && "toString" in unknown && typeof unknown.ok === "function" && typeof unknown.err === "function" && typeof unknown.val === "function" && typeof unknown.expect === "function" && typeof unknown.expectErr === "function" && typeof unknown.unwrap === "function" && typeof unknown.unwrapOr === "function" && typeof unknown.unwrapSafely === "function" && typeof unknown.andThen === "function" && typeof unknown.map === "function" && typeof unknown.mapErr === "function" && typeof unknown.toOption === "function" && typeof unknown.toString === "function" && typeof unknown.ok() === "boolean" && typeof unknown.err() === "boolean" && typeof unknown.toString() === "string" && unknown.ok() === true && unknown.err() === false;
    return match2;
  }
  function err2(unknown) {
    let match2 = unknown !== void 0 && unknown !== null && typeof unknown === "object" && "ok" in unknown && "err" in unknown && "val" in unknown && "stack" in unknown && "expect" in unknown && "expectErr" in unknown && "unwrap" in unknown && "unwrapOr" in unknown && "andThen" in unknown && "map" in unknown && "mapErr" in unknown && "toOption" in unknown && "toString" in unknown && typeof unknown.ok === "function" && typeof unknown.err === "function" && typeof unknown.val === "function" && typeof unknown.stack === "function" && typeof unknown.expect === "function" && typeof unknown.expectErr === "function" && typeof unknown.unwrap === "function" && typeof unknown.unwrapOr === "function" && typeof unknown.andThen === "function" && typeof unknown.map === "function" && typeof unknown.mapErr === "function" && typeof unknown.toOption === "function" && typeof unknown.toString === "function" && typeof unknown.ok() === "boolean" && typeof unknown.err() === "boolean" && typeof unknown.toString() === "string" && unknown.ok() === false && unknown.err() === true;
    return match2;
  }
  function all(...results) {
    let out = [];
    let i = 0n;
    while (i < results.length) {
      let result = results[Number(i)];
      if (result.ok()) out.push(result.val());
      else return result;
      i++;
    }
    return Ok(out);
  }
  function any(...results) {
    let out = [];
    let i = 0n;
    while (i < results.length) {
      let result = results[Number(i)];
      if (result.ok()) return result;
      else out.push(result.val());
      i++;
    }
    return Err(out);
  }
  function wrap2(op, ...args) {
    try {
      return Ok(op(...args));
    } catch (e) {
      return Err(Unsafe(e));
    }
  }
  async function wrapAsync2(op, ...args) {
    try {
      return Ok(await op(...args));
    } catch (e) {
      return Err(Unsafe(e));
    }
  }
})();

// src/err/result/some/some.ts
function Some(_v) {
  {
    return {
      type,
      some: some2,
      none: none2,
      val,
      expect,
      unwrap,
      unwrapOr,
      unwrapSafely,
      andThen,
      map,
      toResult,
      toString: toString2
    };
  }
  function type() {
    return "SOME";
  }
  function some2() {
    return true;
  }
  function none2() {
    return false;
  }
  function val() {
    return _v;
  }
  function expect(__) {
    return val();
  }
  function unwrap() {
    return val();
  }
  function unwrapOr(__) {
    return val();
  }
  function unwrapSafely() {
    return val();
  }
  function andThen(op) {
    return op(val());
  }
  function map(op) {
    return Some(op(val()));
  }
  function toResult(__) {
    return Ok(val());
  }
  function toString2() {
    return `Some(${toString(val())})`;
  }
}

// src/err/result/unsafe/unsafe.ts
function Unsafe(_v) {
  {
    return { type, unwrap };
  }
  function type() {
    return "UNSAFE";
  }
  function unwrap() {
    return _v;
  }
}

// src/err/result/shorthand.ts
var ok = Result3.ok;
var err = Result3.err;
var wrap = Result3.wrap;
var wrapAsync = Result3.wrapAsync;
var flag = Option6.wrap;
var flagAsync = Option6.wrapAsync;
var some = Option6.some;
var none = Option6.none;

// src/misc/is_branded.ts
function isBranded(v, type) {
  if (v !== null && v !== void 0 && typeof v === "object" && "type" in v && typeof v.type === "function" && typeof v.type() === "string" && v.type() === type) return true;
  else return false;
}

// src/misc/is_wrapper.ts
function isWrapper(v) {
  if (v !== null && v !== void 0 && typeof v === "object" && "unwrap" in v && typeof v.unwrap === "function") return true;
  else return false;
}

// src/util/clone.ts
function clone(v) {
  return wrap(() => {
    return structuredClone(v);
  }).mapErr((unsafe) => {
    return unsafe.unwrap();
  });
}

// src/util/to_string.ts
function toString(v) {
  let result = String(v);
  if (result === "[object Object]")
    try {
      result = JSON.stringify(v);
    } catch {
    }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Assert,
  Err,
  Float,
  I,
  MAX_128,
  MAX_16,
  MAX_256,
  MAX_32,
  MAX_64,
  MAX_8,
  MAX_SAFE_FLOAT,
  MIN_128,
  MIN_16,
  MIN_256,
  MIN_32,
  MIN_64,
  MIN_8,
  MIN_SAFE_FLOAT,
  MathError,
  None,
  Ok,
  Option,
  Restorable,
  Result,
  Some,
  Unsafe,
  Vec,
  assert,
  clone,
  err,
  flag,
  flagAsync,
  isBranded,
  isIndex,
  isMutableCollection,
  isPolymorph,
  isSequence,
  isSpan,
  isVec,
  isWrapper,
  mapErr,
  none,
  ok,
  panic,
  require,
  some,
  toString,
  wrap,
  wrapAsync
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL21vZC50cyIsICIuLi8uLi9zcmMvY29yZS9iYXNlL2RzL2NvbGxlY3Rpb24vaXNfdmVjLnRzIiwgIi4uLy4uL3NyYy9jb3JlL2Jhc2UvZHMvY29sbGVjdGlvbi92ZWMudHMiLCAiLi4vLi4vc3JjL2NvcmUvYmFzZS9tYXRoL2NvbnN0YW50LnRzIiwgIi4uLy4uL3NyYy9jb3JlL2Jhc2UvbWF0aC9tYXRoX2Vycm9yLnRzIiwgIi4uLy4uL3NyYy9jb3JlL2Jhc2UvbWF0aC9mbG9hdC9mbG9hdC50cyIsICIuLi8uLi9zcmMvY29yZS9iYXNlL21hdGgvc2lnbmVkL2kudHMiLCAiLi4vLi4vc3JjL2NvcmUvYmFzZS9taXNjL2lzX2luZGV4LnRzIiwgIi4uLy4uL3NyYy9jb3JlL2Jhc2UvbWlzYy9pc19tdXRhYmxlX2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vc3JjL2NvcmUvYmFzZS9taXNjL2lzX3BvbHltb3JwaC50cyIsICIuLi8uLi9zcmMvY29yZS9iYXNlL21pc2MvaXNfc2VxdWVuY2UudHMiLCAiLi4vLi4vc3JjL2NvcmUvYmFzZS9taXNjL2lzX3NwYW4udHMiLCAiLi4vLi4vc3JjL2Vyci9hc3NlcnRpb24vYXNzZXJ0LnRzIiwgIi4uLy4uL3NyYy9lcnIvYXNzZXJ0aW9uL3BhbmljLnRzIiwgIi4uLy4uL3NyYy9lcnIvYXNzZXJ0aW9uL3JlcXVpcmUudHMiLCAiLi4vLi4vc3JjL2Vyci9hc3NlcnRpb24vcmVzdG9yYWJsZS50cyIsICIuLi8uLi9zcmMvZXJyL2Fzc2VydGlvbi9zaG9ydGhhbmQudHMiLCAiLi4vLi4vc3JjL2Vyci9yZXN1bHQvZXJyL2Vyci50cyIsICIuLi8uLi9zcmMvZXJyL3Jlc3VsdC9ub25lL25vbmUudHMiLCAiLi4vLi4vc3JjL2Vyci9yZXN1bHQvb2svb2sudHMiLCAiLi4vLi4vc3JjL2Vyci9yZXN1bHQvb3B0aW9uL29wdGlvbi50cyIsICIuLi8uLi9zcmMvZXJyL3Jlc3VsdC9yZXN1bHQvcmVzdWx0LnRzIiwgIi4uLy4uL3NyYy9lcnIvcmVzdWx0L3NvbWUvc29tZS50cyIsICIuLi8uLi9zcmMvZXJyL3Jlc3VsdC91bnNhZmUvdW5zYWZlLnRzIiwgIi4uLy4uL3NyYy9lcnIvcmVzdWx0L3Nob3J0aGFuZC50cyIsICIuLi8uLi9zcmMvbWlzYy9pc19icmFuZGVkLnRzIiwgIi4uLy4uL3NyYy9taXNjL2lzX3dyYXBwZXIudHMiLCAiLi4vLi4vc3JjL3V0aWwvY2xvbmUudHMiLCAiLi4vLi4vc3JjL3V0aWwvdG9fc3RyaW5nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9kcy9jb2xsZWN0aW9uL2lzX3ZlY1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvZHMvY29sbGVjdGlvbi92ZWNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21hdGgvYXJpdGhtZXRpY1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC9jb25zdGFudFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC9tYXRoX2Vycm9yX2NvZGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21hdGgvbWF0aF9lcnJvclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC9udW1iZXJfbGlrZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC93cmFwcGVkX2NhbGN1bGF0b3JcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21hdGgvZmxvYXQvZmxvYXRfbGlrZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC9mbG9hdC9mbG9hdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC9zaWduZWQvaV84XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9tYXRoL3NpZ25lZC9pXzE2XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9tYXRoL3NpZ25lZC9pXzMyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9tYXRoL3NpZ25lZC9pXzY0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9tYXRoL3NpZ25lZC9pXzEyOFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC9zaWduZWQvaV8yNTZcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21hdGgvc2lnbmVkL2lcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21hdGgvc2lnbmVkL2lfbGlrZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC9zaWduZWQvbGFyZ2VzdF9pXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9tYXRoL3Vuc2lnbmVkL3VfOFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC91bnNpZ25lZC91XzE2XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9tYXRoL3Vuc2lnbmVkL3VfMzJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21hdGgvdW5zaWduZWQvdV82NFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC91bnNpZ25lZC91XzEyOFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC91bnNpZ25lZC91XzI1NlwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC91bnNpZ25lZC91XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9tYXRoL3Vuc2lnbmVkL3VfbGlrZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWF0aC91bnNpZ25lZC9sYXJnZXN0X3VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21pc2MvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21pc2MvaXNfaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21pc2MvaXNfbXV0YWJsZV9jb2xsZWN0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9taXNjL2lzX3BvbHltb3JwaFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWlzYy9pc19zZXF1ZW5jZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWlzYy9pc19zcGFuXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NvcmUvYmFzZS9taXNjL211dGFibGVfY29sbGVjdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlL2Jhc2UvbWlzYy9wb2x5bW9ycGhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21pc2Mvc2VxdWVuY2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29yZS9iYXNlL21pc2Mvc3BhblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvYXNzZXJ0aW9uL2Fzc2VydFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvYXNzZXJ0aW9uL3BhbmljXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Vyci9hc3NlcnRpb24vcmVxdWlyZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvYXNzZXJ0aW9uL3Jlc3RvcmFibGVcIjtcclxuLyoqKi8gZXhwb3J0ICogZnJvbSBcIi4vZXJyL2Fzc2VydGlvbi9zaG9ydGhhbmRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9lcnIvZXJyX29mX2FsbFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvcmVzdWx0L2Vyci9lcnJfb2ZcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9lcnIvZXJyX3ZhbF9vZl9hbGxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9lcnIvZXJyX3ZhbF9vZlwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvcmVzdWx0L2Vyci9lcnJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9ub25lL25vbmVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9vay9va19vZl9hbGxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9vay9va19vZlwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvcmVzdWx0L29rL29rX3ZhbF9vZl9hbGxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9vay9va192YWxfb2ZcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9vay9va1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvcmVzdWx0L29wdGlvbi9hc3luY19vcHRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9vcHRpb24vb3B0aW9uX2hhbmRsZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9vcHRpb24vb3B0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Vyci9yZXN1bHQvcmVzdWx0L2FzeW5jX3Jlc3VsdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvcmVzdWx0L3Jlc3VsdC9yZXN1bHRfaGFuZGxlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lcnIvcmVzdWx0L3Jlc3VsdC9yZXN1bHRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9zb21lL3NvbWVfb2ZfYWxsXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Vyci9yZXN1bHQvc29tZS9zb21lX29mXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Vyci9yZXN1bHQvc29tZS9zb21lX3ZhbF9vZl9hbGxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXJyL3Jlc3VsdC9zb21lL3NvbWVfdmFsX29mXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Vyci9yZXN1bHQvc29tZS9zb21lXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Vyci9yZXN1bHQvdW5zYWZlL3Vuc2FmZVwiO1xyXG4vKioqLyBleHBvcnQgKiBmcm9tIFwiLi9lcnIvcmVzdWx0L3Nob3J0aGFuZFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9taXNjL2FzeW5jX2Nsb3N1cmVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWlzYy9hc3luY19mdW5jdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9taXNjL2JyYW5kZWRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWlzYy9jbG9zdXJlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21pc2MvZnVuY3Rpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWlzYy9pc19icmFuZGVkXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21pc2MvaXNfd3JhcHBlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9taXNjL21heWJlX2FzeW5jXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21pc2MvbWF5YmVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbWlzYy93cmFwcGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3V0aWwvY2xvbmVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdXRpbC90b19zdHJpbmdcIjsiLCAiaW1wb3J0IHR5cGUgeyBWZWMgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgaXNJbmRleCB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBpc011dGFibGVDb2xsZWN0aW9uIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IGlzU2VxdWVuY2UgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgaXNTcGFuIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IGlzUG9seW1vcnBoIH0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWZWModjogdW5rbm93bik6IHYgaXMgVmVjPHVua25vd24+IHtcclxuICAgIGlmIChcclxuICAgICAgICBpc0luZGV4KHYpXHJcbiAgICAgICAgJiYgaXNNdXRhYmxlQ29sbGVjdGlvbih2KVxyXG4gICAgICAgICYmIGlzU2VxdWVuY2UodilcclxuICAgICAgICAmJiBpc1NwYW4odilcclxuICAgICAgICAmJiBpc1BvbHltb3JwaCh2KVxyXG4gICAgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG59IiwgImltcG9ydCB0eXBlIHsgQ2xvc3VyZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFdyYXBwZXIgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBQb2x5bW9ycGggfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBNdXRhYmxlQ29sbGVjdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFNwYW4gfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBJbmRleCB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFNlcXVlbmNlIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBTb21lIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE5vbmUgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFZlYzxUMT4gPVxyXG4gICAgJiBXcmFwcGVyPEFycmF5PFQxPj5cclxuICAgICYgUG9seW1vcnBoPFQxPlxyXG4gICAgJiBNdXRhYmxlQ29sbGVjdGlvbjxUMT5cclxuICAgICYgU3BhbjxUMT5cclxuICAgICYgSW5kZXg8VDE+XHJcbiAgICAmIFNlcXVlbmNlPFQxPjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWM8VDE+KF92OiBBcnJheTxUMT4pOiBWZWM8VDE+IHtcclxuICAgIGxldCBfaW5zdGFuY2U6IFZlYzxUMT47XHJcblxyXG4gICAgLyoqIEBjb25zdHJ1Y3RvciAqLyB7XHJcbiAgICAgICAgX2luc3RhbmNlID0ge1xyXG4gICAgICAgICAgICB1bndyYXAsXHJcbiAgICAgICAgICAgIHRvQXJyYXksXHJcbiAgICAgICAgICAgIHRvU3RyaW5nLFxyXG4gICAgICAgICAgICB0b0xvY2FsZVN0cmluZyxcclxuICAgICAgICAgICAgY29uY2F0LFxyXG4gICAgICAgICAgICBwb3AsXHJcbiAgICAgICAgICAgIHB1c2gsXHJcbiAgICAgICAgICAgIHJldmVyc2UsXHJcbiAgICAgICAgICAgIHNoaWZ0LFxyXG4gICAgICAgICAgICB1bnNoaWZ0LFxyXG4gICAgICAgICAgICBzcGxpY2UsXHJcbiAgICAgICAgICAgIGxlbmd0aCxcclxuICAgICAgICAgICAgYXQsXHJcbiAgICAgICAgICAgIGhhcyxcclxuICAgICAgICAgICAgcG9zaXRpb25PZixcclxuICAgICAgICAgICAgZmluZCxcclxuICAgICAgICAgICAgam9pbixcclxuICAgICAgICAgICAgc2xpY2UsXHJcbiAgICAgICAgICAgIHNvcnQsXHJcbiAgICAgICAgICAgIG1hcFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bndyYXAoKTogQXJyYXk8VDE+IHtcclxuICAgICAgICByZXR1cm4gX3Y7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9BcnJheSgpOiBBcnJheTxUMT4ge1xyXG4gICAgICAgIHJldHVybiBbLi4uIHVud3JhcCgpXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBfdi50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvTG9jYWxlU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIF92LnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29uY2F0KGl0ZW06IFQxKTogVmVjPFQxPjtcclxuICAgIGZ1bmN0aW9uIGNvbmNhdCguLi4gaXRlbXM6IEFycmF5PFQxPik6IFZlYzxUMT47XHJcbiAgICBmdW5jdGlvbiBjb25jYXQoLi4uIGl0ZW1zOiBBcnJheTxUMT4pOiBWZWM8VDE+IHtcclxuICAgICAgICByZXR1cm4gVmVjKF92LmNvbmNhdCguLi4gaXRlbXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwb3AoKTogT3B0aW9uPFQxPiB7XHJcbiAgICAgICAgbGV0IGl0ZW06IFxyXG4gICAgICAgICAgICB8IFQxIFxyXG4gICAgICAgICAgICB8IHVuZGVmaW5lZCBcclxuICAgICAgICAgICAgPSBfdi5wb3AoKTtcclxuICAgICAgICBpZiAoaXRlbSkgcmV0dXJuIFNvbWUoaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIE5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVzaChpdGVtOiBUMSk6IGJpZ2ludDtcclxuICAgIGZ1bmN0aW9uIHB1c2goLi4uIGl0ZW1zOiBBcnJheTxUMT4pOiBiaWdpbnQ7XHJcbiAgICBmdW5jdGlvbiBwdXNoKC4uLiBpdGVtczogQXJyYXk8VDE+KTogYmlnaW50IHtcclxuICAgICAgICBsZXQgbjogbnVtYmVyID0gX3YucHVzaCguLi4gaXRlbXMpO1xyXG4gICAgICAgIHJldHVybiBCaWdJbnQobik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmV2ZXJzZSgpOiBWZWM8VDE+IHtcclxuICAgICAgICBfdi5yZXZlcnNlKCk7XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaGlmdCgpOiBPcHRpb248VDE+IHtcclxuICAgICAgICBsZXQgeDogXHJcbiAgICAgICAgICAgIHwgVDEgXHJcbiAgICAgICAgICAgIHwgdW5kZWZpbmVkIFxyXG4gICAgICAgICAgICA9IF92LnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHgpIHJldHVybiBTb21lKHgpO1xyXG4gICAgICAgIHJldHVybiBOb25lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVuc2hpZnQoaXRlbTogVDEpOiBiaWdpbnQ7XHJcbiAgICBmdW5jdGlvbiB1bnNoaWZ0KC4uLiBpdGVtczogQXJyYXk8VDE+KTogYmlnaW50O1xyXG4gICAgZnVuY3Rpb24gdW5zaGlmdCguLi4gaXRlbXM6IEFycmF5PFQxPik6IGJpZ2ludCB7XHJcbiAgICAgICAgbGV0IG46IG51bWJlciA9IF92LnVuc2hpZnQoLi4uIGl0ZW1zKTtcclxuICAgICAgICByZXR1cm4gQmlnSW50KG4pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNwbGljZShwb3NpdGlvbjogYmlnaW50KTogVmVjPFQxPjtcclxuICAgIGZ1bmN0aW9uIHNwbGljZShwb3NpdGlvbjogYmlnaW50LCBkZWxldGVDb3VudDogYmlnaW50KTogVmVjPFQxPjtcclxuICAgIGZ1bmN0aW9uIHNwbGljZShcclxuICAgICAgICBrOiBiaWdpbnQsIFxyXG4gICAgICAgIGRlbGV0ZUNvdW50PzogYmlnaW50XHJcbiAgICApOiBWZWM8VDE+IHtcclxuICAgICAgICBsZXQgeDogQXJyYXk8VDE+ID0gX3Yuc3BsaWNlKE51bWJlcihrKSwgZGVsZXRlQ291bnQgPyBOdW1iZXIoZGVsZXRlQ291bnQpIDogdW5kZWZpbmVkKTtcclxuICAgICAgICByZXR1cm4gVmVjKHgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxlbmd0aCgpOiBiaWdpbnQge1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBfdi5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIEJpZ0ludChuKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhdChrOiBiaWdpbnQpOiBPcHRpb248VDE+IHtcclxuICAgICAgICBsZXQgeDogVDEgfCB1bmRlZmluZWQgPSBfdi5hdChOdW1iZXIoaykpO1xyXG4gICAgICAgIGlmICh4KSByZXR1cm4gU29tZSh4KTtcclxuICAgICAgICByZXR1cm4gTm9uZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYXModjogVDEpOiBib29sZWFuO1xyXG4gICAgZnVuY3Rpb24gaGFzKHY6IFQxLCBrMDogYmlnaW50KTogYm9vbGVhbjtcclxuICAgIGZ1bmN0aW9uIGhhcyhcclxuICAgICAgICB2OiBUMSxcclxuICAgICAgICBrMD86IGJpZ2ludFxyXG4gICAgKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIF92LmluY2x1ZGVzKHYsIE51bWJlcihrMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2l0aW9uT2YodjogVDEpOiBPcHRpb248YmlnaW50PjtcclxuICAgIGZ1bmN0aW9uIHBvc2l0aW9uT2YodjogVDEsIGZyb21Qb3NpdGlvbjogYmlnaW50KTogT3B0aW9uPGJpZ2ludD47XHJcbiAgICBmdW5jdGlvbiBwb3NpdGlvbk9mKFxyXG4gICAgICAgIHY6IFQxLFxyXG4gICAgICAgIGZyb21Qb3NpdGlvbj86IGJpZ2ludFxyXG4gICAgKTogT3B0aW9uPGJpZ2ludD4ge1xyXG4gICAgICAgIGxldCBuOiBudW1iZXIgPSBfdi5pbmRleE9mKHYsIGZyb21Qb3NpdGlvbiA/IE51bWJlcihmcm9tUG9zaXRpb24pIDogdW5kZWZpbmVkKTtcclxuICAgICAgICBpZiAobiA9PT0gLTEpIHJldHVybiBOb25lO1xyXG4gICAgICAgIHJldHVybiBTb21lKEJpZ0ludChuKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZDxUMj4ob3A6IENsb3N1cmU8W2l0ZW06IFQxLCBwb3NpdGlvbjogYmlnaW50XSwgVDI+KTogT3B0aW9uPFQxPiB7XHJcbiAgICAgICAgbGV0IHg6XHJcbiAgICAgICAgICAgIHwgVDFcclxuICAgICAgICAgICAgfCB1bmRlZmluZWQgXHJcbiAgICAgICAgICAgID0gX3YuZmluZCgodiwgaykgPT4gb3AodiwgQmlnSW50KGspKSk7XHJcbiAgICAgICAgaWYgKHgpIHJldHVybiBTb21lKHgpO1xyXG4gICAgICAgIHJldHVybiBOb25lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGpvaW4oKTogc3RyaW5nO1xyXG4gICAgZnVuY3Rpb24gam9pbihzZXBhcmF0b3I6IHN0cmluZyk6IHN0cmluZztcclxuICAgIGZ1bmN0aW9uIGpvaW4oXHJcbiAgICAgICAgc2VwYXJhdG9yPzogc3RyaW5nXHJcbiAgICApOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBfdi5qb2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2xpY2UoKTogVmVjPFQxPjtcclxuICAgIGZ1bmN0aW9uIHNsaWNlKHN0YXJ0UG9zaXRpb246IGJpZ2ludCk6IFZlYzxUMT47XHJcbiAgICBmdW5jdGlvbiBzbGljZShzdGFydFBvc2l0aW9uOiBiaWdpbnQsIGVuZFBvc2l0aW9uOiBiaWdpbnQpOiBWZWM8VDE+O1xyXG4gICAgZnVuY3Rpb24gc2xpY2UoXHJcbiAgICAgICAgc3RhcnRQb3NpdGlvbj86IGJpZ2ludCxcclxuICAgICAgICBlbmRQb3NpdGlvbj86IGJpZ2ludFxyXG4gICAgKTogVmVjPFQxPiB7XHJcbiAgICAgICAgbGV0IHg6IEFycmF5PFQxPiA9IF92LnNsaWNlKHN0YXJ0UG9zaXRpb24gPyBOdW1iZXIoc3RhcnRQb3NpdGlvbikgOiB1bmRlZmluZWQsIGVuZFBvc2l0aW9uID8gTnVtYmVyKGVuZFBvc2l0aW9uKSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgcmV0dXJuIFZlYyh4KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzb3J0KCk6IFZlYzxUMT47XHJcbiAgICBmdW5jdGlvbiBzb3J0KG9wOiBDbG9zdXJlPFtpdGVtMDogVDEsIGl0ZW0xOiBUMV0sIGJpZ2ludD4pOiBWZWM8VDE+O1xyXG4gICAgZnVuY3Rpb24gc29ydChcclxuICAgICAgICBvcD86IENsb3N1cmU8W2l0ZW0wOiBUMSwgaXRlbTE6IFQxXSwgYmlnaW50PlxyXG4gICAgKTogVmVjPFQxPiB7XHJcbiAgICAgICAgaWYgKG9wKSB7XHJcbiAgICAgICAgICAgIGxldCB4OiBBcnJheTxUMT4gPSBfdi5zb3J0KCh4LCB5KSA9PiBOdW1iZXIob3AoeCwgeSkpKTtcclxuICAgICAgICAgICAgcmV0dXJuIFZlYyh4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHg6IEFycmF5PFQxPiA9IF92LnNvcnQoKTtcclxuICAgICAgICByZXR1cm4gVmVjKHgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcDxUMj4ob3A6IENsb3N1cmU8W2l0ZW06IFQxLCBwb3NpdGlvbjogYmlnaW50XSwgVDI+KTogVmVjPFQyPiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogVmVjPFQyPiA9IFZlYyhbXSk7XHJcbiAgICAgICAgX3YubWFwKCh2LCBrKSA9PiByZXN1bHQucHVzaChvcCh2LCBCaWdJbnQoaykpKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufSIsICJleHBvcnQgY29uc3QgTUFYXzI1NjogYmlnaW50ID0gMm4gKiogMjU2biAtIDFuO1xyXG5leHBvcnQgY29uc3QgTUFYXzEyODogYmlnaW50ID0gMm4gKiogMTI4biAtIDFuO1xyXG5leHBvcnQgY29uc3QgTUFYXzY0OiBiaWdpbnQgPSAybiAqKiA2NG4gLSAxbjtcclxuZXhwb3J0IGNvbnN0IE1BWF8zMjogYmlnaW50ID0gMm4gKiogMzJuIC0gMW47XHJcbmV4cG9ydCBjb25zdCBNQVhfMTY6IGJpZ2ludCA9IDJuICoqIDE2biAtIDFuO1xyXG5leHBvcnQgY29uc3QgTUFYXzg6IGJpZ2ludCA9IDJuICoqIDhuIC0gMW47XHJcbmV4cG9ydCBjb25zdCBNSU5fMjU2OiBiaWdpbnQgPSAtIE1BWF8yNTY7XHJcbmV4cG9ydCBjb25zdCBNSU5fMTI4OiBiaWdpbnQgPSAtIE1BWF8xMjg7XHJcbmV4cG9ydCBjb25zdCBNSU5fNjQ6IGJpZ2ludCA9IC0gTUFYXzY0O1xyXG5leHBvcnQgY29uc3QgTUlOXzMyOiBiaWdpbnQgPSAtIE1BWF8zMjtcclxuZXhwb3J0IGNvbnN0IE1JTl8xNjogYmlnaW50ID0gLSBNQVhfMTY7XHJcbmV4cG9ydCBjb25zdCBNSU5fODogYmlnaW50ID0gLSBNQVhfODtcclxuZXhwb3J0IGNvbnN0IE1BWF9TQUZFX0ZMT0FUOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuZXhwb3J0IGNvbnN0IE1JTl9TQUZFX0ZMT0FUOiBudW1iZXIgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjsiLCAiaW1wb3J0IHR5cGUgeyBNYXRoRXJyb3JDb2RlIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgTWF0aEVycm9yID0ge1xyXG4gICAgY29kZTogTWF0aEVycm9yQ29kZTtcclxuICAgIG1lc3NhZ2U6IE9wdGlvbjxzdHJpbmc+O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1hdGhFcnJvcihfaW5zdGFuY2U6IE1hdGhFcnJvcik6IE1hdGhFcnJvciB7XHJcbiAgICBcclxuICAgIC8qKiBAY29uc3RydWN0b3IgKi8ge1xyXG4gICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IHR5cGUgeyBXcmFwcGVyIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB0eXBlIHsgQnJhbmRlZCB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEFyaXRobWV0aWMgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBOdW1iZXJMaWtlIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE1hdGhFcnJvciB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgT2sgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgRXJyIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE1BWF9TQUZFX0ZMT0FUIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE1JTl9TQUZFX0ZMT0FUIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IGlzQnJhbmRlZCB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgRmxvYXQgPVxyXG4gICAgJiBCcmFuZGVkPFwiRkxPQVRcIj5cclxuICAgICYgV3JhcHBlcjxudW1iZXI+XHJcbiAgICAmIEFyaXRobWV0aWM8bnVtYmVyPjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGbG9hdChfdjogbnVtYmVyKTogUmVzdWx0PEZsb2F0LCBNYXRoRXJyb3I+IHtcclxuICAgIC8qKiBAY29uc3RydWN0b3IgKi8ge1xyXG4gICAgICAgIGxldCBjaGVja09wUjogUmVzdWx0PHZvaWQsIE1hdGhFcnJvcj4gPSBfY2hlY2soX3YpO1xyXG4gICAgICAgIGlmIChjaGVja09wUi5lcnIoKSkgcmV0dXJuIGNoZWNrT3BSO1xyXG4gICAgICAgIHJldHVybiBPayh7XHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIHVud3JhcCxcclxuICAgICAgICAgICAgYWRkLFxyXG4gICAgICAgICAgICBzdWIsXHJcbiAgICAgICAgICAgIG11bCxcclxuICAgICAgICAgICAgZGl2LFxyXG4gICAgICAgICAgICBwb3dcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0eXBlKCk6IFwiRkxPQVRcIiB7XHJcbiAgICAgICAgcmV0dXJuIFwiRkxPQVRcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bndyYXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3Y7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXEodjogTnVtYmVyTGlrZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChpc0JyYW5kZWQodiwgXCJJXCIpKSByZXR1cm4gX3YgPT09IE51bWJlcih2LnVud3JhcCgpKTtcclxuICAgICAgICBpZiAoaXNCcmFuZGVkKHYsIFwiVVwiKSkgcmV0dXJuIF92ID09PSBOdW1iZXIodi51bndyYXAoKSk7XHJcbiAgICAgICAgaWYgKGlzQnJhbmRlZCh2LCBcIkZMT0FUXCIpKSByZXR1cm4gX3YgPT09IE51bWJlcih2LnVud3JhcCgpKTtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwibnVtYmVyXCIpIHJldHVybiBfdiA9PT0gdjtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwiYmlnaW50XCIpIHJldHVybiBfdiA9PT0gTnVtYmVyKHYpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsdCh2OiBOdW1iZXJMaWtlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlzQnJhbmRlZCh2LCBcIklcIikpIHJldHVybiBfdiA8IE51bWJlcih2LnVud3JhcCgpKTtcclxuICAgICAgICBpZiAoaXNCcmFuZGVkKHYsIFwiVVwiKSkgcmV0dXJuIF92IDwgTnVtYmVyKHYudW53cmFwKCkpO1xyXG4gICAgICAgIGlmIChpc0JyYW5kZWQodiwgXCJGTE9BVFwiKSkgcmV0dXJuIF92IDwgTnVtYmVyKHYudW53cmFwKCkpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJudW1iZXJcIikgcmV0dXJuIF92IDwgdjtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwiYmlnaW50XCIpIHJldHVybiBfdiA8IE51bWJlcih2KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ3QodjogTnVtYmVyTGlrZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChpc0JyYW5kZWQodiwgXCJJXCIpKSByZXR1cm4gX3YgPiBOdW1iZXIodi51bndyYXAoKSk7XHJcbiAgICAgICAgaWYgKGlzQnJhbmRlZCh2LCBcIlVcIikpIHJldHVybiBfdiA+IE51bWJlcih2LnVud3JhcCgpKTtcclxuICAgICAgICBpZiAoaXNCcmFuZGVkKHYsIFwiRkxPQVRcIikpIHJldHVybiBfdiA+IE51bWJlcih2LnVud3JhcCgpKTtcclxuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwibnVtYmVyXCIpIHJldHVybiBfdiA+IHY7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcImJpZ2ludFwiKSByZXR1cm4gX3YgPiBOdW1iZXIodik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZCh2OiBGbG9hdCk6IFJlc3VsdDxGbG9hdCwgTWF0aEVycm9yPiB7XHJcbiAgICAgICAgbGV0IHg6IG51bWJlciA9IHYudW53cmFwKCk7XHJcbiAgICAgICAgbGV0IGNoZWNrT3BSOiBSZXN1bHQ8dm9pZCwgTWF0aEVycm9yPiA9IF9jaGVjayh4KTtcclxuICAgICAgICBpZiAoY2hlY2tPcFIuZXJyKCkpIHJldHVybiBjaGVja09wUjtcclxuICAgICAgICByZXR1cm4gRmxvYXQoX3YgKyB4KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWIodjogRmxvYXQpOiBSZXN1bHQ8RmxvYXQsIE1hdGhFcnJvcj4ge1xyXG4gICAgICAgIGxldCB4OiBudW1iZXIgPSB2LnVud3JhcCgpO1xyXG4gICAgICAgIGxldCBjaGVja09wUjogUmVzdWx0PHZvaWQsIE1hdGhFcnJvcj4gPSBfY2hlY2soeCk7XHJcbiAgICAgICAgaWYgKGNoZWNrT3BSLmVycigpKSByZXR1cm4gY2hlY2tPcFI7XHJcbiAgICAgICAgcmV0dXJuIEZsb2F0KF92IC0geCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbXVsKHY6IEZsb2F0KTogUmVzdWx0PEZsb2F0LCBNYXRoRXJyb3I+IHtcclxuICAgICAgICBsZXQgeDogbnVtYmVyID0gdi51bndyYXAoKTtcclxuICAgICAgICBsZXQgY2hlY2tPcFI6IFJlc3VsdDx2b2lkLCBNYXRoRXJyb3I+ID0gX2NoZWNrKHgpO1xyXG4gICAgICAgIGlmIChjaGVja09wUi5lcnIoKSkgcmV0dXJuIGNoZWNrT3BSO1xyXG4gICAgICAgIHJldHVybiBGbG9hdChfdiAqIHgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpdih2OiBGbG9hdCk6IFJlc3VsdDxGbG9hdCwgTWF0aEVycm9yPiB7XHJcbiAgICAgICAgbGV0IHg6IG51bWJlciA9IHYudW53cmFwKCk7XHJcbiAgICAgICAgaWYgKHggPT09IDApIHJldHVybiBFcnIoTWF0aEVycm9yKHsgY29kZTogXCJNQVRILkVSUl9ESVZJU0lPTl9CWV9aRVJPXCIsIG1lc3NhZ2U6IFwiXCIgfSkpO1xyXG4gICAgICAgIGxldCBjaGVja09wUjogUmVzdWx0PHZvaWQsIE1hdGhFcnJvcj4gPSBfY2hlY2soeCk7XHJcbiAgICAgICAgaWYgKGNoZWNrT3BSLmVycigpKSByZXR1cm4gY2hlY2tPcFI7XHJcbiAgICAgICAgcmV0dXJuIEZsb2F0KF92IC8geCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcG93KHY6IEZsb2F0KTogUmVzdWx0PEZsb2F0LCBNYXRoRXJyb3I+IHtcclxuICAgICAgICBsZXQgeDogbnVtYmVyID0gdi51bndyYXAoKTtcclxuICAgICAgICBsZXQgY2hlY2tPcFI6IFJlc3VsdDx2b2lkLCBNYXRoRXJyb3I+ID0gX2NoZWNrKHgpO1xyXG4gICAgICAgIGlmIChjaGVja09wUi5lcnIoKSkgcmV0dXJuIGNoZWNrT3BSO1xyXG4gICAgICAgIHJldHVybiBGbG9hdChfdiAqKiB4KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfY2hlY2sodjogbnVtYmVyKTogUmVzdWx0PHZvaWQsIE1hdGhFcnJvcj4ge1xyXG4gICAgICAgIGlmICh2ID4gTUFYX1NBRkVfRkxPQVQpIHJldHVybiBFcnIoTWF0aEVycm9yKHsgY29kZTogXCJNQVRILkVSUl9BUklUSE1FVElDX09WRVJGTE9XXCIsIG1lc3NhZ2U6IFwiXCIgfSkpO1xyXG4gICAgICAgIGlmICh2IDwgTUlOX1NBRkVfRkxPQVQpIHJldHVybiBFcnIoTWF0aEVycm9yKHsgY29kZTogXCJNQVRILkVSUl9BUklUSE1FVElDX1VOREVSRkxPV1wiLCBtZXNzYWdlOiBcIlwiIH0pKTtcclxuICAgICAgICBpZiAoIWlzRmluaXRlKHYpKSByZXR1cm4gRXJyKE1hdGhFcnJvcih7IGNvZGU6IFwiTUFUSC5FUlJfTk9UX0ZJTklURVwiLCBtZXNzYWdlOiBcIlwiIH0pKTtcclxuICAgICAgICBpZiAoaXNOYU4odikpIHJldHVybiBFcnIoTWF0aEVycm9yKHsgY29kZTogXCJNQVRILkVSUl9OT1RfQV9OVU1CRVJcIiwgbWVzc2FnZTogXCJcIiB9KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBPayh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG59IiwgImltcG9ydCB0eXBlIHsgV3JhcHBlciB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJyYW5kZWQgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBXcmFwcGVkQ2FsY3VsYXRvciB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bWJlckxpa2UgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBPayB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBFcnIgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgU29tZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBOb25lIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE1hdGhFcnJvciB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBpc0JyYW5kZWQgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEkgPSBcclxuICAgICYgQnJhbmRlZDxcIklcIj5cclxuICAgICYgV3JhcHBlcjxiaWdpbnQ+XHJcbiAgICAmIFdyYXBwZWRDYWxjdWxhdG9yPGJpZ2ludD47XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSShfbnVtYmVyOiBOdW1iZXJMaWtlKTogSSB7XHJcbiAgICBsZXQgX3Y6IGJpZ2ludDtcclxuICAgIFxyXG4gICAgLyoqIEBjb25zdHJ1Y3RvciAqLyB7XHJcbiAgICAgICAgaWYgKGlzQnJhbmRlZChfbnVtYmVyLCBcIklcIikpIF92ID0gX251bWJlci51bndyYXAoKTtcclxuICAgICAgICBlbHNlIGlmIChpc0JyYW5kZWQoX251bWJlciwgXCJVXCIpKSBfdiA9IF9udW1iZXIudW53cmFwKCk7XHJcbiAgICAgICAgZWxzZSBpZiAoaXNCcmFuZGVkKF9udW1iZXIsIFwiRkxPQVRcIikpIF92ID0gQmlnSW50KF9udW1iZXIudW53cmFwKCkpO1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBfbnVtYmVyID09PSBcIm51bWJlclwiKSBfdiA9IEJpZ0ludChfbnVtYmVyKTtcclxuICAgICAgICBlbHNlIF92ID0gX251bWJlcjtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICB1bndyYXAsXHJcbiAgICAgICAgICAgIGFkZCxcclxuICAgICAgICAgICAgc3ViLFxyXG4gICAgICAgICAgICBtdWwsXHJcbiAgICAgICAgICAgIGRpdixcclxuICAgICAgICAgICAgcG93XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0eXBlKCk6IFwiSVwiIHtcclxuICAgICAgICByZXR1cm4gXCJJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwKCk6IGJpZ2ludCB7XHJcbiAgICAgICAgcmV0dXJuIF92O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZCh2OiBOdW1iZXJMaWtlKTogUmVzdWx0PEksIE1hdGhFcnJvcj4ge1xyXG4gICAgICAgIGxldCBuOiBiaWdpbnQgPSB2LnVud3JhcCgpO1xyXG4gICAgICAgIHJldHVybiBPayhJKF92ICsgbikpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1Yih2OiBOdW1iZXJMaWtlKTogUmVzdWx0PEksIE1hdGhFcnJvcj4ge1xyXG4gICAgICAgIGxldCBuOiBiaWdpbnQgPSB2LnVud3JhcCgpO1xyXG4gICAgICAgIHJldHVybiBPayhJKF92IC0gbikpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG11bCh2OiBOdW1iZXJMaWtlKTogUmVzdWx0PEksIE1hdGhFcnJvcj4ge1xyXG4gICAgICAgIGxldCBuOiBiaWdpbnQgPSB2LnVud3JhcCgpO1xyXG4gICAgICAgIHJldHVybiBPayhJKF92ICogbikpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpdih2OiBOdW1iZXJMaWtlKTogUmVzdWx0PEksIE1hdGhFcnJvcj4ge1xyXG4gICAgICAgIGxldCBuOiBiaWdpbnQgPSB2LnVud3JhcCgpO1xyXG4gICAgICAgIGlmIChuID09PSAwbikgcmV0dXJuIEVycihNYXRoRXJyb3IoeyBjb2RlOiBcIk1BVEguRVJSX0RJVklTSU9OX0JZX1pFUk9cIiwgbWVzc2FnZTogTm9uZSB9KSk7XHJcbiAgICAgICAgcmV0dXJuIE9rKEkoX3YgLyBuKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcG93KHY6IE51bWJlckxpa2UpOiBSZXN1bHQ8SSwgTWF0aEVycm9yPiB7XHJcbiAgICAgICAgbGV0IG46IGJpZ2ludCA9IHYudW53cmFwKCk7XHJcbiAgICAgICAgcmV0dXJuIE9rKEkoX3YgKiogbikpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCAiaW1wb3J0IHR5cGUgeyBJbmRleCB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5kZXgodjogdW5rbm93bik6IHYgaXMgSW5kZXg8dW5rbm93bj4ge1xyXG4gICAgaWYgKFxyXG4gICAgICAgIHYgIT09IG51bGxcclxuICAgICAgICAmJiB2ICE9PSB1bmRlZmluZWRcclxuICAgICAgICAmJiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIlxyXG4gICAgICAgICYmIFwiaGFzXCIgaW4gdlxyXG4gICAgICAgICYmIFwicG9zaXRpb25PZlwiIGluIHZcclxuICAgICAgICAmJiBcImZpbmRcIiBpbiB2XHJcbiAgICAgICAgJiYgdHlwZW9mIHYuaGFzID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAmJiB0eXBlb2Ygdi5wb3NpdGlvbk9mID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAmJiB0eXBlb2Ygdi5maW5kID09PSBcImZ1bmN0aW9uXCJcclxuICAgICkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0iLCAiaW1wb3J0IHR5cGUgeyBNdXRhYmxlQ29sbGVjdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTXV0YWJsZUNvbGxlY3Rpb24odjogdW5rbm93bik6IHYgaXMgTXV0YWJsZUNvbGxlY3Rpb248dW5rbm93bj4ge1xyXG4gICAgaWYgKFxyXG4gICAgICAgIHYgIT09IG51bGxcclxuICAgICAgICAmJiB2ICE9PSB1bmRlZmluZWRcclxuICAgICAgICAmJiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIlxyXG4gICAgICAgICYmIFwiY29uY2F0XCIgaW4gdlxyXG4gICAgICAgICYmIFwicG9wXCIgaW4gdlxyXG4gICAgICAgICYmIFwicHVzaFwiIGluIHZcclxuICAgICAgICAmJiBcInJldmVyc2VcIiBpbiB2XHJcbiAgICAgICAgJiYgXCJzaGlmdFwiIGluIHZcclxuICAgICAgICAmJiBcInVuc2hpZnRcIiBpbiB2XHJcbiAgICAgICAgJiYgXCJzcGxpY2VcIiBpbiB2XHJcbiAgICAgICAgJiYgdHlwZW9mIHYuY29uY2F0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAmJiB0eXBlb2Ygdi5wb3AgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICYmIHR5cGVvZiB2LnB1c2ggPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICYmIHR5cGVvZiB2LnJldmVyc2UgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICYmIHR5cGVvZiB2LnNoaWZ0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAmJiB0eXBlb2Ygdi51bnNoaWZ0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAmJiB0eXBlb2Ygdi5zcGxpY2UgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSIsICJpbXBvcnQgdHlwZSB7IFBvbHltb3JwaCB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUG9seW1vcnBoKHY6IHVua25vd24pOiB2IGlzIFBvbHltb3JwaDx1bmtub3duPiB7XHJcbiAgICBpZiAoXHJcbiAgICAgICAgdiAhPT0gbnVsbFxyXG4gICAgICAgICYmIHYgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICYmIHR5cGVvZiB2ID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgJiYgXCJ0b0FycmF5XCIgaW4gdlxyXG4gICAgICAgICYmIFwidG9TdHJpbmdcIiBpbiB2XHJcbiAgICAgICAgJiYgXCJ0b0xvY2FsZVN0cmluZ1wiIGluIHZcclxuICAgICAgICAmJiB0eXBlb2Ygdi50b0FycmF5ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAmJiB0eXBlb2Ygdi50b1N0cmluZyA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgJiYgdHlwZW9mIHYudG9Mb2NhbGVTdHJpbmcgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG59IiwgImltcG9ydCB0eXBlIHsgU2VxdWVuY2UgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NlcXVlbmNlKHY6IHVua25vd24pOiB2IGlzIFNlcXVlbmNlPHVua25vd24+IHtcclxuICAgIGlmIChcclxuICAgICAgICB2ICE9PSBudWxsXHJcbiAgICAgICAgJiYgdiAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgJiYgdHlwZW9mIHYgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAmJiBcImpvaW5cIiBpbiB2XHJcbiAgICAgICAgJiYgXCJzbGljZVwiIGluIHZcclxuICAgICAgICAmJiBcInNvcnRcIiBpbiB2XHJcbiAgICAgICAgJiYgXCJtYXBcIiBpbiB2XHJcbiAgICAgICAgJiYgdHlwZW9mIHYuam9pbiA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgJiYgdHlwZW9mIHYuc2xpY2UgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICYmIHR5cGVvZiB2LnNvcnQgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICYmIHR5cGVvZiB2Lm1hcCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59IiwgImltcG9ydCB0eXBlIHsgU3BhbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3Bhbih2OiB1bmtub3duKTogdiBpcyBTcGFuPHVua25vd24+IHtcclxuICAgIGlmIChcclxuICAgICAgICB2ICE9PSBudWxsXHJcbiAgICAgICAgJiYgdiAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgJiYgdHlwZW9mIHYgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAmJiBcImxlbmd0aFwiIGluIHZcclxuICAgICAgICAmJiBcImF0XCIgaW4gdlxyXG4gICAgICAgICYmIHR5cGVvZiB2Lmxlbmd0aCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgJiYgdHlwZW9mIHYuYXQgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICYmIHR5cGVvZiB2Lmxlbmd0aCgpID09PSBcImJpZ2ludFwiXHJcbiAgICAgICAgJiYgdHlwZW9mIHYuYXQoKSA9PT0gXCJvYmplY3RcIlxyXG4gICAgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG59IiwgImltcG9ydCB0eXBlIHsgQ2xvc3VyZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgU29tZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBOb25lIH0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgdHlwZSBBc3NlcnRpb25IYW5kbGVyID0ge1xyXG4gICAgc29tZTxUMT4odjogbnVsbCk6IGZhbHNlO1xyXG4gICAgc29tZTxUMT4odjogdW5kZWZpbmVkKTogZmFsc2U7XHJcbiAgICBzb21lPFQxPih2OiBUMSB8IG51bGwgfCB1bmRlZmluZWQpOiB2IGlzIEV4Y2x1ZGU8VDEsIG51bGwgfCB1bmRlZmluZWQ+O1xyXG4gICAgc29tZTxUMT4odjogVDEgfCBudWxsIHwgdW5kZWZpbmVkKTogdiBpcyBFeGNsdWRlPFQxLCBudWxsIHwgdW5kZWZpbmVkPjtcclxuICAgIG5vbmU8VDE+KHY6IG51bGwpOiB0cnVlO1xyXG4gICAgbm9uZTxUMT4odjogdW5kZWZpbmVkKTogdHJ1ZTtcclxuICAgIG5vbmU8VDE+KHY6IFQxIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHYgaXMgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgIG5vbmU8VDE+KHY6IFQxIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHYgaXMgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgIG1hcEVycjxUMSBleHRlbmRzIHN0cmluZywgVDI+KGU6IHVua25vd24sIGVycmNvZGU6IFQxLCBoYW5kbGVyOiBDbG9zdXJlPFtdLCBUMj4pOiBPcHRpb248VDI+O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEFzc2VydDogQXNzZXJ0aW9uSGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgICAvKiogQGNvbnN0cnVjdG9yICovIHtcclxuICAgICAgICByZXR1cm4geyBzb21lLCBub25lLCBtYXBFcnIgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzb21lPFQxPih2OiB1bmRlZmluZWQpOiBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIHNvbWU8VDE+KHY6IG51bGwpOiBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIHNvbWU8VDE+KHY6IFQxIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHYgaXMgRXhjbHVkZTxUMSwgbnVsbCB8IHVuZGVmaW5lZD47XHJcbiAgICBmdW5jdGlvbiBzb21lPFQxPih2OiBUMSB8IG51bGwgfCB1bmRlZmluZWQpOiB2IGlzIEV4Y2x1ZGU8VDEsIG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBsZXQgbWF0Y2g6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICB2ICE9PSBudWxsXHJcbiAgICAgICAgICAgICYmIHYgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm9uZTxUMT4odjogbnVsbCk6IHRydWU7XHJcbiAgICBmdW5jdGlvbiBub25lPFQxPih2OiB1bmRlZmluZWQpOiB0cnVlO1xyXG4gICAgZnVuY3Rpb24gbm9uZTxUMT4odjogVDEgfCBudWxsIHwgdW5kZWZpbmVkKTogdiBpcyBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgZnVuY3Rpb24gbm9uZTxUMT4odjogVDEgfCBudWxsIHwgdW5kZWZpbmVkKTogdiBpcyBudWxsIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBsZXQgbWF0Y2g6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICB2ID09PSBudWxsXHJcbiAgICAgICAgICAgICYmIHYgPT09IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFwRXJyPFQxIGV4dGVuZHMgc3RyaW5nLCBUMj4oZTogdW5rbm93biwgZXJyY29kZTogVDEsIGhhbmRsZXI6IENsb3N1cmU8W10sIFQyPik6IE9wdGlvbjxUMj4ge1xyXG4gICAgICAgIGxldCBtYXRjaDogYm9vbGVhbiA9XHJcbiAgICAgICAgICAgIGUgIT09IG51bGxcclxuICAgICAgICAgICAgJiYgZSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiBlID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgICYmIFwibWVzc2FnZVwiIGluIGVcclxuICAgICAgICAgICAgJiYgdHlwZW9mIGUubWVzc2FnZSA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAmJiBlLm1lc3NhZ2UgPT09IGVycmNvZGU7XHJcbiAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTb21lKGhhbmRsZXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOb25lO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydDxUMSBleHRlbmRzIHN0cmluZz4oY29uZGl0aW9uOiBib29sZWFuLCBlcnJjb2RlOiBUMSk6IGFzc2VydHMgY29uZGl0aW9uIHtcclxuICAgIGlmIChjb25kaXRpb24pIHJldHVybjtcclxuICAgIGxldCBlOiBFcnJvciA9IEVycm9yKGVycmNvZGUpO1xyXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZSwgYXNzZXJ0KTtcclxuICAgIHRocm93IGU7XHJcbn0iLCAiZXhwb3J0IGZ1bmN0aW9uIHBhbmljPFQxIGV4dGVuZHMgc3RyaW5nPihtc2c6IFQxKTogbmV2ZXIge1xyXG4gICAgbGV0IGU6IEVycm9yID0gRXJyb3IobXNnKTtcclxuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGUsIHBhbmljKTtcclxuICAgIHRocm93IGU7XHJcbn0iLCAiZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmU8VDEgZXh0ZW5kcyBzdHJpbmc+KGNvbmRpdGlvbjogYm9vbGVhbiwgZXJyY29kZTogVDEpOiBhc3NlcnRzIGNvbmRpdGlvbiB7XHJcbiAgICBpZiAoY29uZGl0aW9uKSByZXR1cm47XHJcbiAgICBsZXQgZTogRXJyb3IgPSBFcnJvcihlcnJjb2RlKTtcclxuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGUsIHJlcXVpcmUpO1xyXG4gICAgdGhyb3cgZTtcclxufSIsICJpbXBvcnQgdHlwZSB7IEZ1bmN0aW9uIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB0eXBlIHsgQXN5bmNGdW5jdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBjbG9uZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVzdG9yYWJsZTxUMT4gPSB7XHJcbiAgICBnZXQoKTogVDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdGhyb3dzIHsgRE9NRXhjZXB0aW9uIH1cclxuICAgICAqL1xyXG4gICAgbXV0KGhhbmRsZXI6IEZ1bmN0aW9uPFQxLCB2b2lkPik6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEB0aHJvd3MgeyBET01FeGNlcHRpb24gfVxyXG4gICAgICovXHJcbiAgICBtdXRBc3luYyhoYW5kbGVyOiBBc3luY0Z1bmN0aW9uPFQxLCB2b2lkPik6IFByb21pc2U8dm9pZD47XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVzdG9yYWJsZTxUMT4oX3Y6IFQxKTogUmVzdG9yYWJsZTxUMT4ge1xyXG4gICAgLyoqIEBjb25zdHJ1Y3RvciAqLyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0LFxyXG4gICAgICAgICAgICBtdXQsXHJcbiAgICAgICAgICAgIG11dEFzeW5jXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXQoKTogVDEge1xyXG4gICAgICAgIHJldHVybiBfdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtdXQob3A6IEZ1bmN0aW9uPFQxLCB2b2lkPik6IHZvaWQge1xyXG4gICAgICAgIGxldCBzbmFwc2hvdDogVDEgPSBjbG9uZShfdikudW53cmFwKCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgb3AoZ2V0KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBfdiA9IHNuYXBzaG90O1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBtdXRBc3luYyhvcDogQXN5bmNGdW5jdGlvbjxUMSwgdm9pZD4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgc25hcHNob3Q6IFQxID0gY2xvbmUoX3YpLnVud3JhcCgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IG9wKGdldCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgX3YgPSBzbmFwc2hvdDtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IHsgQXNzZXJ0IH0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgY29uc3QgbWFwRXJyID0gQXNzZXJ0Lm1hcEVycjsiLCAiaW1wb3J0IHR5cGUgeyBGdW5jdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE9wdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJyYW5kZWQgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgTm9uZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBPayB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyB0b1N0cmluZyBhcyB0b1N0cmluZ18gfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEVycjxUMT4gPSBcclxuICAgICYgQnJhbmRlZDxcIkVSUlwiPiBcclxuICAgICYge1xyXG4gICAgb2soKTogdGhpcyBpcyBPazx1bmtub3duPjtcclxuICAgIGVycigpOiB0aGlzIGlzIEVycjxUMT47XHJcbiAgICB2YWwoKTogVDE7XHJcbiAgICBzdGFjaygpOiBzdHJpbmc7XHJcbiAgICBleHBlY3QobXNnOiBzdHJpbmcpOiBuZXZlcjtcclxuICAgIGV4cGVjdEVycihfXzogdW5rbm93bik6IFQxO1xyXG4gICAgdW53cmFwKCk6IG5ldmVyO1xyXG4gICAgdW53cmFwT3I8VDI+KHY6IFQyKTogVDI7XHJcbiAgICBhbmRUaGVuKF9fOiB1bmtub3duKTogRXJyPFQxPjtcclxuICAgIG1hcChfXzogdW5rbm93bik6IEVycjxUMT47XHJcbiAgICBtYXBFcnI8VDI+KG9wOiBGdW5jdGlvbjxUMSwgVDI+KTogRXJyPFQyPjtcclxuICAgIHRvT3B0aW9uKCk6IE9wdGlvbjxuZXZlcj47XHJcbiAgICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRXJyPFQxPihfdjogVDEpOiBFcnI8VDE+IHtcclxuICAgIGxldCBfaW5zdGFuY2U6IEVycjxUMT47XHJcbiAgICBsZXQgX3N0YWNrOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIEBjb25zdHJ1Y3RvciAqLyB7XHJcbiAgICAgICAgX2luc3RhbmNlID0ge1xyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBvayxcclxuICAgICAgICAgICAgZXJyLFxyXG4gICAgICAgICAgICB2YWwsXHJcbiAgICAgICAgICAgIHN0YWNrLFxyXG4gICAgICAgICAgICBleHBlY3QsXHJcbiAgICAgICAgICAgIGV4cGVjdEVycixcclxuICAgICAgICAgICAgdW53cmFwLFxyXG4gICAgICAgICAgICB1bndyYXBPcixcclxuICAgICAgICAgICAgYW5kVGhlbixcclxuICAgICAgICAgICAgbWFwLFxyXG4gICAgICAgICAgICBtYXBFcnIsXHJcbiAgICAgICAgICAgIHRvT3B0aW9uLFxyXG4gICAgICAgICAgICB0b1N0cmluZ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ6IEFycmF5PHN0cmluZz4gPSBFcnJvcigpLnN0YWNrIS5zcGxpdChcIlxcblwiKS5zbGljZSgyKTtcclxuICAgICAgICBsZXQgbWF0Y2g6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICBjb250ZW50XHJcbiAgICAgICAgICAgICYmIGNvbnRlbnQubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAmJiBjb250ZW50WzBdLmluY2x1ZGVzKFwiRXJyXCIpO1xyXG4gICAgICAgIGlmIChtYXRjaCkgY29udGVudC5zaGlmdCgpO1xyXG4gICAgICAgIF9zdGFjayA9IGNvbnRlbnQuam9pbihcIlxcblwiKTtcclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHR5cGUoKTogXCJFUlJcIiB7XHJcbiAgICAgICAgcmV0dXJuIFwiRVJSXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb2soKTogdGhpcyBpcyBPazx1bmtub3duPiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVycigpOiB0aGlzIGlzIEVycjxUMT4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbCgpOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIF92O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0YWNrKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIF9zdGFjaztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBlY3QobXNnOiBzdHJpbmcpOiBuZXZlciB7XHJcbiAgICAgICAgdGhyb3cgYCR7IG1zZyB9XFxuJHsgc3RhY2soKSB9YDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBlY3RFcnIoX186IHVua25vd24pOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcCgpOiBuZXZlciB7XHJcbiAgICAgICAgdGhyb3cgYCR7IHZhbCgpIH1cXG4keyBzdGFjaygpIH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcE9yPFQyPih2OiBUMik6IFQyIHtcclxuICAgICAgICByZXR1cm4gdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhbmRUaGVuKF9fOiB1bmtub3duKTogRXJyPFQxPiB7XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXAoX186IHVua25vd24pOiBFcnI8VDE+IHtcclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcEVycjxUMj4ob3A6IEZ1bmN0aW9uPFQxLCBUMj4pOiBFcnI8VDI+IHtcclxuICAgICAgICByZXR1cm4gRXJyKG9wKHZhbCgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9PcHRpb24oKTogT3B0aW9uPG5ldmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIE5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYEVycigkeyB0b1N0cmluZ18odmFsKCkpIH0pYDtcclxuICAgIH1cclxufSIsICJpbXBvcnQgdHlwZSB7IEJyYW5kZWQgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgU29tZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBFcnIgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCB0eXBlIE5vbmUgPSBcclxuICAgICYgQnJhbmRlZDxcIk5PTkVcIj5cclxuICAgICYge1xyXG4gICAgc29tZSgpOiB0aGlzIGlzIFNvbWU8dW5rbm93bj47XHJcbiAgICBub25lKCk6IHRoaXMgaXMgTm9uZTtcclxuICAgIGV4cGVjdChtc2c6IHN0cmluZyk6IG5ldmVyO1xyXG4gICAgdW53cmFwKCk6IG5ldmVyO1xyXG4gICAgdW53cmFwT3I8VDE+KHY6IFQxKTogVDE7XHJcbiAgICBhbmRUaGVuKF9fOiB1bmtub3duKTogTm9uZTtcclxuICAgIG1hcChfXzogdW5rbm93bik6IE5vbmU7XHJcbiAgICB0b1Jlc3VsdDxUMT4oZTogVDEpOiBFcnI8VDE+O1xyXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE5vbmU6IE5vbmUgPSAoKCkgPT4ge1xyXG4gICAgbGV0IF9pbnN0YW5jZTogTm9uZTtcclxuXHJcbiAgICAvKiogQGNvbnN0cnVjdG9yICovIHtcclxuICAgICAgICBfaW5zdGFuY2UgPSB7XHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIHNvbWUsXHJcbiAgICAgICAgICAgIG5vbmUsXHJcbiAgICAgICAgICAgIGV4cGVjdCxcclxuICAgICAgICAgICAgdW53cmFwLFxyXG4gICAgICAgICAgICB1bndyYXBPcixcclxuICAgICAgICAgICAgYW5kVGhlbixcclxuICAgICAgICAgICAgbWFwLFxyXG4gICAgICAgICAgICB0b1Jlc3VsdCxcclxuICAgICAgICAgICAgdG9TdHJpbmdcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHlwZSgpOiBcIk5PTkVcIiB7XHJcbiAgICAgICAgcmV0dXJuIFwiTk9ORVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNvbWUoKTogdGhpcyBpcyBTb21lPHVua25vd24+IHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm9uZSgpOiB0aGlzIGlzIE5vbmUge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGVjdChtc2c6IHN0cmluZyk6IG5ldmVyIHtcclxuICAgICAgICB0aHJvdyBgJHsgbXNnIH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcCgpOiBuZXZlciB7XHJcbiAgICAgICAgdGhyb3cgYCR7IFwiTk9ORVwiIH1cXG4keyBFcnJvcigpLnN0YWNrIH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcE9yPFQxPih2OiBUMSk6IFQxIHtcclxuICAgICAgICByZXR1cm4gdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhbmRUaGVuKF9fOiB1bmtub3duKTogTm9uZSB7XHJcbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXAoX186IHVua25vd24pOiBOb25lIHtcclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvUmVzdWx0PFQxPihlOiBUMSk6IEVycjxUMT4ge1xyXG4gICAgICAgIHJldHVybiBFcnIoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJOb25lXCI7XHJcbiAgICB9XHJcbn0pKCk7IiwgImltcG9ydCB0eXBlIHsgRnVuY3Rpb24gfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBSZXN1bHQgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBPcHRpb24gfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBCcmFuZGVkIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IEVyciB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBTb21lIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IHBhbmljIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IHRvU3RyaW5nIGFzIHRvU3RyaW5nXyB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgT2s8VDE+ID0gXHJcbiAgICAmIEJyYW5kZWQ8XCJPS1wiPlxyXG4gICAgJiB7XHJcbiAgICBvaygpOiB0aGlzIGlzIE9rPFQxPjtcclxuICAgIGVycigpOiB0aGlzIGlzIEVycjx1bmtub3duPjtcclxuICAgIHZhbCgpOiBUMTtcclxuICAgIGV4cGVjdChfXzogdW5rbm93bik6IFQxO1xyXG4gICAgZXhwZWN0RXJyKG1zZzogc3RyaW5nKTogbmV2ZXI7XHJcbiAgICB1bndyYXAoKTogVDE7XHJcbiAgICB1bndyYXBPcihfXzogdW5rbm93bik6IFQxO1xyXG4gICAgdW53cmFwU2FmZWx5KCk6IFQxO1xyXG4gICAgYW5kVGhlbjxUMj4ob3A6IEZ1bmN0aW9uPFQxLCBPazxUMj4+KTogT2s8VDI+O1xyXG4gICAgYW5kVGhlbjxUMj4ob3A6IEZ1bmN0aW9uPFQxLCBFcnI8VDI+Pik6IFJlc3VsdDxUMSwgVDI+O1xyXG4gICAgYW5kVGhlbjxUMiwgVDM+KG9wOiBGdW5jdGlvbjxUMSwgUmVzdWx0PFQyLCBUMz4+KTogUmVzdWx0PFQyLCBUMz47XHJcbiAgICBhbmRUaGVuPFQyLCBUMz4ob3A6IEZ1bmN0aW9uPFQxLCBSZXN1bHQ8VDIsIFQzPj4pOiBSZXN1bHQ8VDIsIFQzPjtcclxuICAgIG1hcDxUMj4ob3A6IEZ1bmN0aW9uPFQxLCBUMj4pOiBPazxUMj47XHJcbiAgICBtYXBFcnIoX186IHVua25vd24pOiBPazxUMT47XHJcbiAgICB0b09wdGlvbigpOiBPcHRpb248VDE+O1xyXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE9rPFQxPihfdjogVDEpOiBPazxUMT4ge1xyXG4gICAgbGV0IF9pbnN0YW5jZTogT2s8VDE+O1xyXG5cclxuICAgIC8qKiBAY29uc3RydWN0b3IgKi8ge1xyXG4gICAgICAgIF9pbnN0YW5jZSA9IHtcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgb2ssXHJcbiAgICAgICAgICAgIGVycixcclxuICAgICAgICAgICAgdmFsLFxyXG4gICAgICAgICAgICBleHBlY3QsXHJcbiAgICAgICAgICAgIGV4cGVjdEVycixcclxuICAgICAgICAgICAgdW53cmFwLFxyXG4gICAgICAgICAgICB1bndyYXBPcixcclxuICAgICAgICAgICAgdW53cmFwU2FmZWx5LFxyXG4gICAgICAgICAgICBhbmRUaGVuLFxyXG4gICAgICAgICAgICBtYXAsXHJcbiAgICAgICAgICAgIG1hcEVycixcclxuICAgICAgICAgICAgdG9PcHRpb24sXHJcbiAgICAgICAgICAgIHRvU3RyaW5nXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHR5cGUoKTogXCJPS1wiIHtcclxuICAgICAgICByZXR1cm4gXCJPS1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9rKCk6IHRoaXMgaXMgT2s8VDE+IHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlcnIoKTogdGhpcyBpcyBFcnI8dW5rbm93bj4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWwoKTogVDEge1xyXG4gICAgICAgIHJldHVybiBfdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBlY3QoX186IHVua25vd24pOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGVjdEVycihtc2c6IHN0cmluZyk6IG5ldmVyIHtcclxuICAgICAgICByZXR1cm4gcGFuaWMobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bndyYXAoKTogVDEge1xyXG4gICAgICAgIHJldHVybiB2YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bndyYXBPcihfXzogdW5rbm93bik6IFQxIHtcclxuICAgICAgICByZXR1cm4gdmFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwU2FmZWx5KCk6IFQxIHtcclxuICAgICAgICByZXR1cm4gdmFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5kVGhlbjxUMj4ob3A6IEZ1bmN0aW9uPFQxLCBPazxUMj4+KTogT2s8VDI+O1xyXG4gICAgZnVuY3Rpb24gYW5kVGhlbjxUMj4ob3A6IEZ1bmN0aW9uPFQxLCBFcnI8VDI+Pik6IFJlc3VsdDxUMSwgVDI+O1xyXG4gICAgZnVuY3Rpb24gYW5kVGhlbjxUMiwgVDM+KG9wOiBGdW5jdGlvbjxUMSwgUmVzdWx0PFQyLCBUMz4+KTogUmVzdWx0PFQyLCBUMz47XHJcbiAgICBmdW5jdGlvbiBhbmRUaGVuPFQyLCBUMz4ob3A6IEZ1bmN0aW9uPFQxLCBSZXN1bHQ8VDIsIFQzPj4pOiBSZXN1bHQ8VDIsIFQzPiB7XHJcbiAgICAgICAgcmV0dXJuIG9wKHZhbCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXA8VDI+KG9wOiBGdW5jdGlvbjxUMSwgVDI+KTogT2s8VDI+IHtcclxuICAgICAgICByZXR1cm4gT2sob3AodmFsKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXBFcnIoX186IHVua25vd24pOiBPazxUMT4ge1xyXG4gICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9PcHRpb24oKTogT3B0aW9uPFQxPiB7XHJcbiAgICAgICAgcmV0dXJuIFNvbWUodmFsKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBPaygkeyB0b1N0cmluZ18odmFsKCkpIH0pYDtcclxuICAgIH1cclxufSIsICJpbXBvcnQgdHlwZSB7IE9wdGlvbkhhbmRsZXIgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBDbG9zdXJlIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB0eXBlIHsgQXN5bmNDbG9zdXJlIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB0eXBlIHsgU29tZVZhbE9mQWxsIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IFNvbWUgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgTm9uZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgT3B0aW9uPFQxPiA9IFNvbWU8VDE+IHwgTm9uZTtcclxuXHJcbmV4cG9ydCBjb25zdCBPcHRpb246IE9wdGlvbkhhbmRsZXIgPSAoKCkgPT4ge1xyXG4gICAgLyoqKi8ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1hdGNoLFxyXG4gICAgICAgICAgICBzb21lLFxyXG4gICAgICAgICAgICBub25lLFxyXG4gICAgICAgICAgICBhbGwsXHJcbiAgICAgICAgICAgIGFueSxcclxuICAgICAgICAgICAgd3JhcCxcclxuICAgICAgICAgICAgd3JhcEFzeW5jXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXRjaCh1bmtub3duOiB1bmtub3duKTogdW5rbm93biBpcyBPcHRpb248dW5rbm93bj4ge1xyXG4gICAgICAgIHJldHVybiBzb21lKHVua25vd24pIHx8IG5vbmUodW5rbm93bik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc29tZSh1bmtub3duOiB1bmtub3duKTogdW5rbm93biBpcyBTb21lPHVua25vd24+IHtcclxuICAgICAgICBsZXQgbWF0Y2g6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICB1bmtub3duICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgJiYgdW5rbm93biAhPT0gbnVsbFxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93biA9PT0gXCJvYmplY3RcIlxyXG4gICAgICAgICAgICAmJiBcInNvbWVcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwibm9uZVwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ2YWxcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwiZXhwZWN0XCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcInVud3JhcFwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ1bndyYXBPclwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ1bndyYXBTYWZlbHlcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwiYW5kVGhlblwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJtYXBcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidG9SZXN1bHRcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidG9TdHJpbmdcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnNvbWUgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5ub25lID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udmFsID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24uZXhwZWN0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udW53cmFwID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udW53cmFwT3IgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi51bndyYXBTYWZlbHkgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5hbmRUaGVuID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24ubWFwID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udG9SZXN1bHQgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi50b1N0cmluZyA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnNvbWUoKSA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24ubm9uZSgpID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi50b1N0cmluZygpID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICYmIHVua25vd24uc29tZSgpID09PSB0cnVlXHJcbiAgICAgICAgICAgICYmIHVua25vd24ubm9uZSgpID09PSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm9uZSh1bmtub3duOiB1bmtub3duKTogdW5rbm93biBpcyBOb25lIHtcclxuICAgICAgICBsZXQgbWF0Y2g6IGJvb2xlYW4gPVxyXG4gICAgICAgICAgICB1bmtub3duICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgJiYgdW5rbm93biAhPT0gbnVsbFxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93biA9PT0gXCJvYmplY3RcIlxyXG4gICAgICAgICAgICAmJiBcInNvbWVcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwibm9uZVwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ2YWxcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwiZXhwZWN0XCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcInVud3JhcFwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ1bndyYXBPclwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ1bndyYXBTYWZlbHlcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwiYW5kVGhlblwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJtYXBcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidG9SZXN1bHRcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidG9TdHJpbmdcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnNvbWUgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5ub25lID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udmFsID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24uZXhwZWN0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udW53cmFwID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udW53cmFwT3IgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi51bndyYXBTYWZlbHkgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5hbmRUaGVuID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24ubWFwID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udG9SZXN1bHQgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi50b1N0cmluZyA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnNvbWUoKSA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24ubm9uZSgpID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi50b1N0cmluZygpID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICYmIHVua25vd24uc29tZSgpID09PSBmYWxzZVxyXG4gICAgICAgICAgICAmJiB1bmtub3duLm5vbmUoKSA9PT0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWxsPFQxIGV4dGVuZHMgQXJyYXk8T3B0aW9uPHVua25vd24+Pj4oLi4uIG9wdGlvbnM6IFQxKTogT3B0aW9uPFNvbWVWYWxPZkFsbDxUMT4+IHtcclxuICAgICAgICBsZXQgb3V0OiBBcnJheTx1bmtub3duPiA9IFtdO1xyXG4gICAgICAgIGxldCBpOiBiaWdpbnQgPSAwbjtcclxuICAgICAgICB3aGlsZSAoaSA8IG9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb246IE9wdGlvbjx1bmtub3duPiA9IG9wdGlvbnNbTnVtYmVyKGkpXTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbi5zb21lKCkpIG91dC5wdXNoKG9wdGlvbi52YWwoKSk7XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG9wdGlvbiBhcyBOb25lO1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTb21lKChvdXQgYXMgU29tZVZhbE9mQWxsPFQxPikpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFueTxUMSBleHRlbmRzIEFycmF5PE9wdGlvbjx1bmtub3duPj4+KC4uLiBvcHRpb25zOiBUMSk6IE9wdGlvbjxTb21lVmFsT2ZBbGw8VDE+W251bWJlcl0+IHtcclxuICAgICAgICBsZXQgaTogYmlnaW50ID0gMG47XHJcbiAgICAgICAgd2hpbGUgKGkgPCBvcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uOiBPcHRpb248dW5rbm93bj4gPSBvcHRpb25zW051bWJlcihpKV07XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uc29tZSgpKSByZXR1cm4gKG9wdGlvbiBhcyBTb21lPFNvbWVWYWxPZkFsbDxUMT5bbnVtYmVyXT4pO1xyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAob3B0aW9uIGFzIE5vbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTm9uZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cmFwPFQxLCBUMiwgVDMgZXh0ZW5kcyBBcnJheTxUMj4+KG9wOiBDbG9zdXJlPFQzLCBUMT4sIC4uLiBhcmdzOiBUMyk6IE9wdGlvbjxUMT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTb21lKG9wKC4uLiBhcmdzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHdyYXBBc3luYzxUMSwgVDIsIFQzIGV4dGVuZHMgQXJyYXk8VDI+PihvcDogQXN5bmNDbG9zdXJlPFQzLCBUMT4sIC4uLiBhcmdzOiBUMyk6IFByb21pc2U8T3B0aW9uPFQxPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTb21lKChhd2FpdCBvcCguLi4gYXJncykpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2gge1xyXG4gICAgICAgICAgICByZXR1cm4gTm9uZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwgImltcG9ydCB0eXBlIHsgQ2xvc3VyZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEFzeW5jQ2xvc3VyZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE9rVmFsT2ZBbGwgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFcnJWYWxPZkFsbCB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlc3VsdEhhbmRsZXIgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgT2sgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgRXJyIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IFVuc2FmZSB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVzdWx0PFQxLCBUMj4gPSBPazxUMT4gfCBFcnI8VDI+O1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlc3VsdDogUmVzdWx0SGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgICAvKioqLyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWF0Y2gsXHJcbiAgICAgICAgICAgIG9rLFxyXG4gICAgICAgICAgICBlcnIsXHJcbiAgICAgICAgICAgIGFsbCxcclxuICAgICAgICAgICAgYW55LFxyXG4gICAgICAgICAgICB3cmFwLFxyXG4gICAgICAgICAgICB3cmFwQXN5bmNcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hdGNoKHVua25vd246IHVua25vd24pOiB1bmtub3duIGlzIFJlc3VsdDx1bmtub3duLCB1bmtub3duPiB7XHJcbiAgICAgICAgcmV0dXJuIG9rKHVua25vd24pIHx8IGVycih1bmtub3duKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvayh1bmtub3duOiB1bmtub3duKTogdW5rbm93biBpcyBPazx1bmtub3duPiB7XHJcbiAgICAgICAgbGV0IG1hdGNoOiBib29sZWFuID1cclxuICAgICAgICAgICAgdW5rbm93biAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICYmIHVua25vd24gIT09IG51bGxcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24gPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgJiYgXCJva1wiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJlcnJcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidmFsXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcImV4cGVjdFwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJleHBlY3RFcnJcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidW53cmFwXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcInVud3JhcE9yXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcInVud3JhcFNhZmVseVwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJhbmRUaGVuXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcIm1hcFwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJtYXBFcnJcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidG9PcHRpb25cIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidG9TdHJpbmdcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLm9rID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24uZXJyID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udmFsID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24uZXhwZWN0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24uZXhwZWN0RXJyID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udW53cmFwID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udW53cmFwT3IgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi51bndyYXBTYWZlbHkgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5hbmRUaGVuID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24ubWFwID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24ubWFwRXJyID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udG9PcHRpb24gPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi50b1N0cmluZyA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLm9rKCkgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLmVycigpID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi50b1N0cmluZygpID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICYmIHVua25vd24ub2soKSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICAmJiB1bmtub3duLmVycigpID09PSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXJyKHVua25vd246IHVua25vd24pOiB1bmtub3duIGlzIEVycjx1bmtub3duPiB7XHJcbiAgICAgICAgbGV0IG1hdGNoOiBib29sZWFuID1cclxuICAgICAgICAgICAgdW5rbm93biAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICYmIHVua25vd24gIT09IG51bGxcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24gPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgJiYgXCJva1wiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJlcnJcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidmFsXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcInN0YWNrXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcImV4cGVjdFwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJleHBlY3RFcnJcIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwidW53cmFwXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcInVud3JhcE9yXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcImFuZFRoZW5cIiBpbiB1bmtub3duXHJcbiAgICAgICAgICAgICYmIFwibWFwXCIgaW4gdW5rbm93blxyXG4gICAgICAgICAgICAmJiBcIm1hcEVyclwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ0b09wdGlvblwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgXCJ0b1N0cmluZ1wiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24ub2sgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5lcnIgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi52YWwgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5zdGFjayA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLmV4cGVjdCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLmV4cGVjdEVyciA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnVud3JhcCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnVud3JhcE9yID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24uYW5kVGhlbiA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLm1hcCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLm1hcEVyciA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnRvT3B0aW9uID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udG9TdHJpbmcgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5vaygpID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdW5rbm93bi5lcnIoKSA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udG9TdHJpbmcoKSA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAmJiB1bmtub3duLm9rKCkgPT09IGZhbHNlXHJcbiAgICAgICAgICAgICYmIHVua25vd24uZXJyKCkgPT09IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFsbDxUMSBleHRlbmRzIEFycmF5PFJlc3VsdDx1bmtub3duLCB1bmtub3duPj4+KC4uLiByZXN1bHRzOiBUMSk6IFJlc3VsdDxPa1ZhbE9mQWxsPFQxPiwgRXJyVmFsT2ZBbGw8VDE+W251bWJlcl0+IHtcclxuICAgICAgICBsZXQgb3V0OiBBcnJheTx1bmtub3duPiA9IFtdO1xyXG4gICAgICAgIGxldCBpOiBiaWdpbnQgPSAwbjtcclxuICAgICAgICB3aGlsZSAoaSA8IHJlc3VsdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IFJlc3VsdDx1bmtub3duLCB1bmtub3duPiA9IHJlc3VsdHNbTnVtYmVyKGkpXTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5vaygpKSBvdXQucHVzaChyZXN1bHQudmFsKCkpO1xyXG4gICAgICAgICAgICBlbHNlIHJldHVybiByZXN1bHQgYXMgRXJyPEVyclZhbE9mQWxsPFQxPltudW1iZXJdPjtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gT2sob3V0IGFzIE9rVmFsT2ZBbGw8VDE+KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhbnk8VDEgZXh0ZW5kcyBBcnJheTxSZXN1bHQ8dW5rbm93biwgdW5rbm93bj4+PiguLi4gcmVzdWx0czogVDEpOiBSZXN1bHQ8T2tWYWxPZkFsbDxUMT5bbnVtYmVyXSwgRXJyVmFsT2ZBbGw8VDE+PiB7XHJcbiAgICAgICAgbGV0IG91dDogQXJyYXk8dW5rbm93bj4gPSBbXTtcclxuICAgICAgICBsZXQgaTogYmlnaW50ID0gMG47XHJcbiAgICAgICAgd2hpbGUgKGkgPCByZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBSZXN1bHQ8dW5rbm93biwgdW5rbm93bj4gPSByZXN1bHRzW051bWJlcihpKV07XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQub2soKSkgcmV0dXJuIHJlc3VsdCBhcyBPazxPa1ZhbE9mQWxsPFQxPltudW1iZXJdPjtcclxuICAgICAgICAgICAgZWxzZSBvdXQucHVzaChyZXN1bHQudmFsKCkpO1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBFcnIob3V0IGFzIEVyclZhbE9mQWxsPFQxPik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JhcDxUMSwgVDIsIFQzIGV4dGVuZHMgQXJyYXk8VDI+PihvcDogQ2xvc3VyZTxUMywgVDE+LCAuLi4gYXJnczogVDMpOiBSZXN1bHQ8VDEsIFVuc2FmZTx1bmtub3duPj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPayhvcCguLi4gYXJncykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gRXJyKFVuc2FmZShlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHdyYXBBc3luYzxUMSBleHRlbmRzIFByb21pc2U8dW5rbm93bj4sIFQyLCBUMyBleHRlbmRzIEFycmF5PFQyPj4ob3A6IEFzeW5jQ2xvc3VyZTxUMywgVDE+LCAuLi4gYXJnczogVDMpOiBQcm9taXNlPFJlc3VsdDxBd2FpdGVkPFQxPiwgVW5zYWZlPHVua25vd24+Pj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPaygoYXdhaXQgb3AoLi4uIGFyZ3MpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBFcnIoVW5zYWZlKGUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwgImltcG9ydCB0eXBlIHsgRnVuY3Rpb24gfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBPcHRpb24gfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBCcmFuZGVkIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE5vbmUgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgT2sgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgdG9TdHJpbmcgYXMgdG9TdHJpbmdfIH0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgdHlwZSBTb21lPFQxPiA9IFxyXG4gICAgJiBCcmFuZGVkPFwiU09NRVwiPlxyXG4gICAgJiB7XHJcbiAgICBzb21lKCk6IHRoaXMgaXMgU29tZTxUMT47XHJcbiAgICBub25lKCk6IHRoaXMgaXMgTm9uZTtcclxuICAgIHZhbCgpOiBUMTtcclxuICAgIGV4cGVjdChfXzogdW5rbm93bik6IFQxO1xyXG4gICAgdW53cmFwKCk6IFQxO1xyXG4gICAgdW53cmFwT3IoX186IHVua25vd24pOiBUMTtcclxuICAgIHVud3JhcFNhZmVseSgpOiBUMTtcclxuICAgIGFuZFRoZW48VDI+KG9wOiBGdW5jdGlvbjxUMSwgT3B0aW9uPFQyPj4pOiBPcHRpb248VDI+O1xyXG4gICAgbWFwPFQyPihvcDogRnVuY3Rpb248VDEsIFQyPik6IFNvbWU8VDI+O1xyXG4gICAgdG9SZXN1bHQ8VDI+KF9fOiBUMik6IE9rPFQxPjtcclxuICAgIHRvU3RyaW5nKCk6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTb21lPFQxPihfdjogVDEpOiBTb21lPFQxPiB7XHJcbiAgICAvKiogQGNvbnN0cnVjdG9yICovIHtcclxuICAgICAgICByZXR1cm4geyBcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgc29tZSwgXHJcbiAgICAgICAgICAgIG5vbmUsIFxyXG4gICAgICAgICAgICB2YWwsIFxyXG4gICAgICAgICAgICBleHBlY3QsIFxyXG4gICAgICAgICAgICB1bndyYXAsIFxyXG4gICAgICAgICAgICB1bndyYXBPcixcclxuICAgICAgICAgICAgdW53cmFwU2FmZWx5LFxyXG4gICAgICAgICAgICBhbmRUaGVuLFxyXG4gICAgICAgICAgICBtYXAsXHJcbiAgICAgICAgICAgIHRvUmVzdWx0LFxyXG4gICAgICAgICAgICB0b1N0cmluZ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHlwZSgpOiBcIlNPTUVcIiB7XHJcbiAgICAgICAgcmV0dXJuIFwiU09NRVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNvbWUoKTogdGhpcyBpcyBTb21lPFQxPiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm9uZSgpOiB0aGlzIGlzIE5vbmUge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWwoKTogVDEge1xyXG4gICAgICAgIHJldHVybiBfdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBlY3QoX186IHVua25vd24pOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcCgpOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcE9yKF9fOiB1bmtub3duKTogVDEge1xyXG4gICAgICAgIHJldHVybiB2YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bndyYXBTYWZlbHkoKTogVDEge1xyXG4gICAgICAgIHJldHVybiB2YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhbmRUaGVuPFQyPihvcDogRnVuY3Rpb248VDEsIE9wdGlvbjxUMj4+KTogT3B0aW9uPFQyPiB7XHJcbiAgICAgICAgcmV0dXJuIG9wKHZhbCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXA8VDI+KG9wOiBGdW5jdGlvbjxUMSwgVDI+KTogU29tZTxUMj4ge1xyXG4gICAgICAgIHJldHVybiBTb21lKG9wKHZhbCgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9SZXN1bHQ8VDI+KF9fOiBUMik6IE9rPFQxPiB7XHJcbiAgICAgICAgcmV0dXJuIE9rKHZhbCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZygpOiBSZXR1cm5UeXBlPFNvbWU8VDE+W1widG9TdHJpbmdcIl0+IHtcclxuICAgICAgICByZXR1cm4gYFNvbWUoJHsgdG9TdHJpbmdfKHZhbCgpKSB9KWA7XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IHR5cGUgeyBXcmFwcGVyIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB0eXBlIHsgQnJhbmRlZCB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVW5zYWZlID0gXHJcbiAgICAmIEJyYW5kZWQ8XCJVTlNBRkVcIj4gXHJcbiAgICAmIFdyYXBwZXI8dW5rbm93bj47XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVW5zYWZlKF92OiB1bmtub3duKTogVW5zYWZlIHtcclxuICAgIC8qKiBAY29uc3RydWN0b3IgKi8ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGUsIHVud3JhcCB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHR5cGUoKTogXCJVTlNBRkVcIiB7XHJcbiAgICAgICAgcmV0dXJuIFwiVU5TQUZFXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwKCk6IHVua25vd24ge1xyXG4gICAgICAgIHJldHVybiBfdjtcclxuICAgIH1cclxufSIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgY29uc3Qgb2sgPSBSZXN1bHQub2s7XHJcbmV4cG9ydCBjb25zdCBlcnIgPSBSZXN1bHQuZXJyO1xyXG5leHBvcnQgY29uc3Qgd3JhcCA9IFJlc3VsdC53cmFwO1xyXG5leHBvcnQgY29uc3Qgd3JhcEFzeW5jID0gUmVzdWx0LndyYXBBc3luYztcclxuZXhwb3J0IGNvbnN0IGZsYWcgPSBPcHRpb24ud3JhcDtcclxuZXhwb3J0IGNvbnN0IGZsYWdBc3luYyA9IE9wdGlvbi53cmFwQXN5bmM7XHJcbmV4cG9ydCBjb25zdCBzb21lID0gT3B0aW9uLnNvbWU7XHJcbmV4cG9ydCBjb25zdCBub25lID0gT3B0aW9uLm5vbmU7IiwgImltcG9ydCB0eXBlIHsgQnJhbmRlZCB9IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQnJhbmRlZDxUMSBleHRlbmRzIHN0cmluZz4odjogdW5rbm93biwgdHlwZTogVDEpOiB2IGlzIEJyYW5kZWQ8VDE+IHtcclxuICAgIGlmIChcclxuICAgICAgICB2ICE9PSBudWxsXHJcbiAgICAgICAgJiYgdiAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgJiYgdHlwZW9mIHYgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAmJiBcInR5cGVcIiBpbiB2XHJcbiAgICAgICAgJiYgdHlwZW9mIHYudHlwZSA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgJiYgdHlwZW9mIHYudHlwZSgpID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgJiYgdi50eXBlKCkgPT09IHR5cGVcclxuICAgICkgcmV0dXJuIHRydWU7XHJcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcclxufSIsICJpbXBvcnQgdHlwZSB7IFdyYXBwZXIgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1dyYXBwZXIodjogdW5rbm93bik6IHYgaXMgV3JhcHBlcjx1bmtub3duPiB7XHJcbiAgICBpZiAoXHJcbiAgICAgICAgdiAhPT0gbnVsbCBcclxuICAgICAgICAmJiB2ICE9PSB1bmRlZmluZWQgXHJcbiAgICAgICAgJiYgdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgXHJcbiAgICAgICAgJiYgXCJ1bndyYXBcIiBpbiB2IFxyXG4gICAgICAgICYmIHR5cGVvZiB2LnVud3JhcCA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICApIHJldHVybiB0cnVlO1xyXG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XHJcbn0iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IHdyYXAgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9uZTxUMT4odjogVDEpOiBSZXN1bHQ8VDEsIERPTUV4Y2VwdGlvbj4ge1xyXG4gICAgcmV0dXJuIHdyYXAoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzdHJ1Y3R1cmVkQ2xvbmUodik7XHJcbiAgICB9KS5tYXBFcnIodW5zYWZlID0+IHtcclxuICAgICAgICAvLy8gV0FSTklOR1xyXG4gICAgICAgIHJldHVybiB1bnNhZmUudW53cmFwKCkgYXMgRE9NRXhjZXB0aW9uO1xyXG4gICAgfSk7XHJcbn0iLCAiZXhwb3J0IGZ1bmN0aW9uIHRvU3RyaW5nKHY6IHVua25vd24pOiBzdHJpbmcge1xyXG4gICAgbGV0IHJlc3VsdDogc3RyaW5nID0gU3RyaW5nKHYpO1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikgXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIHt9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBQUFBO0FBQUEsRUFBQTtBQUFBLGdCQUFBQztBQUFBLEVBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFBQztBQUFBLEVBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNPTyxTQUFTLE1BQU0sR0FBK0I7QUFDakQsTUFDSSxRQUFRLENBQUMsS0FDTixvQkFBb0IsQ0FBQyxLQUNyQixXQUFXLENBQUMsS0FDWixPQUFPLENBQUMsS0FDUixZQUFZLENBQUMsRUFDbEIsUUFBTztBQUFBLE1BQ0osUUFBTztBQUNoQjs7O0FDR08sU0FBUyxJQUFRLElBQXdCO0FBQzVDLE1BQUk7QUFFZ0I7QUFDaEIsZ0JBQVk7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBQUM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUVBLFdBQVMsU0FBb0I7QUFDekIsV0FB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LFlBQVksS0FDWixPQUFPLEVBQUUsV0FBVyxXQUN6QixRQUFPO0FBQUEsTUFDSixRQUFPO0FBQ2hCOzs7QUNSTyxTQUFTLE1BQVUsR0FBaUM7QUFDdkQsU0FBTyxLQUFLLE1BQU07QUFDZCxXQUFPLGdCQUFnQixDQUFDO0FBQUEsRUFDNUIsQ0FBQyxFQUFFLE9BQU8sWUFBVTtBQUVoQixXQUFPLE9BQU8sT0FBTztBQUFBLEVBQ3pCLENBQUM7QUFDTDs7O0FDVk8sU0FBUyxTQUFTLEdBQW9CO0FBQ3pDLE1BQUksU0FBaUIsT0FBTyxDQUFDO0FBQzdCLE1BQUksV0FBVztBQUNYLFFBQUk7QUFDQSxlQUFTLEtBQUssVUFBVSxDQUFDO0FBQUEsSUFDN0IsUUFDTTtBQUFBLElBQUM7QUFDWCxTQUFPO0FBQ1g7IiwKICAibmFtZXMiOiBbIk9wdGlvbiIsICJSZXN1bHQiLCAicmVxdWlyZSIsICJ0b1N0cmluZyIsICJ4IiwgInNvbWUiLCAibm9uZSIsICJtYXBFcnIiLCAicmVxdWlyZSIsICJvayIsICJlcnIiLCAibWFwRXJyIiwgInRvU3RyaW5nIiwgInNvbWUiLCAibm9uZSIsICJ0b1N0cmluZyIsICJvayIsICJlcnIiLCAibWFwRXJyIiwgInRvU3RyaW5nIiwgIk9wdGlvbiIsICJzb21lIiwgIm5vbmUiLCAid3JhcCIsICJ3cmFwQXN5bmMiLCAibWF0Y2giLCAiUmVzdWx0IiwgIm9rIiwgImVyciIsICJ3cmFwIiwgIndyYXBBc3luYyIsICJtYXRjaCIsICJzb21lIiwgIm5vbmUiLCAidG9TdHJpbmciLCAiUmVzdWx0IiwgIk9wdGlvbiJdCn0K