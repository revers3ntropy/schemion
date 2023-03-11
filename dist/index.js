!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("schemion",[],e):"object"==typeof exports?exports.schemion=e():t.schemion=e()}(this||global||window,(()=>(()=>{"use strict";var t={};return{622:function(t,e){var r,n=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return o=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},o.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.VERSION=e.matches=e.validateSchema=e.matchObject=e.matchArray=e.matchesAtomic=void 0;var i=function(t){function e(e){var r=t.call(this,e)||this;return r.name="SchemaError",r}return n(e,t),e}(Error),c=["string","number","boolean","object","function","undefined","any","symbol"];function a(t,e,r){return"any"===e||typeof t===e}function s(t,e,r){return Array.isArray(t)&&(t.length===e.length||!r.strict)&&e.every((function(e,n){return l(t[n],e,null,o(o({},r),{shouldValidateSchema:!1}))}))}function u(t,e,r,n){var i,c;if(void 0===r&&(r={}),"object"!=typeof t||null===t)return!1;for(var a in r)null!==(i=(c=t)[a])&&void 0!==i||(c[a]=r[a]);if(n.strict&&Object.keys(t).length!==Object.keys(e).length)return!1;for(var a in e)if(!l(t[a],e[a],null,o(o({},n),{shouldValidateSchema:!1})))return!1;return!0}function f(t){if("string"==typeof t){if(c.indexOf(t)<0)throw new i("Invalid schema")}else if(Array.isArray(t))t.forEach(f);else{if("object"!=typeof t)throw new i("Invalid schema");Object.keys(t).forEach((function(e){return f(t[e])}))}}function l(t,e,r,n){return void 0===r&&(r=null),void 0===n&&(n={shouldValidateSchema:!0,strict:!1}),n.shouldValidateSchema&&f(e),"string"==typeof e?a(t,e):Array.isArray(e)?s(t,e,n):"object"==typeof e&&u(t,e,r,n)}e.matchesAtomic=a,e.matchArray=s,e.matchObject=u,e.validateSchema=f,e.matches=l,e.VERSION="0.0.11";var h={matches:l,VERSION:e.VERSION};e.default=h}}[622](0,t),t=t.default})()));
//# sourceMappingURL=index.js.map