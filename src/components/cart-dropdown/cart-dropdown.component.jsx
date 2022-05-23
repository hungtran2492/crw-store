import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart_item/cart_item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.style.jsx'
const CardDropdown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);

    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? ((cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    )))) : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
                <Button onClick={goToCheckOutHandler}>CHECKOUT</Button>
            </CartItems>
        </CartDropdownContainer>
    )
}

export default CardDropdown;