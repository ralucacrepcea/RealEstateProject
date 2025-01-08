// import React, { useContext, useEffect } from 'react'
// import { CartContext } from '../Global/CartContext'
// import { Navbar } from './Navbar';
// import { Icon } from 'react-icons-kit'
// import { ic_add } from 'react-icons-kit/md/ic_add'
// import { ic_remove } from 'react-icons-kit/md/ic_remove'
// import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
// import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
// import { auth } from '../Config/Config'

// export const Cart = ({ user }) => {

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'decimal',
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         }).format(price);
//     };    

//     const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

//     const history = useHistory();

//     useEffect(() => {
//         auth.onAuthStateChanged(user => {
//             if (!user) {
//                 history.push('/login');
//             }
//         })
//     })

//     return (
//         <>
//             <Navbar user={user} />
//             <>
//                 {shoppingCart.length !== 0 && <h1 className="centered-title">Cart Summary</h1>}
//                 <div className='cart-container'>
//                     {
//                         shoppingCart.length === 0 && <>
//                             <br />
//                             <br />
//                             <h3>Currently you do not have any properties in your cart.</h3>
//                             <br />
//                             <h5><Link to="/">Return to All Available Properties</Link></h5>
//                         </>
//                     }
//                     {shoppingCart && shoppingCart.map(cart => (
//                         <div className='cart-card' key={cart.ProductID}>

//                             <div className='cart-img'>
//                                 <img src={cart.ProductImg} alt="not found" />
//                             </div>

//                             <div className='cart-name'>{cart.ProductName}</div>

//                             <div className='cart-price-orignal'>$ {formatPrice(cart.ProductPrice)}</div>

//                             <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
//                                 <Icon icon={iosTrashOutline} size={24} />
//                             </button>
//                         </div>
//                     ))
//                     }
//                     {shoppingCart.length > 0 && <div className='cart-summary'>
//                         <div className='cart-summary-heading'>
//                             Cart:
//                         </div>
//                         <div className='cart-summary-price'>
//                             <span>Total Price</span>
//                             <span>$ {formatPrice(totalPrice)}</span>
//                         </div>
//                         <Link to='cashout' className='cashout-link'>
//                             <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
//                                 CONTACT ME
//                         </button>
//                         </Link>
//                     </div>}
//                 </div>
//             </>
//         </>
//     )
// }



import React, { useContext, useEffect } from 'react';
import { CartContext } from '../Global/CartContext';
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { auth } from '../Config/Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Cart = ({ user }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
    };

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                history.push('/login');
            }
        });
    }, [history]);

    const handleDelete = (cart) => {
        const previousState = { shoppingCart, totalPrice, totalQty };
    
        const showUndoToast = (previousState) => {
            toast.info(
                <div>
                    Property deleted from cart successfully!
                    <button
                        onClick={() => {
                            dispatch({ type: 'UNDO_DELETE', previousState });
                            toast.dismiss();
                        }}
                        style={{
                            backgroundColor: '1px solid #ffffff', 
                            border: '1px solid #ffffff', 
                            color: '#007bff', 
                            textDecoration: 'none', 
                            cursor: 'pointer', 
                            borderRadius: '5px', 
                            padding: '5px 10px', 
                            fontWeight: 'bold', 
                            marginLeft: '10px', 
                            transition: 'background-color 0.3s, color 0.3s', 
                        }}
                        
                    >
                        Undo
                    </button>
                </div>,
                {
                    position: 'top-center',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                }
            );
        };
    
        dispatch({ type: 'DELETE', id: cart.ProductID, cart, showUndoToast });
    };
    

    return (
        <>
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <h1 className="centered-title">Cart Summary</h1>}
                <div className="cart-container">
                    {shoppingCart.length === 0 && (
                        <>
                            <br />
                            <br />
                            <h3>Currently you do not have any properties in your cart.</h3>
                            <br />
                            <h5>
                                <Link to="/">Return to All Available Properties</Link>
                            </h5>
                        </>
                    )}
                    {shoppingCart &&
                        shoppingCart.map((cart) => (
                            <div className="cart-card" key={cart.ProductID}>
                                <div className="cart-img">
                                    <img src={cart.ProductImg} alt="not found" />
                                </div>
                                <div className="cart-name">{cart.ProductName}</div>
                                <div className="cart-price-orignal">$ {formatPrice(cart.ProductPrice)}</div>
                                <button className="delete-btn" onClick={() => handleDelete(cart)}>
                                    <Icon icon={iosTrashOutline} size={24} />
                                </button>
                            </div>
                        ))}
                    {shoppingCart.length > 0 && (
                        <div className="cart-summary">
                            <div className="cart-summary-heading">Cart:</div>
                            <div className="cart-summary-price">
                                <span>Total Price</span>
                                <span>$ {formatPrice(totalPrice)}</span>
                            </div>
                            <Link to="cashout" className="cashout-link">
                                <button className="btn btn-success btn-md" style={{ marginTop: '5px' }}>
                                    CONTACT ME
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </>
        </>
    );
};
