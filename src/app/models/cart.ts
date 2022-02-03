import {Products} from './products';

export interface Cart {
  /* le nombre de fois que nous avons un produit dans le panier */
  quantity: number;
  product: Products;
}
