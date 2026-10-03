/* ===== Language support (English / हिंदी). Loaded before script.js ===== */
const I18N = {
  en: {
    title: "Kagaz Saathi – Understand any official paper in seconds",
    brand: "Kagaz Saathi", mark: "K", remTitle: "deadline",
    pill: "Free · No sign-up",
    h1: "Understand any official paper in seconds.",
    lead: "Bills, notices, forms, letters. Take a photo and get what it is, what you owe, the deadline, and exactly what to do next.",
    drop1: "Drop a photo here", drop2: "or choose one from your phone or computer",
    remove: "Remove", camera: "📷 Take photo", gallery: "🖼 Choose file", go: "Explain this document",
    samples: "No document handy? Try a sample:",
    trust: "🔒 Your photo is used only to read it. We don't keep it.",
    tagA: "Amount due: ₹1,840", tagB: "Pay by 15 Oct", tagC: "✓ In plain English",
    howH: "How it works",
    s1t: "Snap it", s1d: "Take a photo or upload one. A little blur is fine.",
    s2t: "We read it", s2d: "AI finds the amounts, dates and what's being asked of you.",
    s3t: "You know what to do", s3d: "Get a checklist, hear it read aloud, set a reminder.",
    again: "← Scan another document", stamp: "EXPLAINED",
    lblAmount: "Amount", lblDeadline: "Deadline", todoH: "What you need to do", watch: "Watch out",
    speak: "🔊 Read aloud", stop: "Stop", remind: "📅 Remind me", copy: "Copy summary", copied: "Copied ✓",
    disclaimer: "Kagaz Saathi helps you understand a document. For payments or legal decisions, confirm with the issuing office.",
    footer: "Kagaz Saathi · Built for Hacktoberfest 2026 Hack Day · Open source",
    msgs: ["Reading your document…", "Finding amounts and dates…", "Writing it in plain English…"],
    errType: "Please choose a photo (JPG or PNG).",
    errOpen: "We couldn't open that photo. Try another one.",
    errNet: "We couldn't get an answer just now. Check your internet and try again.",
    yourDoc: "Your document", notMentioned: "Not mentioned",
    overdue: n => n + " days overdue", today: "Due today", oneLeft: "1 day left", left: n => n + " days left",
    allDone: "All done. Nice work! 🎉", stepsDone: (n, t) => n + " of " + t + " steps done",
    lblWhat: "What to do:", lblWatch: "Watch out: ",
  },
  hi: {
    title: "कागज़ साथी – कोई भी सरकारी कागज़, पल भर में समझिए",
    brand: "कागज़ साथी", mark: "क", remTitle: "आख़िरी तारीख़",
    pill: "मुफ़्त · साइन-अप नहीं",
    h1: "कोई भी सरकारी कागज़, पल भर में समझिए।",
    lead: "बिल, नोटिस, फ़ॉर्म, चिट्ठी – बस फ़ोटो लीजिए। पता चलेगा कि यह क्या है, कितना पैसा देना है, आख़िरी तारीख़ क्या है और आगे क्या करना है।",
    drop1: "यहाँ फ़ोटो डालिए", drop2: "या अपने फ़ोन या कंप्यूटर से चुनिए",
    remove: "हटाइए", camera: "📷 फ़ोटो खींचिए", gallery: "🖼 फ़ाइल चुनिए", go: "इस कागज़ को समझाइए",
    samples: "कागज़ पास में नहीं है? नमूना देखिए:",
    trust: "🔒 आपकी फ़ोटो सिर्फ़ पढ़ने के लिए इस्तेमाल होती है। हम उसे रखते नहीं।",
    tagA: "देना है: ₹1,840", tagB: "15 अक्टूबर तक भरें", tagC: "✓ आसान भाषा में",
    howH: "यह कैसे काम करता है",
    s1t: "फ़ोटो लीजिए", s1d: "फ़ोटो खींचिए या अपलोड कीजिए। थोड़ी धुंधली भी चलेगी।",
    s2t: "हम पढ़ते हैं", s2d: "AI रकम, तारीख़ और आपसे क्या माँगा गया है, यह ढूँढता है।",
    s3t: "आपको पता चल जाता है", s3d: "करने की सूची पाइए, बोलकर सुनिए, रिमाइंडर लगाइए।",
    again: "← दूसरा कागज़ देखिए", stamp: "समझा दिया",
    lblAmount: "रकम", lblDeadline: "आख़िरी तारीख़", todoH: "आपको क्या करना है", watch: "ध्यान रखिए",
    speak: "🔊 सुनाइए", stop: "रोकिए", remind: "📅 याद दिलाइए", copy: "सार कॉपी कीजिए", copied: "कॉपी हो गया ✓",
    disclaimer: "कागज़ साथी सिर्फ़ कागज़ समझने में मदद करता है। पैसे या कानूनी फ़ैसले से पहले संबंधित दफ़्तर से पक्का कर लीजिए।",
    footer: "कागज़ साथी · Hacktoberfest 2026 Hack Day के लिए बना · ओपन सोर्स",
    msgs: ["आपका कागज़ पढ़ रहे हैं…", "रकम और तारीख़ ढूँढ रहे हैं…", "आसान हिंदी में लिख रहे हैं…"],
    errType: "कृपया फ़ोटो चुनिए (JPG या PNG)।",
    errOpen: "यह फ़ोटो खुल नहीं पाई। कृपया दूसरी फ़ोटो चुनिए।",
    errNet: "अभी जवाब नहीं मिल पाया। इंटरनेट देखिए और फिर कोशिश कीजिए।",
    yourDoc: "आपका कागज़", notMentioned: "कागज़ में नहीं लिखा",
    overdue: n => n + " दिन निकल चुके", today: "आज ही आख़िरी दिन है", oneLeft: "1 दिन बाकी", left: n => n + " दिन बाकी",
    allDone: "सब हो गया। शाबाश! 🎉", stepsDone: (n, t) => t + " में से " + n + " काम हो गए",
    lblWhat: "करने के काम:", lblWatch: "ध्यान रखिए: ",
  },
};

const SAMPLES_HI = {
  "बिजली का बिल": {
    title: "बिजली का बिल", summary: "यह आपके घर का महीने का बिजली बिल है। सितंबर में आपने 212 यूनिट बिजली जलाई।",
    amount: "₹1,840", deadline: "15 अक्टूबर 2026", deadlineISO: "2026-10-15",
    steps: ["15 अक्टूबर से पहले ₹1,840 जमा करें।", "बिजली दफ़्तर में, ऑनलाइन, या बिल पर लिखे उपभोक्ता नंबर से भुगतान करें।", "भुगतान की रसीद संभालकर रखें।"],
    caution: "देर से भुगतान करने पर जुर्माना लग सकता है और कनेक्शन कट सकता है।" },
  "कोर्ट का नोटिस": {
    title: "कोर्ट में पेशी का नोटिस", summary: "आपको संपत्ति के एक मामले की सुनवाई के लिए कोर्ट में बुलाया गया है।",
    amount: "कोई भुगतान नहीं", deadline: "28 अक्टूबर 2026", deadlineISO: "2026-10-28",
    steps: ["सुनवाई की तारीख़ और कोर्ट का नाम लिख लें।", "यह नोटिस और अपना पहचान पत्र साथ ले जाएँ।", "तारीख़ से पहले किसी वकील या कानूनी सहायता केंद्र से बात करें।"],
    caution: "सुनवाई में न पहुँचने पर आपके बिना ही फ़ैसला हो सकता है।" },
  "बैंक का पत्र": {
    title: "बैंक लोन की याद दिलाने वाला पत्र", summary: "बैंक कह रहा है कि आपकी लोन की एक किस्त बाकी है और उसे जल्दी भरना है।",
    amount: "₹6,250", deadline: "10 अक्टूबर 2026", deadlineISO: "2026-10-10",
    steps: ["अपना बैलेंस देखें और ₹6,250 की किस्त जमा करें।", "अगर आपको गलती लगती है तो बैंक शाखा में जाएँ।", "रसीद लिखित में माँगें।"],
    caution: "किस्त न भरने पर क्रेडिट स्कोर गिर सकता है और अतिरिक्त शुल्क लग सकता है।" },
};

let lang = "en", lastSample = -1;
try { lang = localStorage.getItem("ks-lang") || ""; } catch {}
if (lang !== "en" && lang !== "hi") lang = (navigator.language || "").toLowerCase().startsWith("hi") ? "hi" : "en";

function tr(key, ...a) {
  const v = (I18N[lang] || I18N.en)[key];
  return typeof v === "function" ? v(...a) : v;
}
const samples = () => (lang === "hi" ? SAMPLES_HI : SAMPLES);

function applyLang() {
  document.documentElement.lang = lang;
  document.title = tr("title");
  document.querySelectorAll("[data-i]").forEach(e => { e.textContent = tr(e.dataset.i); });
  document.querySelectorAll(".seg button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.l === lang)));
}

function buildChips() {
  const box = document.getElementById("chips"); box.innerHTML = "";
  Object.keys(samples()).forEach((k, i) => {
    const b = document.createElement("button"); b.className = "chip"; b.type = "button"; b.textContent = k;
    b.onclick = () => { lastSample = i; run(samples()[k]); };
    box.appendChild(b);
  });
}

function setLang(l) {
  if (l === lang) return;
  lang = l; try { localStorage.setItem("ks-lang", l); } catch {}
  applyLang(); buildChips();
  // If a result is on screen, show it again in the new language
  if (document.getElementById("result").style.display === "block") {
    if (lastSample >= 0) run(samples()[Object.keys(samples())[lastSample]]);
    else if (imageB64) run(null);
  }
}

document.addEventListener("DOMContentLoaded", () => { applyLang(); buildChips(); });
