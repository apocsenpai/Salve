export interface Message {
	id: number;
	ownerId: number;
	message: string;
	createdAt: Date;
}
export interface Chat {
	id: number;
	acceptedSave: boolean;
	provider: {
		id: number,
		fullName: string,
	};
	messages: Array<Message>;
}
export interface ChatListItem {
	id: number;
	provider: {
		id: number,
		fullName: string,
	};
	lastMessage: string;
}
