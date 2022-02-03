import {Component, Input, OnInit} from '@angular/core';
import {Products} from '../../models/products';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {

  /* on déclare l'attribut products et on le rattache */
  @Input() products: Products[];
  /* on déclare l'attribut pour le préfixe de l'url des médias */
  prefUrlImage = `${environment.prefUrlImage}`;

  constructor() { }

  ngOnInit(): void {
  }

}
