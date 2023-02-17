import create from "zustand";

type ProductStore = {
  products: any[];
  shoppingCart: any[];
  addProduct: (products: any) => void;
  addShoppingCartProduct: (product: any) => void;
  removeProduct: () => void;
  setShoppingCart: (products: any) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  shoppingCart: [],
  addProduct: (products) => set((state) => ({ products })),
  addShoppingCartProduct: (product) =>
    set((state) => ({ shoppingCart: [...state.shoppingCart, product] })),
  removeProduct: () => set({ products: [] }),
  setShoppingCart: (products) => set({ shoppingCart: products }),
}));
