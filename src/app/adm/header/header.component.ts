import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Output() public collapsedSidebar: EventEmitter<void> = new EventEmitter<void>();

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = document.querySelector('#avatar');
    const canvasx: CanvasRenderingContext2D = canvas.getContext('2d');
    canvasx.beginPath();
    canvasx.fillStyle = '#fafafa';
    canvasx.arc(20, 20, 20, 0, 2 * Math.PI);
    canvasx.fill();
    canvasx.fillStyle = '#dcd2aa';
    canvasx.font = '18px sans-serif';
    const nomeS: Array<string> = this.name.split(' ');
    const avatar: string = nomeS[0][0] + nomeS.pop()[0];
    canvasx.fillText(avatar.toUpperCase(), 7, 27);
  }

  /**
   * collapseSidebar()
   */
  public collapseSidebar(): void {
    this.collapsedSidebar.emit();
  }

  /**
   * logout
   */
  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  /**
   * name
   */
  get name(): string {
    return localStorage.getItem('nomeUsuario');
  }

}
