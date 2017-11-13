import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Provider that allows us to work and get parameters from the route given
import { Http } from '@angular/http';

import { ProvesService } from '../services/proves.service';

@Component({
  selector: 'app-proves-detail',
  templateUrl: './proves-detail.component.html',
  styleUrls: ['./proves-detail.component.css'],
  providers: [ProvesService]
})
export class ProvesDetailComponent implements OnInit {

	private routeSub: any;
	private req: any;
	prova: any;
	id: string;

	constructor(private route: ActivatedRoute, private _proves: ProvesService) { }

	ngOnInit() {

		// getting the prova id and requesting its data through service
		this.routeSub = this.route.params.subscribe(params => {
			this.id = params['id']; // provaId
			this.req = this._proves.get('*', this.id).subscribe(data => {
				this.prova = data;
			});
		});

	};

	ngOnDestroy() {

		this.routeSub.unsubscribe();
		this.req.unsubscribe();
		
	};

}