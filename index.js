// hamburger menu
let menu = document.querySelector('.menu--hamb');
let body = document.querySelector('body');
let items = document.querySelectorAll('.menu__item--hamb');
let burger = document.querySelector('.hamb-menu__button');
let close = document.querySelector('.hamb-menu__close');

function openMenu(){
  menu.style.opacity = '1';
  menu.style.left = '0%';
  body.classList.add('body--active-menu');
}

function closeMenu(){
  menu.style.opacity = '0';
  menu.style.left = '130%';
  body.classList.remove('body--active-menu');
}

burger.addEventListener('click' , function(e){
  e.preventDefault();
  openMenu();
});

close.addEventListener('click' , function(e){
  e.preventDefault(); 
  closeMenu();
});


items.forEach(function(element){
  element.addEventListener('click' , closeMenu)}
  );


  //// ops
  let onePageScroll = () =>{
      const wrapper = document.querySelector('.wrapper');
      const content = wrapper.querySelector('.maincontent');
      const pages = content.querySelectorAll('.page');
      const points = document.querySelectorAll('.pagination__item');
      const dataScrollto = document.querySelectorAll('[data-scroll-to]');
      
      let inScroll = false;
    
      if(isMobileDevice()){swipe()}
      
      addNavigation();
      wheel();
      keyPush();
      
      function doTransition(pageNumber){
        const position  = `${pageNumber * (-100)}%`;
        
        if(inScroll) return;
        
        inScroll = true;
        
        addClass(pages);
        
        content.style.transform = `translateY(${position})`;
        
        setTimeout(() => {
          inScroll = false;
          addClass(points);
        }, 900);
        
        function addClass(arr){
          arr[pageNumber].classList.add('is-active');
          
          for(const item of arr){
            if(item != arr[pageNumber]){
              item.classList.remove('is-active');
            }
          }
        }
      }
    
      function addNavigation(){
        for(const point of dataScrollto){
          point.addEventListener('click' , e=>{
            e.preventDefault();
            doTransition(point.dataset.scrollTo);
          })
        }
      }
      
      function wheel() {
        document.addEventListener('wheel', e => {
          const direct = e.deltaY > 0 ? 'up' : 'down';
          
          scrollToPage(direct);
        })
      }
      
      function keyPush() {
        document.addEventListener('keydown', e => {
          switch (e.keyCode) {
            case 40:
            scrollToPage('up');
              break;
            case 38:
            scrollToPage('down');
              break;
            default:
              break;
          }
        })
      }
      
      function definePage(arr){
        for (let i = 0; i < arr.length; i++) {
          let iter = arr[i];
          if (iter.classList.contains('is-active')){
            return {
              iterIndex: i,
              iterActive: iter,
              iterNext: iter.nextElementSibling,
              iterPrev: iter.previousElementSibling
            }
          }   
        }
      }
      
    
      function scrollToPage(direct){
        let page = definePage(pages);
        
        if (direct === 'up' && page.iterNext) {
          let numPage = page.iterIndex + 1;
          
          doTransition(numPage);
        }
    
        if (direct === 'down' && page.iterPrev) {
          let numPage = page.iterIndex - 1;
          doTransition(numPage);
        }
      } 
      function swipe() {
        let touchStartY = 0;
        let touchEndY = 0;
        const wrapper = document.querySelector(".wrapper");
    
        document.addEventListener('touchstart', e=>{
          touchStartY = e.changedTouches[0].screenY;
        }, false);
    
        wrapper.addEventListener('touchmove', e=>{
          e.preventDefault();
        })
        document.addEventListener('touchend', e=>{
          touchEndY = e.changedTouches[0].screenY;
          let direct = swipeDirect();
          scrollToPage(direct);
        }, false);
     
      function swipeDirect () {
        let deltaY = touchStartY - touchEndY;
        if(deltaY > 100) {
          return 'up';
        }
        else if(deltaY < -100) {
          return 'down';
        }
      }
     }
      function isMobileDevice() {
        return (typeof window.orientation !== undefined);
      }
    
    }
    
    onePageScroll();
    