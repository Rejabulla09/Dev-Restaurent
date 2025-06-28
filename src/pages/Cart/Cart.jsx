import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const subtotal = food_list?.reduce((total, item) => {
    const quantity = cartItems[item._id] || 0;
    return total + item.price * quantity;
  }, 0) || 0;

  const deliveryFee = subtotal > 0 ? 2.0 : 0.0;
  const total = subtotal + deliveryFee;

  const hasItemsInCart = food_list?.some(item => cartItems[item._id] > 0);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {hasItemsInCart ? (
          food_list.map((item) => {
            const quantity = cartItems[item._id] || 0;
            if (quantity > 0) {
              return (
                <div key={item._id} className="cart-items-item">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{quantity}</p>
                  <p>${(item.price * quantity).toFixed(2)}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cross"
                    title="Remove from cart"
                  >
                    ×
                  </p>
                </div>
              );
            }
            return null;
          })
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty 🛒</p>
          </div>
        )}

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${deliveryFee.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${total.toFixed(2)}</b>
              </div>
            </div>
            <button
              onClick={() => navigate('/Placeorder')}
              disabled={!hasItemsInCart}
              className={`checkout-btn ${!hasItemsInCart ? "disabled" : ""}`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
