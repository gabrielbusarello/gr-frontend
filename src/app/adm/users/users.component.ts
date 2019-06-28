import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { UserService } from '../../services/user.service';

import { UserResponse } from 'src/app/shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [ UserService ]
})
export class UsersComponent implements OnInit {

  public users: Array<UserResponse>;

  public namePermission = {
    I: 'Interno',
    P: 'Prestador',
    C: 'Cliente'
  };

  constructor( private userService: UserService, private modalService: NgbModal ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (response: Array<UserResponse>) => {
        this.users = response;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /**
   * delete
   * @param id: number
   * @param name: string
   */
  public delete(id: number, name: string) {
    const modal = this.modalService.open(DeleteComponent, { centered: true });
    modal.componentInstance.name = name;
    modal.result.then(resultado => {
      if (resultado.status) {
        this.userService.deleteUser(id).subscribe(
          (response: any) => {
            console.log(response);
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    }, () => {});
  }

}
