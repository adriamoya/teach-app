import { Component, OnDestroy } from '@angular/core';

// Services
import { CursosService } from '../../services/cursos.service';
import { AssignaturesService } from '../../services/assignatures.service';

// Interfaces
import { Curs } from '../../interfaces/curs.interface';
import { Assignatura } from '../../interfaces/assignatura.interface';

@Component({
  selector: 'app-assignatures-list',
  templateUrl: './assignatures-list.component.html',
  styleUrls: ['./assignatures-list.component.css'],
  providers: []
})
export class AssignaturesListComponent implements OnDestroy {

	private subCursos: any;
	private subAssignatures: any;
	private title = "Assignatures";
	private cursos: Curs[];
	private assignatures: Assignatura[] = [];
	private assignaturesList: Assignatura[];

	constructor(
		private _cursos: CursosService,
		private _assignatures:AssignaturesService) {
		this.subCursos = this._cursos.list()
			.subscribe(
				cursos => {
					console.log(cursos);
					// for the list-group we must set one curs active (last one)
					for (let curs of cursos) {
						curs.active = false;
					};
					cursos[cursos.length-1].active = true;
					this.cursos = cursos;
				})
		this.subAssignatures = this._assignatures.list()
			.subscribe(
				response => {
					console.log(response);
					this.assignaturesList = response;
				})
	}

	onChange(event) {
		let cursId = event.target.id;
		this.assignatures = this.assignaturesList
								.filter(
									(assignatura) => assignatura.curs == cursId
								)
	}

	ngOnDestroy() {
		this.subCursos.unsubscribe();
		this.subAssignatures.unsubscribe();
	}

}
