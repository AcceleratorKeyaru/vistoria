
// Simple client-side auth for GitHub Pages (NOT bank-level security).
// Change credentials in this file then redeploy.
const AUTH = {
  user: "admin",
  // sha256
  hash: "c4148ff26c3e36be70a2ba29b88e9f2eb0fa8103f89b2c865f52ca5263b21b5a",
  sessionKey: "vistoria_admin_session_v1",
  ttlMs: 1000 * 60 * 60 * 8, // 8h
};

async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

function nowMs() { return Date.now(); }

function setSession() {
  const payload = {
    exp: nowMs() + AUTH.ttlMs,
    issued: nowMs(),
  };
  localStorage.setItem(AUTH.sessionKey, JSON.stringify(payload));
}

function clearSession() {
  localStorage.removeItem(AUTH.sessionKey);
}

function hasSession() {
  try {
    const raw = localStorage.getItem(AUTH.sessionKey);
    if(!raw) return false;
    const p = JSON.parse(raw);
    if(!p.exp || nowMs() > p.exp) {
      clearSession();
      return false;
    }
    return true;
  } catch(e) {
    clearSession();
    return false;
  }
}

async function login(user, pass) {
  if(!user || !pass) return false;
  const h = await sha256Hex(user + ":" + pass);
  if(user === AUTH.user && h === AUTH.hash) {
    setSession();
    return true;
  }
  return false;
}

function requireAuthOrRedirect() {
  if(!hasSession()) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    location.href = "login.html?next=" + next;
  }
}
