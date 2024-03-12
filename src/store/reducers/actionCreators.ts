import {createAsyncThunk} from "@reduxjs/toolkit";
import {IResponseProduct} from "../../types/types";
import axios from "axios";

export const fetchCart = createAsyncThunk<IResponseProduct[]>(
    'cart/fetch',
    async (_, thunkApi) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const {data} = await axios.get<IResponseProduct[]>('https://fakestoreapi.com/products')
            return data
        } catch (e) {
            return thunkApi.rejectWithValue({result: 0})
        }
    }
)