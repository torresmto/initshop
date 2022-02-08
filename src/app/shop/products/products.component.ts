import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../services/products.service';
import {Products} from '../../models/products';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  /* On défini les attributs de classe */
  products: Products[] = [];
  prefUrlImage = `${environment.prefUrlImage}`;
  prodSub: Subscription;
  currentPage = 0;
  /* Nombre total de pages */
  pages = [];
  /* Déclaration du nombre de produits par page */
  numberOfProductByPage = 9;

  /* on injecte le service du panier */
  constructor(private prodService: ProductsService,
              private cartService: CartService) { }

  ngOnInit(): void {
    /* On récupère la souscription */
    this.prodSub = this.prodService.prodSubject.subscribe(
      /* On écoute les données */
      /* On passe par le service pour lui passer les produits de la page courante */
      /* Pagination dynamique */
      (data) => {
        if (data.length) {
          const totalPages = data.length / this.numberOfProductByPage;
          const newPages = [];
          for (let index = 0; index < totalPages; index++) {
            newPages[index] = index;
          }
          this.pages = newPages;
        }
        this.products = this.prodService.getProductsByPage(this.currentPage);
      }
    );
    /* On récupère les données */
    this.prodService.emitProducts();
  }

  ngOnDestroy(): void {
    /* On se désabonne de l'observable */
    this.prodSub.unsubscribe();
  }

  addToCart(product: Products): void {
    /* on utilise le service "cart" pour utiliser la méthode d'ajout au panier */
    this.cartService.addProductsToCart(product);
  }

  deleteToCart(product: Products): void {
    /* on utilise le service "cart" pour utiliser la méthode de suppression du panier */
    this.cartService.deleteFromCart(product);
  }

  /**
   * Méthode permettant de changer de page
   * @param numberPage number
   */
  changePage(numberPage: number): void {
    /* cette méthode nous retourne le tableau de données dans "prod" */
    const prod = this.prodService.getProductsByPage(numberPage);
    /* on teste qu'on a bien des données produits" */
    if (prod) {
      /* si "prod" existe, on peut lui passer la liste des produits */
      this.products = prod;
      /* on change le "currentPage" */
      this.currentPage = numberPage;
    }
  }

  /**
   * Méthode permettant d'afficher la page suivante des produits
   */
  nextPage(): void {
    /* on stocke l'incrémentation du "currentPage" */
    const newCurrentPage = this.currentPage + 1;
    /* Dans la méthode, on va lui remettre la page suivante */
    /* Pour cela, on aura juste à incrémenter le "currentPage" */
    const prod = this.products = this.prodService.getProductsByPage(newCurrentPage);
    /* On teste si "prod" existe */
    if (prod) {
      /* on ajoute la liste produits dans "prod" */
      this.products = prod;
      /* on incrémente la page courante */
      this.currentPage = newCurrentPage;
    }
  }


  /**
   * Méthode permettant d'afficher la page précédente des produits
   */
  prevPage(): void {
    /* on stocke la décrémentation du "currentPage" */
    const newCurrentPage = this.currentPage - 1;
    const prod = this.products = this.prodService.getProductsByPage(newCurrentPage);
    if (prod) {
      this.products = prod;
      /* on décrémente la page courante */
      this.currentPage = newCurrentPage;
    }
  }
}
