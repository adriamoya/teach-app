import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProvesUpdateDetailComponent } from './proves-update-detail.component';
import { ProvesService } from '../services/proves.service';

@Component({
  selector: 'app-proves-update',
  templateUrl: './proves-update.component.html',
  styleUrls: ['./proves-update.component.css'],
  providers: [ProvesService]
})
export class ProvesUpdateComponent implements OnInit {

	private routeSub: any;
	private req: any;
	prova: any;
	id: string;

	menuSelection: string = "general";


	constructor(private route: ActivatedRoute, private _proves: ProvesService) { }

	ngOnInit() {

		this.routeSub = this.route.params.subscribe(params => {
			this.id = params['id'];
			this.req = this._proves.get('*', this.id).subscribe(data => {
				this.prova = data;
			});
		});
	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.req.unsubscribe();
	};
}
