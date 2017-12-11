import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos-create',
  templateUrl: './cursos-create.component.html',
  styles: []
})
export class CursosCreateComponent implements OnDestroy {

	private curs: Curs = {
		nom: "",
	}

	constructor(
		private _router: Router,
		private _cursos: CursosService,
		) { }


	newCurs() {
		let curs: Curs = this.curs;
		this._cursos.add(curs)
			.subscribe(
				response => {
					console.log(response);
					this._router.navigate(['/home']);
				});
	}

	ngOnDestroy() {
 		
 	}

}
