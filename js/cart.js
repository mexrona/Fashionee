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
    cartNew.id = `${product.price}`;
    cartNew.innerHTML = `$${product.price}`;

    cartPrice.appendChild(cartNew);

    cartData.appendChild(cartPrice);

    var cartCount = document.createElement("div");
    cartCount.classList.add("cart__count");
    cartCount.id = `cartCount${product.id}`;
    cartCount.dataset.quantity = `${product.quantity}`;

    const cartMinus = document.createElement("span");
    cartMinus.classList.add("cart__minus");
    cartMinus.id = `${product.id}`;
    cartMinus.addEventListener("click", (event) => {
        const products = getFromLS(PRODUCT_IN_BASKET_KEY);
        const cartElement = document.getElementById("cart");
        const cartCount = Number(cartElement.innerHTML);
        const productElement = document.getElementById(
            `cartInner${product.id}`
        );

        if (products[Number(event.target.id) - 1].quantity === 1) {
            if (localStorage.getItem(`nohide${product.id}`)) {
                localStorage.removeItem(`nohide${product.id}`);
            }

            cartElement.innerHTML = cartCount - 1;

            products[Number(event.target.id) - 1].quantity = 0;

            productElement.innerHTML =
                products[Number(event.target.id) - 1].quantity;

            localStorage.setItem(`hide${product.id}`, "hide");
            setToLS(PRODUCT_IN_BASKET_KEY, products);

            checkToDelete();
        }

        if (products[Number(event.target.id) - 1].quantity > 1) {
            cartElement.innerHTML = cartCount - 1;

            products[Number(event.target.id) - 1].quantity =
                products[Number(event.target.id) - 1].quantity - 1;

            productElement.innerHTML =
                products[Number(event.target.id) - 1].quantity;

            setToLS(PRODUCT_IN_BASKET_KEY, products);
        }
    });

    const cartInner = document.createElement("span");
    cartInner.id = `cartInner${product.id}`;
    cartInner.innerHTML = `${product.quantity}`;

    cartCount.appendChild(cartInner);

    cartCount.appendChild(cartMinus);

    const cartPlus = document.createElement("span");
    cartPlus.classList.add("cart__plus");
    cartPlus.id = `${product.id}`;
    cartPlus.addEventListener("click", (event) => {
        const products = getFromLS(PRODUCT_IN_BASKET_KEY);
        const productElement = document.getElementById(
            `cartInner${product.id}`
        );
        const productCount = Number(productElement.innerHTML);

        if (!localStorage.getItem(`hide${product.id}`)) {
            console.log("buy");
            buyProduct(product);

            products[event.target.id - 1].quantity =
                products[event.target.id - 1].quantity + 1;
            productElement.innerHTML = products[event.target.id - 1].quantity;

            setToLS(PRODUCT_IN_BASKET_KEY, products);
        }

        if (localStorage.getItem(`hide${product.id}`)) {
            localStorage.removeItem(`hide${product.id}`);
            localStorage.setItem(`nohide${product.id}`, "nohide");

            console.log(productCount);

            products[event.target.id - 1].quantity =
                products[event.target.id - 1].quantity + 1;
            productElement.innerHTML = products[event.target.id - 1].quantity;

            setToLS(PRODUCT_IN_BASKET_KEY, products);
        }
    });

    cartCount.appendChild(cartPlus);

    cartData.appendChild(cartCount);

    cartInfo.appendChild(cartData);

    const cartMain = document.createElement("div");
    cartMain.classList.add("cart__main");
    cartMain.innerHTML = `$${product.price}`;

    cartInfo.appendChild(cartMain);

    cartContent.appendChild(cartInfo);

    cartItem.appendChild(cartContent);

    var checkToDelete = () => {
        if (localStorage.getItem(`hide${product.id}`)) {
            cartItem.classList.add("hide");
        }

        if (localStorage.getItem(`nohide${product.id}`)) {
            cartItem.classList.remove("hide");
        }
    };

    checkToDelete();

    const cartArrow = document.createElement("div");
    cartArrow.classList.add("cart__arrow");
    cartArrow.id = `${product.id}`;
    cartArrow.addEventListener("click", (event) => {
        const products = getFromLS(PRODUCT_IN_BASKET_KEY);
        const cartElement = document.getElementById("cart");
        const cartCount = Number(cartElement.innerHTML);
        const productElement = document.getElementById(
            `cartInner${product.id}`
        );

        if (products[Number(event.target.id) - 1].quantity === 1) {
            if (localStorage.getItem(`nohide${product.id}`)) {
                localStorage.removeItem(`nohide${product.id}`);
            }

            cartElement.innerHTML = cartCount - 1;

            products[Number(event.target.id) - 1].quantity = 0;

            productElement.innerHTML =
                products[Number(event.target.id) - 1].quantity;

            localStorage.setItem(`hide${product.id}`, "hide");
            setToLS(PRODUCT_IN_BASKET_KEY, products);

            checkToDelete();

            console.log("=== 1");

            return;
        }

        if (products[Number(event.target.id) - 1].quantity > 1) {
            cartElement.innerHTML = cartCount - 1;

            products[Number(event.target.id) - 1].quantity =
                products[Number(event.target.id) - 1].quantity - 1;

            productElement.innerHTML =
                products[Number(event.target.id) - 1].quantity;

            setToLS(PRODUCT_IN_BASKET_KEY, products);

            console.log("> 1");

            return;
        }
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

var checkPromo = () => {
    if (localStorage.getItem("promo-code")) {
        orderStatus.innerHTML = "Yes";
    }

    if (!localStorage.getItem("promo-code")) {
        orderStatus.innerHTML = "No";
    }
};

promoCodeBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (promoCodeInput.value) {
        localStorage.setItem("promo-code", "true");
        checkPromo();
    }
});

checkPromo();

const orderPrice = document.getElementById("orderPrice");
const discount = document.getElementById("orderStatus");
const delivery = document.getElementById("delivery");
const total = document.getElementById("total");
const checkout = document.getElementById("checkout");
const cartNews = document.querySelectorAll(".cart__new");
const cartCounts = document.querySelectorAll(".cart__count");

checkout.addEventListener("click", () => {
    console.log("click");
});

var checkOutPrices = function () {
    orderPrice.innerHTML = "";
    let sumPrice = 0;
    let totalPrice = 0;

    for (let i = 0; i < cartNews.length; i++) {
        const currentNew = cartNews[i];
        const currentCount = cartCounts[i];

        const currentNewInner = Number(currentNew.id);
        const currentCountInner = Number(currentCount.dataset.quantity);

        sumPrice += currentNewInner * currentCountInner;
    }

    totalPrice += sumPrice;

    if (discount.innerHTML === "Yes") {
        totalPrice -= 5;
    }

    totalPrice += 16;

    orderPrice.innerHTML = `$${sumPrice.toFixed(2)}`;
    total.innerHTML = `$${totalPrice.toFixed(2)}`;

    console.log(sumPrice.toFixed(2));
    console.log(totalPrice.toFixed(2));
};

checkOutPrices();
