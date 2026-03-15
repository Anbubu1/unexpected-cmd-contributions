document.addEventListener("DOMContentLoaded", () => {
const CMDS = [
  {n:"plugin",        c:0, d:"Add a plugin",                            a:[],             g:["name"]},
  {n:"unplugin",      c:0, d:"Remove a plugin",                         a:[],             g:["name"]},
  {n:"discord",       c:0, d:"Discord Server",                          a:[],             g:[]},
  {n:"unexspy",       c:0, d:"Remote spy (deprecated)",                 a:["remotespy"],  g:[]},
  {n:"goto",          c:0, d:"Teleport to a player",                    a:[],             g:["playerName"]},
  {n:"noclip",        c:0, d:"Walk through walls",                      a:[],             g:[]},
  {n:"unnoclip",      c:0, d:"Disable noclip",                          a:["clip"],       g:[]},
  {n:"reset",         c:0, d:"Resets your character",                   a:[],             g:[]},
  {n:"clearhats",     c:0, d:"Removes all hats",                        a:[],             g:[]},
  {n:"pos",           c:0, d:"Prints your position",                    a:[],             g:[]},
  {n:"platformstand", c:0, d:"Toggles PlatformStand",                   a:[],             g:[]},
  {n:"resetcam",      c:0, d:"Resets the camera to your character",     a:[],             g:[]},
  {n:"flip",          c:0, d:"Flips your character upside down",        a:[],             g:[]},
  {n:"glide",         c:0, d:"Enable glide mode",                       a:[],             g:[]},
  {n:"unglide",       c:0, d:"Disable glide mode",                      a:[],             g:[]},
  {n:"iceslide",      c:0, d:"Slide around with low friction",          a:[],             g:[]},
  {n:"uniceslide",    c:0, d:"Restore normal walking friction",         a:[],             g:[]},
  {n:"walkspeed",     c:0, d:"Set your walkspeed",                      a:[],             g:["speed"]},
  {n:"jumppower",     c:0, d:"Set your jumppower",                      a:[],             g:["power"]},
  {n:"sit",           c:0, d:"Force sit",                               a:[],             g:[]},
  {n:"stand",         c:0, d:"Force stand",                             a:["unsit"],      g:[]},
  {n:"spin",          c:0, d:"Spin your character",                     a:[],             g:["speed"]},
  {n:"unspin",        c:0, d:"Stop spinning your character",            a:[],             g:[]},
  {n:"stun",          c:0, d:"Freezes your character (PlatformStand)",  a:[],             g:[]},
  {n:"unstun",        c:0, d:"Remove fake stun",                        a:[],             g:[]},
  {n:"jump",          c:0, d:"Forces local jump",                       a:[],             g:[]},
  {n:"state",         c:0, d:"Set HumanoidState",                       a:[],             g:[]},
  {n:"freeze",        c:1, d:"Freeze character",                        a:[],             g:[]},
  {n:"unfreeze",      c:1, d:"Unfreeze your character",                 a:[],             g:[]},
  {n:"print",         c:0, d:"Prints all arguments",                    a:["echo","say"], g:["..."]},
  {n:"notify",        c:0, d:"Notify all arguments",                    a:[],             g:["..."]},
  {n:"cmds",          c:0, d:"Shows commands",                          a:[],             g:[]},
  {n:"rejoin",        c:0, d:"Rejoins the current server",              a:[],             g:[]},
  {n:"keepUX",        c:0, d:"Keep unexpected running even on rejoin",  a:[],             g:["true/false"]},
  {n:"fly",           c:0, d:"Enable flying",                           a:[],             g:["speed"]},
  {n:"unfly",         c:0, d:"Disable flying",                          a:[],             g:[]},
  {n:"antifling",     c:0, d:"Stops flings via velocity detection",     a:[],             g:[]},
  {n:"unantifling",   c:0, d:"Disables fling protection",               a:[],             g:[]},
  {n:"bang",          c:0, d:"Bang someone",                            a:[],             g:[]},
  {n:"unbang",        c:0, d:"Stop banging",                            a:[],             g:[]},
  {n:"antiafk",       c:0, d:"Never get kicked for being AFK",          a:[],             g:[]},
  {n:"execute",       c:0, d:"Execute code",                            a:[],             g:[]},
];
 
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
let filter = "all";
const tb = document.getElementById("tb");
 
CMDS.forEach((cmd, i) => {
  const tr = document.createElement("tr");
  tr.dataset.n = cmd.n.toLowerCase();
  tr.dataset.a = cmd.a.join(" ").toLowerCase();
  tr.dataset.g = cmd.g.join(" ").toLowerCase();
  tr.dataset.d = cmd.d.toLowerCase();
  tr.dataset.c = cmd.c;
  tr.style.animationDelay = Math.min(i * 11, 200) + "ms";
 
  const badge   = cmd.c ? `<span class="cl">client</span>` : "";
  const aliases = cmd.a.length ? `<div class="tags">${cmd.a.map(x=>`<span class="tag ta">${esc(x)}</span>`).join("")}</div>` : `<span class="tn">—</span>`;
  const args    = cmd.g.length ? `<div class="tags">${cmd.g.map(x=>`<span class="tag tg">[${esc(x)}]</span>`).join("")}</div>` : `<span class="tn">—</span>`;
 
  tr.innerHTML = `
    <td><div class="cc"><span class="cn">${esc(cmd.n)}</span>${badge}</div></td>
    <td><span class="desc">${esc(cmd.d)}</span></td>
    <td>${aliases}</td>
    <td>${args}</td>`;
  tb.appendChild(tr);
});
 
document.getElementById("ct").textContent = CMDS.length;
 
function upd(animate) {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const rows = Array.from(document.querySelectorAll("#tb tr"));
 
  const isVisible = tr => {
    const mq = !q || tr.dataset.n.includes(q) || tr.dataset.a.includes(q) || tr.dataset.g.includes(q) || tr.dataset.d.includes(q);
    const mf = filter === "all" ? true : filter === "client" ? tr.dataset.c === "1" : true;
    return mq && mf;
  };
 
  rows.forEach(tr => {
    tr.classList.toggle("h", !isVisible(tr));
    tr.classList.remove("hiding");
  });
 
  if (animate) {
    rows.filter(tr => !tr.classList.contains("h")).forEach((tr, i) => {
      tr.style.animation = "none";
      tr.offsetHeight;
      tr.style.animation = "";
      tr.style.animationDelay = i * 18 + "ms";
      tr.style.animationName = "fadeUp";
      tr.style.animationDuration = "0.14s";
      tr.style.animationFillMode = "both";
    });
  }
 
  const shown = rows.filter(tr => !tr.classList.contains("h")).length;
  document.getElementById("cs").textContent = shown;
  document.getElementById("es").style.display = shown === 0 ? "block" : "none";
}
 
document.getElementById("q").addEventListener("input", () => upd(false));
document.querySelectorAll(".fb").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".fb").forEach(x => x.classList.remove("on"));
  b.classList.add("on");
  filter = b.dataset.f;
  upd(true);
}));
 
upd(false);
});