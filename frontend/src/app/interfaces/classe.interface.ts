export interface Classe {
	id?: string;
	nom: string;
	curs: number;
	alumnes?: any[];
	alumne_classe?: any[];
	included?: boolean;
	assignatures?: any[];
}