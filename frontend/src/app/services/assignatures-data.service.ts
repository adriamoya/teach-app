import { Injectable } from "@angular/core"; 
import { Subject } from 'rxjs/Subject'; 
import { Observable } from 'rxjs';  

@Injectable()
export class AssignaturesDataService {

	// Observable source
	// private assignaturaSource = new Subject<any>();
	private data: any;
	private changesSaved: boolean;

	// Observable stream
	// private assignaturaSource$ = this.assignaturaSource.asObservable();

	constructor() { }

	// Service commands
	passAssignatura(assignatura:any) {
		// this.assignaturaSource.next(assignatura);
		console.log('passed assignatura')
		this.data = assignatura;
	};

	passChangesSaved(changesSaved:boolean) {
		console.log('changes not saved')
		this.changesSaved = changesSaved;
	};


	getAssignatura() {
		console.log('downloading assignatura')
		return this.data;
		// return this.assignaturaSource.asObservable();
	};

	getChangesSaved() {
		return this.changesSaved;
	};

};

	// getAssignatura(): Observable<any> {
	// 	return this.assignaturaSource.asObservable();
	// }