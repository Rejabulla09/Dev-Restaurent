import React, { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();

 
 

  if (!food_list || food_list.length === 0) {
    return <div className="empty-message">Loading food items...</div>;
  }

  if (Object.keys(cartItems).length === 0) {
    return <div className="empty-message">Your cart is empty. Please add some items first.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log('Order placed:', {
      items: cartItems,
      deliveryDetails,
      paymentMethod,
      total: getTotalCartAmount() + 2
    });
    navigate('/order-confirmation');
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="place-order">
    <div className="place-order-container">
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <form onSubmit={handlePlaceOrder}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={deliveryDetails.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={deliveryDetails.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={deliveryDetails.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={deliveryDetails.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              value={deliveryDetails.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={deliveryDetails.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State/Province</label>
              <input
                type="text"
                id="state"
                name="state"
                value={deliveryDetails.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">Zip/Postal Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={deliveryDetails.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={deliveryDetails.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                 <option value="UK">United Kingdom</option>
    <option value="JP">Japan</option>
    <option value="AU">Australia</option>
    <option value="DE">Germany</option>
    <option value="FR">France</option>
    <option value="IT">Italy</option>
    <option value="ES">Spain</option>
    <option value="BR">Brazil</option>
    <option value="IN">India</option>
    <option value="CN">China</option>
    <option value="MX">Mexico</option>
    <option value="SG">Singapore</option>
    <option value="KR">South Korea</option>
    <option value="AE">United Arab Emirates</option>
    <option value="ZA">South Africa</option>
    <option value="NZ">New Zealand</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Delivery Instructions (Optional)</label>
            <textarea
              id="instructions"
              name="instructions"
              value={deliveryDetails.instructions}
              onChange={handleChange}
              rows="2"
              placeholder="e.g., Gate code, floor number, etc."
            />
          </div>

            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className={paymentMethod === 'cash' ? 'active' : ''}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                Cash on Delivery
              </label>

              <label className={paymentMethod === 'card' ? 'active' : ''}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                Credit/Debit Card
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="place-order-btn"
              disabled={subtotal === 0}
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="place-order-right">
          <h2>Order Summary</h2>
          <div className="order-items">
            {food_list?.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id} className="order-item">
                    <div className="item-info">
                      <p>{item.name}</p>
                      <p>${item.price} x {cartItems[item._id]}</p>
                    </div>
                    <p className="item-total">
                      ${(item.price * cartItems[item._id]).toFixed(2)}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div className="total-row">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>

            <hr />

            <div className="total-row grand-total">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;