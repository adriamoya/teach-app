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

};

	// getAssignatura(): Observable<any> {
	// 	return this.assignaturaSource.asObservable();
	// }