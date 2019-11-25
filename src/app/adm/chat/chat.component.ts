import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { Subject, Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { DefaultResponse, DefaultId } from 'src/app/shared/app.model';
import { ScheduleResponse } from 'src/app/shared/schedule.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';
import Chat, { ChatResponse } from 'src/app/shared/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
  providers: [ ChatService ]
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() public idSchedule: number;
  public messages: Array<ChatResponse>;

  public messages$: Subject<Array<ChatResponse>> = new Subject<Array<ChatResponse>>();
  public timer$: Subscription;

  public formChat: FormGroup = new FormGroup({
    message: new FormControl(null, [ Validators.required ])
  });

  constructor( public activeModal: NgbActiveModal, private chatService: ChatService, private utils: UtilsService ) { }

  ngOnInit() {
    this.messages$.subscribe(() => {
      this.chatService.getMessages(this.idSchedule)
        .pipe(take(1))
        .subscribe(
          (response: DefaultResponse<Array<ChatResponse>>) => {
            this.messages = response.data;

            if (response.status !== 1) {
              this.utils.showToast(response.status, response.mensagem);
              this.messages = [];
            }
          },
          (err: HttpErrorResponse) => {
            this.utils.showToast(err.error.status, err.error.mensagem || err.message);
          }
        );
    });
    this.timer$ = interval(1000).subscribe((time) => {
      this.messages$.next();
    });
  }

  ngOnDestroy() {
    this.messages$.unsubscribe();
    this.timer$.unsubscribe();
  }

  /**
   * user
   */
  get user(): number {
    return Number.parseInt(localStorage.getItem('idUsuario'), 10);
  }

  /**
   * sendChat
   */
  public sendChat() {
    const chat: Chat = new Chat(
      this.formChat.controls.message.value,
      new DefaultId(this.idSchedule)
    );

    this.chatService.sendMessage(chat)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ScheduleResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.formChat.reset();
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

}
