export interface UserJwtPayload {
	profileId: number;
	username: string;
	coins: number;
	hasProfile: boolean;
	hasAddress: boolean;
}
