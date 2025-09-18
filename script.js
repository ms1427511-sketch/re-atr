
const LANG = {
  it: {
    nav: { home: "Home", about: "Chi siamo", services: "I nostri servizi", contact: "Contatti" },
    hero: { title: "A.T.R Multiservice — Soluzioni professionali per ogni esigenza", desc: "Servizi di sicurezza, manutenzione e consulenza su misura per aziende e privati. Affidabilità e professionalità al tuo servizio." , cta: "I nostri servizi" },
    about: { title: "Chi siamo", p1: "A.T.R Multiservice è una società dedicata a fornire servizi integrati di alta qualità. Qui puoi mettere una descrizione estesa: la storia dell'azienda, i valori, la missione e i servizi principali. Questo è un placeholder che puoi modificare facilmente.", p2: "Missione: Fornire soluzioni affidabili e su misura." },
    services: { title: "I nostri servizi", s1: {name: "Sicurezza & Sorveglianza", desc: "Installazione e monitoraggio di sistemi di videosorveglianza e sicurezza."}, s2: {name: "Manutenzione & Riparazioni", desc: "Interventi rapidi e programmati per impianti e strutture."}, s3: {name: "Consulenza", desc: "Analisi e consulenza specialistica per migliorare efficienza e sicurezza."} },
    contact: { title: "Contattaci", placeholder_name: "Il tuo nome", placeholder_email: "La tua email", placeholder_message: "Il tuo messaggio", send: "Invia" },
    testimonials_title: "Cosa dicono di noi"
  },
  en: {
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact" },
    hero: { title: "A.T.R Multiservice — Professional solutions for every need", desc: "Security, maintenance and consulting services tailored for companies and individuals. Reliability and professionalism at your service.", cta: "Our Services" },
    about: { title: "About us", p1: "A.T.R Multiservice is dedicated to delivering integrated, high-quality services. Put extended description here: company history, values, mission and main services. This is a placeholder you can edit easily.", p2: "Mission: Delivering reliable, tailored solutions." },
    services: { title: "Our Services", s1: {name: "Security & Surveillance", desc: "Installation and monitoring of CCTV and security systems."}, s2: {name: "Maintenance & Repairs", desc: "Fast and scheduled interventions for systems and structures."}, s3: {name: "Consulting", desc: "Specialist analysis and consultancy to improve efficiency and safety."} },
    contact: { title: "Contact us", placeholder_name: "Your name", placeholder_email: "Your email", placeholder_message: "Your message", send: "Send" },
    testimonials_title: "What clients say"
  }
}

function applyLanguage(lang){
  const data = LANG[lang] || LANG.it;
  // nav
  document.querySelectorAll('.nav-link').forEach(el=>{
    const key = el.dataset.key;
    el.textContent = data.nav[key];
  });
  // hero
  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-desc').textContent = data.hero.desc;
  document.getElementById('hero-cta').textContent = data.hero.cta;
  // about
  document.getElementById('about-title').textContent = data.about.title;
  document.getElementById('about-p1').textContent = data.about.p1;
  document.getElementById('about-p2').textContent = data.about.p2;
  // services
  document.getElementById('services-title').textContent = data.services.title;
  document.getElementById('svc1-title').textContent = data.services.s1.name;
  document.getElementById('svc1-desc').textContent = data.services.s1.desc;
  document.getElementById('svc2-title').textContent = data.services.s2.name;
  document.getElementById('svc2-desc').textContent = data.services.s2.desc;
  document.getElementById('svc3-title').textContent = data.services.s3.name;
  document.getElementById('svc3-desc').textContent = data.services.s3.desc;
  // contact
  document.getElementById('contact-title').textContent = data.contact.title;
  document.getElementById('input-name').placeholder = data.contact.placeholder_name;
  document.getElementById('input-email').placeholder = data.contact.placeholder_email;
  document.getElementById('input-msg').placeholder = data.contact.placeholder_message;
  document.getElementById('send-btn').textContent = data.contact.send;
  // testimonials
  document.getElementById('testimonials-title').textContent = data.testimonials_title;
  // persist
  localStorage.setItem('site_lang', lang);
}

document.addEventListener('DOMContentLoaded', ()=>{
  // Default language: Italian
  const saved = localStorage.getItem('site_lang') || 'it';
  applyLanguage(saved);

  // language buttons
  document.querySelectorAll('[data-lang]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const lang = btn.dataset.lang;
      applyLanguage(lang);
    });
  });

  // dark mode toggle
  const darkToggle = document.getElementById('dark-toggle');
  const isDark = localStorage.getItem('site_dark') === '1';
  if(isDark) document.body.classList.add('dark');
  darkToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    const now = document.body.classList.contains('dark') ? '1' : '0';
    localStorage.setItem('site_dark', now);
  });

  // make service cards clickable to services page
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', ()=>{
      window.location.href = 'services.html';
    });
  });

  // simple contact form submit handler
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Grazie! Il tuo messaggio è stato inviato (simulazione).');
      contactForm.reset();
    });
  }
});
