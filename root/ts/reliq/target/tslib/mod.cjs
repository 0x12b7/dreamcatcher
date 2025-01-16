"use strict";var R=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var U=Object.prototype.hasOwnProperty;var v=(n,r)=>{for(var e in r)R(n,e,{get:r[e],enumerable:!0})},G=(n,r,e,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let p of W(r))!U.call(n,p)&&p!==e&&R(n,p,{get:()=>r[p],enumerable:!(o=B(r,p))||o.enumerable});return n};var H=n=>G(R({},"__esModule",{value:!0}),n);var C={};v(C,{Err:()=>x,None:()=>g,Ok:()=>y,Some:()=>d});module.exports=H(C);function w(n,r=w){let e=Error();throw Error.captureStackTrace(e,r),n+`
`+e.stack}function S(n,r){return(o=>o!=null&&typeof o=="object"&&"type"in o&&typeof o.type=="function"&&typeof o.type()=="string"&&o.type()===r)(n)}function h(n){return(e=>S(e,"None"))(n)}function _(n){return V(n)||h(n)}function V(n){return S(n,"Some")}function l(){return{toString:n};function n(r){if(r==null||typeof r!="object")return String(r);try{return JSON.stringify(r)}catch{}return"[object Object]"}}var g=(()=>{let n;return n={type:r,some:e,none:o,expect:p,unwrap:c,unwrapOr:i,and:a,map:O,toResult:k,toString:f,display:m};function r(){return"None"}function e(){return!1}function o(){return!0}function p(u){w(u,p)}function c(){w(r())}function i(u){return u}function a(u){return n}function O(u){return n}function k(u){return x(u)}function f(){return r()}function m(){return console.log(f())}})();function d(n){return{type:r,some:e,none:o,expect:p,unwrap:c,unwrapOr:i,unwrapSafely:a,and:O,map:k,toResult:f,toString:m,display:u};function r(){return"Some"}function e(){return!0}function o(){return!1}function p(s){return n}function c(){return n}function i(s){return n}function a(){return n}function O(s){return s(n)}function k(s){return d(s(n))}function f(s){return y(n)}function m(){return r()+"("+l().toString(n)+")"}function u(){return console.log(m())}}function x(n){let r,e;{let t=Error();return Error.captureStackTrace(t,x),e=t.stack??"",r={type:o,ok:p,err:c,inspect:i,stack:a,expect:O,expectErr:k,unwrap:f,unwrapOr:m,and:u,map:s,mapErr:E,restore:A,toOption:b,toString:T,display:N}}function o(){return"Err"}function p(){return!1}function c(){return!0}function i(){return n}function a(){return e}function O(t){throw t+`
`+a()}function k(t){return i()}function f(){let t=i();throw t!=null&&typeof t=="object"&&"code"in t&&"message"in t&&typeof t.code=="string"&&_(t.message)?(t.message.map(F=>{throw t.code+": "+F+`
`+a()}),t.code+`
`+a()):l().toString(i())+`
`+a()}function m(t){return t}function u(t){return r}function s(t){return r}function E(t){return x(t(i()))}function A(t){return y(t(i()))}function b(){return g}function T(){return o()+"("+l().toString(i())+`)
`+a()}function N(){return console.log(T())}}function y(n){let r;return r={type:e,ok:o,err:p,expect:c,expectErr:i,unwrap:a,unwrapOr:O,unwrapSafely:k,and:f,map:m,mapErr:u,restore:s,toOption:E,toString:A,display:b};function e(){return"Ok"}function o(){return!0}function p(){return!1}function c(T){return n}function i(T){w(T,i)}function a(){return n}function O(T){return n}function k(){return n}function f(T){return T(n)}function m(T){return y(T(n))}function u(T){return r}function s(T){return r}function E(){return d(n)}function A(){return e()+"("+l().toString(n)+")"}function b(){return console.log(A())}}0&&(module.exports={Err,None,Ok,Some});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvcmUvbW9kLnRzIiwgIi4uLy4uL3NyYy9jb3JlL3BhbmljLnRzIiwgIi4uLy4uL3NyYy9jb3JlL2d1YXJkL2lzX2JyYW5kZWQudHMiLCAiLi4vLi4vc3JjL2NvcmUvZ3VhcmQvaXNfbm9uZS50cyIsICIuLi8uLi9zcmMvY29yZS9ndWFyZC9pc19vcHRpb24udHMiLCAiLi4vLi4vc3JjL2NvcmUvZ3VhcmQvaXNfc29tZS50cyIsICIuLi8uLi9zcmMvY29yZS91dGlsL3N0cmluZy9zdHJpbmdfaGFuZGxlci50cyIsICIuLi8uLi9zcmMvY29yZS93cmFwcGVyL29wdGlvbi9ub25lL25vbmUudHMiLCAiLi4vLi4vc3JjL2NvcmUvd3JhcHBlci9vcHRpb24vc29tZS9zb21lLnRzIiwgIi4uLy4uL3NyYy9jb3JlL3dyYXBwZXIvcmVzdWx0L2Vyci9lcnIudHMiLCAiLi4vLi4vc3JjL2NvcmUvd3JhcHBlci9yZXN1bHQvb2svb2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7XHJcbiAgICB0eXBlIEFzeW5jQ2xvc3VyZSxcclxuICAgIHR5cGUgQXN5bmNGdW5jdGlvbixcclxuICAgIHR5cGUgQ2xvc3VyZSxcclxuICAgIHR5cGUgRnVuY3Rpb24sXHJcbiAgICB0eXBlIE1heWJlQXN5bmMsXHJcbiAgICB0eXBlIFR5cGVHdWFyZCxcclxuXHJcbiAgICB0eXBlIEJyYW5kZWQsXHJcbiAgICB0eXBlIERpc3BsYXlhYmxlLFxyXG4gICAgdHlwZSBQYXJzYWJsZSxcclxuICAgIHR5cGUgU2VxdWVuY2UsXHJcbiAgICB0eXBlIFNlcmlhbGl6YWJsZSxcclxuXHJcbiAgICB0eXBlIEFzeW5jT3B0aW9uLFxyXG4gICAgdHlwZSBPcHRpb25BcnJheSxcclxuICAgIHR5cGUgT3B0aW9uQnJhbmQsXHJcbiAgICB0eXBlIE9wdGlvbkhhbmRsZXIsXHJcbiAgICB0eXBlIE9wdGlvbixcclxuXHJcbiAgICB0eXBlIEFzeW5jUmVzdWx0LFxyXG4gICAgdHlwZSBSZXN1bHRBcnJheSxcclxuICAgIHR5cGUgUmVzdWx0QnJhbmQsXHJcbiAgICB0eXBlIFJlc3VsdEhhbmRsZXIsXHJcbiAgICB0eXBlIFJlc3VsdCxcclxuXHJcbiAgICB0eXBlIEFzeW5jVW5zYWZlLFxyXG4gICAgdHlwZSBVbnNhZmVCcmFuZCxcclxuXHJcbiAgICBOb25lLFxyXG5cclxuXHJcbiAgICB0eXBlIFNvbWVPZkFsbCxcclxuICAgIHR5cGUgU29tZU9mLFxyXG4gICAgdHlwZSBTb21lVmFsT2ZBbGwsXHJcbiAgICB0eXBlIFNvbWVWYWxPZixcclxuXHJcbiAgICBTb21lLFxyXG5cclxuICAgIFxyXG4gICAgdHlwZSBFcnJPZkFsbCxcclxuICAgIHR5cGUgRXJyT2YsXHJcbiAgICB0eXBlIEVyclZhbE9mQWxsLFxyXG4gICAgdHlwZSBFcnJWYWxPZixcclxuICAgIFxyXG4gICAgRXJyLFxyXG5cclxuXHJcbiAgICB0eXBlIE9rT2ZBbGwsXHJcbiAgICB0eXBlIE9rT2YsXHJcbiAgICB0eXBlIE9rVmFsT2ZBbGwsXHJcbiAgICB0eXBlIE9rVmFsT2YsXHJcblxyXG4gICAgT2tcclxufSBmcm9tIFwiQHJvb3RcIjsiLCAiZXhwb3J0IGZ1bmN0aW9uIHBhbmljPFQxIGV4dGVuZHMgc3RyaW5nPihtZXNzYWdlOiBUMSk6IG5ldmVyO1xyXG5leHBvcnQgZnVuY3Rpb24gcGFuaWM8VDEgZXh0ZW5kcyBzdHJpbmc+KG1lc3NhZ2U6IFQxLCBzY29wZTogRnVuY3Rpb24pOiBuZXZlcjtcclxuZXhwb3J0IGZ1bmN0aW9uIHBhbmljPFQxIGV4dGVuZHMgc3RyaW5nPihfMDogVDEsIF8xOiBGdW5jdGlvbiA9IHBhbmljKTogbmV2ZXIge1xyXG4gICAgbGV0IGU6IEVycm9yID0gRXJyb3IoKTtcclxuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGUsIF8xKTtcclxuICAgIHRocm93IF8wICsgXCJcXG5cIiArIGUuc3RhY2s7XHJcbn0iLCAiaW1wb3J0IHsgXHJcbiAgICB0eXBlIEJyYW5kZWQsXHJcbiAgICB0eXBlIFR5cGVHdWFyZFxyXG59IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQnJhbmRlZDxUMSBleHRlbmRzIHN0cmluZz4odW5rbm93bjogdW5rbm93biwgdHlwZTogVDEpOiB1bmtub3duIGlzIEJyYW5kZWQ8VDE+IHtcclxuICAgIGxldCBndWFyZDogVHlwZUd1YXJkPEJyYW5kZWQ8VDE+PiA9ICh1bmtub3duOiB1bmtub3duKTogdW5rbm93biBpcyBCcmFuZGVkPFQxPiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHVua25vd24gIT09IG51bGxcclxuICAgICAgICAgICAgJiYgdW5rbm93biAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgICYmIFwidHlwZVwiIGluIHVua25vd25cclxuICAgICAgICAgICAgJiYgdHlwZW9mIHVua25vd24udHlwZSA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICYmIHR5cGVvZiB1bmtub3duLnR5cGUoKSA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAmJiB1bmtub3duLnR5cGUoKSA9PT0gdHlwZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZ3VhcmQodW5rbm93bik7XHJcbn0iLCAiaW1wb3J0IHtcclxuICAgIHR5cGUgVHlwZUd1YXJkLFxyXG4gICAgdHlwZSBOb25lLFxyXG4gICAgaXNCcmFuZGVkXHJcbn0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOb25lKHVua25vd246IHVua25vd24pOiB1bmtub3duIGlzIE5vbmUge1xyXG4gICAgbGV0IGd1YXJkOiBUeXBlR3VhcmQ8Tm9uZT4gPSAodW5rbm93bjogdW5rbm93bik6IHVua25vd24gaXMgTm9uZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGlzQnJhbmRlZCh1bmtub3duLCBcIk5vbmVcIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGd1YXJkKHVua25vd24pO1xyXG59IiwgImltcG9ydCB7XHJcbiAgICB0eXBlIE9wdGlvbixcclxuICAgIGlzU29tZSxcclxuICAgIGlzTm9uZVxyXG59IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzT3B0aW9uKHVua25vd246IHVua25vd24pOiB1bmtub3duIGlzIE9wdGlvbjx1bmtub3duPiB7XHJcbiAgICByZXR1cm4gaXNTb21lKHVua25vd24pIHx8IGlzTm9uZSh1bmtub3duKTtcclxufSIsICJpbXBvcnQge1xyXG4gICAgdHlwZSBTb21lLFxyXG4gICAgaXNCcmFuZGVkXHJcbn0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTb21lKHVua25vd246IHVua25vd24pOiB1bmtub3duIGlzIFNvbWU8dW5rbm93bj4ge1xyXG4gICAgcmV0dXJuIGlzQnJhbmRlZCh1bmtub3duLCBcIlNvbWVcIik7XHJcbn0iLCAiZXhwb3J0IHR5cGUgU3RyaW5nSGFuZGxlciA9IHtcclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiAqKldhcm5pbmcqKlxyXG4gICAgICogLSBEb2VzIG5vdCBzdXBwb3J0IGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIGNpcmN1bGFyIG9iamVjdHMgd2lsbCByZXN1bHQgaW4gYFtvYmplY3QgT2JqZWN0XWAuXHJcbiAgICAgKiBcclxuICAgICAqICoqRXhhbXBsZSoqXHJcbiAgICAgKiAgYGBgdHNcclxuICAgICAqICBjb25zb2xlLmxvZyh0b1N0cmluZyg0MikpOyAgICAgICAgICAvLy8gNDJcclxuICAgICAqICBjb25zb2xlLmxvZyh0b1N0cmluZyh0cnVlKSk7ICAgICAgICAvLy8gdHJ1ZVxyXG4gICAgICogIGNvbnNvbGUubG9nKHRvU3RyaW5nKG51bGwpKTsgICAgICAgIC8vLyBudWxsXHJcbiAgICAgKiAgY29uc29sZS5sb2codG9TdHJpbmcodW5kZWZpbmVkKSk7ICAgLy8vIHVuZGVmaW5lZFxyXG4gICAgICogXHJcbiAgICAgKiAgY29uc29sZS5sb2codG9TdHJpbmcoXCJleGFtcGxlXCIpKTtcclxuICAgICAqIFxyXG4gICAgICogIGxldCBvYmplY3Q6IHtcclxuICAgICAqICAgICAgY29sb3I6IHN0cmluZztcclxuICAgICAqICAgICAgc3BlZWQ6IHtcclxuICAgICAqICAgICAgICAgIG1pbjogbnVtYmVyLFxyXG4gICAgICogICAgICAgICAgbWF4OiBudW1iZXJcclxuICAgICAqICAgICAgfVxyXG4gICAgICogIH0gPSB7XHJcbiAgICAgKiAgICAgIGNvbG9yOiBcIkJsdWVcIixcclxuICAgICAqICAgICAgc3BlZWQ6IHtcclxuICAgICAqICAgICAgICAgIG1pbjogMCxcclxuICAgICAqICAgICAgICAgIG1heDogNTAwXHJcbiAgICAgKiAgICAgIH1cclxuICAgICAqICB9O1xyXG4gICAgICogIGNvbnNvbGUubG9nKG9iamVjdCk7ICAgICAgICAgICAgICAgIC8vLyB7XCJjb2xvclwiOlwiQmx1ZVwiLFwic3BlZWRcIjp7XCJtaW5cIjowLFwibWF4XCI6NTAwfX1cclxuICAgICAqIFxyXG4gICAgICogIGZ1bmN0aW9uIGZvbygpOiB2b2lkIHtcclxuICAgICAqICAgICAgbGV0IHg6IHN0cmluZyA9IDUwMDtcclxuICAgICAqICAgICAgcmV0dXJuIHg7XHJcbiAgICAgKiAgfVxyXG4gICAgICogIGNvbnNvbGUubG9nKGZvbyk7ICAgICAgICAgICAgICAgICAgIC8vLyBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vICAgICB4ID0gNTAwO1xyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyAgICAgcmV0dXJuIHg7XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIH1cclxuICAgICAqICBgYGBcclxuICAgICAqL1xyXG4gICAgdG9TdHJpbmcodW5rbm93bjogdW5rbm93bik6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTdHJpbmdIYW5kbGVyKCk6IFN0cmluZ0hhbmRsZXIge1xyXG4gICAgLyoqIEBjb25zdHJ1Y3RvciAqLyB7XHJcbiAgICAgICAgcmV0dXJuIHsgXHJcbiAgICAgICAgICAgIHRvU3RyaW5nIFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcodW5rbm93bjogdW5rbm93bik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHVua25vd24gPT09IG51bGwgfHwgdW5rbm93biA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB1bmtub3duICE9PSBcIm9iamVjdFwiKSByZXR1cm4gU3RyaW5nKHVua25vd24pO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmtub3duKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2gge31cclxuICAgICAgICByZXR1cm4gXCJbb2JqZWN0IE9iamVjdF1cIjtcclxuICAgIH1cclxufSIsICJpbXBvcnQge1xyXG4gICAgdHlwZSBCcmFuZGVkLFxyXG4gICAgdHlwZSBSZWNvdmVyeVdyYXBwZXIsXHJcbiAgICB0eXBlIFNlcmlhbGl6YWJsZSxcclxuICAgIHR5cGUgRGlzcGxheWFibGUsXHJcbiAgICBTb21lLFxyXG4gICAgRXJyLFxyXG4gICAgcGFuaWNcclxufSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCB0eXBlIE5vbmUgPSBcclxuICAgICYgQnJhbmRlZDxcIk5vbmVcIj5cclxuICAgICYgUmVjb3ZlcnlXcmFwcGVyPG5ldmVyPlxyXG4gICAgJiBTZXJpYWxpemFibGVcclxuICAgICYgRGlzcGxheWFibGUgXHJcbiAgICAmIHtcclxuICAgIHNvbWUoKTogdGhpcyBpcyBTb21lPHVua25vd24+O1xyXG4gICAgbm9uZSgpOiB0aGlzIGlzIE5vbmU7XHJcbiAgICBleHBlY3QobWVzc2FnZTogc3RyaW5nKTogbmV2ZXI7XHJcbiAgICBhbmQoX186IHVua25vd24pOiBOb25lO1xyXG4gICAgbWFwKF9fOiB1bmtub3duKTogTm9uZTtcclxuICAgIHRvUmVzdWx0PFQxPih2YWx1ZTogVDEpOiBFcnI8VDE+O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE5vbmU6IE5vbmUgPSAoKCkgPT4ge1xyXG4gICAgbGV0IF90aGlzOiBOb25lO1xyXG5cclxuICAgIC8qKiBAY29uc3RydWN0b3IgKi8ge1xyXG4gICAgICAgIHJldHVybiAoX3RoaXMgPSB7XHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIHNvbWUsXHJcbiAgICAgICAgICAgIG5vbmUsXHJcbiAgICAgICAgICAgIGV4cGVjdCxcclxuICAgICAgICAgICAgdW53cmFwLFxyXG4gICAgICAgICAgICB1bndyYXBPcixcclxuICAgICAgICAgICAgYW5kLFxyXG4gICAgICAgICAgICBtYXAsXHJcbiAgICAgICAgICAgIHRvUmVzdWx0LFxyXG4gICAgICAgICAgICB0b1N0cmluZyxcclxuICAgICAgICAgICAgZGlzcGxheVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdHlwZSgpOiBcIk5vbmVcIiB7XHJcbiAgICAgICAgcmV0dXJuIChcIk5vbmVcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNvbWUoKTogdGhpcyBpcyBTb21lPHVua25vd24+IHtcclxuICAgICAgICByZXR1cm4gKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub25lKCk6IHRoaXMgaXMgTm9uZSB7XHJcbiAgICAgICAgcmV0dXJuICh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBlY3QobWVzc2FnZTogc3RyaW5nKTogbmV2ZXIge1xyXG4gICAgICAgIHBhbmljKG1lc3NhZ2UsIGV4cGVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwKCk6IG5ldmVyIHtcclxuICAgICAgICBwYW5pYyh0eXBlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcE9yPFQxPihmYWxsYmFjazogVDEpOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIChmYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5kKF9fOiB1bmtub3duKTogTm9uZSB7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcChfXzogdW5rbm93bik6IE5vbmUge1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b1Jlc3VsdDxUMT4odmFsdWU6IFQxKTogRXJyPFQxPiB7XHJcbiAgICAgICAgcmV0dXJuIEVycih2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdHlwZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpc3BsYXkoKTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKHRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG59KSgpOyIsICJpbXBvcnQgdHlwZSB7IEJyYW5kZWQgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBWYWxpZGF0ZWRXcmFwcGVyIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB0eXBlIHsgU2VyaWFsaXphYmxlIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB0eXBlIHsgRGlzcGxheWFibGUgfSBmcm9tIFwiQHJvb3RcIjtcclxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE9wdGlvbiB9IGZyb20gXCJAcm9vdFwiO1xyXG5pbXBvcnQgeyBOb25lIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IE9rIH0gZnJvbSBcIkByb290XCI7XHJcbmltcG9ydCB7IFN0cmluZ0hhbmRsZXIgfSBmcm9tIFwiQHJvb3RcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFNvbWU8VDE+ID1cclxuICAgICYgQnJhbmRlZDxcIlNvbWVcIj5cclxuICAgICYgVmFsaWRhdGVkV3JhcHBlcjxUMT5cclxuICAgICYgU2VyaWFsaXphYmxlXHJcbiAgICAmIERpc3BsYXlhYmxlXHJcbiAgICAmIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICoqTk9URSoqXHJcbiAgICAgKiAtIGBUeXBlR3VhcmRgIHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBvZiB0aGUgdHlwZSBgU29tZWAuXHJcbiAgICAgKiAtIFJldHVybnMgYHRydWVgIGJlY2F1c2UgdGhlIGN1cnJlbnQgaW5zdGFuY2UgaXMgYFNvbWVgLlxyXG4gICAgICogXHJcbiAgICAgKiAqKkVYQU1QTEUqKlxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogIGxldCB2YWx1ZTogU29tZTxudW1iZXI+ID0gU29tZSgyMCk7XHJcbiAgICAgKiAgdmFsdWUuc29tZSgpOyAvLy8gdHJ1ZVxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHNvbWUoKTogdGhpcyBpcyBTb21lPFQxPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogKipFWEFNUExFKipcclxuICAgICAqIGBgYHR5cGVzY3JpcHRcclxuICAgICAqICBsZXQgdmFsdWU6IFNvbWU8bnVtYmVyPiA9IFNvbWUoMjApO1xyXG4gICAgICogIHZhbHVlLm5vbmUoKTsgLy8vIGZhbHNlXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgbm9uZSgpOiB0aGlzIGlzIE5vbmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAqKldhcm5pbmcqKlxyXG4gICAgICogVW51c2VkIG1ldGhvZCwgcHJlc2VudCBiZWNhdXNlIG9mIGBPcHRpb25gIHR5cGUgaW5mZXJlbmNlLlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGV4cGVjdChfXzogdW5rbm93bik6IFQxO1xyXG5cclxuICAgIHVud3JhcE9yKF9fOiB1bmtub3duKTogVDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAqKk5PVEUqKlxyXG4gICAgICogQXBwbGllcyBhbiBvcGVyYXRpb24gdG8gdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgYFNvbWU8VDE+YCBpZiBpdCBleGlzdHMsXHJcbiAgICAgKiByZXR1cm5pbmcgYSBuZXcgYE9wdGlvbjxUMj5gIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb24uIElmIHRoZSBjdXJyZW50IGBPcHRpb25gXHJcbiAgICAgKiBpcyBgTm9uZWAsIHRoaXMgb3BlcmF0aW9uIHdpbGwgbm90IGJlIGV4ZWN1dGVkLCBhbmQgYE5vbmVgIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAgICAgKiBcclxuICAgICAqICoqRXhhbXBsZSoqXHJcbiAgICAgKiBgYGB0eXBlc2NyaXB0XHJcbiAgICAgKiAgbGV0IHZhbHVlOiBPcHRpb248bnVtYmVyPiA9IFNvbWUoMjAwKTtcclxuICAgICAqICB2YWx1ZVxyXG4gICAgICogICAgICAuYW5kKGxlbmd0aCA9PiB7XHJcbiAgICAgKiAgICAgICAgICBpZiAobGVuZ3RoID4gMTAwKSByZXR1cm4gU29tZShcIkxBUkdFXCIpO1xyXG4gICAgICogICAgICAgICAgcmV0dXJuIE5vbmU7XHJcbiAgICAgKiAgICAgIH0pXHJcbiAgICAgKiAgICAgIC5hbmQodmFsdWUgPT4ge1xyXG4gICAgICogICAgICAgICAgY29uc29sZS5sb2codmFsdWUpOyAvLy8gTEFSR0VcclxuICAgICAqICAgICAgfSk7XHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgYW5kPFQyPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBPcHRpb248VDI+Pik6IE9wdGlvbjxUMj47XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogKipOT1RFKipcclxuICAgICAqIFRyYW5zZm9ybXMgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgYFNvbWU8VDE+YCB0byBhIG5ldyB2YWx1ZSBvZiB0eXBlIGBUMmAgdXNpbmcgdGhlIHByb3ZpZGVkIGBvcGVyYXRpb25gLlxyXG4gICAgICogUmV0dXJucyBhIG5ldyBgU29tZTxUMj5gIGNvbnRhaW5pbmcgdGhlIHJlc3VsdCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXHJcbiAgICAgKiAtIElmIHRoZSBgT3B0aW9uYCBpcyBgTm9uZWAsIHRoZSB0cmFuc2Zvcm1hdGlvbiBpcyBub3QgYXBwbGllZCBhbmQgYE5vbmVgIGlzIHJldHVybmVkLlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIG1hcDxUMj4ob3BlcmF0aW9uOiBGdW5jdGlvbjxUMSwgVDI+KTogU29tZTxUMj47XHJcbiAgICB0b1Jlc3VsdChfXzogdW5rbm93bik6IE9rPFQxPjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTb21lPFQxPihfdmFsdWU6IFQxKTogU29tZTxUMT4ge1xyXG4gICAgLyoqIEBjb25zdHJ1Y3RvciAqLyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgc29tZSxcclxuICAgICAgICAgICAgbm9uZSxcclxuICAgICAgICAgICAgZXhwZWN0LFxyXG4gICAgICAgICAgICB1bndyYXAsXHJcbiAgICAgICAgICAgIHVud3JhcE9yLFxyXG4gICAgICAgICAgICB1bndyYXBTYWZlbHksXHJcbiAgICAgICAgICAgIGFuZCxcclxuICAgICAgICAgICAgbWFwLFxyXG4gICAgICAgICAgICB0b1Jlc3VsdCxcclxuICAgICAgICAgICAgdG9TdHJpbmcsXHJcbiAgICAgICAgICAgIGRpc3BsYXlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHR5cGUoKTogXCJTb21lXCIge1xyXG4gICAgICAgIHJldHVybiBcIlNvbWVcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzb21lKCk6IHRoaXMgaXMgU29tZTxUMT4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vbmUoKTogdGhpcyBpcyBOb25lIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwZWN0KF9fOiB1bmtub3duKTogVDEge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwKCk6IFQxIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcE9yKF9fOiB1bmtub3duKTogVDEge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwU2FmZWx5KCk6IFQxIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFuZDxUMj4ob3BlcmF0aW9uOiBGdW5jdGlvbjxUMSwgT3B0aW9uPFQyPj4pOiBPcHRpb248VDI+IHtcclxuICAgICAgICByZXR1cm4gb3BlcmF0aW9uKF92YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFwPFQyPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBUMj4pOiBTb21lPFQyPiB7XHJcbiAgICAgICAgcmV0dXJuIFNvbWUob3BlcmF0aW9uKF92YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvUmVzdWx0KF9fOiB1bmtub3duKTogT2s8VDE+IHtcclxuICAgICAgICByZXR1cm4gT2soX3ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0eXBlKCkgKyBcIihcIiArIFN0cmluZ0hhbmRsZXIoKS50b1N0cmluZyhfdmFsdWUpICsgXCIpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlzcGxheSgpOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2codG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IHtcclxuICAgIHR5cGUgQnJhbmRlZCxcclxuICAgIHR5cGUgUmVjb3ZlcnlXcmFwcGVyLFxyXG4gICAgdHlwZSBTZXJpYWxpemFibGUsXHJcbiAgICB0eXBlIERpc3BsYXlhYmxlLFxyXG4gICAgdHlwZSBGdW5jdGlvbixcclxuICAgIE9rLFxyXG4gICAgdHlwZSBPcHRpb24sXHJcbiAgICBTdHJpbmdIYW5kbGVyLFxyXG4gICAgTm9uZSxcclxuICAgIGlzT3B0aW9uXHJcbn0gZnJvbSBcIkByb290XCI7XHJcblxyXG5leHBvcnQgdHlwZSBFcnI8VDE+ID0gXHJcbiAgICAmIEJyYW5kZWQ8XCJFcnJcIj5cclxuICAgICYgUmVjb3ZlcnlXcmFwcGVyPFQxPlxyXG4gICAgJiBTZXJpYWxpemFibGVcclxuICAgICYgRGlzcGxheWFibGVcclxuICAgICYge1xyXG4gICAgb2soKTogdGhpcyBpcyBPazx1bmtub3duPjtcclxuICAgIGVycigpOiB0aGlzIGlzIEVycjxUMT47XHJcbiAgICBpbnNwZWN0KCk6IFQxO1xyXG4gICAgc3RhY2soKTogc3RyaW5nO1xyXG4gICAgZXhwZWN0KG1lc3NhZ2U6IHN0cmluZyk6IG5ldmVyO1xyXG4gICAgZXhwZWN0RXJyKF9fOiB1bmtub3duKTogVDE7XHJcbiAgICBhbmQoX186IHVua25vd24pOiBFcnI8VDE+O1xyXG4gICAgbWFwKF9fOiB1bmtub3duKTogRXJyPFQxPjtcclxuICAgIG1hcEVycjxUMj4ob3BlcmF0aW9uOiBGdW5jdGlvbjxUMSwgVDI+KTogRXJyPFQyPjtcclxuICAgIHJlc3RvcmU8VDI+KG9wZXJhdGlvbjogRnVuY3Rpb248VDEsIFQyPik6IE9rPFQyPjtcclxuICAgIHRvT3B0aW9uKCk6IE9wdGlvbjxuZXZlcj47XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRXJyPFQxPihfdmFsdWU6IFQxKTogRXJyPFQxPiB7XHJcbiAgICBsZXQgX3RoaXM6IEVycjxUMT47XHJcbiAgICBsZXQgX3N0YWNrOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIC8qKiBAY29uc3RydWN0b3IgKi8ge1xyXG4gICAgICAgIGxldCBlOiBFcnJvciA9IEVycm9yKCk7XHJcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZSwgRXJyKTtcclxuICAgICAgICBfc3RhY2sgPSBlLnN0YWNrID8/IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzID0ge1xyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBvayxcclxuICAgICAgICAgICAgZXJyLFxyXG4gICAgICAgICAgICBpbnNwZWN0LFxyXG4gICAgICAgICAgICBzdGFjayxcclxuICAgICAgICAgICAgZXhwZWN0LFxyXG4gICAgICAgICAgICBleHBlY3RFcnIsXHJcbiAgICAgICAgICAgIHVud3JhcCxcclxuICAgICAgICAgICAgdW53cmFwT3IsXHJcbiAgICAgICAgICAgIGFuZCxcclxuICAgICAgICAgICAgbWFwLFxyXG4gICAgICAgICAgICBtYXBFcnIsXHJcbiAgICAgICAgICAgIHJlc3RvcmUsXHJcbiAgICAgICAgICAgIHRvT3B0aW9uLFxyXG4gICAgICAgICAgICB0b1N0cmluZyxcclxuICAgICAgICAgICAgZGlzcGxheVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHlwZSgpOiBcIkVyclwiIHtcclxuICAgICAgICByZXR1cm4gXCJFcnJcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvaygpOiB0aGlzIGlzIE9rPHVua25vd24+IHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXJyKCk6IHRoaXMgaXMgRXJyPFQxPiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5zcGVjdCgpOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIF92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdGFjaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBfc3RhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwZWN0KG1lc3NhZ2U6IHN0cmluZyk6IG5ldmVyIHtcclxuICAgICAgICB0aHJvdyBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwZWN0RXJyKF9fOiB1bmtub3duKTogVDEge1xyXG4gICAgICAgIHJldHVybiBpbnNwZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwKCk6IG5ldmVyIHtcclxuICAgICAgICBsZXQgdmFsdWUwOiBUMSA9IGluc3BlY3QoKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHZhbHVlMCAhPT0gbnVsbFxyXG4gICAgICAgICAgICAmJiB2YWx1ZTAgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgdmFsdWUwID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgICYmIFwiY29kZVwiIGluIHZhbHVlMFxyXG4gICAgICAgICAgICAmJiBcIm1lc3NhZ2VcIiBpbiB2YWx1ZTBcclxuICAgICAgICAgICAgJiYgdHlwZW9mIHZhbHVlMC5jb2RlID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICYmIGlzT3B0aW9uKHZhbHVlMC5tZXNzYWdlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB2YWx1ZTAubWVzc2FnZS5tYXAobWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB2YWx1ZTAuY29kZSArIFwiOlwiICsgXCIgXCIgKyBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aHJvdyB2YWx1ZTAuY29kZSArIFwiXFxuXCIgKyBzdGFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBTdHJpbmdIYW5kbGVyKCkudG9TdHJpbmcoaW5zcGVjdCgpKSArIFwiXFxuXCIgKyBzdGFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVud3JhcE9yPFQyPihhbHRlcm5hdGl2ZTogVDIpOiBUMiB7XHJcbiAgICAgICAgcmV0dXJuIGFsdGVybmF0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFuZChfXzogdW5rbm93bik6IEVycjxUMT4ge1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXAoX186IHVua25vd24pOiBFcnI8VDE+IHtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFwRXJyPFQyPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBUMj4pOiBFcnI8VDI+IHtcclxuICAgICAgICByZXR1cm4gRXJyKG9wZXJhdGlvbihpbnNwZWN0KCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXN0b3JlPFQyPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBUMj4pOiBPazxUMj4ge1xyXG4gICAgICAgIHJldHVybiBPayhvcGVyYXRpb24oaW5zcGVjdCgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9PcHRpb24oKTogT3B0aW9uPG5ldmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIE5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdHlwZSgpICsgXCIoXCIgKyBTdHJpbmdIYW5kbGVyKCkudG9TdHJpbmcoaW5zcGVjdCgpKSArIFwiKVwiICsgXCJcXG5cIiArIHN0YWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlzcGxheSgpOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2codG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IHtcclxuICAgIHR5cGUgQnJhbmRlZCxcclxuICAgIHR5cGUgVmFsaWRhdGVkV3JhcHBlcixcclxuICAgIHR5cGUgU2VyaWFsaXphYmxlLFxyXG4gICAgdHlwZSBEaXNwbGF5YWJsZSxcclxuICAgIHR5cGUgRnVuY3Rpb24sXHJcbiAgICB0eXBlIE9wdGlvbixcclxuICAgIHR5cGUgUmVzdWx0LFxyXG4gICAgU3RyaW5nSGFuZGxlcixcclxuICAgIFNvbWUsXHJcbiAgICBFcnIsXHJcbiAgICBwYW5pY1xyXG59IGZyb20gXCJAcm9vdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgT2s8VDE+ID0gXHJcbiAgICAmIEJyYW5kZWQ8XCJPa1wiPlxyXG4gICAgJiBWYWxpZGF0ZWRXcmFwcGVyPFQxPlxyXG4gICAgJiBTZXJpYWxpemFibGVcclxuICAgICYgRGlzcGxheWFibGVcclxuICAgICYge1xyXG4gICAgb2soKTogdGhpcyBpcyBPazxUMT47XHJcbiAgICBlcnIoKTogdGhpcyBpcyBFcnI8dW5rbm93bj47XHJcbiAgICBleHBlY3QoX186IHVua25vd24pOiBUMTtcclxuICAgIGV4cGVjdEVycihfXzogdW5rbm93bik6IG5ldmVyO1xyXG4gICAgdW53cmFwT3IoX186IHVua25vd24pOiBUMTtcclxuICAgIGFuZDxUMj4ob3BlcmF0aW9uOiBGdW5jdGlvbjxUMSwgT2s8VDI+Pik6IE9rPFQyPjtcclxuICAgIGFuZDxUMj4ob3BlcmF0aW9uOiBGdW5jdGlvbjxUMSwgRXJyPFQyPj4pOiBSZXN1bHQ8VDEsIFQyPjtcclxuICAgIGFuZDxUMiwgVDM+KG9wZXJhdGlvbjogRnVuY3Rpb248VDEsIFJlc3VsdDxUMiwgVDM+Pik6IFJlc3VsdDxUMiwgVDM+O1xyXG4gICAgbWFwPFQyPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBUMj4pOiBPazxUMj47XHJcbiAgICBtYXBFcnIoX186IHVua25vd24pOiBPazxUMT47XHJcbiAgICByZXN0b3JlKF9fOiB1bmtub3duKTogT2s8VDE+O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiAqKkV4YW1wbGUqKlxyXG4gICAgICogYGBgXHJcbiAgICAgKiAgbGV0IHJlc3VsdDogUmVzdWx0PDIwMCwgNDA0PlxyXG4gICAgICogICAgICAudG9PcHRpb24oKVxyXG4gICAgICogICAgICAudW53cmFwKCk7XHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgdG9PcHRpb24oKTogT3B0aW9uPFQxPjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBPazxUMT4oX3ZhbHVlOiBUMSk6IE9rPFQxPiB7XHJcbiAgICBsZXQgX3RoaXM6IE9rPFQxPjtcclxuXHJcbiAgICAvKiogQGNvbnN0cnVjdG9yICovIHtcclxuICAgICAgICByZXR1cm4gX3RoaXMgPSB7XHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIG9rLFxyXG4gICAgICAgICAgICBlcnIsXHJcbiAgICAgICAgICAgIGV4cGVjdCxcclxuICAgICAgICAgICAgZXhwZWN0RXJyLFxyXG4gICAgICAgICAgICB1bndyYXAsXHJcbiAgICAgICAgICAgIHVud3JhcE9yLFxyXG4gICAgICAgICAgICB1bndyYXBTYWZlbHksXHJcbiAgICAgICAgICAgIGFuZCxcclxuICAgICAgICAgICAgbWFwLFxyXG4gICAgICAgICAgICBtYXBFcnIsXHJcbiAgICAgICAgICAgIHJlc3RvcmUsXHJcbiAgICAgICAgICAgIHRvT3B0aW9uLFxyXG4gICAgICAgICAgICB0b1N0cmluZyxcclxuICAgICAgICAgICAgZGlzcGxheVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHlwZSgpOiBcIk9rXCIge1xyXG4gICAgICAgIHJldHVybiBcIk9rXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb2soKTogdGhpcyBpcyBPazxUMT4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVycigpOiB0aGlzIGlzIEVycjx1bmtub3duPiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGVjdChfXzogdW5rbm93bik6IFQxIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGVjdEVycihtZXNzYWdlOiBzdHJpbmcpOiBuZXZlciB7XHJcbiAgICAgICAgcGFuaWMobWVzc2FnZSwgZXhwZWN0RXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bndyYXAoKTogVDEge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwT3IoX186IHVua25vd24pOiBUMSB7XHJcbiAgICAgICAgcmV0dXJuIF92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bndyYXBTYWZlbHkoKTogVDEge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5kPFQyPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBPazxUMj4+KTogT2s8VDI+O1xyXG4gICAgZnVuY3Rpb24gYW5kPFQyPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBFcnI8VDI+Pik6IFJlc3VsdDxUMSwgVDI+O1xyXG4gICAgZnVuY3Rpb24gYW5kPFQyLCBUMz4ob3BlcmF0aW9uOiBGdW5jdGlvbjxUMSwgUmVzdWx0PFQyLCBUMz4+KTogUmVzdWx0PFQyLCBUMz47XHJcbiAgICBmdW5jdGlvbiBhbmQ8VDIsIFQzPihvcGVyYXRpb246IEZ1bmN0aW9uPFQxLCBSZXN1bHQ8VDIsIFQzPj4pOiBSZXN1bHQ8VDIsIFQzPiB7XHJcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbihfdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcDxUMj4ob3BlcmF0aW9uOiBGdW5jdGlvbjxUMSwgVDI+KTogT2s8VDI+IHtcclxuICAgICAgICByZXR1cm4gT2sob3BlcmF0aW9uKF92YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcEVycihfXzogdW5rbm93bik6IE9rPFQxPiB7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc3RvcmUoX186IHVua25vd24pOiBPazxUMT4ge1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b09wdGlvbigpOiBPcHRpb248VDE+IHtcclxuICAgICAgICByZXR1cm4gU29tZShfdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGUoKSArIFwiKFwiICsgU3RyaW5nSGFuZGxlcigpLnRvU3RyaW5nKF92YWx1ZSkgKyBcIilcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkaXNwbGF5KCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyh0b1N0cmluZygpKTtcclxuICAgIH1cclxufSJdLAogICJtYXBwaW5ncyI6ICJ5YUFBQSxJQUFBQSxFQUFBLEdBQUFDLEVBQUFELEVBQUEsU0FBQUUsRUFBQSxTQUFBQyxFQUFBLE9BQUFDLEVBQUEsU0FBQUMsSUFBQSxlQUFBQyxFQUFBTixHQ0VPLFNBQVNPLEVBQXlCQyxFQUFRQyxFQUFlRixFQUFjLENBQzFFLElBQUksRUFBVyxNQUFNLEVBQ3JCLFlBQU0sa0JBQWtCLEVBQUdFLENBQUUsRUFDdkJELEVBQUs7QUFBQSxFQUFPLEVBQUUsS0FDeEIsQ0NETyxTQUFTRSxFQUE2QkMsRUFBa0JDLEVBQWtDLENBVTdGLE9BVHFDRCxHQUMxQkEsR0FBWSxNQUVaLE9BQU9BLEdBQVksVUFDbkIsU0FBVUEs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U00sRUFBVVksRUFBd0IsQ0FDdkNDLEVBQU1ELEVBQVNaLENBQVMsQ0FDNUIsQ0FFQSxTQUFTQyxHQUFhLENBQ2xCLE9BQU9QLENBQ1gsQ0FFQSxTQUFTUSxFQUFTUyxFQUFpQixDQUMvQixPQUFPakIsQ0FDWCxDQUVBLFNBQVNTLEdBQW1CLENBQ3hCLE9BQU9ULENBQ1gsQ0FLQSxTQUFTVSxFQUFZVSxFQUF5RCxDQUMxRSxPQUFPQSxFQUFVcEIsQ0FBTSxDQUMzQixDQUVBLFNBQVNXLEVBQVFTLEVBQXFDLENBQ2xELE9BQU9yQixFQUFHcUIsRUFBVXBCLENBQU0sQ0FBQyxDQUMvQixDQUVBLFNBQVNZLEVBQU9LLEVBQXFCLENBQ2pDLE9BQU9oQixDQUNYLENBRUEsU0FBU1ksRUFBUUksRUFBcUIsQ0FDbEMsT0FBT2hCLENBQ1gsQ0FFQSxTQUFTYSxHQUF1QixDQUM1QixPQUFPTyxFQUFLckIsQ0FBTSxDQUN0QixDQUVBLFNBQVNlLEdBQW1CLENBQ3hCLE9BQU9iLEVBQUssRUFBSSxJQUFNb0IsRUFBYyxFQUFFLFNBQVN0QixDQUFNLEVBQUksR0FDN0QsQ0FFQSxTQUFTZ0IsR0FBZ0IsQ0FDckIsT0FBTyxRQUFRLElBQUlELEVBQVMsQ0FBQyxDQUNqQyxDQUNKIiwKICAibmFtZXMiOiBbIm1vZF9leHBvcnRzIiwgIl9fZXhwb3J0IiwgIkVyciIsICJOb25lIiwgIk9rIiwgIlNvbWUiLCAiX190b0NvbW1vbkpTIiwgInBhbmljIiwgIl8wIiwgIl8xIiwgImlzQnJhbmRlZCIsICJ1bmtub3duIiwgInR5cGUiLCAiaXNOb25lIiwgInVua25vd24iLCAiaXNCcmFuZGVkIiwgImlzT3B0aW9uIiwgInVua25vd24iLCAiaXNTb21lIiwgImlzTm9uZSIsICJpc1NvbWUiLCAidW5rbm93biIsICJpc0JyYW5kZWQiLCAiU3RyaW5nSGFuZGxlciIsICJ0b1N0cmluZyIsICJ1bmtub3duIiwgIk5vbmUiLCAiX3RoaXMiLCAidHlwZSIsICJzb21lIiwgIm5vbmUiLCAiZXhwZWN0IiwgInVud3JhcCIsICJ1bndyYXBPciIsICJhbmQiLCAibWFwIiwgInRvUmVzdWx0IiwgInRvU3RyaW5nIiwgImRpc3BsYXkiLCAibWVzc2FnZSIsICJwYW5pYyIsICJmYWxsYmFjayIsICJfXyIsICJ2YWx1ZSIsICJFcnIiLCAiU29tZSIsICJfdmFsdWUiLCAidHlwZSIsICJzb21lIiwgIm5vbmUiLCAiZXhwZWN0IiwgInVud3JhcCIsICJ1bndyYXBPciIsICJ1bndyYXBTYWZlbHkiLCAiYW5kIiwgIm1hcCIsICJ0b1Jlc3VsdCIsICJ0b1N0cmluZyIsICJkaXNwbGF5IiwgIl9fIiwgIm9wZXJhdGlvbiIsICJPayIsICJTdHJpbmdIYW5kbGVyIiwgIkVyciIsICJfdmFsdWUiLCAiX3RoaXMiLCAiX3N0YWNrIiwgImUiLCAidHlwZSIsICJvayIsICJlcnIiLCAiaW5zcGVjdCIsICJzdGFjayIsICJleHBlY3QiLCAiZXhwZWN0RXJyIiwgInVud3JhcCIsICJ1bndyYXBPciIsICJhbmQiLCAibWFwIiwgIm1hcEVyciIsICJyZXN0b3JlIiwgInRvT3B0aW9uIiwgInRvU3RyaW5nIiwgImRpc3BsYXkiLCAibWVzc2FnZSIsICJfXyIsICJ2YWx1ZTAiLCAiaXNPcHRpb24iLCAiU3RyaW5nSGFuZGxlciIsICJhbHRlcm5hdGl2ZSIsICJvcGVyYXRpb24iLCAiT2siLCAiTm9uZSIsICJPayIsICJfdmFsdWUiLCAiX3RoaXMiLCAidHlwZSIsICJvayIsICJlcnIiLCAiZXhwZWN0IiwgImV4cGVjdEVyciIsICJ1bndyYXAiLCAidW53cmFwT3IiLCAidW53cmFwU2FmZWx5IiwgImFuZCIsICJtYXAiLCAibWFwRXJyIiwgInJlc3RvcmUiLCAidG9PcHRpb24iLCAidG9TdHJpbmciLCAiZGlzcGxheSIsICJfXyIsICJtZXNzYWdlIiwgInBhbmljIiwgIm9wZXJhdGlvbiIsICJTb21lIiwgIlN0cmluZ0hhbmRsZXIiXQp9Cg==