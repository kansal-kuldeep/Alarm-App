import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedDataService } from '../shared/services/shareddata.service';
import { AlarmDTO } from '../shared/dto/alarmDTO';
import { SeverityDTO } from '../shared/dto/severityDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  alarmsInfoData: any;
  alarms: Array<AlarmDTO>;
  alarmsToDisplay: Array<AlarmDTO>;
  severityTypes: Array<SeverityDTO>;
  navbarMenuItems: MenuItem[] = [
    {label: "Alarms", command: (click) => {
      this.onMenuOptionChange("Alarms");
    }},
    {label: "Node Types", command: (click) => {
      this.onMenuOptionChange("NodeTypes");
    }}
  ];
  activeItem: MenuItem;
  cols: Array<any> = [
    { field: 'condition-severity', header: 'Severity' },
    { field: 'additional-text', header: 'Description'},
    { field: 'node-type', header: 'Node Type' },
    { field: 'manual-clearable', header: 'Clearable' },
    { field: 'state', header: 'State' },
    { field: 'last-raise-time', header: 'Raise Time' }
  ];
  isHighlightSeverity: boolean = true;
  chartData: any;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.getAlarmsData().subscribe(data => {
      this.alarmsInfoData = data;
      this.alarms = data["items"];
      this.alarmsToDisplay = this.alarms;
      this.severityTypes = this.alarmsInfoData["facets"]["condition-severity"];

      if (this.severityTypes) {
        this.severityTypes.forEach(item => {
          this.navbarMenuItems.push({label: `${item.key} (${item.count})`, command: (click) => {
            this.onMenuOptionChange(item.key);
          }});
        });
      }

      this.chartData = {
        labels: this.severityTypes.map(severity => severity.key),
        datasets: [
          {
            data: this.severityTypes.map(severity => severity.count),
            backgroundColor: [
                "#e71d1d",
                "#ef8e00",
                "#ddd326"
            ]
          }
        ]
      }
    });
  }

  onMenuOptionChange(selectedMenuItem: string) {
    if (selectedMenuItem === "Alarms") {
      this.alarmsToDisplay = this.alarms;
      this.isHighlightSeverity = true;
    } else if (selectedMenuItem === "NodeTypes") {
      this.alarmsToDisplay = this.alarms;
      this.alarmsToDisplay.sort((a, b) => (a["node-type"] > b["node-type"]) ? 1 : -1);
      this.isHighlightSeverity = true;
    } else {
      this.alarmsToDisplay = this.alarms.filter((item) => item["condition-severity"] == selectedMenuItem);
      this.isHighlightSeverity = false;
    }
  }

}
