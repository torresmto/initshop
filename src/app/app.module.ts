import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Import des composants utiles pour le projet*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './shop/products/products.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { CartComponent } from './shop/cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';

/*On définit un Router*/
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ModalAddToCartComponent } from './shop/modal-add-to-cart/modal-add-to-cart.component';
import { ModalQuickViewComponent } from './shop/modal-quick-view/modal-quick-view.component';

/*On déclare une constante de type route*/
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'cart', component: CartComponent},
  {path: 'single-product/:id', component: SingleProductComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'notFound', component: NotFoundComponent},
  /* redirection si chemin vide */
  {path: '', component: ShopComponent},
  /* redirection si chemin non connu vers le composant notFound */
  {path: '**', redirectTo: 'notFound', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    NotFoundComponent,
    ModalAddToCartComponent,
    ModalQuickViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
