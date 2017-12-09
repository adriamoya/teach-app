export interface Alumne {
	id: string;
	nom: string;
	primer_cognom: string;
	segon_congom: string;
	email: string;
	bio?: string;
	lloc?: string;
	data_naixement?: any;
	assignatures_url?: any[];
	assignatures?: any[];
	nota_alumnes?: any;
	classe?: string;
	included?: boolean;
	disabled?: boolean;
	new?: boolean;
}