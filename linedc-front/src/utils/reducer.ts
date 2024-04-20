export type Action =
  | { type: 'increase'; JAN: string }
  | { type: 'decrease'; JAN: string };


export interface skuType {
  name: string;
  JAN: string;
  price: number;
  count: number;
}

export interface purchaseType {
  category: string;
  skus: skuType[]
}

export const reducer = (state: purchaseType[], action: Action): purchaseType[] => {
  switch (action.type) {
    case 'increase':
      // Increase count of the sku with the matching JAN code
      return state.map(category => ({
        ...category,
        skus: category.skus.map(sku => 
          sku.JAN === action.JAN ? { ...sku, count: sku.count + 1 } : sku
        )
      }));

    case 'decrease':
      // Decrease count of the sku with the matching JAN code, but not less than 0
      return state.map(category => ({
        ...category,
        skus: category.skus.map(sku => 
          sku.JAN === action.JAN ? { ...sku, count: Math.max(sku.count - 1, 0) } : sku
        )
      }));

    default:
      return state;
  }
};
