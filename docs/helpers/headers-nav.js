(()=>{var e,t;const n=/<h\d(?!\sid=["'])>([^<>]+)</gim;function l(e){return e.replace(/\s/g,"_").replace(/^[^a-zA-Z]/,"ID_").replace(/[^a-zA-Z0-9-_:.]/gi,(e=>e.charCodeAt(0)))}function a(e,t){var n=t||document.body,a=null;e.appendTo&&(n=document.querySelector(e.appendTo)||t),e.insertBefore&&(a=document.querySelector(e.insertBefore)),a&&a.parentNode!=n&&(n=a.parentNode),n!=t&&t.remove();const r=document.querySelectorAll("h1,h2,h3,h4,h5,h6");if(0==r.length)return;var i=[];r.forEach(((e,t)=>{let n=e.id||l(e.innerHTML)+t;e.id=n,i.push({title:e.textContent,id:n,level:+e.tagName.replace(/[^0-9]/g,""),element:e})})),e.skipH1&&(i=i.filter((e=>1!=e.level))),e.minLevel&&(i=i.filter((t=>t.level>=e.minLevel))),e.maxLevel&&(i=i.filter((t=>t.level<=e.maxLevel)));const o=document.createElement("nav");o.classList.add("headerNavigation");const c=document.createElement("ul");c.classList.add("headersNavigationList");var d=c,s=i[0].level;i.forEach((t=>{const n=document.createElement("li"),l=document.createElement("a");if(l.href="#"+t.id,l.innerHTML=t.title,t.element.scrollIntoView&&l.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),t.element.scrollIntoView({behavior:"smooth",block:"start",inline:"start"}),history.pushState("#"+t.id,null,l.href)})),e.linkBack){const n=document.createElement("a");n.classList.add("linkToTop"),n.href="#",o.scrollIntoView&&n.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),o.scrollIntoView({behavior:"smooth",block:"start",inline:"start"})})),n.innerHTML=e.linkBack,t.element.appendChild(n)}n.classList.add("menuLevel"+t.level),n.appendChild(l),t.level<s&&(d=function(e,t,n){let l=e;for(let e=0;e<t;e++)if(l.parentNode)l=l.parentNode;else{const e=document.createElement(n);e.appendChild(l),l=e}return l}(d,s-t.level,"ul"),s=t.level),t.level>s&&(d=function(e,t,n){let l=e;for(let e=0;e<t;e++){const e=document.createElement(n);l.appendChild(e),l=e}return l}(d,t.level-s,"ul"),s=t.level),d.appendChild(n)})),o.appendChild(c),a?n.insertBefore(o,a):n.appendChild(o)}window.impHelpers.register("headers-nav",{render:function(t,n){return`<span data-ihelper='headers-nav' data-params="${e.packParams(n)}"></span>`},init:function(t,n){e=t},animate:function(n){t?n.remove():a(t=e.parseYAML(e.unpackParams(n.dataset.params)),n)}},"yaml",(function(e){let t={};return e.replace(n,((e,n)=>{let a=l(n);return t[a]?(t[a]+=1,a=a+"_"+t[a]):t[a]=1,e.replace(">",` id="${a}">`)}))}))})();