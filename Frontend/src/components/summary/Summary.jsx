import { useContext } from 'react';
import summary from "./summary.module.css";
import { CartContext } from '../../context/CarritoContext';
import classNames from 'classnames';

export function Summary() {
    const { cartModal, setCartModal, cart } = useContext(CartContext);

    // Calcular el total de productos
    const totalProductos = cart.reduce((acc, producto) => acc + producto.cantidad, 0);

    // Calcular el precio total
    const totalPrecio = cart.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    return (
        <div className="">
            <div>
                <h2 className='mb-8'>Resumen de compra</h2>
                <div className={classNames('mb-5', 'flex', 'items-center',summary.summary__products)}>
                    <p className='font-semibold mr-2'>Cantidad de productos:</p>
                    <p>{totalProductos}</p>
                </div>
                <div className={classNames('flex', 'items-center',summary.summary__price)}>
                    <p className='font-semibold mr-2'>Total:</p>
                    <p>${totalPrecio.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
