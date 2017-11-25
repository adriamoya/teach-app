import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProvesUpdateDetailComponent } from './proves-update-detail.component';
import { ProvesService } from '../../services/proves.service';

@Component({
  selector: 'app-proves-update',
  templateUrl: './proves-update.component.html',
  styleUrls: ['./proves-update.component.css'],
  providers: [ProvesService]
})
export class ProvesUpdateComponent implements OnInit {

	private routeSub: any;
	private reqProva: any;
	private prova: any;
	private id: string;

	menuSelection: string = "general";


	constructor(
		private _route: ActivatedRoute, 
		private _proves: ProvesService) { }

	ngOnInit() {

		this.routeSub = this._route.params.subscribe(params => {
			this.id = params['id'];

			// query the prova JSON with provaId
			this.reqProva = this._proves.get(this.id)
				.subscribe(resp => {
				this.prova = resp;
			});
		});
	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.reqProva.unsubscribe();
	};
}
