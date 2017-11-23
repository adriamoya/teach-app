import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

	private routeSub: any;
	private req: any;
	perfil: [any];
	id: string;

	constructor(private route: ActivatedRoute, private _http: Http) { }

	ngOnInit() {

		this.routeSub = this.route.params.subscribe(params => {
			// console.log(params);
			this.id = params['id'];

			this._http.get('assets/json/perfil-detail.json').subscribe(data => {
				data.json().filter(item => {
					// console.log(item);
					if (item.id == this.id) {
						// console.log(item);
						this.perfil = item;
					}
				})
			})
		})
	};

	ngOnDestroy() {
		this.routeSub.unsubscribe();
		// this.req.unsubscribe();
	};
}