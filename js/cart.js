const productsBtn = document.querySelectorAll('.btn2');
const cartProductsList = document.querySelector('.cart-content_list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart-quantity');
const fullPrice = document.querySelector('.fullprice');
const orderModalOpenProd = document.querySelector('.order-modal_open');
const orderModalList = document.querySelector('.order-modal_list');
const openModal = document.querySelector('.cart-content_btn');
const plusNumber = document.querySelectorAll('.number-plus');
const fadeIn = (el, timeout, display) =>{
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) =>{
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = 'none';
    },timeout);
};

const thank = document.querySelector('.overlay');
const closeThank = document.querySelector('.modal_close')
let price = 0;
let productArray =[];

plusNumber.forEach( btn => {
    btn.addEventListener('click', function() {
        const inp = this.parentElement.querySelector('.catalog-number');
        const currentValue = +inp.value;
        let newValue;
        newValue = currentValue + 1;
        inp.value = newValue;
    });
});

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};


const printQuantity = () => {
    let length = cartProductsList.querySelector('.cart-content_item').children.length;
    cartQuantity.textContent = length;
};

const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} р.`;
};

const generateCartProduct = (img, title, price, number, id) => {
    return `
        <li class="cart-content_item">
            <article class="cart-content_product cart-product" data-id = "${id}">
                <img src="${img}" class="cart-product_img">
                <div class="cart-product_text">
                    <h3 class="cart-product_title">${title}</h3>
                    <span class="cart-product_price">${price} р.</span>
                </div>
                 <span class="number">${number} шт.</span>
                <button class="cart-product_delete" aria-label="Удалить товар"></button>
            </article>
        </li>
    
    `;
}

const deleteProducts = (productParent) => {
    
    let id = productParent.querySelector('.cart-product').dataset.id;
    //document.querySelector(`.catalog_item[data-id = "${}"]`).querySelector('.btn2').disabled = false;

    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_price').textContent));
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();
    printQuantity();
    
};

productsBtn.forEach(el => {
    el.closest('.catalog_item').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.catalog_item');
        let id = parent.dataset.id;
        let img = parent.querySelector('.item_img').getAttribute('src');
        let title = parent.querySelector('.subtitle').textContent;
        let number = parent.querySelector('.catalog-number').value;
        let pricePlus = parseInt(priceWithoutSpaces(parent.querySelector('.cost').textContent));
        let priceNumber = +pricePlus * number;
        console.log(priceNumber)
        
         

        
        

        //summ
        plusFullPrice(priceNumber);
        console.log(price);
        //print full price
        printFullPrice();

        //add to cart
        cartProductsList.querySelector('.cart-content_item').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, number, id));
        //count and print quantity
        printQuantity();
        //disabled btn
        let obj = {};
        obj.number = number;
        productArray.push(obj);
    });
});



cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-product_delete')) {
        deleteProducts(e.target.closest('.cart-content_item'));
    }
});

let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
    if (flag == 0) {
        orderModalOpenProd.classList.add('open');
        orderModalList.style.display = 'block';
        flag = 1;
    } else {
        orderModalOpenProd.classList.remove('open');
        orderModalList.style.display = 'none';
        flag = 0;
    }
});


const generateModalProduct = (img, title, price, id) => {
    return `
        <li class="order-modal_item">
            <article class="order-modal_product" data-id = "${id}">
                    <img src="${img}" alt="" class="order-product_img">
                    <div class="order-product_text">
                        <h4 class="order-product_title">${title}</h4>
                            <span class="order-product_price">${price} </span>
                    </div>
            </article>
        </li>
    `;
};

openModal.addEventListener('click', function() {
    console.log('opened');
    let array = cartProductsList.querySelector('.cart-content_item').children;
    console.log(cartProductsList.querySelector('.cart-content_item').children);
    for (item of array){
        console.log(item)
        let img = item.querySelector('.cart-product_img').getAttribute('src');
        let title = item.querySelector('.cart-product_title').textContent;
        let priceString = priceWithoutSpaces(item.querySelector('.cart-product_price').textContent);
        let id = item.querySelector('.cart-product').dataset.id;
      

        orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));

        let obj = {};
        obj.title = title;
        obj.price = priceString;
        productArray.push(obj);
        
    }
    console.log(productArray);
    
});

document.querySelector('.order-modal_form').addEventListener('submit', (e) => {
    e.preventDefault();
    let self = e.currentTarget;
    let formData = new FormData(self);
    let name = self.querySelector('[name="user-name"]').value;
    let mail = self.querySelector('[name="E-mail"]').value;
    let tel = self.querySelector('[name="Tel"]').value;
    formData.append('Товары', JSON.stringify(productArray));
    formData.append('Имя', name);
    formData.append('E-mail', mail);
    formData.append('Телефон', tel);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200){
                fadeIn(thank, 1000);
                console.log('Отправлено');
            }
        }
    }
    closeThank.addEventListener('click', (e) => {
        let display = e.currentTarget.style.display
        if(display = 'block' ) {
            fadeOut(thank, 1000);
        }
    }); 
       

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    

    self.reset();
});

   

 