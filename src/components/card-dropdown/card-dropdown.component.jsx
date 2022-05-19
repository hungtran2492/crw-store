import Button from '../button/button.component';
import CartItem from '../cart_item/cart_item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/card.context';
import './card-dropdown.style.scss'
const CardDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                <div className="cart-item">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))}
                </div>
                <Button>CHECKOUT</Button>
            </div>
        </div>
    )
}

export default CardDropdown;