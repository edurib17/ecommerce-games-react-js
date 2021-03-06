import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FiPlusCircle, FiMinusCircle, FiXCircle } from 'react-icons/fi'

import * as CartActions from '../../store/modules/cart/actions';

import './styles.css';

export default function Cart() {

        //utils
        let free = 'Grátis';

    const cart = useSelector(state =>
        state.cart.map(game => ({
            ...game,
            subtotal: game.price * game.amount,
        })));

    const total = useSelector(state =>
        state.cart.reduce((totalSum, product) => {
            return totalSum + product.price * product.amount;
        }, 0));

    const dispatch = useDispatch();


    function icrement(game) {
        dispatch(CartActions.updateAmount({
            id: game.id,
            amount: game.amount + 1,
        }));
    }

    function decrement(game) {
        dispatch(CartActions.updateAmount({
            id: game.id,
            amount: game.amount - 1,
        }));
    }

    const totalaqtd = useSelector(state =>
        state.cart.reduce((totalSum, product) => {
            return 10 * product.amount;
        }, 0));

  



    

    return (
        <main className="container">
            <div className="cart-container">
                <table className="game-table">
                    <thead>
                        <tr>
                            <th />
                            <th>Game</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(game => (
                            <tr key={game.id}>
                                <td>
                                    <img src={game.image} alt={game.name} />
                                </td>
                                <td>
                                    <strong>{game.name}</strong>
                                    <span>{game.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</span>
                                </td>
                                <td>
                                    <div>
                                        <button type="button" onClick={() => decrement(game)}>
                                            <FiMinusCircle size={20} color="#33bfcb0" />
                                        </button>

                                        <input type="number" readOnly value={game.amount} />

                                        <button type="button" onClick={() => icrement(game)}>
                                            <FiPlusCircle size={20} color="#33bfcb0" />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <strong>R$ {game.subtotal.toFixed(3).slice(0, -1)}</strong>
                                </td>
                                <td>
                                    <button type="button" onClick={() => dispatch(CartActions.removeFromCart(game.id))}>
                                        <FiXCircle size={20} color="#33bfcb0" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <footer>
                    <button type="button">Encomendar</button>

                    <div className="total">
                        <span>Frete</span>
                        <strong>{total >= 250 ? free :totalaqtd.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  }</strong>
                    </div>

                    <div className="total">
                        <span>Total</span>
                        <strong>R$ {total.toFixed(3).slice(0,-1)}</strong>
                    </div>

                 
                </footer>
            </div>
        </main>

    );
}