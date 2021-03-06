import { createAction } from '@reduxjs/toolkit';
 
export const addToCart = createAction('cart/add_game');
export const removeFromCart = createAction('cart/remove_game');
export const updateAmount = createAction('cart/update_amount');
