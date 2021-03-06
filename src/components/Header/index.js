import React from 'react';
import {Link} from 'react-router-dom';

import { useSelector } from 'react-redux';

import Logo from '../../assets/game-console.png'
import {FiShoppingBag} from 'react-icons/fi';

import './styles.css';

export default function Header(){
    //calcular quantidade dentro do  state.cart.
    const cartSize = useSelector(state=>state.cart.length);

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img className="logo-icon" src={Logo} alt="Rocketshoes" />
                <span className="logo-text">E-Commerce.js</span>
            </Link>

            <Link to="/cart" className="header-cart">

                <div>
                    <strong>Cart</strong>
                    <span>
                        <strong>{cartSize}</strong> Jogos
                    </span>
                </div>
                <FiShoppingBag size={36} color="#FFF" />
            </Link>
        </header>
    )
}