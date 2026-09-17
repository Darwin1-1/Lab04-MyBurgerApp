import { useState } from "react";
import "./Burger.css";

const burgers = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Chicken breast, chilli sauce, tomatoes, pickles, coleslaw",
    price: 99.15,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=700&h=520&fit=crop",
  },
  {
    id: 2,
    name: "Ultimate Bacon",
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    price: 99.32,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=700&h=520&fit=crop",
  },
  {
    id: 3,
    name: "Black Sheep",
    description: "American cheese, tomato relish, avocado, lettuce, red onion",
    price: 69.15,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&h=520&fit=crop",
  },
  {
    id: 4,
    name: "Vegan Burger",
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    price: 99.25,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700&h=520&fit=crop",
  },
];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => {
    const filled = index + 1 <= rating;
    const half = !filled && index < rating;

    return (
      <span
        className={`star ${filled ? "full" : half ? "half" : "empty"}`}
        key={`${rating}-${index}`}
        aria-hidden="true"
      >
        ★
      </span>
    );
  });
}

function BurgerApp() {
  const [wishlist, setWishlist] = useState(new Set());
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (id, change) => {
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] ?? 0) + change);
      return { ...current, [id]: nextQuantity };
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const cartCount = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  return (
    <div className="burger-app">
      <header className="header">
        <div className="header-content">
          <a className="logo" href="#menu" aria-label="Tasty Burger home">
            <img
              className="logo-icon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrICDojeq9NQW2SS4NsePNQ9vhkMsX8ZNbn6E5p4019w&s=10"
              alt="Tasty Burger logo"
            />
            <span className="logo-name">
              TASTY <strong>BURGER</strong>
            </span>
          </a>
          <nav className="navigation" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#menu">Our menu</a>
            <a href="#shop">Shop</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="cart-icon" aria-label={`${cartCount} items in cart`}>
            <span className="cart-symbol" aria-hidden="true">
              🛒
            </span>
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </header>

      <main className="main-content" id="menu">
        <section className="hero-section" id="about">
          <p className="eyebrow">Handcrafted. Hot off the grill.</p>
          <h1 className="hero-title">OUR CRAZY BURGERS</h1>
          <p className="hero-description">
            Big flavor, bold toppings, and toasted buns made for messy,
            memorable bites. Pick your favorite and make it a meal.
          </p>
        </section>

        <section className="burger-grid" aria-label="Burger menu">
          {burgers.map((burger) => {
            const quantity = quantities[burger.id] ?? 0;
            const isWishlisted = wishlist.has(burger.id);

            return (
              <article className="burger-card" key={burger.id}>
                <div className="card-image-container">
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="burger-image"
                  />
                  <span className="image-label">Grill favorite</span>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <div
                      className="rating"
                      aria-label={`${burger.rating} out of 5 stars`}
                    >
                      {renderStars(burger.rating)}
                    </div>
                    <button
                      className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
                      onClick={() => toggleWishlist(burger.id)}
                      aria-label={`${isWishlisted ? "Remove" : "Add"} ${burger.name} ${isWishlisted ? "from" : "to"} wishlist`}
                      aria-pressed={isWishlisted}
                    >
                      {isWishlisted ? "♥" : "♡"}
                    </button>
                  </div>
                  <h2 className="burger-name">{burger.name}</h2>
                  <p className="burger-description">{burger.description}</p>
                  <div className="card-footer">
                    <span className="price">
                      {currency.format(burger.price)}
                    </span>
                    <div
                      className="quantity-control"
                      aria-label={`Quantity for ${burger.name}`}
                    >
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(burger.id, -1)}
                        disabled={quantity === 0}
                        aria-label={`Remove one ${burger.name}`}
                      >
                        −
                      </button>
                      <span className="quantity" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        className="quantity-btn plus"
                        onClick={() => updateQuantity(burger.id, 1)}
                        aria-label={`Add one ${burger.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default BurgerApp;
