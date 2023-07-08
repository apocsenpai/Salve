enum Categories {
	SOFT = 'Suave',
	MEDIUM = 'Da pra aguentar',
	HARD = 'Urgente',
}

enum Status {
	CREATED = 'CREATED',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
}

export interface SaveCategory {
	id: number;
	name: string;
	cost: number;
}
export interface Save {
	id: number;
	description: string;
	status: Status;
	address: {
		cep: string,
		city: string,
		complement: string,
		neighborhood: string,
		street: string,
		state: string,
		latitude: number,
		longitude: number,
		number: number,
	};
	category: {
		name: Categories,
		cost: number,
	};
	requester: {
		id: number,
		fullName: string,
	};
	provider: {
		id: number,
		fullName: string,
	} | null;
}

export interface SaveCategories {
	categories: Array<SaveCategory>;
}

export interface SaveFetchData {
	requested: Array<Save>;
	offering: Array<Save>;
}
