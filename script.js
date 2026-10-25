(function(){
  var C=window.LMAO_CONFIG||{};
  var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // links
  document.querySelectorAll('[data-link]').forEach(function(a){var k=a.dataset.link;if(C[k])a.href=C[k];});
  // CA
  var caT=document.getElementById('ca-text');caT.textContent=C.contract||'Coming soon';
  function toast(t){var d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.remove()},1800);}
  document.getElementById('ca-copy').addEventListener('click',function(){
    var v=caT.textContent;if(/coming soon/i.test(v)){toast('CA coming soon - stay tuned!');return;}
    (navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(function(){toast('CA copied!')},function(){toast(v)});
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
  // menu
  var b=document.getElementById('burger'),L=document.getElementById('links');
  b.addEventListener('click',function(){var o=L.classList.toggle('open');b.setAttribute('aria-expanded',o);});
  L.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){L.classList.remove('open');b.setAttribute('aria-expanded','false');});});
  // wobble text
  var h=document.querySelector('.wobble');
  var n=0;h.innerHTML=h.textContent.split(' ').map(function(w){return '<span class="w">'+w.split('').map(function(c){return '<span class="ch" style="--i:'+(n++)+'">'+c+'</span>';}).join('')+'</span>';}).join(' ');
  h.setAttribute('aria-label',h.dataset.text);
  // memes
  var M=[["When they sold before the pump","meme1"],["Cheers degens - $LMAO! to the moon","meme2"],["Me buying the dip","meme3"],["Paper hands? LMAO!","meme4"],["Diamond hands - never selling","meme5"]];
  var g=document.getElementById('gallery');
  g.innerHTML=M.map(function(m,i){var src='assets/memes/'+m[1]+'.png';return '<article class="meme tilt reveal"><button class="view" data-i="'+i+'" aria-label="View meme: '+m[0]+'"><img loading="lazy" src="'+src+'" alt="'+m[0]+'" width="1024" height="1024"></button><div class="meme-foot"><span>'+m[0]+'</span><a class="dl" href="'+src+'" download="lmao-'+m[1]+'.png" aria-label="Download '+m[0]+'"><svg><use href="#i-dl"/></svg></a></div></article>';}).join('');
  var lb=document.getElementById('lb'),li=document.getElementById('lb-img'),lc=document.getElementById('lb-cap'),ld=document.getElementById('lb-dl'),cur=0;
  function show(i){cur=(i+M.length)%M.length;var s='assets/memes/'+M[cur][1]+'.png';li.src=s;li.alt=M[cur][0];lc.textContent=M[cur][0];ld.href=s;ld.setAttribute('download','lmao-'+M[cur][1]+'.png');}
  g.addEventListener('click',function(e){var v=e.target.closest('.view');if(!v)return;show(+v.dataset.i);lb.hidden=false;document.body.style.overflow='hidden';});
  function close(){lb.hidden=true;document.body.style.overflow='';}
  document.getElementById('lb-close').onclick=close;
  document.getElementById('lb-prev').onclick=function(){show(cur-1)};
  document.getElementById('lb-next').onclick=function(){show(cur+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
  // reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal,.edge-pose').forEach(function(el){io.observe(el)});
  // counter
  var cn=document.querySelector('[data-count]');
  new IntersectionObserver(function(es,o){if(!es[0].isIntersecting)return;o.disconnect();var t=+cn.dataset.count,s=performance.now();
    (function f(n){var p=RM?1:Math.min((n-s)/1500,1);cn.textContent=Math.floor(t*(1-Math.pow(1-p,3))).toLocaleString('en-US');if(p<1)requestAnimationFrame(f);})(s);}).observe(cn);
  // tilt
  if(!RM&&matchMedia('(hover:hover)').matches){document.querySelectorAll('.tilt').forEach(function(el){
    el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(800px) rotateY('+x*14+'deg) rotateX('+(-y*14)+'deg) scale(1.03)';});
    el.addEventListener('mouseleave',function(){el.style.transform='';});});}
  // hero parallax
  if(!RM){var hp=document.querySelector('#heroPose .pose'),sp=document.querySelector('#heroPose .splash');
    addEventListener('scroll',function(){var y=scrollY;if(y<1200){hp.style.translate='0 '+(y*-.12)+'px';sp.style.translate='0 '+(y*.08)+'px';}},{passive:true});
    addEventListener('mousemove',function(e){var dx=(e.clientX/innerWidth-.5),dy=(e.clientY/innerHeight-.5);sp.style.rotate=(dx*8)+'deg';hp.style.rotate=(dx*-3)+'deg';});}
  // milk particles
  if(RM)return;
  var cv=document.getElementById('fx'),x=cv.getContext('2d'),P=[],dpr=Math.min(devicePixelRatio||1,2);
  function rs(){cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';x.setTransform(dpr,0,0,dpr,0,0);}rs();addEventListener('resize',rs);
  function add(px,py,vx,vy,r,life){P.push({x:px,y:py,vx:vx,vy:vy,r:r,l:life,m:life});}
  addEventListener('mousemove',function(e){if(Math.random()<.5)add(e.clientX,e.clientY,(Math.random()-.5)*1,Math.random()*1+.5,Math.random()*4+2,40);});
  addEventListener('pointerdown',function(e){for(var i=0;i<26;i++){var a=Math.random()*Math.PI*2,s=Math.random()*7+2;add(e.clientX,e.clientY,Math.cos(a)*s,Math.sin(a)*s-3,Math.random()*6+3,70);}});
  (function loop(){x.clearRect(0,0,innerWidth,innerHeight);
    for(var i=P.length-1;i>=0;i--){var p=P[i];p.vy+=.25;p.x+=p.vx;p.y+=p.vy;p.l--;if(p.l<=0){P.splice(i,1);continue;}
      var a=p.l/p.m;x.globalAlpha=a;x.fillStyle='#fffdf4';x.strokeStyle='#0d0d0d';x.lineWidth=1.5;x.beginPath();x.ellipse(p.x,p.y,p.r,p.r*(1+Math.min(Math.abs(p.vy)*.08,.8)),0,0,Math.PI*2);x.fill();x.stroke();}
    x.globalAlpha=1;requestAnimationFrame(loop);})();
})();
