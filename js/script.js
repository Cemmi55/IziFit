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

// Fixed number for WhatsApp
const whatsappNumber = "381621681385";

// Clean user input
function sanitizePhone(input) {
  return input.replace(/\D/g, "");
}

document.getElementById("sendBtn").addEventListener("click", () => {
  const userPhone = sanitizePhone(phoneEl.value);
  const text = `Ime: ${nameEl.value}\nTelefon: ${userPhone}\nPoruka: ${msgEl.value}`;
  const textEncoded = encodeURIComponent(text);

  // Detect mobile
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (isMobile) {
    // Open WhatsApp app on mobile
    window.open(`https://wa.me/${whatsappNumber}?text=${textEncoded}`, "_blank");
  } else {
    // Open WhatsApp Web on desktop
    window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${textEncoded}`, "_blank");
  }
});
