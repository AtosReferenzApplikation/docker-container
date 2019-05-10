import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicChatComponent } from './basic-chat/basic-chat.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { CustomerChatComponent } from './customer-chat.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    FormsModule
  ],
  declarations: [
    CustomerChatComponent,
    BasicChatComponent,
    VideoChatComponent
  ],
  exports: [
    CustomerChatComponent,
    BasicChatComponent,
    VideoChatComponent
  ]
})
export class CustomerChatModule { }
