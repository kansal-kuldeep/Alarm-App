import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {

  selectedMenuItem: SelectItem; 
  menuItems: SelectItem[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.menuItems = [
      {label: 'Item1', value: 'Item1'},
      {label: 'Item2', value: 'Item2'},
      {label: 'Item3', value: 'Item3'},
    ];
  }

  onMenuSelection(selectedItem: SelectItem) {
    this.messageService.add({severity:'success', summary:`${selectedItem} has been activated.`});
  }

}
