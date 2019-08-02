import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.sass']
})
export class AdmComponent implements OnInit, OnDestroy {

  public collapsedSidebar: boolean;
  public page: string;
  public action: string;
  public link: string;

  private subRoute: Subscription;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.getRouteName();
    this.subRoute = this.router.events.subscribe(route => {
      this.getRouteName();
      if (route instanceof NavigationEnd) {
        this.collapsedSidebar = false;
      }
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  /**
   * collapseSidebar
   */
  public collapseSidebar(): void {
    this.collapsedSidebar = !this.collapsedSidebar;
  }

  private getRouteName(): void {
    const rota: Array<string> = this.router.url.split('/');
    this.action = rota[1] && rota[2] ? (rota[3] ? 'Editar' : 'Adicionar') : undefined;
    this.link = rota[1];
    switch (rota[1]) {
      case 'usuarios':
        this.page = 'Usuários';
        break;
      case 'despesas':
        this.page = 'Despesas';
        break;
      case 'ferramentas':
        this.page = 'Ferramentas';
        break;

      default:
        this.page = undefined;
    }
  }

}
