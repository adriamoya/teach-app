export interface Classe {
	id?: string;
	nom: string;
	curs: number;
	alumnes?: any[];
	included?: boolean;
	assignatures?: any[];
}