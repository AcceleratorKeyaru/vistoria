
function randRoom(){
  const a = crypto.getRandomValues(new Uint8Array(10));
  const s = Array.from(a).map(x=>x.toString(16).padStart(2,'0')).join('');
  return "v-" + s.slice(0,10);
}
function baseUrl(){
  // Works on GitHub Pages (same origin)
  return location.origin + location.pathname.replace(/\/[^\/]*$/, '/');
}
function setText(id, txt){ const el=document.getElementById(id); if(el) el.textContent=txt; }
function setHref(id, href){ const el=document.getElementById(id); if(el){ el.textContent=href; el.href=href; } }
function copyToClipboard(text){
  navigator.clipboard.writeText(text).then(()=>toast("Copiado!"), ()=>toast("Não consegui copiar."));
}
let tmo=null;
function toast(msg){
  const el=document.getElementById("toast");
  if(!el) return;
  el.textContent=msg;
  el.style.opacity="1";
  clearTimeout(tmo);
  tmo=setTimeout(()=>{ el.style.opacity="0"; }, 1600);
}
function buildLinks(room){
  const b = baseUrl();
  const host = b + "assistir.html?r=" + encodeURIComponent(room) + "&role=host";
  const guest = b + "camera.html?r=" + encodeURIComponent(room) + "&role=guest";
  return {host, guest};
}
function initAdmin(){
  const room = randRoom();
  document.getElementById("room").value = room;
  const links = buildLinks(room);
  setHref("hostLink", links.host);
  setHref("guestLink", links.guest);
  document.getElementById("btnNew").onclick = ()=>{
    const r = randRoom();
    document.getElementById("room").value = r;
    const l = buildLinks(r);
    setHref("hostLink", l.host);
    setHref("guestLink", l.guest);
    toast("Nova sala gerada.");
  };
  document.getElementById("room").addEventListener("input", (e)=>{
    const r = (e.target.value || "").trim();
    if(!r) return;
    const l = buildLinks(r);
    setHref("hostLink", l.host);
    setHref("guestLink", l.guest);
  });
  document.getElementById("copyHost").onclick = ()=>copyToClipboard(document.getElementById("hostLink").href);
  document.getElementById("copyGuest").onclick = ()=>copyToClipboard(document.getElementById("guestLink").href);
  document.getElementById("copyBoth").onclick = ()=>{
    const h = document.getElementById("hostLink").href;
    const g = document.getElementById("guestLink").href;
    copyToClipboard("LINK ATENDENTE (abrir primeiro):\n" + h + "\n\nLINK ASSOCIADO:\n" + g);
  };
  document.getElementById("logout").onclick = ()=>{ clearSession(); location.href="login.html"; };
}
