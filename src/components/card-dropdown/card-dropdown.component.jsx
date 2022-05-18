import Button from '../button/button.component';
import './card-dropdown.style.scss'
const CardDropdown = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                <Button>GO TO CHECKOUT</Button>
            </div>
        </div>
    )
}

export default CardDropdown;