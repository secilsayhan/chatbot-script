<script>
  window.onload = () => {
    const chatHTML = `
      <div id="chat-widget" style="position: fixed; bottom: 20px; right: 20px; width: 300px; background: white; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); font-family: sans-serif; z-index:9999;">
        <div style="background: #4F46E5; color: white; padding: 10px; border-radius: 10px 10px 0 0;">Asistan</div>
        <div id="chat-messages" style="padding: 10px; height: 200px; overflow-y: auto; font-size: 14px;"></div>
        <form id="chat-form" style="display: flex; border-top: 1px solid #ccc;">
          <input type="text" id="chat-input" placeholder="Yazın..." style="flex:1; border:none; padding:10px;" />
          <button type="submit" style="background: #4F46E5; color: white; border:none; padding: 10px 15px;">Gönder</button>
        </form>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = chatHTML;
    document.body.appendChild(div);

    const form = document.getElementById('chat-form');
    if (!form) {
      console.error("chat-form bulunamadı!");
      return;
    }

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const msg = input.value.trim();
      if (!msg) return;

      const messages = document.getElementById('chat-messages');
      messages.innerHTML += `<div><strong>Sen:</strong> ${msg}</div>`;
      input.value = '';

      try {
        const res = await fetch('http://localhost:5678/webhook/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg })
        });
        const data = await res.json();
        messages.innerHTML += `<div><strong>Bot:</strong> ${data.reply || 'Cevap alınamadı'}</div>`;
        messages.scrollTop = messages.scrollHeight;
      } catch (err) {
        messages.innerHTML += `<div style="color:red;">Hata oluştu.</div>`;
      }
    });
  };
</script>
