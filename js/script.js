$(document).ready(function(){
    $('.inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        adaptiveWidth: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src= "img/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
    }
    );
});





const tabsBtn = document.querySelectorAll('.catalog_tab');
const tabsItems = document.querySelectorAll('.catalog');
tabsBtn.forEach(function(item) {
    item.addEventListener('click', function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);

        if( ! currentBtn.classList.contains('active') ){
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });
    
            tabsItems.forEach(function(item) {
                item.classList.remove('active');
            });
    
    
            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }

        
    });
});

document.querySelector('.catalog_tab').click();

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

