import { Component, OnInit } from '@angular/core';
import { AssignaturesService } from '../services/assignatures.service';

@Component({
  selector: 'app-assignatures-list',
  templateUrl: './assignatures-list.component.html',
  styleUrls: ['./assignatures-list.component.css'],
  providers: [AssignaturesService]
})
export class AssignaturesListComponent implements OnInit {

	private req: any;
	title = "Assignatures";
	assignaturesList: [any];

	constructor(private _assignatures:AssignaturesService) { }

	ngOnInit() {
		this.req = this._assignatures.list().subscribe(data=>{
			this.assignaturesList = data as [any];
		});
	}

	ngOnDestroy() {
		this.req.unsubscribe();
	}

}
