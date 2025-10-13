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

// Fixed recipient numbers (international, no +)
const whatsappNumber = "381621681385";
const viberNumber = "381621681385";

// Function to clean user phone input
function sanitizePhone(input) {
  return input.replace(/\D/g, "");
}

// WhatsApp
document.getElementById("sendWhatsApp").addEventListener("click", () => {
  const userPhone = sanitizePhone(phoneEl.value);
  const text = encodeURIComponent(
    `Ime: ${nameEl.value}\nTelefon: ${userPhone}\nPoruka: ${msgEl.value}`
  );
  window.open(
    `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`,
    "_blank"
  );
});

// Viber
document.getElementById("sendViber").addEventListener("click", () => {
  const userPhone = sanitizePhone(phoneEl.value);
  const text = encodeURIComponent(
    `Ime: ${nameEl.value}\nTelefon: ${userPhone}\nPoruka: ${msgEl.value}`
  );
  window.location.href = `viber://chat?number=%2B${viberNumber}&text=${text}`;
});

