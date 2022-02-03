import {Component, Input, OnInit} from '@angular/core';
import {Products} from '../../models/products';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.css']
})
export class ModalAddToCartComponent implements OnInit {

  /* on déclare l'attribut products et on le rattache */
  @Input() products: Products[];
  /* on déclare l'attribut pour le préfixe de l'url des médias */
  prefUrlImage = `${environment.prefUrlImage}`;

  constructor() { }

  ngOnInit(): void {
  }

}
