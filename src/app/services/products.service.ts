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

}
