// Fixed Header
const header = document.getElementById("header");

const checkScroll = () => {
    let scrollPos = window.scrollY;

    if (scrollPos > 0) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
};

window.addEventListener("scroll", () => {
    checkScroll();
});

const PRODUCT_IN_BASKET_KEY = "product-in-basket";
const FAVORITE_PRODUCT_KEY = "favorite-product";

let oldFilter = {
    category: "All",
    price: {
        min: 0,
        max: 999999,
    },
    colors: ["Blue"],
};

const currentFilter = {
    category: "All",
    price: {
        min: 0,
        max: 999999,
    },
    colors: [],
};

let searchValue = "";
let sort = "";

const paginationInfo = {
    activePage: 0,
    perPage: 12,
};

const debounce = (f, t) => {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();

        if (previousCall && this.lastCall - previousCall <= t) {
            clearTimeout(this.lastCallTimer);
        }

        this.lastCallTimer = setTimeout(() => f(args), t);
    };
};

// Local Storage
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

const updateBasketInfo = () => {
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
        updateBasketInfo();
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
        updateBasketInfo();
        return true;
    }

    productsInBasket.push({...product, quantity: 1});

    setToLS(PRODUCT_IN_BASKET_KEY, productsInBasket);
    updateBasketInfo();
};

const updateFavoriteInfo = () => {
    const favoriteCounter = document.getElementById("heart");

    if (!favoriteCounter) {
        return false;
    }

    const favoriteProducts = getFromLS(FAVORITE_PRODUCT_KEY);

    if (!favoriteProducts) {
        return false;
    }

    let countOfFavorite = 0;

    favoriteProducts.forEach((product) => {
        countOfFavorite += product.isFavorite;
    });

    favoriteCounter.innerHTML = countOfFavorite;
};

const addFavorite = (product) => {
    const favoriteProducts = getFromLS(FAVORITE_PRODUCT_KEY);

    if (!favoriteProducts) {
        setToLS(FAVORITE_PRODUCT_KEY, [{...product, isFavorite: 1}]);
        updateFavoriteInfo();
        return true;
    }

    let hasFavoriteProduct = false;

    const updatedProducts = favoriteProducts.map((favoriteProduct) => {
        if (favoriteProduct.id === product.id) {
            hasFavoriteProduct = true;

            if (favoriteProduct.isFavorite === 1) {
                return {
                    ...favoriteProduct,
                    isFavorite: favoriteProduct.isFavorite - 1,
                };
            }

            if (favoriteProduct.isFavorite === 0) {
                return {
                    ...favoriteProduct,
                    isFavorite: favoriteProduct.isFavorite + 1,
                };
            }
        }

        return favoriteProduct;
    });

    if (hasFavoriteProduct) {
        setToLS(FAVORITE_PRODUCT_KEY, updatedProducts);
        updateFavoriteInfo();
        return true;
    }

    favoriteProducts.push({...product, isFavorite: 1});

    setToLS(FAVORITE_PRODUCT_KEY, favoriteProducts);
    updateFavoriteInfo();
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
    catalogHeart.addEventListener("click", () => {
        addFavorite(product);
    });

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
    catalogBuy.id = `${product.id}`;
    catalogBuy.innerHTML = "Купить";
    catalogBuy.addEventListener("click", (event) => {
        if (!localStorage.getItem(`hide${product.id}`)) {
            buyProduct(product);
        }

        if (localStorage.getItem(`hide${product.id}`)) {
            localStorage.removeItem(`hide${product.id}`);
            localStorage.setItem(`nohide${product.id}`, "nohide");

            const products = getFromLS(PRODUCT_IN_BASKET_KEY);
            const cartInnerId = document.getElementById(
                `cartInner${product.id}`
            );

            products[event.target.id - 1].quantity += 1;

            setToLS(PRODUCT_IN_BASKET_KEY, products);

            cartInnerId.innerHTML = products[event.target.id - 1].quantity + 1;
        }
    });

    productWrapper.appendChild(catalogBuy);

    return productWrapper;
};

const createPagination = (productsCount) => {
    const jsPages = document.getElementById("pages");
    const pager = document.getElementById("pager");

    if (!productsCount) {
        pager.classList.add("hide");

        return;
    }

    if (!jsPages) {
        return;
    }

    pager.classList.remove("hide");

    jsPages.innerHTML = "";

    const pageCount = Math.ceil(productsCount / paginationInfo.perPage);

    for (let i = 0; i < pageCount; i++) {
        const pagerItem = document.createElement("div");
        pagerItem.classList.add("pager__item");
        jsPages.appendChild(pagerItem);

        const pagerNumber = document.createElement("div");
        pagerNumber.classList.add("pager__number");

        if (i === paginationInfo.activePage) {
            pagerNumber.classList.add("active");
        }

        pagerNumber.innerHTML = i + 1;
        pagerNumber.dataset.index = i;

        const pagerNumbers = document.querySelectorAll(".pager__number");

        pagerNumber.addEventListener("click", (event) => {
            const currentElement = event.target;

            pagerNumbers.forEach((element) => {
                element.classList.remove("active");
            });

            currentElement.classList.add("active");

            paginationInfo.activePage = Number(currentElement.dataset.index);

            const {filteredProducts, productsCount} = filterProducts(
                searchValue,
                oldFilter,
                sort,
                paginationInfo
            );

            createProductList(filteredProducts, productsCount);
        });

        if (
            pagerNumber.dataset.index === "0" &&
            pagerNumber.classList.contains("active")
        ) {
            pagerArrowPrev.classList.add("no-active");
        }

        if (
            pagerNumber.dataset.index === "0" &&
            !pagerNumber.classList.contains("active")
        ) {
            pagerArrowPrev.classList.remove("no-active");
        }

        if (
            pagerNumber.dataset.index === String(pagerNumbers.length) &&
            pagerNumber.classList.contains("active")
        ) {
            pagerArrowNext.classList.add("no-active");
        }

        if (
            pagerNumber.dataset.index === String(pagerNumbers.length) &&
            !pagerNumber.classList.contains("active")
        ) {
            pagerArrowNext.classList.remove("no-active");
        }

        pagerItem.appendChild(pagerNumber);
    }
};

window.onload = () => {
    checkScroll();
    updateBasketInfo();
    updateFavoriteInfo();
};

const pagerArrowPrev = document.getElementById("pagerArrowPrev");
const pagerArrowNext = document.getElementById("pagerArrowNext");

pagerArrowPrev.addEventListener("click", () => {
    const pagerNumbers = document.querySelectorAll(".pager__number");

    if (paginationInfo.activePage !== 0) {
        const prevElement = pagerNumbers[paginationInfo.activePage - 1];

        prevElement.classList.add("active");

        paginationInfo.activePage = paginationInfo.activePage - 1;

        pagerNumbers.forEach((element) => {
            element.classList.remove("active");
        });

        const {filteredProducts, productsCount} = filterProducts(
            searchValue,
            oldFilter,
            sort,
            paginationInfo
        );

        createProductList(filteredProducts, productsCount);
    }
});

pagerArrowNext.addEventListener("click", () => {
    const pagerNumbers = document.querySelectorAll(".pager__number");

    if (paginationInfo.activePage !== pagerNumbers.length) {
        const nextElement = pagerNumbers[paginationInfo.activePage + 1];

        nextElement.classList.add("active");

        paginationInfo.activePage = paginationInfo.activePage + 1;

        pagerNumbers.forEach((element) => {
            element.classList.remove("active");
        });

        const {filteredProducts, productsCount} = filterProducts(
            searchValue,
            oldFilter,
            sort,
            paginationInfo
        );

        createProductList(filteredProducts, productsCount);
    }
});

const createProductList = (products, productsCount) => {
    const jsProducts = document.getElementById("products");

    if (!jsProducts) {
        return;
    }

    jsProducts.innerHTML = "";

    for (const product of products) {
        const createdProduct = createProduct(product);

        jsProducts.appendChild(createdProduct);
    }

    createPagination(productsCount);
};

const filterBySearchValue = (products, value) => {
    return products.filter((product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
    });
};

const filterProductsByFilterInfo = (products, filter) => {
    let filteredProducts = products;

    if (Object.keys(filter)) {
        if (
            filter.category &&
            filter.category !== "All" &&
            filter.price.min &&
            filter.price.max &&
            filter.colors.length
        ) {
            filteredProducts = products.filter((product) => {
                return (
                    product.categories.includes(filter.category) &&
                    product.price >= filter.price.min &&
                    product.price <= filter.price.max &&
                    product.color === filter.colors[0]
                );
            });
        }
    }

    return filteredProducts;
};

const sortProduct = (products, sort) => {
    products.sort((a, b) => {
        if (sort === "ASC") {
            if (a.name > b.name) return 1;
            if (a.name === b.name) return 0;
            if (a.name < b.name) return -1;
        }

        if (a.name > b.name) return -1;
        if (a.name === b.name) return 0;
        if (a.name < b.name) return 1;
    });
};

const paginateProducts = (products, paginInfo) => {
    const productsCount = products.length;

    const {activePage, perPage} = paginInfo;

    const firstIndex = activePage * perPage;
    const paginatedProducts = products.slice(
        firstIndex,
        (activePage + 1) * perPage
    );

    return {
        productsCount,
        paginatedProducts,
    };
};

const filterProducts = (searchValue, filter, sort, pagination) => {
    let filteredProducts = [...products];

    if (searchValue) {
        filteredProducts = filterBySearchValue(filteredProducts, searchValue);
    }

    filteredProducts = filterProductsByFilterInfo(filteredProducts, filter);

    if (sort) {
        sortProduct(filteredProducts, sort);
    }

    const {productsCount, paginatedProducts} = paginateProducts(
        filteredProducts,
        pagination
    );

    return {
        filteredProducts: paginatedProducts,
        productsCount,
    };
};

const updateProductsCount = (count) => {
    document.getElementById("productsCount").innerHTML = count;
};

document.getElementById("search").addEventListener(
    "keyup",
    debounce((event) => {
        applyFilter.removeAttribute("disabled");

        searchValue = event.target.value;

        paginationInfo.activePage = 0;

        const {filteredProducts, productsCount} = filterProducts(
            searchValue,
            oldFilter,
            sort,
            paginationInfo
        );

        createProductList(filteredProducts, productsCount);
        updateProductsCount(productsCount);
    }, 500)
);

const applyFilter = document.getElementById("applyFilter");

const toggleBlockFilterBtn = () => {
    if (
        currentFilter.category !== oldFilter.category ||
        currentFilter.price.min !== 0 ||
        currentFilter.price.max !== 999999 ||
        currentFilter.colors[0] !== oldFilter.colors[0]
    ) {
        applyFilter.removeAttribute("disabled");
    } else {
        applyFilter.setAttribute("disabled", "disabled");
    }
};

const categoriesItems = document.querySelectorAll(".categories__item");

categoriesItems.forEach((item) => {
    item.addEventListener("click", () => {
        for (let i = 0; i < categoriesItems.length; i++) {
            if (categoriesItems[i] !== item) {
                categoriesItems[i].classList.remove("active");
            }
        }

        if (!item.classList.contains("active")) {
            item.classList.add("active");

            currentFilter["category"] = item.dataset.category;
        } else {
            item.classList.remove("active");

            document.querySelector(".categories__item").click();
        }
    });
});

const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");

priceMax.addEventListener("keyup", () => {
    currentFilter.price.min = Number(priceMin.value);
    currentFilter.price.max = Number(priceMax.value);
});

const colors = document.querySelectorAll(".colors__item");

colors.forEach((color) => {
    color.addEventListener("click", () => {
        colors.forEach((color) => {
            color.classList.remove("active");
            currentFilter.colors.pop();
        });

        if (!color.classList.contains("active")) {
            color.classList.add("active");

            currentFilter.colors.push(color.dataset.color);
        } else {
            color.classList.remove("active");
        }

        toggleBlockFilterBtn();
    });
});

document.getElementsByClassName("colors__item")[1].click();

applyFilter.addEventListener("click", (event) => {
    paginationInfo.activePage = 0;

    const {filteredProducts, productsCount} = filterProducts(
        searchValue,
        currentFilter,
        sort,
        paginationInfo
    );

    createProductList(filteredProducts, productsCount);
    updateProductsCount(productsCount);

    toggleBlockFilterBtn();

    event.target.setAttribute("disabled", "disabled");

    oldFilter = JSON.parse(JSON.stringify(currentFilter));
});

const sortBtn = document.getElementById("sort");

sortBtn.addEventListener("change", (event) => {
    sort = event.target.value;

    const {filteredProducts, productsCount} = filterProducts(
        searchValue,
        oldFilter,
        sort,
        paginationInfo
    );

    createProductList(filteredProducts, productsCount);
    updateProductsCount(productsCount);
});

const getRandomProducts = (products, count) => {
    const newProducts = [...products];
    const randProducts = [];

    do {
        const randomNumber = Math.floor(Math.random() * newProducts.length);

        randProducts[randProducts.length] = newProducts.splice(
            randomNumber,
            1
        )[0];
    } while (randProducts.length < count);

    return randProducts;
};

const createRandomProduct = (product) => {
    const reviewedItem = document.createElement("div");
    reviewedItem.classList.add("reviewed__item");

    const reviewedPreview = document.createElement("a");
    reviewedPreview.classList.add("reviewed__preview");
    reviewedPreview.href = "#";

    reviewedItem.appendChild(reviewedPreview);

    const reviewedInfo = document.createElement("div");
    reviewedInfo.classList.add("reviewed__info");

    reviewedItem.appendChild(reviewedInfo);

    const reviewedImg = document.createElement("img");
    reviewedImg.classList.add("reviewed__img");
    reviewedImg.src = `${product.image}`;
    reviewedImg.alt = `${product.name}`;

    reviewedPreview.appendChild(reviewedImg);

    const reviewedName = document.createElement("a");
    reviewedName.classList.add("reviewed__name");
    reviewedName.href = "#";
    reviewedName.innerHTML = `${product.name}`;

    reviewedInfo.appendChild(reviewedName);

    const reviewedPrice = document.createElement("div");
    reviewedPrice.classList.add("reviewed__price");

    reviewedInfo.appendChild(reviewedPrice);

    const reviewedNew = document.createElement("span");
    reviewedNew.classList.add("reviewed__new");
    reviewedNew.innerHTML = `${product.price}`;

    reviewedPrice.appendChild(reviewedNew);

    const reviewedOld = document.createElement("span");
    reviewedOld.classList.add("reviewed__old");
    reviewedOld.innerHTML = `${product.oldPrice}`;

    if (product.oldPrice !== null) {
        reviewedPrice.appendChild(reviewedOld);
    }

    return reviewedItem;
};

const generateReviewedByYouProducts = () => {
    const randomProducts = getRandomProducts(products, 3);
    const container = document.getElementById("reviewedProducts");
    container.innerHTML = "";

    randomProducts.forEach((product) => {
        const randomProduct = createRandomProduct(product);
        container.appendChild(randomProduct);
    });
};

generateReviewedByYouProducts();

const {paginatedProducts, productsCount} = paginateProducts(
    products,
    paginationInfo
);

createProductList(paginatedProducts, productsCount);
updateProductsCount(products.length);

window.onload = () => {
    checkScroll();
    updateBasketInfo();
    updateFavoriteInfo();
};

var addFavoriteProducts = (i) => {
    const hearts = document.querySelectorAll(".catalog__heart");

    while (i <= products.length) {
        const heart = hearts[i];

        heart.dataset.heart = i + 1;

        var checkFavorite = () => {
            if (localStorage.getItem(`${heart.dataset.heart}`)) {
                heart.classList.add("favorite");
            }

            if (!localStorage.getItem(`${heart.dataset.heart}`)) {
                heart.classList.remove("favorite");
            }
        };

        heart.addEventListener("click", () => {
            if (!localStorage.getItem(`${heart.dataset.heart}`)) {
                localStorage.setItem(`${heart.dataset.heart}`, "favorite");
                heart.classList.add("favorite");
                return;
            }

            if (localStorage.getItem(`${heart.dataset.heart}`)) {
                localStorage.removeItem(`${heart.dataset.heart}`);
                heart.classList.remove("favorite");
                return;
            }
        });

        checkFavorite();

        i++;
    }
};

addFavoriteProducts(0);
