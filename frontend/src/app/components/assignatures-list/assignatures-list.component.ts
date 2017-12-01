import { Component, OnDestroy } from '@angular/core';
import { AssignaturesService } from '../../services/assignatures.service';

@Component({
  selector: 'app-assignatures-list',
  templateUrl: './assignatures-list.component.html',
  styleUrls: ['./assignatures-list.component.css'],
  providers: []
})
export class AssignaturesListComponent implements OnDestroy {

	private req: any;
	private title = "Assignatures";
	private assignaturesList: any[] = [];

	constructor(private _assignatures:AssignaturesService) {
		this.req = this._assignatures.list().subscribe(data=>{
			this.assignaturesList = data;
		});
	}

	ngOnDestroy() {
		this.req.unsubscribe();
	}

}
