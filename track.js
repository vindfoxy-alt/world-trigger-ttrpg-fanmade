(function(){
function getCookie(n){var m=document.cookie.match('(?:^|; )'+n+'=([^;]*)');return m?decodeURIComponent(m[1]):null}
function setCookie(n,v,d){var e=new Date();e.setTime(e.getTime()+d*864e5);document.cookie=n+'='+encodeURIComponent(v)+';expires='+e.toUTCString()+';path=/;SameSite=Lax'}
function uuid(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16)})}
var PROJECT='word-trigger';
function fv(v){return {stringValue:String(v||'')}}
function sendVisit(loc){
  if(PROJECT==='REPLACE_WITH_FIREBASE_PROJECT_ID')return;
  var vid=getCookie('wt_vid');if(!vid){vid=uuid();setCookie('wt_vid',vid,365)}
  var fields={vid:fv(vid),path:fv(location.pathname),ref:fv(document.referrer),ts:fv(new Date().toISOString()),country:fv(loc.country_name),region:fv(loc.region),city:fv(loc.city),ip:fv(loc.ip)};
  fetch('https://firestore.googleapis.com/v1/projects/'+PROJECT+'/databases/(default)/documents/visits',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:fields})}).catch(function(){})
}
function track(){fetch('https://ipapi.co/json/').then(function(r){return r.json()}).then(sendVisit).catch(function(){sendVisit({})})}
function banner(){
  if(document.getElementById('cookiebar'))return;
  var d=document.createElement('div');d.id='cookiebar';
  d.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:100000;background:#06182c;color:#eaf4fb;padding:12px 16px;font:13px/1.45 system-ui,sans-serif;display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center;border-top:2px solid #12809f;box-shadow:0 -4px 14px rgba(0,0,0,.35)';
  var sp=document.createElement('span');sp.textContent='This site uses a cookie to count visits, see roughly where visitors come from (country and city), and record the network address (IP) your device connects from, so repeat visits from the same device can be told apart from genuinely new ones.';sp.style.maxWidth='560px';
  var b=document.createElement('button');b.textContent='OK';b.style.cssText='background:linear-gradient(135deg,#0b3a63,#12809f);color:#fff;border:1px solid rgba(160,230,245,.6);padding:7px 16px;border-radius:999px;font:700 13px system-ui;cursor:pointer;flex-shrink:0';
  b.onclick=function(){setCookie('wt_cookie_ok','1',365);d.remove();track()};
  d.append(sp,b);document.body.appendChild(d)
}
function go(){if(getCookie('wt_cookie_ok')==='1')track();else banner()}
if(document.body)go();else document.addEventListener('DOMContentLoaded',go)
})();
