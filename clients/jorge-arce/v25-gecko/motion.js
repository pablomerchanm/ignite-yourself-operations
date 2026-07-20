/* v25-gecko · runtime de motion compartido (catálogo cerrado)
   R1 rise: .reveal → opacity+y18 700ms expo.out
   R2 stagger: [data-stagger] hijos con delays decrecientes 120/80/60
   R5 el sello: [data-seal] (svg del stamp) rota mapeado al scroll global
   Reduced/no-JS: html.no-motion (todo visible, sello quieto). */
(function(){
var REDUCED=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var MOTION=!REDUCED&&typeof gsap!=='undefined'&&typeof Lenis!=='undefined';
if(!MOTION){document.documentElement.classList.add('no-motion');return}
gsap.registerPlugin(ScrollTrigger);
var lenis=new Lenis({lerp:.25});
lenis.on('scroll',ScrollTrigger.update);
gsap.ticker.add(function(t){lenis.raf(t*1000)});
gsap.ticker.lagSmoothing(0);
  /* re-medir triggers cuando terminan fuentes e imagenes (anti-desfase) */
  (function(){function rf(){if(window.ScrollTrigger)ScrollTrigger.refresh()}
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(rf);
    var pend=Array.prototype.filter.call(document.images,function(im){return !im.complete});
    var left=pend.length;
    pend.forEach(function(im){function done(){if(--left===0)rf()}
      im.addEventListener('load',done);im.addEventListener('error',done)});
  })();

document.querySelectorAll('.reveal:not([data-stagger])').forEach(function(el){
  gsap.fromTo(el,{opacity:0,y:18},{opacity:1,y:0,duration:.7,ease:'expo.out',
    scrollTrigger:{trigger:el,start:'top 88%',once:true}});
});
document.querySelectorAll('[data-stagger]').forEach(function(g){
  var kids=Array.prototype.slice.call(g.children);var acc=0;
  kids.forEach(function(el,i){
    gsap.fromTo(el,{opacity:0,y:14,scale:.988},{opacity:1,y:0,scale:1,duration:.7,ease:'expo.out',delay:acc/1000,
      scrollTrigger:{trigger:g,start:'top 86%',once:true}});
    acc+=[120,80,60][Math.min(i,2)];
  });
});
/* R5 el sello gira con el scroll */
document.querySelectorAll('[data-seal]').forEach(function(sv){
  ScrollTrigger.create({start:0,end:'max',scrub:.35,
    onUpdate:function(self){sv.style.transform='rotate('+(self.progress*720)+'deg)'}});
});
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t=document.querySelector(a.getAttribute('href'));
    if(!t)return;e.preventDefault();lenis.scrollTo(t);
  });
});
})();
