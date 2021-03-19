document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this._observers = [];
    
    this._Init();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _Init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper-container');
    this._scrollInit();
  }
  _textAnimation(el, isIntersecting) {
    if (isIntersecting) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

   _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
   }
  
 _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
 }
  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _destroyObservers() {
    this.observers.forEach(ob => {
      ob.destroy();
    });
  }

  _scrollInit() {
    this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), { once: false });
    this._observer = new ScrollObserver('.cover-slide', this._inviewAnimation);
    this._observers = new ScrollObserver('.tween-animate-title', this._textAnimation);
    this._observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), { once: false });
    this._observers = new ScrollObserver('.art__texts-inner', this._inviewAnimation);
    this._observers = new ScrollObserver('.appear', this._inviewAnimation);
    
  }
}

