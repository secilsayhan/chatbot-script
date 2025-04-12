// public/chatbot.js

(function () {
  const div = document.createElement("div");
  div.innerHTML = `
    <div id="chat" style="position:fixed;bottom:20px;right:20px;width:280px;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);font-family:sans-serif;z-index:9999;">
      <div style="background:#4F46E5;color:#fff;padding:10px;border-radius:10px 10px 0 0;">Asistan</div>
      <div id="msgs" style="padding:10px;height:150px;overflow-y:auto;font-size:14px;"></div>
      <form id="form" style="display:flex;border-top:1px solid #ccc;">
        <input id="input" style="flex:1;padding:10px;border:none;" placeholder="Yazın..."/>
        <button style="background:#4F46E5;color:white;border:none;padding:10px;">Gönder</button>
      </form>
    </div>
  `;
  document.body.appendChild(div);

  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const msgs = document.getElementById("msgs");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    msgs.innerHTML += `<div><b>Sen:</b> ${val}</div>`;
    input.value = "";
    try {
      const res = await fetch("http://localhost:5678/webhook/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: val })
      });
      const data = await res.json();
      msgs.innerHTML += `<div><b>Bot:</b> ${data.reply || "Cevap yok"}</div>`;
      msgs.scrollTop = msgs.scrollHeight;
    } catch {
      msgs.innerHTML += `<div style="color:red;">Hata oluştu</div>`;
    }
  });
})();
