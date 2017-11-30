import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Provider that allows us to work and get parameters from the route given
import { Http } from '@angular/http';

import { ProvesService } from '../../services/proves.service';
import { AssignaturesService } from '../../services/assignatures.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-proves-detail',
  templateUrl: './proves-detail.component.html',
  styleUrls: ['./proves-detail.component.css'],
  providers: []
})
export class ProvesDetailComponent implements OnInit {

	private routeSub: any;
	private reqProva: any;
	private reqAssignatura: any;
	private prova: any;
	private assignatura: any;
	private id: string;

	constructor(
		private _route: ActivatedRoute, 
		private _proves: ProvesService,
		private _assignatures: AssignaturesService) { }

	ngOnInit() {

		// getting the prova id and requesting its data through service
		this.routeSub = this._route.params.subscribe(params => {
			this.id = params['id']; // provaId

			// query the prova JSON with the provaId
			this.reqProva = this._proves.get(this.id)
				.subscribe(resp=> {
					this.prova = resp;
					console.log(this.prova);

					this.reqAssignatura = this._assignatures.get(this.prova.assignatura)
						.subscribe(resp => {
							this.assignatura = resp;
					});
			});
		});

	};

	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.reqProva.unsubscribe();
		this.reqAssignatura.unsubscribe();
	};

}
