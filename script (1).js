/* ===== SETTINGS: set USE_DEMO=false once the backend is live ===== */
const USE_DEMO = false;
const API_URL = "/api/explain";
/* Request : { image: base64, mimeType: "image/jpeg", language: "en" }
   Response: { title, summary, amount, deadline, deadlineISO|null, steps[], caution } */

const SAMPLES = {
  "Electricity bill": {
    title:"Electricity bill", summary:"This is your monthly power bill. You used 212 units in September.",
    amount:"₹1,840", deadline:"15 Oct 2026", deadlineISO:"2026-10-15",
    steps:["Pay ₹1,840 before 15 October.","Pay online, at the electricity office, or with the consumer number on the bill.","Keep the payment receipt safe."],
    caution:"A late payment can add a penalty, and the connection may be cut."},
  "Court notice": {
    title:"Court hearing notice", summary:"You have been asked to appear in court for a hearing in a property case.",
    amount:"No payment", deadline:"28 Oct 2026", deadlineISO:"2026-10-28",
    steps:["Note the hearing date and the court name.","Carry this notice and an ID proof.","Talk to a lawyer or legal aid centre before the date."],
    caution:"Missing a hearing can lead to a decision being made without you."},
  "Bank letter": {
    title:"Bank loan reminder", summary:"Your bank says one loan instalment is overdue and asks you to pay it soon.",
    amount:"₹6,250", deadline:"10 Oct 2026", deadlineISO:"2026-10-10",
    steps:["Check your balance and pay the ₹6,250 instalment.","Visit the branch if you think this is a mistake.","Ask for a written receipt."],
    caution:"Unpaid instalments can lower your credit score and add extra charges."}
};

const $ = id => document.getElementById(id);
const fileGallery=$("fileGallery"), fileCamera=$("fileCamera");
let imageB64=null, imageUrl=null, current=null, timer=null;

/* chips */

/* file handling */
[fileGallery,fileCamera].forEach(i=>i.addEventListener("change",e=>pick(e.target.files[0])));
const drop=$("drop");
["dragover","dragenter"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add("over")}));
["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove("over")}));
drop.addEventListener("drop",e=>pick(e.dataTransfer.files[0]));
$("rm").onclick=clearPick;

async function pick(f){
  if(!f) return; hideError();
  if(!f.type.startsWith("image/")) return showError(tr("errType"));
  try{
    const r=await compress(f,1600,.85);
    imageB64=r.b64; imageUrl=r.url; $("thumb").src=r.url; $("fname").textContent=f.name;
    $("thumbWrap").style.display="flex"; $("go").disabled=false;
  }catch{ showError(tr("errOpen")); }
}
function clearPick(){imageB64=imageUrl=null;fileGallery.value=fileCamera.value="";$("thumbWrap").style.display="none";$("go").disabled=true}
function compress(file,max,q){return new Promise((res,rej)=>{
  const img=new Image(),src=URL.createObjectURL(file);
  img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement("canvas");
    c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext("2d").drawImage(img,0,0,c.width,c.height);
    const u=c.toDataURL("image/jpeg",q);URL.revokeObjectURL(src);res({b64:u.split(",")[1],url:u})};
  img.onerror=rej;img.src=src;})}

/* run */
$("go").onclick=()=>{lastSample=-1;run(null)};
async function run(sample){
  hideError(); speechSynthesis.cancel();
  $("home").style.display="none"; $("result").style.display="none"; $("loading").style.display="block";
  const msgs=tr("msgs"); let i=0;
  $("msg").textContent=msgs[0]; timer=setInterval(()=>{$("msg").textContent=msgs[++i%msgs.length]},1400);
  window.scrollTo(0,0);
  try{
    let data;
    if(sample||USE_DEMO){ await wait(2800); data=sample||SAMPLES["Electricity bill"]; }
    else{
      const r=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({image:imageB64,mimeType:"image/jpeg",language:lang})});
      if(!r.ok) throw 0; data=await r.json();
    }
    show(data, sample?null:imageUrl);
  }catch{
    clearInterval(timer); $("loading").style.display="none"; $("home").style.display="block";
    showError(tr("errNet"));
  }
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));

function show(d,img){
  clearInterval(timer); current=d; $("loading").style.display="none";
  $("rTitle").textContent=d.title||tr("yourDoc"); $("rSummary").textContent=d.summary||"";
  $("rAmount").textContent=d.amount||tr("notMentioned"); $("rDeadline").textContent=d.deadline||tr("notMentioned");
  $("rLeft").textContent=daysLeft(d.deadlineISO);
  $("docpane").innerHTML = img ? '<img alt="Your uploaded document">' :
    '<div class="paper"><div class="t h"></div><div class="t"></div><div class="mk" style="width:50%"></div><div class="t" style="width:75%"></div><div class="t"></div><div class="mk" style="width:60%"></div><div class="t" style="width:40%"></div></div>';
  if(img) $("docpane").querySelector("img").src=img;
  const ul=$("rSteps"); ul.innerHTML="";
  (d.steps||[]).forEach(s=>{const li=document.createElement("li"),cb=document.createElement("input"),sp=document.createElement("span");
    cb.type="checkbox";sp.textContent=s;li.append(cb,sp);
    li.onclick=e=>{if(e.target!==cb)cb.checked=!cb.checked;li.classList.toggle("done",cb.checked)};ul.appendChild(li)});
  $("rCaution").textContent=d.caution||""; $("rCautionBox").style.display=d.caution?"block":"none";
  const r=$("remind");
  if(/^\d{4}-\d{2}-\d{2}$/.test(d.deadlineISO||"")){
    const n=new Date(d.deadlineISO+"T00:00:00");n.setDate(n.getDate()+1);
    r.href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent((d.title||tr("yourDoc"))+" – "+tr("remTitle"))+
      "&dates="+d.deadlineISO.replaceAll("-","")+"/"+n.toISOString().slice(0,10).replaceAll("-","");
    r.style.display="inline-block";
  }else r.style.display="none";
  $("result").style.display="block"; window.scrollTo(0,0);
}
function daysLeft(iso){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso||"")) return "";
  const t=new Date();t.setHours(0,0,0,0);const n=Math.round((new Date(iso+"T00:00:00")-t)/864e5);
  return n<0?tr("overdue",Math.abs(n)):n===0?tr("today"):n===1?tr("oneLeft"):tr("left",n);
}
$("again").onclick=()=>{speechSynthesis.cancel();$("result").style.display="none";$("home").style.display="block";clearPick();window.scrollTo(0,0)};

/* voice + copy */
function plain(){const d=current;return [d.title,d.summary,d.amount&&tr("lblAmount")+": "+d.amount,d.deadline&&tr("lblDeadline")+": "+d.deadline,
  tr("lblWhat"),...(d.steps||[]).map((s,i)=>(i+1)+". "+s),d.caution&&tr("lblWatch")+d.caution].filter(Boolean).join("\n")}
$("speak").onclick=()=>{if(!current)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(plain().replace(/\n/g,". "));u.lang=lang==="hi"?"hi-IN":"en-IN";u.rate=.95;speechSynthesis.speak(u)};
$("stop").onclick=()=>speechSynthesis.cancel();
$("copy").onclick=async()=>{try{await navigator.clipboard.writeText(plain());$("copy").textContent=tr("copied");setTimeout(()=>$("copy").textContent=tr("copy"),1800)}catch{}};

function showError(m){const e=$("error");e.textContent=m;e.style.display="block"}
function hideError(){$("error").style.display="none"}

/* ===== UPGRADE: theme, motion, progress, paste ===== */
function setTheme(t){document.documentElement.dataset.theme=t;$("theme").textContent=t==="dark"?"☀️":"🌙";try{localStorage.setItem("ks-theme",t)}catch{}}
(function(){let t;try{t=localStorage.getItem("ks-theme")}catch{}
  setTheme(t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))})();
$("theme").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");

/* paper tilts toward the pointer */
const hp=document.querySelector(".hero .paper");
if(hp&&matchMedia("(hover:hover)").matches){
  hp.parentElement.addEventListener("pointermove",e=>{const r=hp.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    hp.style.transform=`rotate(2deg) perspective(700px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`});
  hp.parentElement.addEventListener("pointerleave",()=>hp.style.transform="");
}

/* paste a screenshot with Ctrl+V */
document.addEventListener("paste",e=>{const f=[...(e.clipboardData?.files||[])].find(x=>x.type.startsWith("image/"));
  if(f&&$("home").style.display!=="none")pick(f)});

/* checklist progress + confetti */
function confetti(){const c=["#D63A2A","#FFE27A","#1B7A53","#6C8CFF","#111A3B"];
  for(let i=0;i<36;i++){const s=document.createElement("i");s.className="cf";
    s.style.cssText=`left:${50+(Math.random()-.5)*30}%;background:${c[i%5]};--x:${(Math.random()-.5)*600}px;--r:${Math.random()*720}deg;animation-delay:${Math.random()*.15}s`;
    document.body.appendChild(s);setTimeout(()=>s.remove(),1800)}}
function updateProg(celebrate){const cb=[...document.querySelectorAll("#rSteps input")],n=cb.filter(c=>c.checked).length,t=cb.length;
  $("progBar").style.width=(t?n/t*100:0)+"%";
  $("progTxt").textContent=t&&n===t?tr("allDone"):tr("stepsDone",n,t);
  if(celebrate&&t&&n===t&&!matchMedia("(prefers-reduced-motion: reduce)").matches)confetti()}
$("rSteps").addEventListener("click",()=>setTimeout(()=>updateProg(true),0));

/* replay the entrance + stamp every time a result appears */
const _show=show;
show=function(d,img){_show(d,img);updateProg();
  const r=$("result"),s=document.querySelector(".stamp");
  r.classList.remove("in");s.classList.remove("slam");void r.offsetWidth;r.classList.add("in");s.classList.add("slam")};
