import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/types";
import {fetchCart} from "./actionCreators";

interface IState {
    cart: IProduct[]
    isLoading: boolean
    error: string
}

const initialState: IState = {
    cart: [],
    isLoading: false,
    error: ''
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementCount(state, action: PayloadAction<number>) {
            const ind = action.payload
            if (state.cart[ind].count < 10) {
                state.cart[ind].count++
            }
        },
        decrementCount(state, action: PayloadAction<number>) {
            const ind = action.payload
            if (state.cart[ind].count > 1) {
                state.cart[ind].count--
            }
        },
        removeProduct(state, action: PayloadAction<number>) {
            const filteredArr = state.cart.filter(el => el.id !== action.payload)
            state.cart = [...filteredArr]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.cart = action.payload.map(el => {
                    return {...el, count: 1}
                })
                state.error = ''
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false
                state.error = 'Произошла ошибка'
            })
    }
})

export const {
    incrementCount,
    decrementCount,
    removeProduct
} = cartSlice.actions
export default cartSlice.reducer