import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [ConfirmationService]
})
export class HeaderComponent implements OnInit {  

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {
    
  }

  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to leave the page?',
      accept: () => {
        window.close();
      }
    });
  }

}
