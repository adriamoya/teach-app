import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Datepicker
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/bs-moment';

// Services
import { ClassesService } from '../../services/classes.service';
import { NotesService } from '../../services/notes.service';
import { ProvesService } from '../../services/proves.service';
import { AssignaturesService } from '../../services/assignatures.service';

// Interfaces
import { Nota } from '../../interfaces/nota.interface';
import { Prova } from '../../interfaces/prova.interface';
import { Classe } from '../../interfaces/classe.interface';

// Shared
import compareValues from '../../shared/compare-values';

@Component({
  selector: 'app-proves-create',
  templateUrl: './proves-create.component.html',
  styleUrls: ['./proves-create.component.css']
})
export class ProvesCreateComponent implements OnDestroy {

	private prova: Prova = {
		nom: '',
		continguts: '',
		data: '',
		nota_total: 10,
		pes_total: null,
		avaluacio: ''
	};
	private subClasses: any;
	private subAlumnes: any;
	private subAssignatures: any;

	private classes: Classe[];
	private classesAlumnes: any[] = [];

	private avaluacioId: number;
	private avaluacioSelected: any;

	private assignatures: [any];
	private assignaturaId: number;
	private assignaturaSelected: any;

	private alumnesSelected: [any];
	private continguts_avaluats: any[]=[];

	private noAval: boolean = true;
	private menuPanel: string = "General"

	// Datepicker
	// minDate = new Date(2017, 5, 10);
	// maxDate = new Date(2018, 9, 15);
	bsValue: Date = new Date();
	// bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
	bsConfig: Partial<BsDatepickerConfig>;
	colorTheme = 'theme-default';
	

	constructor(
		private _router: Router,
		private _notes: NotesService,
		private _proves: ProvesService,
		private _classes: ClassesService,
		private _assignatures: AssignaturesService) {
		this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
		// this.bsConfig = Object.assign({}, { locale: 'es'});

		// Assignatures
		// --------------------------------------------------------------------		
		this.subAssignatures = this._assignatures.list().subscribe(data => {
			this.assignatures = data;
		});

		// Classes
		// --------------------------------------------------------------------
		this.subClasses = this._classes.list()
		.subscribe(
			response => {
				console.log(response);
				let classes = response.sort(compareValues('nom'))
				this.classes = classes;
			});
	};



	toAssignatura(){

		this.avaluacioSelected = [];
		// get current assignaturaId selected
		this.assignaturaId = +this.assignaturaId;

		// filter down corresponding assignatura
		this.assignatures.filter(item => {
			if (item.id == this.assignaturaId) {
				this.assignaturaSelected = item;
			};
		});

		if (this.assignaturaSelected.assignatura_avaluacions.length==0) {
			this.noAval = true;
		} else {
			this.noAval = false;
			this.assignaturaSelected.assignatura_avaluacions.sort(compareValues('nom'))
		}

		// use AssignaturesServer to retrieve the alumnes list corresponding to the assignatura
		// we need to use the get method since points to /assignatures-detail (where the alumnes list is located)
		this.subAlumnes = this._assignatures.get(this.assignaturaId)
			.subscribe(
				data => {
					this.alumnesSelected = data.alumne_assignatures;
					this.buildClassesAlumnes();
				}
			);
	};

	buildClassesAlumnes() {
		this.classesAlumnes = this.classes;
		for (let classe of this.classes) {
			classe.alumnes = [];
			for (let alumne_classe of classe.alumne_classe) {
				for (let alumne of this.alumnesSelected) {
					if (alumne_classe == alumne.id) {
						classe.alumnes.push(alumne);
					}
				}
			}
		};
		console.log(this.alumnesSelected);
		console.log(this.classesAlumnes);
	}


	toAvaluacio() {
		this.avaluacioId = +this.avaluacioId;
		this.avaluacioSelected = this.assignaturaSelected.assignatura_avaluacions
			.filter((avaluacio) => avaluacio.id == this.avaluacioId)[0];

		this.noAval = false;
		// filter out prova_avaluacio
		for (let prova of this.avaluacioSelected.proves_avaluacio) {
			if (prova.nom == "Total avaluacio") {
				let index = this.avaluacioSelected.proves_avaluacio.indexOf(prova);
				this.avaluacioSelected.proves_avaluacio.splice(index, 1);
			}
		}
		console.log(this.avaluacioSelected);
		this.prova.avaluacio = this.avaluacioSelected.id;
	}


	newProva(){

		if (this.noAval == false) {
			
			let prova = this.prova;
			console.log(prova);

			// processing pes_total
			prova.pes_total = prova.pes_total/100;

			// processing continguts
			if (this.continguts_avaluats) {
				let continguts = this.continguts_avaluats.join();
				prova.continguts = continguts;
			} else {
				prova.continguts = '';
			}

			// processing data
			let data = this.prova.data;
			let dd = data.getDate();
			let mm = data.getMonth()+1; //January is 0!
			let yyyy = data.getFullYear();
			if(dd<10){
				dd='0'+dd;
			} 
			if(mm<10){
				mm='0'+mm;
			} 
			let data_final = yyyy+'-'+mm+'-'+dd;
			prova.data = data_final;

			console.log(prova);

			this._proves.add(prova)
				.subscribe(
					response => {
						//console.log(response);
						this.prova.id = response.id;
						this.newNotes();
						this._router.navigate(['/assignatures', this.assignaturaId, this.prova.id]);
					}
				);
			
		}
	};


	newNotes() {
		if (this.alumnesSelected) {
			//console.log(this.alumnesSelected)
			for (let alumne of this.alumnesSelected) {

				if (alumne.nota >= 0) {

					console.log(alumne.nom);
					
					let nota: Nota = {
						alumne: alumne.id,
						prova: this.prova.id,
						nota: alumne.nota
					};
					//console.log(nota);
					this._notes.add(nota)
						.subscribe(
							response => {
								//console.log(response);
							}
						)

				}
			}
		}
	};


		// this._notes.add()

	ngOnDestroy() {
		this.subAssignatures.unsubscribe()
		// this.subAlumnes.unsubscribe();
	};

}
