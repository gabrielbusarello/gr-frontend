import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() public collapsedSidebar: EventEmitter<void> = new EventEmitter<void>();

  constructor( private router: Router ) { }

  ngOnInit() {
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

}
