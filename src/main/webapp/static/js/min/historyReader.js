var renderOffsetX=0,renderOffsetY=0,loadSlidesAtNativeZoom,startMark,requestedViewboxX=0,requestedViewboxY=0,requestedViewboxWidth=320,requestedViewboxHeight=240;function loadSlide(a){startMark=Date.now();$("#targetSlide").text(sprintf("Loading %s",a));showSpinner();moveToSlide(a.toString())}
function receiveHistory(a,d,b){try{var e=void 0==d?boardContext:d;Date.now();a.multiWordTexts=_.pickBy(a.multiWordTexts,isUsable);a.images=_.pickBy(a.images,isUsable);a.inks=_.pickBy(a.inks,isUsable);boardContent=a;boardContent.minX=0;boardContent.minY=0;boardContent.maxX=boardWidth;boardContent.maxY=boardHeight;viewboxWidth=boardContent.maxX-boardContent.minX;viewboxHeight=boardContent.maxY-boardContent.minY;$.each(boardContent.inks,function(a,c){prerenderInk(c,!0)});Date.now();$.each(boardContent.highlighters,
function(a,c){prerenderInk(c,!0)});Date.now();$.each(boardContent.texts,function(a,c){isUsable(c)?prerenderText(c):delete boardContent.texts[c.id]});$.each(boardContent.videos,function(a,c){prerenderVideo(c)});Date.now();_.each(boardContent.multiWordTexts,function(a){isUsable(a)?(Modes.text.editorFor(a).doc.load(a.words),incorporateBoardBounds(a.bounds)):console.log("Not usable",a)});Date.now();boardContent.width=boardContent.maxX-boardContent.minX;boardContent.height=boardContent.maxY-boardContent.minY;
var f=function(){Date.now();Progress.call("historyReceived",[a]);Date.now();Infinity==boardContent.minX&&(boardContent.minX=0);Infinity==boardContent.minY&&(boardContent.minY=0);loadSlidesAtNativeZoom?(requestedViewboxY=requestedViewboxX=0,requestedViewboxWidth=boardWidth,requestedViewboxHeight=boardHeight):(requestedViewboxX=boardContent.minX,requestedViewboxY=boardContent.minY,requestedViewboxWidth=boardContent.width,requestedViewboxHeight=boardContent.height);IncludeView["default"]();hideBackstage();
clearBoard(e,{x:0,y:0,w:boardWidth,h:boardHeight});blit();Date.now();UserSettings.getIsInteractive()||zoomToFit();void 0!=b&&b()};if(0==_.keys(boardContent.images).length)_.defer(f);else{var c=0,g=_.keys(boardContent.images).length;$.each(boardContent.images,function(a,b){b.bounds=[b.x,b.y,b.x+b.width,b.y+b.height];incorporateBoardBounds(b.bounds);var d=new Image;b.imageData=d;var e=calculateImageSource(b,!0);d.onload=function(a){a=!1;0==b.width&&(b.width=d.naturalWidth,a=!0);0==b.height&&(b.height=
d.naturalHeight,a=!0);a&&(b.bounds=[b.x,b.y,b.x+b.width,b.y+b.height],incorporateBoardBounds(b.bounds));c+=1;prerenderImage(b);c>=g&&_.defer(f)};d.onerror=function(a){console.log("Data image load error",b,a);--g;console.log(sprintf("Preloaded %s/%s images",c,g));c>=g&&_.defer(f)};d.src=e})}}catch(h){console.log("receiveHistory exception",h)}}var lineDrawingThreshold=25;
function incorporateBoardBounds(a){isNaN(a[0])||(boardContent.minX=Math.min(boardContent.minX,a[0]));isNaN(a[1])||(boardContent.minY=Math.min(boardContent.minY,a[1]));isNaN(a[2])||(boardContent.maxX=Math.max(boardContent.maxX,a[2]));isNaN(a[3])||(boardContent.maxY=Math.max(boardContent.maxY,a[3]));boardContent.width=boardContent.maxX-boardContent.minX;boardContent.height=boardContent.maxY-boardContent.minY}
function mergeBounds(a,d){var b={};b.minX=Math.min(a[0],d[0]);b.minY=Math.min(a[1],d[1]);b.maxX=Math.max(a[2],d[2]);b.maxY=Math.max(a[3],d[3]);b.width=b.maxX-b.minX;b.height=b.maxY-b.minY;b.centerX=b.minX+b.width/2;b.centerY=b.minY+b.height/2;b[0]=b.minX;b[1]=b.minY;b[2]=b.maxX;b[3]=b.maxY;return b}var boardLimit=1E4;
function isUsable(a){var d=!_.some(a.bounds,function(a){return isNaN(a)}),b="size"in a?!isNaN(a.size):!0,e="text"in a?0<a.text.length:!0,f=_.map(Conversations.getCurrentGroup(),"id"),c=_.isEmpty(a.audiences)||Conversations.isAuthor()||_.some(a.audiences,function(a){return"whitelist"==a.action&&_.includes(f,a.name)}),g=a.author==UserSettings.getUsername();a=_.some(a.audiences,function(a){return"direct"==a.action&&a.name==UserSettings.getUsername()});return d&&b&&e&&(g||a||c)}
function usableStanzas(){return _.map(boardContent.multiWordTexts).map(function(a){return{identity:a.identity,usable:isUsable(a)}})}var leftPoint=function(a,d,b,e,f,c){return{x:d*b*c+e,y:a*b*-c+f}},rightPoint=function(a,d,b,e,f,c){return{x:d*b*-c+e,y:a*b*c+f}},determineCanvasConstants=_.once(function(){var a=DeviceConfiguration.getCurrentDevice(),d=8192,b=8192;"browser"!=a&&("iPad"==a?b=d=6144:"iPhone"==a?b=d=2048:"IE9"==a&&(b=d=8192));return{x:d,y:b}});
function determineScaling(a,d){var b=a,e=d,f=1,c=1,g=determineCanvasConstants(),h=g.x,g=g.y;a>h&&(f=h/a,b=a*f,c=f,e=d*f);e>g&&(c=g/e,e*=c,f=c,b*=c);return{width:b,height:e,scaleX:f,scaleY:c}}
function prerenderInk(a,d){if(!isUsable(a))return a.identity in boardContent.inks&&delete boardContent.inks[a.identity],a.identity in boardContent.highlighters&&delete boardContent.highlighters[a.identity],!1;calculateInkBounds(a);d&&incorporateBoardBounds(a.bounds);var b="PRIVATE"==a.privacy.toUpperCase(),e=determineScaling(a.bounds[2]-a.bounds[0]+a.thickness,a.bounds[3]-a.bounds[1]+a.thickness),f=$("<canvas />",{width:e.width,height:e.height})[0];a.canvas=f;var c=f.getContext("2d");f.width=e.width;
f.height=e.height;var g=a.points,f=[],h,l,k;for(k=0;k<g.length;k+=3)f.push(g[k]*e.scaleX),f.push(g[k+1]*e.scaleY),f.push(g[k+2]/256);var g=-1*(a.minX-a.thickness/2)*e.scaleX,m=-1*(a.minY-a.thickness/2)*e.scaleY,e=a.thickness*e.scaleX;if(b){b=f[0]+g;h=f[1]+m;c.lineWidth=e;c.lineCap="round";c.strokeStyle="red";c.globalAlpha=.3;c.moveTo(b,h);for(k=0;k<f.length;k+=3)c.beginPath(),c.moveTo(b,h),b=f[k]+g,h=f[k+1]+m,l=e*f[k+2],c.lineWidth=l+2,c.lineTo(b,h),c.stroke();c.globalAlpha=1}c.strokeStyle=a.color[0];
c.fillStyle=a.color[0];b=f[0]+g;h=f[1]+m;c.beginPath();c.moveTo(b,h);l=e*f[2];c.arc(b,h,l/2,0,2*Math.PI);c.fill();c.lineCap="round";for(k=0;k<f.length;k+=3)c.beginPath(),c.moveTo(b,h),b=f[k+0]+g,h=f[k+1]+m,l=e*f[k+2],c.lineWidth=l,c.lineTo(b,h),c.stroke();return!0}function alertCanvas(a,d){var b=a.toDataURL();window.open(b,d,sprintf("width=%s, height=%s",a.width,a.height))}var precision=Math.pow(10,3),round=function(a){return Math.round(a*precision)/precision};
function calculateImageBounds(a){a.bounds=[a.x,a.y,a.x+a.width,a.y+a.height]}function calculateVideoBounds(a){a.bounds=[a.x,a.y,a.x+a.width,a.y+a.height]}function urlEncodeSlideName(a){return btoa(a)}function calculateImageSource(a){var d="PRIVATE"==a.privacy.toUpperCase()?sprintf("%s%s",a.slide,a.author):a.slide;return sprintf("/proxyImageUrl/%s?source=%s",urlEncodeSlideName(d),encodeURIComponent(a.source))}
function calculateVideoSource(a){var d="PRIVATE"==a.privacy.toUpperCase()?sprintf("%s%s",a.slide,a.author):a.slide;return sprintf("/videoProxy/%s/%s",urlEncodeSlideName(d),encodeURIComponent(a.identity))}function calculateTextBounds(a){a.bounds=[a.x,a.y,a.x+a.width,a.y+a.runs.length*a.size*1.25]}
function calculateInkBounds(a){var d=Infinity,b=Infinity,e=-Infinity,f=-Infinity,c=[],g=a.points,h=a.thickness/2,l=a.thickness/2;if(6==g.length)d=g[0]-h,e=g[0]+h,b=g[1]-l,f=g[1]+l,c.push(g[2]);else for(var k=0;k<g.length;k+=3){var m=round(g[k]),n=round(g[k+1]);g[k]=m;g[k+1]=n;c.push(g[k+2]);d=Math.min(m-h,d);b=Math.min(n-l,b);e=Math.max(m+h,e);f=Math.max(n+l,f)}a.minX=d;a.minY=b;a.maxX=e;a.maxY=f;a.width=e-d;a.height=f-b;a.centerX=d+h;a.centerY=b+l;a.bounds=[d,b,e,f];a.widths=c}
function scale(){return Math.min(boardWidth/viewboxWidth,boardHeight/viewboxHeight)}function prerenderImage(a){var d=$("<canvas/>")[0];a.canvas=d;d.width=a.width;d.height=a.height;var b=.1*d.width,e=.1*d.height;d.width=a.width+b;d.height=a.height+e;var f=d.getContext("2d");f.drawImage(a.imageData,b/2,e/2,a.width,a.height);"PRIVATE"==a.privacy.toUpperCase()&&(f.globalAlpha=.2,f.fillStyle="red",f.fillRect(0,0,d.width,d.height),f.globalAlpha=1);delete a.imageData}
function prerenderVideo(a){if(!("video"in a)){var d=$("<video/>",{src:calculateVideoSource(a)});a.video=d[0];a.getState=function(){return{paused:d[0].paused,ended:d[0].ended,currentTime:d[0].currentTime,duration:d[0].duration,muted:d[0].muted,volume:d[0].volume,readyState:d[0].readyState,played:d[0].played,buffered:d[0].buffered,playbackRate:d[0].playbackRate,loop:d[0].loop}};a.seek=function(b){d[0].currentTime=Math.min(d[0].duration,Math.max(0,b));d[0].paused&&a.play()};a.muted=function(a){void 0!=
a&&(d[0].muted=a);return d[0].muted};a.play=function(){var b=function(){if(a.video.paused||a.video.ended)return!1;requestAnimationFrame(function(){blit();b()});return!0};a.video.addEventListener("play",function(){b()},!1);(a.video.paused||a.video.ended)&&a.video.play()};a.destroy=function(){a.video.removeAttribute("src");a.video.load()};a.pause=function(){a.video.paused||a.video.pause()}}"bounds"in a||calculateVideoBounds(a)}
function prerenderText(a){function d(a){var c=a.font;"bold"==a.weight&&(c+=" bold");"italic"==a.style&&(c+=" italic");return c}var b=$("<canvas />")[0];a.canvas=b;var e=b.getContext("2d");e.strokeStyle=a.color;e.font=a.font;var f=/\n/;a.width||(a.width=Math.max.apply(Math,a.text.split(f).map(function(a){return e.measureText(a).width})));var c="",g=[],h=!1;$.each(a.text.split(""),function(b,d){d.match(f)?(g.push(""+c),c=""):h&&" "==d?(g.push(c),c=""):(h=e.measureText(c).width>=a.width-80,c+=d)});g.push(c);
g=g.map(function(a){return a.trim()});a.runs=g;calculateTextBounds(a);var l=a.bounds[3]-a.bounds[1],k=determineScaling(a.bounds[2]-a.bounds[0],l);b.width=k.width;b.height=k.height;a.height=l;"PRIVATE"==a.privacy.toUpperCase()&&(e.globalAlpha=.2,e.fillStyle="red",e.fillRect(0,0,k.width,k.height),e.globalAlpha=1);e.fillStyle=a.color[0];e.textBaseline="top";$.each(a.runs,function(c,b){var f=function(){var c=_.range(a.size,a.height,a.height/(a.height/(1.25*a.size)));_.each(c,function(c){e.beginPath();
e.strokeStyle=a.color[0];c=contentOffsetY+c;e.moveTo(contentOffsetX,c);e.lineTo(contentOffsetX+k.width,c);e.stroke()})},g=c*a.size*1.25;e.font=d(a);e.fillText(b,contentOffsetX*k.scaleX,(contentOffsetY+g)*k.scaleY,k.width);"underline"==a.decoration&&f()});incorporateBoardBounds(a.bounds)}
var boardContent={images:{},highlighters:{},texts:{},multiWordTexts:{},inks:{},themes:[]},pressureSimilarityThreshold=32,viewboxX=0,viewboxY=0,viewboxWidth=80,viewboxHeight=60,contentOffsetX=0,contentOffsetY=0,boardWidth=0,boardHeight=0,visibleBounds=[];
function render(a,d,b,e){try{var f=(new Date).getTime(),c=b||boardContext;if(a){Date.now();try{var g=void 0==e?[viewboxX,viewboxY,viewboxX+viewboxWidth,viewboxY+viewboxHeight]:e;visibleBounds=[];var h=[],l=function(a){void 0!=a&&$.each(a,function(a,b){try{intersectRect(b.bounds,g)&&(drawInk(b,c),h.push(b))}catch(d){console.log("ink render failed for",d,b.canvas,b.identity,b)}})},k=function(a){a&&$.each(a,function(a,c){c.bounds||c.doc.invalidateBounds();intersectRect(c.bounds,g)&&(drawMultiwordText(c),
h.push(c))})},m=function(a){a&&(Modes.clearCanvasInteractables("videos"),$.each(a,function(a,b){intersectRect(b.bounds,g)&&(drawVideo(b,c),Modes.pushCanvasInteractable("videos",videoControlInteractable(b)),h.push(b))}))};Object.keys(a.images);clearBoard(c,{x:0,y:0,w:boardWidth,h:boardHeight});Date.now();$.each(a.images,function(a,b){try{intersectRect(b.bounds,g)&&drawImage(b,c)}catch(d){console.log("image render failed for",d,b.identity,b)}});Date.now();(function(){m(a.videos);l(a.highlighters);Date.now();
$.each(a.texts,function(a,b){intersectRect(b.bounds,g)&&(drawText(b,c),h.push(b))});Date.now();k(a.multiWordTexts);Date.now();l(a.inks);Date.now();Progress.call("postRender");Date.now()})();(function(){c.save();c.lineWidth=1;var a=[];_.forEach(Modes.select.selected,function(b){_.forEach(b,function(b){b=b.bounds;var d=worldToScreen(b[0],b[1]),e=worldToScreen(b[2],b[3]);a.push([d,e]);b&&(c.setLineDash([5]),c.strokeStyle="blue",c.strokeRect(d.x,d.y,e.x-d.x,e.y-d.y))})});var b=Modes.select.totalSelectedBounds();
0<a.length&&(c.strokeStyle="blue",c.strokeWidth=3,c.strokeRect(b.tl.x,b.tl.y,b.br.x-b.tl.x,b.br.y-b.tl.y));c.restore()})();(function(){var a=Modes.select.marqueeWorldOrigin;if(Modes.select.dragging){c.save();scale();var a=worldToScreen(Modes.select.offset.x-a.x,Modes.select.offset.y-a.y),b=worldToScreen(0,0);c.translate(a.x-b.x,a.y-b.y);c.globalAlpha=.7;_.forEach(Modes.select.selected,function(a,b){_.forEach(a,function(a){switch(b){case "images":drawImage(a,c);break;case "videos":drawVideo(a,c);break;
case "texts":drawText(a,c);break;case "multiWordTexts":drawMultiwordText(a);break;case "inks":drawInk(a,c)}})});c.restore()}else if(Modes.select.resizing){var a=Modes.select.totalSelectedBounds(),d=(Modes.select.offset.x-a.x)/(a.x2-a.x),e=(Modes.select.offset.y-a.y)/(a.y2-a.y),f=function(a,b,f){c.save();c.globalAlpha=.7;c.translate(a,b);c.scale(d,e);c.translate(-a,-b);f();c.restore()},g=function(){};_.forEach(Modes.select.selected,function(a,b){_.forEach(a,function(a){var e=a.bounds,k=worldToScreen(e[0],
e[1]),h=k.x,k=k.y;switch(b){case "images":f(h,k,function(){drawImage(a,c)});break;case "videos":f(h,k,function(){drawVideo(a,c)});break;case "texts":f(h,k,function(){drawText(a,c)});break;case "multiWordTexts":c.save();c.globalAlpha=.7;h=carota.editor.create({querySelector:function(){return{addEventListener:g}},handleEvent:g},c,g,_.cloneDeep(a));h.position={x:e[0],y:e[1]};h.load(a.doc.save());e=h.documentRange();h.select(e.start,e.end);Modes.select.aspectLocked&&Modes.text.scaleEditor(h,d);h.width(Math.max(a.doc.width()*
d,Modes.text.minimumWidth/scale()));carota.editor.paint(board[0],h);c.restore();break;case "inks":f(h,k,function(){drawInk(a,c)})}})})}})();(function(){c.save();if(Modes.select.isAdministeringContent()){var a=_.groupBy(h,"author");_.each(a,function(a,b){var d=_.reduce(_.map(a,"bounds"),mergeBounds),e=worldToScreen(d[0],d[1]);c.strokeStyle="black";c.lineWidth=.1;_.each(a,function(a){c.beginPath();c.moveTo(e.x,e.y);a=worldToScreen(a.bounds[0],a.bounds[1]);c.lineTo(a.x,a.y);c.stroke()});c.fillStyle=
"black";c.fillRect(e.x-3,e.y,c.measureText(b).width+6,14);c.fillStyle="white";c.fillText(b,e.x,e.y+10)})}c.restore()})();(function(){_.each(Modes.canvasInteractables,function(a){_.each(a,function(a){void 0!=a&&"render"in a&&(c.save(),c.lineWidth=1,a.render(c),c.restore())})})})();Date.now()}catch(n){console.log("Render exception",n)}Progress.call("onViewboxChanged")}"HealthChecker"in window&&HealthChecker.addMeasure("render",!0,(new Date).getTime()-f)}catch(n){throw console.log(n),"HealthChecker"in
window&&HealthChecker.addMeasure("render",!1,(new Date).getTime()-f),n;}}function lightBlueGradient(a,d,b){a=a.createLinearGradient(0,0,0,b);a.addColorStop(0,"#F5FAFF");a.addColorStop(.61,"#D0DEEF");a.addColorStop(.4,"#CADAED");a.addColorStop(1,"#E7F2FF");return a}function monashBlueGradient(a,d,b){a=a.createLinearGradient(0,0,0,b);a.addColorStop(1,"#C5D5F6");a.addColorStop(.65,"#87ACF2");a.addColorStop(.6,"#7AA3F4");a.addColorStop(0,"#C5D5F6");return a}
var blit=function(a,d){try{render(void 0==d?boardContent:d,!1,void 0==a?boardContext:a)}catch(b){console.log("exception in render:",b)}};function pica(a){return a/128}function unpica(a){return Math.floor(128*a)}function px(a){return sprintf("%spx",a)}function unpix(a){return a.slice(0,a.length-2)}
function updateConversationHeader(){$("#heading").text(Conversations.getCurrentConversation().title);var a=$("#currentGroupTitle").empty(),d=Conversations.getCurrentGroup();d.length&&a.text(sprintf("Group %s of",_.join(_.map(d,"title"),",")))}function clearBoard(a,d){try{var b=void 0==d?{x:0,y:0,w:boardWidth,h:boardHeight}:d;(void 0==a?boardContext:a).clearRect(b.x,b.y,b.w,b.h)}catch(e){console.log("exception while clearing board:",e,a,d)}}
var IncludeView=function(){var a=function(a,b,e,f,c){var g=!1,h=a;void 0==h?h=requestedViewboxX:(g=!0,requestedViewboxX=h);var l=b;void 0==l?l=requestedViewboxY:(g=!0,requestedViewboxY=l);var k=e;void 0==k?k=requestedViewboxWidth:(g=!0,requestedViewboxWidth=k);var m=f;void 0==m?m=requestedViewboxHeight:(g=!0,requestedViewboxHeight=m);h=Zoom.constrainRequestedViewbox({width:k,height:m,x:h,y:l});k=boardHeight/h.height;m=boardWidth/h.width;m>k?(l=h.height,k=h.width*m/k):(l=h.height/m*k,k=h.width);c=
_.every([a,b,e,f],function(a){return void 0==a})||c;TweenController.zoomAndPanViewbox(h.x,h.y,k,l,void 0,!g,c);Progress.call("onViewboxChanged")};return{specific:function(d,b,e,f,c){return a(d,b,e,f,c)},"default":function(){return a()}}}();
