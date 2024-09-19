export interface IProductInteractor {
    createProduct(input: any): any;
    updateStock(id: string, stock: number): any;
    getProducts(limit: number, offset: number): any;
    getProductById(id: string): any;
}
