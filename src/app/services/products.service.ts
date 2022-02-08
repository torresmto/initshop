import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { environment } from './../../environments/environment';
import {Result} from '../models/result';
import {Products} from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  /* Déclaration d'un tableau de produits et initialisé */
  products: Products[] = [];
  /* Déclaration de l'Observable typé tableau de produits */
  prodSubject = new Subject<Products[]>();
  /* Déclaration du nombre de produits par page */
  numberOfProductByPage = 9;

  constructor(private http: HttpClient) {
    /* A chaque fois que l'on appelle le service, il faut MAJ les données */
    this.getProductsFromServer();
  }

  /**
   * Méthode permettant de mettre dans notre Observable les produits
   */
  emitProducts(): void {
    this.prodSubject.next(this.products);
  }

  getProductsFromServer(): void {
    /* Utilisation de l'API Locale */
    const url = `${environment.API + 'products?' + environment.API_KEY}`;
    /* Si PB API Locale, Utilisation de l'API WEB */
    const urlweb = `${environment.API_WEB + 'products?' + environment.API_KEY}`;
    /* On exécute la requête ci-dessus qui nous retourne un observable */
    this.http.get(urlweb).subscribe(
      /* On déclare notre objet de résultat des produits */
      (dataProducts: Result) => {
        /* Dans le cas où l'on récupère les données */
        if (dataProducts.status === 200) {
          /* on remplit le tableau products[] avec le résultat de la requête */
          this.products = dataProducts.result;
          /* on met à disposition les données dans notre observable */
          this.emitProducts();
        } else {
          /* Dans le cas où l'on a une erreur */
          console.log('Error : ' + dataProducts.message);
        }
      }
    );
  }

  /**
   * Méthode permettant de retourner un produit via son id
   * @param idProduct Products
   */
  getProductById(idProduct: number): Products {
    /* on parcoure tous les éléments et on cherche l'élément qui a l'id */
    /* que l'on a reçu en paramètre. On stocke le résultat dans "product" */
    const product = this.products.find(element => element.idProduct === idProduct);
    /* on teste si l'élément existe */
    if (product) {
      /* on retourne l'élément */
      return product;
    }
    /* sinon, on ne retourne rien */
    return null;
  }

  /**
   * Méthode permettant de nous retourner les produits par page
   * correspondant au numéro de page
   * @param numberPage Products[]
   */
  getProductsByPage(numberPage: number): Products[] {
    /* on stocke le nombre de produits que l'on a récupéré / par le nombre de produits à afficher par page */
    const nbTotalPages = this.products.length / this.numberOfProductByPage;
    /* on teste si le nombre de page est > 0 et s'il est < au nombre de page total que l'on peut avoir */
    /* pour connaître le nombre maxi de pages, on prend le nombre de produits divisé par le nombre de produits par page */
    if (numberPage > 0 || numberPage < nbTotalPages) {
      /* on recherche dans notre tableau de produits, la portion du tableau contenant les produits  */
      /* on utilise la méthode "slice" qui prend en paramètre l'indice de début et de fin */
      let prodResult: Products[];
      prodResult = this.products.slice(numberPage * this.numberOfProductByPage, (numberPage + 1) * this.numberOfProductByPage);
      return prodResult;
    }
    return null;
  }

}
