
/* Robust site script: language switching (IT/EN), dark mode, card clicks, contact form.
   This file is intentionally defensive so it still works if some DOM pieces are missing. */

(function(){
  // Languages data (concise, complete)
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
  };

  // Expose a safe API to window for inline fallbacks if needed
  window.siteAPI = {
    applyLanguage: applyLanguageSafe,
    toggleDark: toggleDarkSafe
  };

  function applyLanguageSafe(lang){
    try{
      applyLanguage(lang);
    }catch(e){
      console.error('applyLanguage failed', e);
    }
  }

  function toggleDarkSafe(){
    try{
      toggleDark();
    }catch(e){
      console.error('toggleDark failed', e);
    }
  }

  // MAIN: update DOM with selected language
  function applyLanguage(lang){
    const data = LANG[lang] || LANG.it;
    // nav links by data-key
    document.querySelectorAll('.nav-link').forEach(el=>{
      const key = el.dataset.key;
      if(key && data.nav[key]) el.textContent = data.nav[key];
    });
    // hero
    const heroTitle = document.getElementById('hero-title');
    if(heroTitle) heroTitle.textContent = data.hero.title;
    const heroDesc = document.getElementById('hero-desc');
    if(heroDesc) heroDesc.textContent = data.hero.desc;
    const heroCta = document.getElementById('hero-cta');
    if(heroCta) heroCta.textContent = data.hero.cta;

    // about
    const aboutTitle = document.getElementById('about-title');
    if(aboutTitle) aboutTitle.textContent = data.about.title;
    const aboutP1 = document.getElementById('about-p1');
    if(aboutP1) aboutP1.textContent = data.about.p1;
    const aboutP2 = document.getElementById('about-p2');
    if(aboutP2) aboutP2.textContent = data.about.p2;

    // services
    const servicesTitle = document.getElementById('services-title');
    if(servicesTitle) servicesTitle.textContent = data.services.title;
    const svc1t = document.getElementById('svc1-title');
    if(svc1t) svc1t.textContent = data.services.s1.name;
    const svc1d = document.getElementById('svc1-desc');
    if(svc1d) svc1d.textContent = data.services.s1.desc;
    const svc2t = document.getElementById('svc2-title');
    if(svc2t) svc2t.textContent = data.services.s2.name;
    const svc2d = document.getElementById('svc2-desc');
    if(svc2d) svc2d.textContent = data.services.s2.desc;
    const svc3t = document.getElementById('svc3-title');
    if(svc3t) svc3t.textContent = data.services.s3.name;
    const svc3d = document.getElementById('svc3-desc');
    if(svc3d) svc3d.textContent = data.services.s3.desc;

    // contact
    const contactTitle = document.getElementById('contact-title');
    if(contactTitle) contactTitle.textContent = data.contact.title;
    const inName = document.getElementById('input-name');
    if(inName) inName.placeholder = data.contact.placeholder_name;
    const inEmail = document.getElementById('input-email');
    if(inEmail) inEmail.placeholder = data.contact.placeholder_email;
    const inMsg = document.getElementById('input-msg');
    if(inMsg) inMsg.placeholder = data.contact.placeholder_message;
    const sendBtn = document.getElementById('send-btn');
    if(sendBtn) sendBtn.textContent = data.contact.send;

    // testimonials
    const testTitle = document.getElementById('testimonials-title');
    if(testTitle) testTitle.textContent = data.testimonials_title;

    localStorage.setItem('site_lang', lang);
  }

  function toggleDark(){
    document.body.classList.toggle('dark');
    const now = document.body.classList.contains('dark') ? '1' : '0';
    localStorage.setItem('site_dark', now);
  }

  // DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    // Apply saved or default language
    var savedLang = localStorage.getItem('site_lang') || 'it';
    applyLanguage(savedLang);

    // Attach to language buttons (data-lang)
    document.querySelectorAll('[data-lang]').forEach(btn=>{
      btn.addEventListener('click', function(e){
        var L = btn.getAttribute('data-lang');
        if(L) applyLanguage(L);
      });
    });

    // Dark mode toggle
    var darkToggle = document.getElementById('dark-toggle');
    var savedDark = localStorage.getItem('site_dark') === '1';
    if(savedDark) document.body.classList.add('dark');
    if(darkToggle){
      darkToggle.addEventListener('click', function(){ toggleDark(); });
    }

    // Make .card clickable (go to services)
    document.querySelectorAll('.card').forEach(card=>{
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(){ window.location.href = 'services.html'; });
    });

    // Contact form
    var contactForm = document.getElementById('contact-form');
    if(contactForm){
      contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        alert( (localStorage.getItem('site_lang') === 'en') ? 'Thank you! Message sent (demo).' : 'Grazie! Il tuo messaggio è stato inviato (simulazione).' );
        contactForm.reset();
      });
    }
  });
})(); 
