import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-alumnes-detail',
  templateUrl: './alumnes-detail.component.html',
  styleUrls: ['./alumnes-detail.component.css']
})
export class AlumnesDetailComponent implements OnInit {

	private routeSub: any;
	private req: any;
	public alumne: any;
	id: string;
	ready: boolean = false;

	constructor(private route: ActivatedRoute, private _http: Http) { }

	ngOnInit() {
		
		this.routeSub = this.route.params.subscribe(params => {
			// console.log(params);
			this.id = params['id'];

			this._http.get('assets/json/alumnes-detail.json').subscribe(data => {
				data.json().filter(item => {
					// console.log(item);
					if (item.id == this.id) {
						// console.log(item);
						this.alumne = item;

						// Counting the # of proves per assignatura
						for (var i in this.alumne.assignatures) {
							this.alumne.assignatures[i].proves.count = this.alumne.assignatures[i].proves.length;
						}

						// Calculating the final puntuacio
						for (var i in this.alumne.assignatures) {

							this.alumne.assignatures[i].pes_total = 0;
							for (var j in this.alumne.assignatures[i].proves) {
								if (j < this.alumne.assignatures[i].proves.length) { // until n-1
									var prova = this.alumne.assignatures[i].proves[j]
									this.alumne.assignatures[i].pes_total += prova.pes_nota;
								}
							}

							this.alumne.assignatures[i].nota_total_temp = 0;
							for (var j in this.alumne.assignatures[i].proves) {
								if (j < this.alumne.assignatures[i].proves.length) { // until n-1
									var prova = this.alumne.assignatures[i].proves[j]
									this.alumne.assignatures[i].nota_total_temp += prova.pes_nota*prova.puntuacio/prova.puntuacio_total;
								}
							}
							
							this.alumne.assignatures[i].nota_total = this.alumne.assignatures[i].nota_total_temp/this.alumne.assignatures[i].pes_total*10;
							delete this.alumne.assignatures[i].nota_total_temp;
						}
						
						// ready to render
						this.ready = true;
					}
				})
			})
		})
	};

	ngOnDestroy() {
		this.routeSub.unsubscribe();
		// this.req.unsubscribe();
	};

}

