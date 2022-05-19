import './checkout-item.style.scss'
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItemFromCart(cartItem)}>
                    &#10094;
                </div>
                <div className="value">   {quantity}</div>
                <div className='arrow' onClick={() => addItemToCart(cartItem)}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <span onClick={() => clearItemFromCart(cartItem)} className='remove-button'>&#10005;</span>
        </div>
    )
}

export default CheckoutItem;