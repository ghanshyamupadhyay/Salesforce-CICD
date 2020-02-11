/*
YUI 3.10.3 (build 2fb5187)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("array-extras",function(e,t){var n=e.Array,r=e.Lang,i=Array.prototype;n.lastIndexOf=r._isNative(i.lastIndexOf)?function(e,t,n){return n||n===0?e.lastIndexOf(t,n):e.lastIndexOf(t)}:function(e,t,n){var r=e.length,i=r-1;if(n||n===0)i=Math.min(n<0?r+n:n,r);if(i>-1&&r>0)for(;i>-1;--i)if(i in e&&e[i]===t)return i;return-1},n.unique=function(e,t){var n=0,r=e.length,i=[],s,o,u,a;e:for(;n<r;n++){a=e[n];for(s=0,u=i.length;s<u;s++){o=i[s];if(t){if(t.call(e,a,o,n,e))continue e}else if(a===o)continue e}i.push(a)}return i},n.filter=r._isNative(i.filter)?function(e,t,n){return i.filter.call(e,t,n)}:function(e,t,n){var r=0,i=e.length,s=[],o;for(;r<i;++r)r in e&&(o=e[r],t.call(n,o,r,e)&&s.push(o));return s},n.reject=function(e,t,r){return n.filter(e,function(e,n,i){return!t.call(r,e,n,i)})},n.every=r._isNative(i.every)?function(e,t,n){return i.every.call(e,t,n)}:function(e,t,n){for(var r=0,i=e.length;r<i;++r)if(r in e&&!t.call(n,e[r],r,e))return!1;return!0},n.map=r._isNative(i.map)?function(e,t,n){return i.map.call(e,t,n)}:function(e,t,n){var r=0,s=e.length,o=i.concat.call(e);for(;r<s;++r)r in e&&(o[r]=t.call(n,e[r],r,e));return o},n.reduce=r._isNative(i.reduce)?function(e,t,n,r){return i.reduce.call(e,function(e,t,i,s){return n.call(r,e,t,i,s)},t)}:function(e,t,n,r){var i=0,s=e.length,o=t;for(;i<s;++i)i in e&&(o=n.call(r,o,e[i],i,e));return o},n.find=function(e,t,n){for(var r=0,i=e.length;r<i;r++)if(r in e&&t.call(n,e[r],r,e))return e[r];return null},n.grep=function(e,t){return n.filter(e,function(e,n){return t.test(e)})},n.partition=function(e,t,r){var i={matches:[],rejects:[]};return n.each(e,function(n,s){var u=t.call(r,n,s,e)?i.matches:i.rejects;u.push(n)}),i},n.zip=function(e,t){var r=[];return n.each(e,function(e,n){r.push([e,t[n]])}),r},n.flatten=function(e){var t=[],i,s,o;if(!e)return t;for(i=0,s=e.length;i<s;++i)o=e[i],r.isArray(o)?t.push.apply(t,n.flatten(o)):t.push(o);return t}},"3.10.3",{requires:["yui-base"]});
