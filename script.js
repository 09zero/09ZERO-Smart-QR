const cafe = {
  name: "ABC CAFE",

  address: "Chhatarpur, Madhya Pradesh",

  instagram:
    "https://www.instagram.com/09zeroofficial/?hl=en",

  facebook:
    "https://www.facebook.com/profile.php?id=61594573021229",

  googleReview:
    "https://share.google/rCPjBwSvYR2DcY7tD",

  whatsapp:
    "919074755317"
};


/* =========================
   MENU DATA
========================= */

const menuItems = [

  {
    id: 1,
    name: "Cold Coffee",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
    description:
      "Chilled and creamy cold coffee."
  },

  {
    id: 2,
    name: "Paneer Sandwich",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    description:
      "Fresh sandwich with delicious paneer filling."
  },

  {
    id: 3,
    name: "French Fries",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    description:
      "Crispy golden french fries."
  },

  {
    id: 4,
    name: "Cheese Pizza",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    description:
      "Hot pizza loaded with melted cheese."
  }

];


/* =========================
   CART
========================= */

let cart = [];


/* =========================
   ELEMENTS
========================= */

const cafeName =
  document.getElementById("cafeName");

const cafeAddress =
  document.getElementById("cafeAddress");

const menuBtn =
  document.getElementById("menuBtn");

const menuModal =
  document.getElementById("menuModal");

const closeMenu =
  document.getElementById("closeMenu");

const menuContainer =
  document.getElementById("menuContainer");

const reviewBtn =
  document.getElementById("reviewBtn");

const instagramBtn =
  document.getElementById("instagramBtn");

const facebookBtn =
  document.getElementById("facebookBtn");

const whatsappBtn =
  document.getElementById("whatsappBtn");


/* =========================
   CAFE INFORMATION
========================= */

cafeName.textContent =
  cafe.name;

if (cafeAddress) {
  cafeAddress.textContent =
    cafe.address;
}


/* =========================
   OPEN MENU
========================= */

function openMenu() {

  renderMenu();

  menuModal.classList.add(
    "active"
  );

  document.body.style.overflow =
    "hidden";
}


/* =========================
   RENDER MENU
========================= */

function renderMenu() {

  menuContainer.innerHTML = "";

  menuItems.forEach((item) => {

    const cartItem =
      cart.find(
        (cartProduct) =>
          cartProduct.id === item.id
      );

    const quantity =
      cartItem
        ? cartItem.quantity
        : 0;


    const menuCard =
      document.createElement("div");

    menuCard.className =
      "menu-item";


    menuCard.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
        class="menu-item-image"
      >

      <div class="menu-item-info">

        <h3>
          ${item.name}
        </h3>

        <p>
          ${item.description}
        </p>

        <div class="menu-price">
          ₹${item.price}
        </div>

        <div
          class="quantity-control"
        >

          <button
            class="quantity-btn"
            onclick="decreaseQuantity(${item.id})"
          >
            −
          </button>

          <span
            class="quantity-number"
          >
            ${quantity}
          </span>

          <button
            class="quantity-btn"
            onclick="increaseQuantity(${item.id})"
          >
            +
          </button>

        </div>

      </div>

    `;

    menuContainer.appendChild(
      menuCard
    );

  });


  renderCart();

}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(id) {

  const item =
    menuItems.find(
      (product) =>
        product.id === id
    );

  if (!item) return;


  const existing =
    cart.find(
      (cartProduct) =>
        cartProduct.id === id
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });

  }


  renderMenu();
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(id) {

  const existing =
    cart.find(
      (cartProduct) =>
        cartProduct.id === id
    );

  if (!existing) return;


  existing.quantity -= 1;


  if (existing.quantity <= 0) {

    cart =
      cart.filter(
        (cartProduct) =>
          cartProduct.id !== id
      );

  }


  renderMenu();
}


/* =========================
   CART
========================= */

function renderCart() {

  let cartBox =
    document.getElementById(
      "cartBox"
    );


  if (!cartBox) {

    cartBox =
      document.createElement(
        "div"
      );

    cartBox.id =
      "cartBox";

    menuContainer.appendChild(
      cartBox
    );

  }


  if (cart.length === 0) {

    cartBox.innerHTML = `
      <div class="cart-empty">
        Your cart is empty.
      </div>
    `;

    return;
  }


  let total = 0;

  let totalItems = 0;


  const cartRows =
    cart.map((item) => {

      const itemTotal =
        item.price *
        item.quantity;

      total += itemTotal;

      totalItems +=
        item.quantity;


      return `

        <div class="cart-row">

          <div>
            <strong>
              ${item.name}
            </strong>

            <small>
              ₹${item.price} × ${item.quantity}
            </small>
          </div>

          <strong>
            ₹${itemTotal}
          </strong>

        </div>

      `;

    }).join("");


  cartBox.innerHTML = `

    <div class="cart">

      <h3>
        🛒 YOUR CART
      </h3>

      ${cartRows}

      <div class="cart-total">

        <span>
          Total (${totalItems} items)
        </span>

        <strong>
          ₹${total}
        </strong>

      </div>

      <button
        class="order-whatsapp-btn"
        onclick="orderOnWhatsApp()"
      >
        💬 ORDER ON WHATSAPP
      </button>

    </div>

  `;

}


/* =========================
   WHATSAPP ORDER
========================= */

function orderOnWhatsApp() {

  if (cart.length === 0) {

    alert(
      "Please select at least one item."
    );

    return;
  }


  let message =
    `Hello ${cafe.name} 👋\n\n`;

  message +=
    `I want to place an order:\n\n`;


  let total = 0;


  cart.forEach((item) => {

    const itemTotal =
      item.price *
      item.quantity;

    total += itemTotal;


    message +=
      `${item.name} × ${item.quantity} = ₹${itemTotal}\n`;

  });


  message +=
    `\nTotal: ₹${total}`;

  message +=
    `\n\nPlease confirm my order.`;

  message +=
    `\nThank you.`;


  const whatsappUrl =
    `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(message)}`;


  window.open(
    whatsappUrl,
    "_blank"
  );

}


/* =========================
   CLOSE MENU
========================= */

function closeMenuModal() {

  menuModal.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";
}


/* =========================
   MENU EVENTS
========================= */

menuBtn.addEventListener(
  "click",
  openMenu
);

closeMenu.addEventListener(
  "click",
  closeMenuModal
);


menuModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === menuModal
    ) {

      closeMenuModal();

    }

  }
);


/* =========================
   ESC KEY
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      menuModal.classList.contains("active")
    ) {

      closeMenuModal();

    }

  }
);


/* =========================
   GOOGLE REVIEW
========================= */

reviewBtn.addEventListener(
  "click",
  () => {

    window.open(
      cafe.googleReview,
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* =========================
   INSTAGRAM
========================= */

instagramBtn.href =
  cafe.instagram;

instagramBtn.target =
  "_blank";

instagramBtn.rel =
  "noopener noreferrer";


/* =========================
   FACEBOOK
========================= */

facebookBtn.href =
  cafe.facebook;

facebookBtn.target =
  "_blank";

facebookBtn.rel =
  "noopener noreferrer";


/* =========================
   WHATSAPP BUTTON
========================= */

if (whatsappBtn) {

  whatsappBtn.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      if (cart.length === 0) {

        openMenu();

        return;
      }

      orderOnWhatsApp();

    }
  );

}