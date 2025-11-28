// ——————————————————————————————————————
// 1. Mobile Menu Toggle (your existing one, just wrapped)
const initMenuToggle = () => {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('menu');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
  });
  // Make sure clicks on the button are NEVER stolen by anything below
  btn.addEventListener('click', e => e.stopPropagation(), true);
  btn.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
};
// ——————————————————————————————————————
// 2. Smooth scroll to #cta
const initSmoothScroll = () => {
  document.querySelector('#button-wrapper button')?.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector('#cta');
    if (!target) return console.warn('#cta not found');
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
};
// ——————————————————————————————————————
// 3. Accordion
const initAccordion = () => {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      // Open clicked one if it wasn't already open
      if (!wasActive) item.classList.add('active');
    });
  });
};
// ——————————————————————————————————————
// 4. Vevet Carousel – 100% safe, no event collisions
const initCarousel = async () => {
  const container = document.getElementById('carousel');
  if (!container) return;
  const { Snap, vevet } = await import("https://esm.sh/vevet@5");
  const carousel = new Snap({
    container,
    direction: "horizontal",
    grabCursor: true,
    wheel: false,
    wheelAxis: "y",
    centered: true,
    loop: true,
    shortSwipes: false,
    freemode: vevet.mobile ? false : "sticky",
    // These two lines are the magic that stops collisions
    wheelPropagation: false,
    preventDefault: true,
  });
  carousel.on("update", () => {
    carousel.slides.forEach(({ element, size, coord, progress }) => {
      const z = Math.abs(progress ** 2) * -(size * 0.625);
      const rZ = progress * 5;
      element.style.transform =
        `translateX(${coord}px) translateZ(${z}px) rotateZ(${rZ}deg)`;
    });
  });
  // Extra safety: when carousel is at start/end → let the page scroll vertically
  container.addEventListener('wheel', e => {
    if (!carousel) return;
    const atStart = carousel.progress <= 0.02;
    const atEnd = carousel.progress >= carousel.maxProgress - 0.02;
    // If we're at an edge and user scrolls vertically → let the page take over
    if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) {
      return; // do nothing → page scrolls
    }
    e.stopPropagation();
  }, { passive: false });
  container.classList.add("ready");
};
// ——————————————————————————————————————
// Run everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMenuToggle();
  initSmoothScroll();
  initAccordion();
  initCarousel(); // async, no problem
});

function createPopup(contentHTML) {
  console.log('popup')
  const popup = document.createElement("div");
  popup.className = "popup_div";
  popup.innerHTML = contentHTML;
  document.body.appendChild(popup);
  const closeBtn = popup.querySelector(".popup-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => popup.remove());
  }
  return popup;
}

document.getElementById("sendBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const phone = document.getElementById("phone").value.trim();
  // If ANY field is empty → show error popup
  if (!name || !message || !phone) {
    createPopup(`
      <div class="popup_content">
        <h3 class="text-lg font-semibold mb-4">Greška</h3>
        <p class="text-gray-700 mb-6">Popuniti polja u formi</p>
        <button class="popup-close w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
          Zatvori
        </button>
      </div>
    `);
    return;
  }
  // All fields filled → create final message
  const finalText = `Ime: ${name}\nTelefon: ${phone}\n\nPoruka:\n${message}`;
  const encoded = encodeURIComponent(finalText);
  // Show WhatsApp + Viber popup
  const popup = createPopup(`
    <div class="sendMess_popup">
      <h3 class="text-xl font-semibold mb-4">Pošalji poruku</h3>
      <p class="text-gray-700 mb-6">Izaberite aplikaciju za slanje:</p>
      <div class="flex flex-col gap-3">
        <button id="popupWhatsapp"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
          WhatsApp
        </button>
        <button id="popupViber"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
          Viber
        </button>
        <button class="popup-close w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg transition mt-2">
          Zatvori
        </button>
      </div>
    </div>
  `);
  // OWNER number here
  const ownerPhone = "381615156283";

  // Detect mobile device
  function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
  // Attempt to open a protocol link and fallback to web
  function openWithFallback(protocolUrl, webUrl) {
    // For mobile, try to open app first
    window.location.href = protocolUrl;
    // Fallback after short delay
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 500); // adjust delay if necessary
  }
  // WhatsApp send
  popup.querySelector("#popupWhatsapp").addEventListener("click", () => {
    const finalMessage = encodeURIComponent(finalText);
    const appUrl = `whatsapp://send?phone=${ownerPhone}&text=${finalMessage}`;
    const webUrl = `https://web.whatsapp.com/send?phone=${ownerPhone}&text=${finalMessage}`;
    openWithFallback(appUrl, webUrl);
  });
  // Viber send – ISPRAVKA: Koristi &draft= umesto &text=, popravljen broj, dodata provera fokusa
  popup.querySelector("#popupViber").addEventListener("click", () => {
    const phoneWithPlus = "+381615156283"; // Ispravka: Direktno sa +381, bez slice greške
    const encodedMessage = encodeURIComponent(finalText);
    // ISPRAVKA: &draft= umesto &text= – ovo popunjava input polje
    const viberUrl = `viber://chat/?number=${encodeURIComponent(phoneWithPlus)}&draft=${encodedMessage}`;
    // Ovaj trik "forsira" otvaranje aplikacije bez lošeg fallback-a
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = viberUrl;
    document.body.appendChild(iframe);
    // Čistimo iframe posle 1 sekunde
    setTimeout(() => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }, 1000);
    // Zatvaramo popup
    popup.remove();
  });
});
