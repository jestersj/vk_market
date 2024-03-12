import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchCart} from "./store/reducers/actionCreators";
import ProductCard from "./components/ProductCard";
import {Card, CardGrid, SimpleCell, Spinner, SplitCol, SplitLayout} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import s from "./App.module.css";

const App = () => {
    const {cart, isLoading, error} = useAppSelector(state => state.cartSlice)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCart())
    }, [])
    const getTotalSum = () => {
        const sum = cart.reduce(
            (a, b) => a + b.count * b.price,
            0
        )
        return Math.round(sum)
    }
    return (
        <main className={s.cont}>
            {
                isLoading
                ?
                    <Spinner size={'large'}/>
                    :
                    <SplitLayout>
                        <SplitCol width={'75%'}>
                            <CardGrid size={'l'}>
                                {
                                    cart.map((product, ind) =>
                                        <ProductCard product={product} key={product.id} ind={ind}/>
                                    )
                                }
                            </CardGrid>
                        </SplitCol>
                        <SplitCol width={'25%'} fixed={true} autoSpaced={true}>
                            <Card mode={'shadow'}>
                                <SimpleCell>
                                    <strong>Итого: {getTotalSum()} руб.</strong>
                                </SimpleCell>
                            </Card>
                        </SplitCol>
                    </SplitLayout>
            }
            {error && <h1 className={s.text_center}>{error}</h1>}
        </main>
    );
};

export default App;