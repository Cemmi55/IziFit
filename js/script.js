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

// Fixed WhatsApp number for desktop fallback
const whatsappNumber = "381621681385";

// Clean user input
function sanitizePhone(input) {
  return input.replace(/\D/g, "");
}

document.getElementById("sendBtn").addEventListener("click", async () => {
  const userPhone = sanitizePhone(phoneEl.value);
  const message = `Ime: ${nameEl.value}\nTelefon: ${userPhone}\nPoruka: ${msgEl.value}`;

  if (navigator.share) {
    // Mobile: system share sheet
    try {
      await navigator.share({
        title: "Kontaktiraj Nas",
        text: message
      });
      console.log("Share successful");
    } catch (err) {
      console.error("Share failed:", err);
    }
  } else {
    // Desktop: open WhatsApp Web
    const textEncoded = encodeURIComponent(message);
    window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${textEncoded}`, "_blank");
  }
});




