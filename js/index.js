
let products = [
    { id: 1, name: "Увлажняющий крем", price: 1500, image: "https://ir.ozone.ru/s3/multimedia-1-s/7659120736.jpg" },
    { id: 2, name: "Сыворотка с витамином C", price: 2200, image: "https://avatars.mds.yandex.net/get-mpic/6559549/2a0000018adf66b31b2fd54dfc9949082712/900x1200" },
    { id: 3, name: "Пенка для умывания", price: 890, image: "https://hollyshop.ru/upload/iblock/4b6/abv9u2cbo9tx99pajreuhh43wbnyzwmw/Round-Lab1025-Dokdo-Cleanser_.jpg" },
    { id: 4, name: "Ночная маска", price: 1800, image: "https://img.joomcdn.net/1114119c82b8221504b1e3788e500db184b10b48_original.jpeg" }
];


let cart = [];

function showProducts() {
    let grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} ₽</p>
            <button class="add-to-cart" data-id="${product.id}">В корзину</button>
        `;
        grid.appendChild(card);
    }
    
    let buttons = document.querySelectorAll('.add-to-cart');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', addToCartHandler);
    }
}


function addToCartHandler(event) {
    let button = event.target;
    let productId = Number(button.getAttribute('data-id'));

    let selectedProduct = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            selectedProduct = products[i];
            break;
        }
    }
    
    if (!selectedProduct) return;
    
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
            break;
        }
    }
    
    if (!found) {
        let newItem = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: 1
        };
        cart.push(newItem);
    }
    
    updateCartDisplay();
    showNotification(selectedProduct.name + ' добавлен в корзину!');
}

function updateCartDisplay() {
    let cartItemsDiv = document.getElementById('cartItems');
    let cartTotalSpan = document.getElementById('cartTotal');
    let cartCountSpan = document.getElementById('cartCount');
    
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Корзина пуста</p>';
        if (cartTotalSpan) cartTotalSpan.textContent = '0';
        if (cartCountSpan) cartCountSpan.textContent = '0';
        return;
    }
    
    let total = 0;
    let totalCount = 0;
    let itemsHtml = '';
    
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemTotal = item.price * item.quantity;
        total = total + itemTotal;
        totalCount = totalCount + item.quantity;
        
        itemsHtml = itemsHtml + `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.price} ₽ × ${item.quantity}
                </div>
                <div>
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn">✖</button>
                </div>
            </div>
        `;
    }
    
    cartItemsDiv.innerHTML = itemsHtml;
    if (cartTotalSpan) cartTotalSpan.textContent = total;
    if (cartCountSpan) cartCountSpan.textContent = totalCount;
}

function changeQuantity(productId, delta) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            let newQuantity = cart[i].quantity + delta;
            if (newQuantity <= 0) {
                cart.splice(i, 1);
            } else {
                cart[i].quantity = newQuantity;
            }
            break;
        }
    }
    updateCartDisplay();
}

function removeFromCart(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart.splice(i, 1);
            break;
        }
    }
    updateCartDisplay();
    showNotification('Товар удалён из корзины');
}

function showNotification(message) {
    let oldNotif = document.querySelector('.notification');
    if (oldNotif) {
        oldNotif.remove();
    }
    
    let notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(function() {
        notif.remove();
    }, 2000);
}

function toggleCart() {
    let panel = document.getElementById('cartPanel');
    let overlay = document.getElementById('overlay');
    panel.classList.toggle('open');
    overlay.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста!');
        return;
    }
    
    showNotification('Заказ оформлен! Спасибо за покупку!');
    cart = [];
    updateCartDisplay();
    toggleCart();
}

function initFaq() {
    let questions = document.querySelectorAll('.faq-question');
    
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', function() {
            let parent = this.parentElement;
            parent.classList.toggle('active');
        });
    }
}


function initSmoothScroll() {
    let navButtons = document.querySelectorAll('.btns');
    
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener('click', function() {
            let sectionId = this.getAttribute('data-section');
            if (sectionId) {
                let section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
    
    let catalogBtn = document.getElementById('catalogBtn');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', function() {
            let catalog = document.getElementById('catalog');
            if (catalog) {
                catalog.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function initSubscribeForm() {
    let form = document.getElementById('subscribeForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let input = form.querySelector('input');
            let email = input.value;
            let message = document.getElementById('subscribeMessage');
            message.textContent = 'Спасибо за подписку, ' + email + '! Скидка 10% отправлена на почту.';
            form.reset();
            
            setTimeout(function() {
                message.textContent = '';
            }, 3000);
        });
    }
}

function init() {
    showProducts();
    updateCartDisplay();
    initFaq();
    initSmoothScroll();
    initSubscribeForm();
    
    let cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }
    
    let closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.addEventListener('click', toggleCart);
    }
    
    let overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleCart);
    }

    let checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

document.addEventListener('DOMContentLoaded', init);