
(function(){
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu){
    toggle.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  // Simple slider
  var slider = document.querySelector('[data-slider]');
  if (!slider) return;
  var slides = Array.from(slider.querySelectorAll('.slide'));
  var dots = Array.from(document.querySelectorAll('.slider-controls .dots button'));
  var prev = document.querySelector('.slider-controls .prev');
  var next = document.querySelector('.slider-controls .next');
  var idx = 0;

  function show(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach((s,k)=> s.classList.toggle('active', k===idx));
    dots.forEach((d,k)=> d.setAttribute('aria-selected', k===idx ? 'true':'false'));
  }
  prev && prev.addEventListener('click', ()=> show(idx-1));
  next && next.addEventListener('click', ()=> show(idx+1));
  dots.forEach((d,k)=> d.addEventListener('click', ()=> show(k)));

  var touchStartX = 0;
  slider.addEventListener('touchstart', function(e){ touchStartX = e.touches[0].clientX; }, {passive:true});
  slider.addEventListener('touchend', function(e){
    var delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) show(delta < 0 ? idx+1 : idx-1);
  }, {passive:true});

  show(0);
})();
