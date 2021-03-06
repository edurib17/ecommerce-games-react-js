import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';

import { FiShoppingBag } from 'react-icons/fi';

import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import './styles.css';

export default function Home() {
    const [games, setGames] = useState([]);

    //tilizar o useSelector para obter os dados da store e vai armazenar os itens no cart
    const amount = useSelector(state =>
        state.cart.reduce((sumAmount,game)=>{
            sumAmount[game.id] = game.amount;

            return sumAmount;
        },{})
        );

        const dispatch = useDispatch();

    //Passando os dados do game com payload
    function handleAddGame(game){
        dispatch(CartActions.addToCart(game));
    }

    //Renderizar os itens da api products.json
    useEffect(() => {
        async function loadGames() {
            const response = await api.get('/games');

            setGames(response.data);
        }
        loadGames();
    }, [])


    return (
        <main className="container">
            <ul className="game-catalog">
                {games.map(game => (
                    <li key={game.id} className="game-container">
                        <img src={game.image} alt="game.name" />
                        <strong>{game.name}</strong>
                        <span>{game.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>

                        <button type="button" onClick={() => handleAddGame(game)}>
                            <div>
                                <FiShoppingBag size={16} color="#33bfcb" />{' '}
                                {amount[game.id] || 0}
                         </div>
                            <span>Adicionar</span>
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}

