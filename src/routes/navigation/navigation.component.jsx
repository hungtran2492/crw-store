import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { ReactComponent as CrwLogo } from '../../assets/crown.svg'
import { signOutUser } from "../../ultils/firebase/firebase.utils";
import './navigation.styles.scss'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/card-dropdown/card-dropdown.component";
const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <Fragment>
            <div className='navigation'>
                <Link className="logo-container" to='/'>
                    <CrwLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link"
                                onClick={signOutUser}
                            >
                                SIGN OUT
                            </span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SignIn
                            </Link>
                        )
                    }

                    <CartIcon />


                </div>
                <CardDropdown />

            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;