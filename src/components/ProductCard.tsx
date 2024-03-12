import React, {FC} from 'react';
import {Card, IconButton, Image, SimpleCell} from "@vkontakte/vkui";
import {IProduct} from "../types/types";
import {useAppDispatch} from "../hooks/redux";
import {decrementCount, incrementCount, removeProduct} from "../store/reducers/cartSlice";
import {Icon28AddCircleOutline, Icon28Delete, Icon28RemoveCircleOutline} from "@vkontakte/icons";
import s from "./ProductCard.module.css";

interface Props {
    product: IProduct,
    ind: number
}
const ProductCard: FC<Props> = ({product, ind}) => {
    const dispatch = useAppDispatch()
    const increment = () => {
        dispatch(incrementCount(ind))
    }
    const decrement = () => {
        dispatch(decrementCount(ind))
    }
    const remove = () => {
        dispatch(removeProduct(product.id))
    }
    return (
        <Card mode={'shadow'}>
            <SimpleCell>
                <Image src={product.image} size={96}/>
            </SimpleCell>
            <SimpleCell
                subtitle={product.description}
                multiline={true}
            >
                {product.title}
            </SimpleCell>
            <SimpleCell>
                Цена: {product.price}
            </SimpleCell>
            <SimpleCell
                after={
                    <IconButton label={'Удалить'} onClick={remove}>
                        <Icon28Delete/>
                    </IconButton>
                }
            >
                <div className={s.button_cont}>
                    Количество:
                    <IconButton label={'Увеличить количество'} onClick={increment}>
                        <Icon28AddCircleOutline/>
                    </IconButton>
                    {product.count}
                    <IconButton label={'Уменьшить количество'} onClick={decrement}>
                        <Icon28RemoveCircleOutline/>
                    </IconButton>
                </div>
            </SimpleCell>
        </Card>
    );
};

export default ProductCard;