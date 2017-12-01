import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

// Services
import { AssignaturesService } from '../../services/assignatures.service';

// Interfaces
import { Assignatura } from '../../interfaces/assignatura.interface';

@Component({
  selector: 'app-assignatures-create',
  templateUrl: './assignatures-create.component.html',
  styleUrls: ['./assignatures-create.component.css']
})
export class AssignaturesCreateComponent  {

	private assignatura: Assignatura = {
		nom: '',
		curs: '2017',
		bio: ''
	};
	private id: string;
	private cursos: string[] = ['2017', '2018', '2019', '2020', '2021'];

	constructor(
		private _router: Router,
		private _assignatures: AssignaturesService) { }

	newAssignatura(){
		this._assignatures.add(this.assignatura)
			.subscribe(
				response => {
					this._router.navigate(['/assignatures']);
				}
			);
	}

}
