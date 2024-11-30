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

    var rounded = function (number) {
        return Math.round(parseFloat(number) * 100) / 100;
    };

    const cartMinus = document.createElement("span");
    cartMinus.classList.add("cart__minus");
    cartMinus.id = `${product.id}`;
    cartMinus.addEventListener("click", () => {
        const productsFromLS = getFromLS(PRODUCT_IN_BASKET_KEY);
        const cartElement = document.getElementById("cart");
        const productElement = document.getElementById(
            `cartInner${product.id}`
        );
        const productMainPrice = document.getElementById(
            `cartMain${product.id}`
        );

        productsFromLS.forEach((productFromLS) => {
            if (
                productFromLS.id === product.id &&
                productFromLS.quantity === 1
            ) {
                if (localStorage.getItem(`nohide${product.id}`)) {
                    localStorage.removeItem(`nohide${product.id}`);
                }

                productFromLS.quantity = 0;
                setToLS(PRODUCT_IN_BASKET_KEY, productsFromLS);
                cartElement.innerHTML -= 1;
                localStorage.setItem(`hide${product.id}`, "hide");
                checkToDelete();

                productMainPrice.innerHTML = `$${rounded(
                    productFromLS.price * productFromLS.quantity
                )}`;

                orderPriceCheck();
                totalPriceCheck();
            }

            if (productFromLS.id === product.id && productFromLS.quantity > 1) {
                productFromLS.quantity -= 1;
                productElement.innerHTML -= 1;
                cartElement.innerHTML -= 1;
                setToLS(PRODUCT_IN_BASKET_KEY, productsFromLS);

                productMainPrice.innerHTML = `$${rounded(
                    productFromLS.price * productFromLS.quantity
                )}`;

                orderPriceCheck();
                totalPriceCheck();
            }
        });
    });

    const cartInner = document.createElement("span");
    cartInner.id = `cartInner${product.id}`;
    cartInner.innerHTML = `${product.quantity}`;

    cartCount.appendChild(cartInner);

    cartCount.appendChild(cartMinus);

    const cartPlus = document.createElement("span");
    cartPlus.classList.add("cart__plus");
    cartPlus.id = `${product.id}`;
    cartPlus.addEventListener("click", () => {
        buyProduct(product);

        const productsFromLS = getFromLS(PRODUCT_IN_BASKET_KEY);
        const productElement = document.getElementById(
            `cartInner${product.id}`
        );
        const productMainPrice = document.getElementById(
            `cartMain${product.id}`
        );

        productsFromLS.forEach((productFromLS) => {
            if (productFromLS.id === product.id) {
                if (productElement) {
                    productElement.innerHTML = productFromLS.quantity;
                    productMainPrice.innerHTML = `$${rounded(
                        productFromLS.price * productFromLS.quantity
                    )}`;

                    orderPriceCheck();
                    totalPriceCheck();
                }
            }
        });
    });

    cartCount.appendChild(cartPlus);

    cartData.appendChild(cartCount);

    cartInfo.appendChild(cartData);

    const cartMain = document.createElement("div");
    cartMain.classList.add("cart__main");
    cartMain.id = `cartMain${product.id}`;
    cartMain.innerHTML = `$${rounded(product.price * product.quantity)}`;

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
    cartArrow.addEventListener("click", () => {
        const productsFromLS = getFromLS(PRODUCT_IN_BASKET_KEY);
        const cartElement = document.getElementById("cart");
        const productElement = document.getElementById(
            `cartInner${product.id}`
        );
        const productMainPrice = document.getElementById(
            `cartMain${product.id}`
        );

        productsFromLS.forEach((productFromLS) => {
            if (productFromLS.id === product.id) {
                if (localStorage.getItem(`nohide${product.id}`)) {
                    localStorage.removeItem(`nohide${product.id}`);
                }

                productFromLS.quantity = 0;
                setToLS(PRODUCT_IN_BASKET_KEY, productsFromLS);
                cartElement.innerHTML -= productElement.innerHTML;
                localStorage.setItem(`hide${product.id}`, "hide");
                checkToDelete();

                productMainPrice.innerHTML = `$${rounded(
                    productFromLS.price * productFromLS.quantity
                )}`;

                orderPriceCheck();
                totalPriceCheck();
            }
        });
    });

    cartItem.appendChild(cartArrow);

    return cartItem;
};

const generateCartProducts = () => {
    const cartProducts = getFromLS(PRODUCT_IN_BASKET_KEY);
    const container = document.getElementById("cartInner");
    container.innerHTML = "";

    if (cartProducts) {
        cartProducts.forEach((product) => {
            const cartProduct = generateCartProduct(product);
            container.appendChild(cartProduct);
        });
    }
};

generateCartProducts();

const promoCodeInput = document.querySelector("#promoCodeInput");
const promoCodeBtn = document.querySelector("#promoCodeBtn");
const orderStatus = document.querySelector("#orderStatus");

var checkPromo = () => {
    if (localStorage.getItem("promo-code")) {
        orderStatus.innerHTML = "10%";
    }

    if (!localStorage.getItem("promo-code")) {
        orderStatus.innerHTML = "0%";
    }
};

promoCodeBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (promoCodeInput.value === "ilovereact") {
        localStorage.setItem("promo-code", "true");
        checkPromo();
        totalPriceCheck();
    }
});

checkPromo();

var orderPriceCheck = () => {
    const orderPrice = document.getElementById("orderPrice");
    let sumOfProducts = 0;
    const allProducts = JSON.parse(localStorage.getItem(PRODUCT_IN_BASKET_KEY));

    if (allProducts) {
        allProducts.forEach((product) => {
            let productPrice = product.price * product.quantity;
            sumOfProducts += productPrice;
            sumOfProducts = Math.round(parseFloat(sumOfProducts) * 100) / 100;
        });
    }

    orderPrice.innerHTML = `$${sumOfProducts}`;

    return sumOfProducts;
};

orderPriceCheck();

// const cartNews = document.querySelectorAll(".cart__new");
// const cartCounts = document.querySelectorAll(".cart__count");

var totalPriceCheck = () => {
    const total = document.getElementById("total");
    const orderPrice = orderPriceCheck();

    if (!localStorage.getItem("promo-code")) {
        total.innerHTML = `$${
            Math.round(parseFloat(orderPrice + 15) * 100) / 100
        }`;
    }

    if (localStorage.getItem("promo-code")) {
        total.innerHTML = `$${
            Math.round(parseFloat(orderPrice * 0.9 + 15) * 100) / 100
        }`;
    }
};

totalPriceCheck();

const discount = document.getElementById("orderStatus");
const delivery = document.getElementById("delivery");
const checkout = document.getElementById("checkout");

checkout.addEventListener("click", () => {
    console.log(
        `Order price ${orderPrice.innerHTML}\nDiscount for promo code ${orderStatus.innerHTML}\nDelivery ${delivery.innerHTML}\nTotal ${total.innerHTML}`
    );
});
