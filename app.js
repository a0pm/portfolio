import {t} from '../../data/translations.js';
import {projects,credentials} from '../../data/content.js';
import {initCore} from '../systems/core.js';
import {initSimulation} from '../systems/simulation.js';
import {initLab} from '../systems/lab.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let lang=localStorage.getItem('as-lang')||'en'; let theme=localStorage.getItem('as-theme')||'dark';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function get(obj,path){return path.split('.').reduce((v,k)=>v?.[k],obj)}
function renderProjects(){const list=projects[lang];$('#projectGrid').innerHTML=list.map((p,i)=>`<article class="project reveal visible" style="--index:${i}"><div class="project-visual" aria-hidden="true"></div><small>${p.type}</small><h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div></article>`).join('')}
function renderCredentials(){$('#credentialsGrid').innerHTML=credentials[lang].map(([a,b])=>`<article class="credential"><b>${a}</b><p>${b}</p></article>`).join('')}
function applyLang(){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';$$('[data-i18n]').forEach(el=>{const v=get(t[lang],el.dataset.i18n);if(typeof v==='string')el.textContent=v});renderProjects();renderCredentials();document.documentElement.style.setProperty('--ui-direction',lang==='ar'?'rtl':'ltr')}
function applyTheme(){document.body.classList.toggle('light',theme==='light');$('#themeGlyph').textContent=theme==='dark'?'◐':'○';$('#themeBtn').classList.toggle('is-on',theme==='light')}
function navScroll(e){const a=e.currentTarget,href=a.getAttribute('href');if(!href?.startsWith('#'))return;e.preventDefault();document.querySelector(href)?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'})}
$$('[data-nav]').forEach(a=>a.addEventListener('click',navScroll));
$('#langBtn').addEventListener('click',()=>{lang=lang==='en'?'ar':'en';localStorage.setItem('as-lang',lang);applyLang()});
$('#themeBtn').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';localStorage.setItem('as-theme',theme);applyTheme()});
const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});$$('.reveal').forEach(x=>revealObserver.observe(x));
const sectionObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('.nav a').forEach(a=>a.classList.toggle('active',a.dataset.section===e.target.id))}}),{rootMargin:'-45% 0px -45% 0px'});$$('[data-section-root],#systems,#field,#contact').forEach(x=>sectionObserver.observe(x));
let ticking=false;function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=`${max>0?(scrollY/max)*100:0}%`;$('#topbar').classList.toggle('scrolled',scrollY>25);const m=$('#method');if(m){const r=m.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight+r.height)));$('#methodProgress').style.width=`${p*100}%`}ticking=false})}addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
$('#signalForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget),msg=String(f.get('message')||'').trim();if(!msg)return;const subject=encodeURIComponent('Portfolio signal from '+(f.get('name')||'Visitor'));const body=encodeURIComponent(msg+'\n\nFrom: '+(f.get('name')||'—')+'\nEmail: '+(f.get('email')||'—'));location.href=`mailto:Theabdullahsultan@gmail.com?subject=${subject}&body=${body}`;$('#formStatus').textContent=lang==='ar'?'تم تجهيز الرسالة في تطبيق البريد.':'Message prepared in your mail app.';$('#formStatus').className='ok'});
applyTheme();applyLang();onScroll();initCore();initSimulation();initLab();
