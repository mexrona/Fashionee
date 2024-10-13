// Fixed Header
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY;

    if (scrollPos > 0) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});

// Local Storage
const PRODUCT_IN_BASKET_KEY = "product-in-basket";

const getFromLS = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.log(e);
    }
};

const setToLS = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
};

const updateHeaderInfo = () => {
    const basketCounter = document.getElementById("cart");

    if (!basketCounter) {
        return false;
    }

    const productsInBasket = getFromLS(PRODUCT_IN_BASKET_KEY);

    if (!productsInBasket) {
        return false;
    }

    let countInBasket = 0;

    productsInBasket.forEach((product) => {
        countInBasket += product.quantity;
    });

    basketCounter.innerHTML = countInBasket;
};

const buyProduct = (product) => {
    const productsInBasket = getFromLS(PRODUCT_IN_BASKET_KEY);

    if (!productsInBasket) {
        setToLS(PRODUCT_IN_BASKET_KEY, [{...product, quantity: 1}]);
        updateHeaderInfo();
        return true;
    }

    let hasProductInBasket = false;

    const updatedProducts = productsInBasket.map((productInBasket) => {
        if (productInBasket.id === product.id) {
            hasProductInBasket = true;

            return {
                ...productInBasket,
                quantity: productInBasket.quantity + 1,
            };
        }

        return productInBasket;
    });

    if (hasProductInBasket) {
        setToLS(PRODUCT_IN_BASKET_KEY, updatedProducts);
        updateHeaderInfo();
        return true;
    }

    productsInBasket.push({...product, quantity: 1});

    setToLS(PRODUCT_IN_BASKET_KEY, productsInBasket);
    updateHeaderInfo();
};

// Products
const products = [
    {
        id: 1,
        name: "Textured turtleneck with zip",
        price: 52.99,
        oldPrice: 53.99,
        isSale: true,
        isNew: false,
        categories: ["Men"],
        color: "Brown",
        image: "https://fs-thb01.getcourse.ru/fileservice/file/thumbnail/h/54cdbf69f8e60ba13e2e795cd495567f.png/s/f1200x/a/534336/sc/265",
    },
    {
        id: 2,
        name: "Spray wrap skirt",
        price: 35.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Women"],
        color: "Red",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/061c4e0891851d157cbcf6984295b7ed.png/s/f1200x/a/534336/sc/111",
    },
    {
        id: 3,
        name: "Short shorts with straps",
        price: 20.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Men"],
        color: "Blue",
        image: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/b56c73f8da5404fddf58b7a5a540130f.png/s/f1200x/a/534336/sc/238",
    },
    {
        id: 4,
        name: "Fashionee - catton shirt",
        price: 110.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Men"],
        color: "Brown",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/911e17505fb10478ce04f078943bf74e.png/s/f1200x/a/534336/sc/55",
    },
    {
        id: 5,
        name: "Warm casual sweater",
        price: 80.99,
        oldPrice: null,
        isSale: false,
        isNew: true,
        categories: ["Women"],
        color: "Brown",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/ec9bc0e735f3c75eab9d4d8c4f8630fe.png/s/f1200x/a/534336/sc/400",
    },
    {
        id: 6,
        name: "Retro style handbag",
        price: 45.99,
        oldPrice: 52.99,
        isSale: true,
        isNew: false,
        categories: ["Women", "Accessories"],
        color: "Brown",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/c3d454c3b46f6a62d4d036f928a56705.png/s/f1200x/a/534336/sc/100",
    },
    {
        id: 7,
        name: "Style Handbag",
        price: 180.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Women", "Accessories"],
        color: "Black",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/14e10d5f0aaf5e8405fad852e8344182.png/s/f1200x/a/534336/sc/138",
    },
    {
        id: 8,
        name: "Blouse with insert and ruffles",
        price: 30.99,
        oldPrice: null,
        isSale: false,
        isNew: true,
        categories: ["Women"],
        color: "Blue",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/2b269ee1c83fd5758f3763f9a45a5605.png/s/f1200x/a/534336/sc/116",
    },
    {
        id: 9,
        name: "Long oversized T-shirt",
        price: 30.99,
        oldPrice: 52.99,
        isSale: true,
        isNew: false,
        categories: ["Men"],
        color: "Blue",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/92be8394b48b6911690745902643f92d.png/s/f1200x/a/534336/sc/439",
    },
    {
        id: 10,
        name: "Stylish and comfortable cap",
        price: 40.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Accessories"],
        color: "White",
        image: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/aa0d17c1bd58fc6066aa1f602fe8ab59.png/s/f1200x/a/534336/sc/325",
    },
    {
        id: 11,
        name: "Shoulder bag",
        price: 210.99,
        oldPrice: null,
        isSale: false,
        isNew: true,
        categories: ["Women", "Accessories"],
        color: "Red",
        image: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/ad5a7f75f7e3463aaafec1149cd2bfbd.png/s/f1200x/a/534336/sc/477",
    },
    {
        id: 12,
        name: "High-heeled shoes",
        price: 52.99,
        oldPrice: 70.99,
        isSale: true,
        isNew: false,
        categories: ["Women"],
        color: "Black",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/b14b37c5f1fbd94505697d827305348b.png/s/f1200x/a/534336/sc/57",
    },
    {
        id: 13,
        name: "Textured turtleneck with zip (2)",
        price: 45.99,
        oldPrice: 53.99,
        isSale: true,
        isNew: false,
        categories: ["Men"],
        color: "Brown",
        image: "https://fs-thb01.getcourse.ru/fileservice/file/thumbnail/h/54cdbf69f8e60ba13e2e795cd495567f.png/s/f1200x/a/534336/sc/265",
    },
    {
        id: 14,
        name: "Spray wrap skirt (2)",
        price: 25.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Women"],
        color: "Red",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/061c4e0891851d157cbcf6984295b7ed.png/s/f1200x/a/534336/sc/111",
    },
    {
        id: 15,
        name: "Short shorts with straps (2)",
        price: 30.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Men"],
        color: "Blue",
        image: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/b56c73f8da5404fddf58b7a5a540130f.png/s/f1200x/a/534336/sc/238",
    },
    {
        id: 16,
        name: "Fashionee - catton shirt (2)",
        price: 99.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Men"],
        color: "Brown",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/911e17505fb10478ce04f078943bf74e.png/s/f1200x/a/534336/sc/55",
    },
    {
        id: 17,
        name: "Warm casual sweater (2)",
        price: 70.99,
        oldPrice: null,
        isSale: false,
        isNew: true,
        categories: ["Women"],
        color: "Brown",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/ec9bc0e735f3c75eab9d4d8c4f8630fe.png/s/f1200x/a/534336/sc/400",
    },
    {
        id: 18,
        name: "Retro style handbag (2)",
        price: 35.99,
        oldPrice: 52.99,
        isSale: true,
        isNew: false,
        categories: ["Women", "Accessories"],
        color: "Brown",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/c3d454c3b46f6a62d4d036f928a56705.png/s/f1200x/a/534336/sc/100",
    },
    {
        id: 19,
        name: "Style Handbag (2)",
        price: 170.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Women", "Accessories"],
        color: "Black",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/14e10d5f0aaf5e8405fad852e8344182.png/s/f1200x/a/534336/sc/138",
    },
    {
        id: 20,
        name: "Blouse with insert and ruffles (2)",
        price: 25.99,
        oldPrice: null,
        isSale: false,
        isNew: true,
        categories: ["Women"],
        color: "Blue",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/2b269ee1c83fd5758f3763f9a45a5605.png/s/f1200x/a/534336/sc/116",
    },
    {
        id: 21,
        name: "Long oversized T-shirt (2)",
        price: 25.99,
        oldPrice: 52.99,
        isSale: true,
        isNew: false,
        categories: ["Men"],
        color: "Blue",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/92be8394b48b6911690745902643f92d.png/s/f1200x/a/534336/sc/439",
    },
    {
        id: 22,
        name: "Stylish and comfortable cap (3)",
        price: 35.99,
        oldPrice: null,
        isSale: false,
        isNew: false,
        categories: ["Accessories"],
        color: "White",
        image: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/aa0d17c1bd58fc6066aa1f602fe8ab59.png/s/f1200x/a/534336/sc/325",
    },
    {
        id: 23,
        name: "Shoulder bag (2)",
        price: 200.99,
        oldPrice: null,
        isSale: false,
        isNew: true,
        categories: ["Women", "Accessories"],
        color: "Red",
        image: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/ad5a7f75f7e3463aaafec1149cd2bfbd.png/s/f1200x/a/534336/sc/477",
    },
    {
        id: 24,
        name: "High-heeled shoes (2)",
        price: 45.99,
        oldPrice: 70.99,
        isSale: true,
        isNew: false,
        categories: ["Women"],
        color: "Black",
        image: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/b14b37c5f1fbd94505697d827305348b.png/s/f1200x/a/534336/sc/57",
    },
];

const createProduct = (product) => {
    const productWrapper = document.createElement("div");
    productWrapper.classList.add("catalog__item");

    const catalogPreview = document.createElement("a");
    catalogPreview.classList.add("catalog__preview");
    catalogPreview.href = "#";

    catalogPreview.addEventListener("click", (event) => {
        event.preventDefault();
    });

    const catalogImg = document.createElement("img");
    catalogImg.classList.add("catalog__img");
    catalogImg.src = product.image;
    catalogImg.alt = product.name;

    catalogPreview.appendChild(catalogImg);

    productWrapper.appendChild(catalogPreview);

    const catalogStatus = document.createElement("div");
    catalogStatus.classList.add("catalog__status");

    if (product.isSale) {
        catalogStatus.classList.add("catalog__status--sale");
        catalogStatus.innerHTML = "Sale";
    }

    if (product.isNew) {
        catalogStatus.classList.add("catalog__status--new");
        catalogStatus.innerHTML = "New";
    }

    productWrapper.appendChild(catalogStatus);

    const catalogHeart = document.createElement("div");
    catalogHeart.classList.add("catalog__heart");

    const catalogHeartImg = document.createElement("img");
    catalogHeartImg.src = "img/icons/heart.png";
    catalogHeartImg.alt = "Wishlist";

    catalogHeart.appendChild(catalogHeartImg);

    productWrapper.appendChild(catalogHeart);

    const catalogName = document.createElement("a");
    catalogName.classList.add("catalog__name");
    catalogName.href = "#";
    catalogName.innerHTML = product.name;

    productWrapper.appendChild(catalogName);

    const catalogPrice = document.createElement("div");
    catalogPrice.classList.add("catalog__price");

    const catalogNewPrice = document.createElement("div");
    catalogNewPrice.classList.add("catalog__new");
    catalogNewPrice.innerHTML = `$${product.price}`;

    if (product.oldPrice) {
        const catalogOldPrice = document.createElement("div");
        catalogOldPrice.classList.add("catalog__old");
        catalogOldPrice.innerHTML = `$${product.oldPrice}`;

        catalogPrice.appendChild(catalogOldPrice);
    }

    catalogPrice.appendChild(catalogNewPrice);

    productWrapper.appendChild(catalogPrice);

    const catalogBuy = document.createElement("button");
    catalogBuy.classList.add("catalog__buy");
    catalogBuy.innerHTML = "Купить";
    catalogBuy.addEventListener("click", () => {
        buyProduct(product);
    });

    productWrapper.appendChild(catalogBuy);

    return productWrapper;
};

const createProductList = (products) => {
    for (const product of products) {
        const createdProduct = createProduct(product);

        document.getElementById("products").appendChild(createdProduct);
    }
};

createProductList(products);

// Favorites
const hearts = document.querySelectorAll(".catalog__heart");
const heartsCount = document.querySelector(".header__count");

hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
        if (!heart.classList.contains("favorite")) {
            heart.classList.add("favorite");
        } else {
            heart.classList.remove("favorite");
        }

        const clicks = document.querySelectorAll(".favorite");
        heartsCount.textContent = clicks.length;
    });
});
