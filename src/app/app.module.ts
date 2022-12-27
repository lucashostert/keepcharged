import { ListCategoriaModule } from './pages/categoria/list-categoria/list-categoria.module';
import {ListaEventoModule} from './pages/evento/list/lista-evento.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsComponent} from './forms/forms.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {TablesComponent} from './tables/tables.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {AlertsComponent} from './alerts/alerts.component';
import {AccordionsComponent} from './accordions/accordions.component';
import {BadgesComponent} from './badges/badges.component';
import {ProgressbarComponent} from './progressbar/progressbar.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {PaginationComponent} from './pagination/pagination.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {TooltipsComponent} from './tooltips/tooltips.component';
import {CarouselComponent} from './carousel/carousel.component';
import {TabsComponent} from './tabs/tabs.component';
import {DashboardLayoutComponent} from './layouts/dashboard/dashboard-layout.component';
import {DefaultLayoutComponent} from './layouts/default/default-layout.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { FirestoreSettingsToken } from '@angular/fire/firestore';

import {environment} from '../environments/environment';

import {RepresentanteModule} from './pages/representante/manager/representante.module';
import {CropmodalModule} from './cropmodal/cropmodal.module';
import {PontoModule} from './pages/ponto/manager/ponto.module';
import {ListaPontoModule} from './pages/ponto/list/lista-ponto.module';
import {MapaOpcoesModule} from './pages/mapa/manager/mapa-opcoes.module';
import {ListaRepresentanteModule} from './pages/representante/list/lista-representante.module';
import {ListaPromocaoModule} from './pages/promocao/list/lista-promocao.module';
import {EventoModule} from './pages/evento/manager/evento.module';
import {PromocaoModule} from './pages/promocao/manager/promocao.module';
import { ManagerCategoriaComponent } from './pages/categoria/manager-categoria/manager-categoria.component';
import { FaleConoscoModule } from './pages/fale-conosco/fale-conosco.module';
import { TipoCabosManagerModule } from './pages/tipo-cabos/manager/tipo-cabos-manager.module';
import { TipoCabosListModule } from './pages/tipo-cabos/list/tipo-cabos-list.module';
import { CustoCarregamentoModule } from './pages/custo-carregamento/custo-carregamento.module';
import { LoginModule } from './pages/auth/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FormsComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    AlertsComponent,
    AccordionsComponent,
    BadgesComponent,
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    TabsComponent,
    DashboardLayoutComponent,
    DefaultLayoutComponent,
    ManagerCategoriaComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RepresentanteModule,
    CropmodalModule,
    PontoModule,
    ListaPontoModule,
    ListaEventoModule,
    ListaRepresentanteModule,
    MapaOpcoesModule,
    FaleConoscoModule,
    ListaPromocaoModule,
    ListCategoriaModule,
    EventoModule,
    PromocaoModule,
    TipoCabosManagerModule,
    TipoCabosListModule,
    CustoCarregamentoModule,
    LoginModule
  ],
  providers: [AngularFirestore, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
