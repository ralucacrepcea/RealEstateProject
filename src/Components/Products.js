import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'

export const Products = () => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    }; 

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    return (
        <>
            {products.length !== 0 && <h1 className="centered-title">Available Properties</h1>}
            <div className='products-container'>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {products.length === 0 && <h3>Currently there are no properties listed.</h3>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            $ {formatPrice(product.ProductPrice)}
                    </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}
