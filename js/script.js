const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')

document.querySelector('#button-wrapper button')?.addEventListener('click', function(e){
  e.preventDefault();
  var target = document.querySelector('#cta');
  if (!target) { console.warn('#cta not found'); return; }
  var headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
  var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  window.scrollTo({ top: top, behavior: 'smooth' });
});

// btn.addEventListener('click', () => {
//   btn.classList.toggle('open')
//   nav.classList.toggle('flex')
//   nav.classList.toggle('hidden')
// })

// const nameEl = document.getElementById("name");
// const msgEl = document.getElementById("message");
// const phoneEl = document.getElementById("phone");

// const whatsappNumber = "381621681385";

// function sanitizePhone(input) {
//   return input.replace(/\D/g, "");
// }

// document.getElementById("sendBtn").addEventListener("click", () => {
//   const userPhone = sanitizePhone(phoneEl.value);
//   const text = `Ime: ${nameEl.value}\nTelefon: ${userPhone}\nPoruka: ${msgEl.value}`;
//   const textEncoded = encodeURIComponent(text);

//   const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

//   if (isMobile) {
//     window.open(`https://wa.me/${whatsappNumber}?text=${textEncoded}`, "_blank");
//   } else {
//     window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${textEncoded}`, "_blank");
//   }
// });
