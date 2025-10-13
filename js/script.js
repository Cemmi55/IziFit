const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')

// btn.addEventListener('click', () => {
//   btn.classList.toggle('open')
//   nav.classList.toggle('flex')
//   nav.classList.toggle('hidden')
// })

const nameEl = document.getElementById("name");
const msgEl = document.getElementById("message");
const phoneEl = document.getElementById("phone");

// Fixed numbers for WhatsApp / Viber
const whatsappNumber = "381621681385";
const viberNumber = "381621681385";

// Clean user input
function sanitizePhone(input) {
  return input.replace(/\D/g, "");
}

document.getElementById("sendBtn").addEventListener("click", () => {
  const userPhone = sanitizePhone(phoneEl.value);
  const text = `Ime: ${nameEl.value}\nTelefon: ${userPhone}\nPoruka: ${msgEl.value}`;
  const textEncoded = encodeURIComponent(text);

      // Desktop WhatsApp Web
      window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${textEncoded}`, "_blank");
    
});





