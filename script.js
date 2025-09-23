
(function(){
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => Array.from(p.querySelectorAll(s));

  // Persisted settings
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedLang = localStorage.getItem('lang') || 'en';
  if(savedTheme === 'dark') document.documentElement.classList.add('dark');
  document.documentElement.setAttribute('lang', savedLang);

  // Toggle theme
  const themeBtn = $('#themeToggle');
  if(themeBtn){
    themeBtn.title = 'Toggle dark mode';
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeBtn.setAttribute('aria-pressed', String(isDark));
      themeBtn.textContent = isDark ? '☀︎' : '🌙';
    });
    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀︎' : '🌙';
    themeBtn.setAttribute('aria-pressed', String(isDark));
  }

  // Mobile menu
  const burger = $('#burger');
  const nav = $('#siteNav');
  if(burger && nav){
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      burger.setAttribute('aria-expanded', String(expanded));
    });
  }

  // Language switch
  const langButtons = $$('.lang-button');
  const setLang = (lang) => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    // Translate
    $$('.i18n').forEach(node => {
      const key = node.dataset.key;
      if(key && I18N[lang] && I18N[lang][key]) node.textContent = I18N[lang][key];
    });
  };
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  // Initialize language
  setLang(savedLang);

  // Make service cards clickable to services page anchors
  $$('.service-link').forEach(card => {
    const to = card.dataset.to;
    if(to){
      card.addEventListener('click', () => {
        window.location.href = `services.html#${to}`;
      });
    }
  });
})();

// Simple i18n dictionary
const I18N = {
  en: {
    'brand': 'A.T.R Multiservice',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',

    'hero.title': 'Professional Solutions for Cleaning, Security & Construction',
    'hero.subtitle': 'Reliable teams, clear communication, on-time delivery.',
    'hero.cta': 'Our Services',

    'home.services': 'Our Services',
    'home.cleaning.desc': 'Commercial and residential cleaning with quality control.',
    'home.security.desc': 'Guarding, monitoring and risk prevention.',
    'home.construction.desc': 'Renovation, finishing and general contracting.',
    'home.learnmore': 'Learn more →',

    'about.title': 'About A.T.R Multiservice',
    'about.body': 'We deliver practical, no‑nonsense services across cleaning, security and construction. Our approach is simple: plan clearly, execute safely, finish on time.',
    'about.values': 'What we value',
    'about.v1': 'Professional teams and clear supervision.',
    'about.v2': 'Transparent pricing and timelines.',
    'about.v3': 'Safety-first culture and quality checks.',

    'services.title': 'Services',
    'services.cleaning.title': 'Cleaning',
    'services.cleaning.body': 'Daily/periodic cleaning for offices, stores, residences; deep cleaning; post-construction cleaning.',
    'services.security.title': 'Security',
    'services.security.body': 'Static guards, patrols, access control, CCTV monitoring and incident reporting.',
    'services.construction.title': 'Construction',
    'services.construction.body': 'Fit‑out, finishing, repairs, small builds, and maintenance contracts.',

    'contact.title': 'Contact',
    'contact.email': 'Email',
    'contact.phone': 'Phone',

    'footer.copy': '© 2025 A.T.R Multiservice. All rights reserved.'
  },
  it: {
    'brand': 'A.T.R Multiservice',
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.services': 'Servizi',
    'nav.contact': 'Contatti',

    'hero.title': 'Soluzioni professionali per Pulizie, Sicurezza e Costruzioni',
    'hero.subtitle': 'Team affidabili, comunicazione chiara, consegna puntuale.',
    'hero.cta': 'I nostri servizi',

    'home.services': 'I Nostri Servizi',
    'home.cleaning.desc': 'Pulizie civili e industriali con controllo qualità.',
    'home.security.desc': 'Vigilanza, monitoraggio e prevenzione dei rischi.',
    'home.construction.desc': 'Ristrutturazioni, finiture e appalti generali.',
    'home.learnmore': 'Scopri di più →',

    'about.title': 'Chi è A.T.R Multiservice',
    'about.body': 'Offriamo servizi concreti in pulizie, sicurezza e costruzioni. Il nostro metodo è semplice: pianificare con chiarezza, operare in sicurezza, consegnare nei tempi.',
    'about.values': 'I nostri valori',
    'about.v1': 'Squadre professionali con supervisione chiara.',
    'about.v2': 'Prezzi e tempistiche trasparenti.',
    'about.v3': 'Sicurezza al primo posto e controlli qualità.',

    'services.title': 'Servizi',
    'services.cleaning.title': 'Pulizie',
    'services.cleaning.body': 'Pulizie giornaliere/periodiche per uffici, negozi, abitazioni; pulizie profonde; post-cantiere.',
    'services.security.title': 'Sicurezza',
    'services.security.body': 'Guardie fisse, pattuglie, controllo accessi, monitoraggio CCTV e reportistica.',
    'services.construction.title': 'Costruzioni',
    'services.construction.body': 'Fit‑out, finiture, riparazioni, piccoli cantieri e manutenzioni programmate.',

    'contact.title': 'Contatti',
    'contact.email': 'Email',
    'contact.phone': 'Telefono',

    'footer.copy': '© 2025 A.T.R Multiservice. Tutti i diritti riservati.'
  }
};
