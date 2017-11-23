import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignatures-create',
  templateUrl: './assignatures-create.component.html',
  styleUrls: ['./assignatures-create.component.css']
})
export class AssignaturesCreateComponent implements OnInit {

	private routeSub: any;
	// private req: any;
	assignatura: any;
	id: string;

	menuSelection: string = "general";

	constructor() { }

	ngOnInit() {

	};


	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {

	};

}
