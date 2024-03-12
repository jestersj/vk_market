export interface IResponseProduct {
    id: number
    title: string
    description: string
    image: string
    price: number
}

export interface IProduct extends IResponseProduct {
    count: number
}