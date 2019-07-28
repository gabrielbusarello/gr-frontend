import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { UserService } from '../../services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

import { UserResponse } from 'src/app/shared/user.model';
import { DefaultResponse } from 'src/app/shared/app.model';

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

  constructor( private userService: UserService, private modalService: NgbModal, private utils: UtilsService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers()
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<UserResponse>>) => {
          this.users = response.data;

          if (response.status !== 1) {
            this.utils.showToast(response.status, response.mensagem);
            this.users = [];
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
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
        this.userService.deleteUser(id)
          .subscribe(
            (response: DefaultResponse<UserResponse>) => {
              this.utils.showToast(response.status, response.mensagem);
              this.getUsers();
            },
            (err: HttpErrorResponse) => {
              this.utils.showToast(err.error.status, err.error.mensagem || err.message);
            }
          );
      }
    }, () => {});
  }

}
