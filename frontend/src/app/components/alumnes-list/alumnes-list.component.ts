import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-alumnes-list',
  templateUrl: './alumnes-list.component.html',
  styleUrls: ['./alumnes-list.component.css']
})
export class AlumnesListComponent implements OnInit {

	private req: any;
	title = "Alumnes";
	alumnesList: [any];

	constructor(private _http: Http) { }

	ngOnInit() {
		this.req = this._http.get('assets/json/alumnes-list.json').subscribe(data => {
			// console.log(data.json());
			this.alumnesList = data.json() as [any];
		})
	}

	ngOnDestroy() {
		this.req.unsubscribe();
	}
}
