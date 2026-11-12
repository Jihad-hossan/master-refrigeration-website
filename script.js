// Language toggle: elements carry data-bn (Bangla text); their original text is English.
(function () {
  var root = document.documentElement;
  var nodes = document.querySelectorAll('[data-bn]');
  nodes.forEach(function (n) { n.dataset.en = n.innerHTML; });

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    nodes.forEach(function (n) { n.innerHTML = lang === 'bn' ? n.dataset.bn : n.dataset.en; });
    document.querySelectorAll('[data-bn-ph]').forEach(function (n) {
      if (!n.dataset.enPh) n.dataset.enPh = n.placeholder;
      n.placeholder = lang === 'bn' ? n.dataset.bnPh : n.dataset.enPh;
    });
    document.querySelectorAll('.lang').forEach(function (b) { b.textContent = lang === 'bn' ? 'English' : 'বাংলা'; });
    try { localStorage.setItem('mr-lang', lang); } catch (e) {}
  }

  var saved = 'bn';
  try { saved = localStorage.getItem('mr-lang') || 'bn'; } catch (e) {}
  apply(saved);

  document.querySelectorAll('.lang').forEach(function (b) {
    b.addEventListener('click', function () {
      apply(root.getAttribute('data-lang') === 'bn' ? 'en' : 'bn');
    });
  });

  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.addEventListener('click', function () { menu.classList.remove('open'); });
  }

  // Demo form: nothing is sent anywhere. It opens the phone dialer with the number.
  var form = document.querySelector('#request');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.note');
      msg.textContent = root.getAttribute('data-lang') === 'bn'
        ? 'ডেমো ফর্ম: এখনো কোথাও পাঠানো হচ্ছে না। সরাসরি কল করুন 01776598728 নম্বরে।'
        : 'Demo form: not connected yet. Please call 01776598728 directly.';
      msg.style.color = '#0f9d8a';
    });
  }
})();
