import { ManagerCategoriaComponent } from './pages/categoria/manager-categoria/manager-categoria.component';
import { ListCategoriaComponent } from './pages/categoria/list-categoria/list-categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DefaultLayoutComponent } from './layouts/default/default-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard/dashboard-layout.component';
import { PontoComponent } from './pages/ponto/manager/ponto.component';
import { ListaPontoComponent } from './pages/ponto/list/lista-ponto.component';
import { AuthGuardService } from './services/auth.guard.service';
import { RepresentanteComponent } from './pages/representante/manager/representante.component';
import { ListaRepresentanteComponent } from './pages/representante/list/lista-representante.component';
import { RepresentanteGuardService } from './services/representante.guard.service';
import { EventoComponent } from './pages/evento/manager/evento.component';
import { ListaEventoComponent } from './pages/evento/list/lista-evento.component';
import { PromocaoComponent } from './pages/promocao/manager/promocao.component';
import { ListaPromocaoComponent } from './pages/promocao/list/lista-promocao.component';
import { MapaOpcoesComponent } from './pages/mapa/manager/mapa-opcoes.component';
import { FaleConoscoComponent } from './pages/fale-conosco/list/fale-conosco.component';
import { FaleComponent } from './pages/fale-conosco/manager/fale.component';
import { TipoCabosListComponent } from './pages/tipo-cabos/list/tipo-cabos-list.component';
import { TipoCabosManagerComponent } from './pages/tipo-cabos/manager/tipo-cabos-manager.component';
import { CustoCarregamentoComponent } from './pages/custo-carregamento/list/custo-carregamento.component';
import { CustoComponent } from './pages/custo-carregamento/manager/custo.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/estabelecimentos', pathMatch: 'full' },
      { path: 'forms', component: FormsComponent },
      { path: 'buttons', component: ButtonsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'accordions', component: AccordionsComponent },
      { path: 'badges', component: BadgesComponent },
      { path: 'progressbar', component: ProgressbarComponent },
      { path: 'breadcrumbs', component: BreadcrumbsComponent },
      { path: 'pagination', component: PaginationComponent },
      { path: 'dropdowns', component: DropdownComponent },
      { path: 'tooltips', component: TooltipsComponent },
      { path: 'carousel', component: CarouselComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'estabelecimento', component: PontoComponent },
      { path: 'estabelecimento/:id', component: PontoComponent },
      { path: 'estabelecimentos', component: ListaPontoComponent },
      { path: 'evento', component: EventoComponent },
      { path: 'evento/:id', component: EventoComponent },
      { path: 'eventos', component: ListaEventoComponent },
      { path: 'promocao', component: PromocaoComponent },
      { path: 'promocao/:id', component: PromocaoComponent },
      { path: 'promocoes', component: ListaPromocaoComponent },
      { path: 'faleConosco', component: FaleConoscoComponent },
      { path: 'fale', component: FaleComponent },
      { path: 'fale/:id', component: FaleComponent },
      { path: 'tipocabos', component: TipoCabosListComponent },
      { path: 'tipocabo', component: TipoCabosManagerComponent },
      { path: 'tipocabo/:id', component: TipoCabosManagerComponent },
      { path: 'custocarregamento', component: CustoCarregamentoComponent },
      { path: 'custo', component: CustoComponent },
      { path: 'custo/:id', component: CustoComponent }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuardService, RepresentanteGuardService],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'representante', component: RepresentanteComponent },
      { path: 'representante/:id', component: RepresentanteComponent },
      { path: 'representantes', component: ListaRepresentanteComponent },
      { path: 'categoria', component: ManagerCategoriaComponent },
      { path: 'categoria/:id', component: ManagerCategoriaComponent },
      { path: 'categorias', component: ListCategoriaComponent },
      { path: 'mapaopcoes', component: MapaOpcoesComponent }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
