(()=>{var e={693:()=>{!function(){var e=400,t=400,n=31,r=null,i=null,o=[],l=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)};function p(){setTimeout((function(){requestAnimationFrame(p),c()}),1e3/30)}var s=function(){return{render:function(e,t,n){i.fillStyle="white",i.strokeStyle="#333",i.strokeWidth="20px",i.font="30pt Tahoma",i.textAlign="left",i.textBaseline="middle",i.fillText(e,t,n),i.strokeText(e,t,n)}}},d=function(e){for(var t=0;t<o.length;t++){var r=!1,i=!1;if(e.layerX>=o[t].left&&e.layerX<=o[t].left+n&&(r=!0),e.layerY>=o[t].top&&e.layerY<=o[t].top+n&&(i=!0),r&&i){o[t].explode();break}}},a=function(e){var t=0,i=0,o=!1,p=0,s={remove:!1,top:e.top,left:e.left,anger:e.anger||0,movement:null==e.movement||e.movement,spriteDirection:e.spriteDirection||0,spriteMove:null==e.spriteMove||e.spriteMove,spriteIndex:e.spriteIndex||0,explode:function(e){0===p&&(s.spriteDirection=4,s.movement=!1,s.spriteMove=!0,s.anger=25,s.spriteIndex=0,p++,o=!0)},render:function(){if(++t+s.anger>30&&s.spriteMove&&(t=0,s.spriteIndex++,!0===o&&++p>=e.sprites[4].length&&(s.remove=!0),s.movement)){l(10*s.anger/2,600)>500&&(s.spriteDirection=1===s.spriteDirection?0:1);var d=l(10*s.anger,600),a=l(10*s.anger/2,600),f=l(0,500);d>300&&(f>250?(0===s.spriteDirection?s.left=s.left+5:s.left=s.left-5,s.left<0&&(s.left=0),s.left+n>r.width&&(s.left=r.width-n)):(a>500&&(i=0===i?1:0),s.top=0===i?s.top+5:s.top-5,s.top<0&&(s.top=0),s.top+n>=r.height&&(s.top=r.height-n)))}s.spriteIndex>=e.sprites[s.spriteDirection].length&&(s.spriteIndex=0),e.context.drawImage(e.image,e.sprites[s.spriteDirection][s.spriteIndex][0],e.sprites[s.spriteDirection][s.spriteIndex][1],e.width,e.height,s.left,s.top,e.width,e.height)}};return s},f=function(){var e=document.getElementById("chicken");o.push(new a({context:i,image:e,width:n,top:l(30,.75*r.height),left:l(30,.75*r.width),anger:l(20,30),height:n,sprites:[[[66,22],[98,22],[130,24],[162,24]],[[64,90],[96,89],[128,88],[160,88]],[],[],[[240,22],[205,22],[23,87],[23,56],[23,20]]]}))},c=function(e){i.clearRect(0,0,r.width,r.height);for(var t=o.length-1;t>=0;t--)!1===o[t].remove?o[t].render():(o.splice(t,1),f())};window.addEventListener("load",(function(){console.log("init"),e=document.body.offsetWidth,t=document.body.offsetHeight,console.log(t),(r=document.createElement("canvas")).height=t,r.width=e,r.addEventListener("mousedown",d,!1),document.body.appendChild(r),i=r.getContext("2d"),dateText=new s,p(),f(),f(),f(),f(),f(),f(),f(),f(),f()}),!1)}()}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(693)})()})();