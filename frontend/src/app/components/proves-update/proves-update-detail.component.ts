import { Component, OnInit, Input } from '@angular/core';

import { AssignaturesService } from '../../services/assignatures.service';

import { ProvesUpdateComponent } from './proves-update.component';


@Component({
	selector: 'app-proves-update-detail',
	templateUrl: './proves-update-detail.component.html',
	styleUrls: ['./proves-update.component.css'],
	providers: []
})

export class ProvesUpdateDetailComponent implements OnInit {

	// passed from parent ProvesUpdateComponent
	@Input() prova: any;
	@Input() assignatura: any;
	@Input() menuSelection: string;
	req: any;
	assignaturesList: [any];

	constructor(private _assignatures: AssignaturesService) { };

	ngOnInit() {

		this.req = this._assignatures.list().subscribe(data => {
			this.assignaturesList = data;
		});

	};

	ngOnDestroy() {
		this.req.unsubscribe();
	};
}
