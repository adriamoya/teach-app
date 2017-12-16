export interface Prova {
	id?: string;
	nom: string;
	avaluacio?: string;
	// continguts: any[];
	continguts: string;
	data: string;
	nota_total: number;
	notes_count?: number;
	notes_prova?: any[];
	pes_total: number;
}
