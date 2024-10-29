const generateCartProduct = (product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.id = `${product.id}`;

    const cartPreview = document.createElement("a");
    cartPreview.classList.add("cart__preview");
    cartPreview.href = "#";

    const cartImg = document.createElement("img");
    cartImg.classList.add("cart__img");
    cartImg.src = `${product.image}`;
    cartImg.alt = `${product.name}`;

    cartPreview.appendChild(cartImg);

    cartItem.appendChild(cartPreview);

    const cartContent = document.createElement("div");
    cartContent.classList.add("cart__content");

    const cartName = document.createElement("a");
    cartName.classList.add("cart__name");
    cartName.href = "#";
    cartName.innerHTML = `${product.name}`;

    cartContent.appendChild(cartName);

    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart__info");

    const cartData = document.createElement("div");
    cartData.classList.add("cart__data");

    const cartPrice = document.createElement("div");
    cartPrice.classList.add("cart__price");

    if (product.oldPrice) {
        const cartOld = document.createElement("div");
        cartOld.classList.add("cart__old");
        cartOld.innerHTML = `$${product.oldPrice}`;

        cartPrice.appendChild(cartOld);
    }

    const cartNew = document.createElement("div");
    cartNew.classList.add("cart__new");
    cartNew.innerHTML = `$${product.price}`;

    cartPrice.appendChild(cartNew);

    cartData.appendChild(cartPrice);

    const cartCount = document.createElement("div");
    cartCount.classList.add("cart__count");

    const cartMinus = document.createElement("span");
    cartMinus.classList.add("cart__minus");

    cartCount.innerHTML = "1";

    cartCount.appendChild(cartMinus);

    const cartPlus = document.createElement("span");
    cartPlus.classList.add("cart__plus");

    cartCount.appendChild(cartPlus);

    cartData.appendChild(cartCount);

    cartInfo.appendChild(cartData);

    const cartMain = document.createElement("div");
    cartMain.classList.add("cart__main");
    cartMain.innerHTML = `$${product.price}`;

    cartInfo.appendChild(cartMain);

    cartContent.appendChild(cartInfo);

    cartItem.appendChild(cartContent);

    const cartArrow = document.createElement("div");
    cartArrow.classList.add("cart__arrow");
    cartArrow.addEventListener("click", () => {
        const products = getFromLS(PRODUCT_IN_BASKET_KEY);

        console.log(products);
    });

    cartItem.appendChild(cartArrow);

    return cartItem;
};

const generateCartProducts = () => {
    const cartProducts = getFromLS(PRODUCT_IN_BASKET_KEY);
    const container = document.getElementById("cartInner");
    container.innerHTML = "";

    cartProducts.forEach((product) => {
        const cartProduct = generateCartProduct(product);
        container.appendChild(cartProduct);
    });
};

generateCartProducts();

const promoCodeInput = document.querySelector("#promoCodeInput");
const promoCodeBtn = document.querySelector("#promoCodeBtn");
const orderStatus = document.querySelector("#orderStatus");

promoCodeBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (promoCodeInput.value) {
        orderStatus.innerHTML = "Yes";
    }
});
