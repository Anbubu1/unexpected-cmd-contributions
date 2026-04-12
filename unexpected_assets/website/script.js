document.addEventListener("DOMContentLoaded", () => {
const CMDS = [
  {"n":"autorun","c":0,"d":"Add a command to autorun on load","a":[],"g":["command","..."]},
  {"n":"unautorun","c":0,"d":"Remove an autorun command","a":[],"g":["command","..."]},
  {"n":"autoruns","c":0,"d":"List all autoruns","a":[],"g":[]},
  {"n":"plugin","c":0,"d":"Add a plugin","a":[],"g":["name"]},
  {"n":"unplugin","c":0,"d":"Remove a plugin","a":[],"g":["name"]},
  {"n":"onevent","c":0,"d":"Add an event trigger","a":[],"g":["event","filter/cmd","..."]},
  {"n":"unevent","c":0,"d":"Remove an event trigger","a":[],"g":["event","filter"]},
  {"n":"clearevents","c":0,"d":"Remove all event triggers","a":[],"g":[]},
  {"n":"events","c":0,"d":"Show events tab","a":[],"g":[]},
  {"n":"discord","c":0,"d":"Discord Server","a":[],"g":[]},
  {"n":"unexspy","c":0,"d":"Remote spy (deprecated)","a":["remotespy"],"g":[]},
  {"n":"goto","c":0,"d":"Teleport to a player","a":[],"g":["player"]},
  {"n":"noclip","c":0,"d":"Walk through walls","a":[],"g":[]},
  {"n":"unnoclip","c":0,"d":"Disable noclip","a":["clip"],"g":[]},
  {"n":"tp","c":0,"d":"Teleport to coordinates","a":[],"g":["x","y","z"]},
  {"n":"copypos","c":0,"d":"Copy position to clipboard","a":[],"g":[]},
  {"n":"fov","c":0,"d":"Set camera field of view","a":[],"g":["value"]},
  {"n":"resetfov","c":0,"d":"Reset FOV to default","a":[],"g":[]},
  {"n":"serverid","c":0,"d":"Copy server Job ID to clipboard","a":[],"g":[]},
  {"n":"ping","c":0,"d":"Show current ping","a":[],"g":[]},
  {"n":"time","c":0,"d":"Show server time","a":[],"g":[]},
  {"n":"getpos","c":0,"d":"Get a player's position","a":[],"g":["player"]},
  {"n":"version","c":0,"d":"Show current script version","a":[],"g":[]},
  {"n":"who","c":0,"d":"Show info about a player","a":[],"g":["player"]},
  {"n":"reset","c":0,"d":"Resets your character","a":[],"g":[]},
  {"n":"clearhats","c":0,"d":"Removes all hats","a":[],"g":[]},
  {"n":"pos","c":0,"d":"Prints your position","a":[],"g":[]},
  {"n":"gameid","c":0,"d":"Copy Place ID to clipboard","a":[],"g":[]},
  {"n":"playercount","c":0,"d":"Show player count","a":[],"g":[]},
  {"n":"copyname","c":0,"d":"Copy a player's username to clipboard","a":[],"g":["player"]},
  {"n":"spectate","c":0,"d":"Spectate a player","a":["spec"],"g":["player"]},
  {"n":"unspectate","c":0,"d":"Stop spectating","a":["unspec"],"g":[]},
  {"n":"platformstand","c":0,"d":"Toggles PlatformStand","a":[],"g":[]},
  {"n":"resetcam","c":0,"d":"Resets the camera to your character","a":[],"g":[]},
  {"n":"flip","c":0,"d":"Flips your character upside down","a":[],"g":[]},
  {"n":"glide","c":0,"d":"Enable glide mode","a":[],"g":[]},
  {"n":"unglide","c":0,"d":"Disable glide mode","a":[],"g":[]},
  {"n":"iceslide","c":0,"d":"Slide with low friction","a":[],"g":[]},
  {"n":"uniceslide","c":0,"d":"Restore normal friction","a":[],"g":[]},
  {"n":"walkspeed","c":0,"d":"Set walkspeed","a":[],"g":["speed"]},
  {"n":"jumppower","c":0,"d":"Set jumppower","a":[],"g":["power"]},
  {"n":"sit","c":0,"d":"Force sit","a":[],"g":[]},
  {"n":"stand","c":0,"d":"Force stand","a":["unsit"],"g":[]},
  {"n":"spin","c":0,"d":"Spin character","a":[],"g":["speed"]},
  {"n":"unspin","c":0,"d":"Stop spinning","a":[],"g":[]},
  {"n":"stun","c":0,"d":"Freeze movement (platform stand)","a":[],"g":[]},
  {"n":"unstun","c":0,"d":"Remove stun","a":[],"g":[]},
  {"n":"jump","c":0,"d":"Force jump","a":[],"g":[]},
  {"n":"state","c":0,"d":"Set humanoid state","a":[],"g":["state"]},
  {"n":"freeze","c":1,"d":"Freeze character (client)","a":[],"g":[]},
  {"n":"unfreeze","c":1,"d":"Unfreeze character (client)","a":[],"g":[]},
  {"n":"print","c":0,"d":"Print arguments","a":["echo","say"],"g":["..."]},
  {"n":"notify","c":0,"d":"Send notification","a":[],"g":["..."]},
  {"n":"cmds","c":0,"d":"Show commands UI","a":[],"g":[]},
  {"n":"rejoin","c":0,"d":"Rejoin server","a":[],"g":[]},
  {"n":"keepUX","c":0,"d":"Persist script on rejoin","a":[],"g":["true/false"]},
  {"n":"fly","c":0,"d":"Enable flying","a":[],"g":["speed"]},
  {"n":"unfly","c":0,"d":"Disable flying","a":[],"g":[]},
  {"n":"antifling","c":0,"d":"Prevent velocity flings","a":[],"g":[]},
  {"n":"unantifling","c":0,"d":"Disable antifling","a":[],"g":[]},
  {"n":"antiafk","c":0,"d":"Prevent idle kick","a":[],"g":[]},
  {"n":"execute","c":0,"d":"Execute code","a":[],"g":["..."]},
  {"n":"execmd","c":0,"d":"Execute command","a":[],"g":["command","..."]}
]
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
