import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image, initialRating = 4.5 }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const StarIcon = ({ filled, half }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "tomato" : "none"}
      stroke="tomato"
      strokeWidth="1.5"
    >
      {half ? (
        <path d="M12 2L14.5 8.5H21.5L16 12.5L18.5 19L12 15.5L5.5 19L8 12.5L2.5 8.5H9.5L12 2Z" />
      ) : (
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      )}
    </svg>
  );

  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => {
      const starValue = i + 1;
      return (
        <span
          key={i}
          className="star"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        >
          {starValue <= (hoverRating || rating) ? (
            <StarIcon filled />
          ) : (
            <StarIcon />
          )}
        </span>
      );
    });
  };

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img className='food-item-image' src={image} alt={name} loading="lazy" />
        {!cartItems[id] ? (
          <img 
            className='add' 
            onClick={() => addToCart(id)} 
            src={assets.add_icon_white} 
            alt="Add to Cart" 
          />
        ) : (
          <div className='food-item-counter'>
            <img 
              onClick={() => removeFromCart(id)} 
              src={assets.remove_icon_red} 
              alt="Remove from Cart" 
            />
            <p>{cartItems[id]}</p>
            <img 
              onClick={() => addToCart(id)} 
              src={assets.add_icon_green} 
              alt="Add more" 
            />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-header'>
          <h3 className='food-item-name'>{name}</h3>
          <div className='food-item-rating'>
            <div className="interactive-stars">
              {renderStars()}
              <span className="rating-number">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <p className='food-item-desc'>{description}</p>
        <div className='food-item-footer'>
          <p className='food-item-price'>${price.toFixed(2)}</p>
          <span className="total-ratings">(42 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;