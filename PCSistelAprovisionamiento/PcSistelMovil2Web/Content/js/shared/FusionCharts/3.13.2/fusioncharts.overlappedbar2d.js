!function(e){"object"==typeof module&&"undefined"!=typeof module.exports?module.exports=e:e()}(function(){(window.webpackJsonpFusionCharts=window.webpackJsonpFusionCharts||[]).push([[10],{708:function(e,t,n){"use strict";t.__esModule=!0,t.OverlapperBar2D=undefined;var o=i(n(709)),r=i(n(248));function i(e){return e&&e.__esModule?e:{"default":e}}t.OverlapperBar2D=o["default"],t["default"]={name:"overlappedbar2d",type:"package",requiresFusionCharts:!0,extension:function(e){e.addDep(r["default"]),e.addDep(o["default"])}}},709:function(e,t,n){"use strict";t.__esModule=!0;var o=l(n(353)),r=l(n(710)),i=l(n(356)),a=l(n(711));function l(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):function(e,t){for(var n=Object.getOwnPropertyNames(t),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(t,r);i&&i.configurable&&e[r]===undefined&&Object.defineProperty(e,r,i)}}(e,t))}var u=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this));return n.isBar=!0,n.registerFactory("dataset",i["default"],["vCanvas"]),n}return s(t,e),t.prototype.__setDefaultConfig=function(){e.prototype.__setDefaultConfig.call(this);var t=this.config;t.friendlyName="Multi-series Bar Chart",t.hasLegend=!0,t.defaultDatasetType="bar2d"},t.prototype.getName=function(){return"OverlappedBar2D"},t.getName=function(){return"OverlappedBar2D"},t.prototype.getDSdef=function(){return r["default"]},t.prototype.getDSGroupdef=function(){return a["default"]},t}(o["default"]);t["default"]=u},710:function(e,t,n){"use strict";t.__esModule=!0;var o,r=n(118),i=n(362),a=(o=i)&&o.__esModule?o:{"default":o};function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):function(e,t){for(var n=Object.getOwnPropertyNames(t),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(t,r);i&&i.configurable&&e[r]===undefined&&Object.defineProperty(e,r,i)}}(e,t))}var s=r.preDefStr.visibleStr,u=r.preDefStr.hiddenStr,f=r.preDefStr.POSITION_MIDDLE,c=r.preDefStr.POSITION_START,p=r.preDefStr.POSITION_END,d=Math.max;function h(e,t){var n,o=void 0,r=e.x,i=void 0,a=e.width,l=void 0;for(o=0,n=t.length;o<n;o++)if(l=t[o].width,i=t[o].x,t[o].labelShown&&r+a>=i&&i+l>=r)return!0;return!1}var b=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this));return n._labeldimensionMap={},n}return l(t,e),t.prototype.drawLabel=function(){var e,t,n,o,i,a,l,b,g,y,v,w,m,O,S,D,_,x,P,C,M,j,k,N,T,E,I,B,F=this.getFromEnv("chart"),L=F.config,A=this.config.JSONData,R=this.getFromEnv("animationManager"),J=F.getChildren("canvas")[0].config,V=F.config.dataLabelStyle,G=A.data,q=F.config.categories,z=F.config.is3D,H=F.config.isstacked,K=q&&q.length,W=G&&G.length,Q=this.getData(),U=F.getFromEnv("smartLabel"),X=J.yDepth,Y=J.xDepth,Z=F.getFromEnv("number-formatter"),$="",ee=L.placevaluesinside,te=L.canvasWidth,ne=L.canvasLeft,oe=L.valuepadding+2,re=this.getContainer("labelGroup"),ie=this.getSkippingInfo&&this.getSkippingInfo(),ae=ie&&ie.skippingApplied,le=ie&&ie.labelDraw||[],se=le.length,ue=this.getJSONIndex(),fe=this.getState("visible"),ce=function(){this.hide()},pe=function(){this.show()};for(fe&&re.show(),U.setStyle(V),e=ae?se:K<W?K:W,i=0;i<e;i++)D=(C=(t=Q[o=ae?le[i]:i])&&t.config)&&C.setValue,void 0!==t&&void 0!==D&&null!==D&&!0!==C.labelSkip?(l=t.graphics)&&(a=G[o],m=t._yPos,O=t._xPos,D=Z.getCleanValue(a.value),w=(0,r.pluckNumber)(D)<0,b=t._height,S=t._width,_=H?f:w?ee?c:p:ee?p:c,$=C.displayValue,T=l.label,C.showValue&&(void 0!==(B=$)&&null!==B)&&$!==r.BLANKSTRING&&null!==D?(n={text:$,fill:V.color,"text-bound":[V.backgroundColor,V.borderColor,V.borderThickness,V.borderPadding,V.borderRadius,V.borderDash],"line-height":V.lineHeight,visibility:this.getState("visible")?s:u},x=(E=U.getOriSize($)).width,x+=oe,P=oe,g=m+.5*b,y=O+(w?0:S),v=w?O-ne:ne+te-(O+S),ee?S>=x?(y+=w?P:-P,z&&(g+=X,y-=Y)):x<v?(y+=w?-P:P,_=w?p:c,z&&w&&(y-=Y)):w?(y=O+S+d(x-O-S+ne,0)-P,_=p):(y=O-d(x-(ne+te-O),0)+P,_=c):v>=x?(y+=w?-P:P,z&&w&&(y-=Y,g+=Y)):y+=w?P+x:-(P+x),(y>ne+te||y<ne)&&(y=ne+4,_=c),n["text-anchor"]=_,n.x=y,n.y=g,n["text-bound"]=[V.backgroundColor,V.borderColor,V.borderThickness,V.borderPadding,V.borderRadius,V.borderDash],n.opacity=fe?1:0,j=F.getDatasets().map(function(e){return e.getJSONIndex()<ue&&e._labeldimensionMap[i]}).filter(Boolean),N=h(k={x:y,y:g,width:E.width,height:E.height},j),this._labeldimensionMap[i]=k,N?l.label&&(l.label=R.setAnimation({el:l.label,component:this}),this._labeldimensionMap[i].labelShown=!1):(M=R.setAnimation({el:T||"text",container:re,component:this,attr:n,callback:fe?pe:ce,label:"plotLabel"}),T||(l.label=M)),this._labeldimensionMap[i].labelShown=!(!fe||N)):l.label&&(l.label=R.setAnimation({el:l.label,component:this}),this._labeldimensionMap[i].labelShown=!1)):((I=t&&t.graphics)&&I.label&&I.label.hide(),C&&delete C.labelSkip)},t}(a["default"]);t["default"]=b}}])});
//# sourceMappingURL=http://localhost:3052/3.13.2-sr.1/map/licensed/fusioncharts.overlappedbar2d.js.map