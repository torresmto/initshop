import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  /* On défini les attributs de classe */
  products = [];
  prodSub: Subscription;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    /* On récupère la souscription */
    this.prodSub = this.prodService.prodSubject.subscribe(
      /* On écoute les données */
      (data) => {
        this.products = data;
      }
    );
  }
}
