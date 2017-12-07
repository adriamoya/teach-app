import { Component } from '@angular/core';

// Services
import { AlumnesService } from '../../services/alumnes.service';
import { ClassesService } from '../../services/classes.service';

// Interfaces
import { Classe } from '../../interfaces/classe.interface';
import { Alumne } from '../../interfaces/alumne.interface';

@Component({
  selector: 'app-alumnes-list',
  templateUrl: './alumnes-list.component.html',
  styleUrls: ['./alumnes-list.component.css']
})
export class AlumnesListComponent {

	private subAlumnes: any;
	private subClasses: any;
	private title = "Alumnes";
	private alumnesList: [Alumne];
	private classesList: [Classe]

	constructor(
		private _alumnes: AlumnesService,
		private _classes: ClassesService) {
		this.subAlumnes = this._alumnes.list().subscribe(data => {
			this.alumnesList = data;
		});
		this.subClasses = this._classes.list().subscribe(data => {
			this.classesList = data;
		});
	};

	ngOnDestroy() {
		this.subAlumnes.unsubscribe();
		this.subClasses.unsubscribe();
	};
};