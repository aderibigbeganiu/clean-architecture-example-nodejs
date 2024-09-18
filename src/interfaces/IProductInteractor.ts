export interface IProductInteractor {
    createProduct(input: any): any;
    getProducts(limit: number, offset: number): any;
    updateStock(id: number, stock: number): any;
}
