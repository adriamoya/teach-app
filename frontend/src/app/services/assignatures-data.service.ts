import { Injectable } from "@angular/core"; 
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs';  

@Injectable()
export class AssignaturesDataService {

	// Observable source
	// private assignaturaSource = new Subject<any>();
	private data: any;
	private alumnes: any;

	// Observable stream
	// private assignaturaSource$ = this.assignaturaSource.asObservable();

	constructor() { }

	// Service commands
	passAssignatura(assignatura:any) {
		// this.assignaturaSource.next(assignatura);
		this.data = assignatura;
	}

	getAssignatura() {
		return this.data;
		// return this.assignaturaSource.asObservable();
	}

		// Select distinct de alumnes
	// ----------------------------------------------
	get_distinct_alumnes() {
		
		let alumnes = [];

		for (var i in this.data.proves_assignatura) {
			var prova = this.data.proves_assignatura[i];
			for (var j in prova.notes_prova) {
				var puntuacio = prova.notes_prova[j]
				alumnes.push({
					"id": puntuacio.alumne.id,
					"nom": puntuacio.alumne.nom + " " + puntuacio.alumne.primer_cognom + " " + puntuacio.alumne.segon_cognom,
					"url": puntuacio.alumne.url_detail,
					"puntuacio": puntuacio.nota
				});
			}
		};

		var select_distinct = function(array) {
		var flags = [], output = [];
		for (var i = 0; i < array.length; i++) {
			if (flags[array[i].id]) continue;
			flags[array[i].id] = true;
			output.push(array[i]);
		}
		return output;
		};

		this.alumnes = select_distinct(alumnes);
		return this.alumnes;
	};

};

	// getAssignatura(): Observable<any> {
	// 	return this.assignaturaSource.asObservable();
	// }