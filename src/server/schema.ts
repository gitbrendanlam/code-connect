export interface USER {
	user_id: number;
	username: string;
	email: string;
	password: string;
}

export interface GROUP {
	group_id: number;
	group_name: string;
}

export interface AVAILABILITY {
	availability_id: number;
	time: string;
}

export interface GROUP_MEMBER {
	member_id: number;
	status: string;
}

export interface MEETING {
	meeting_id: number;
	meeting_name: string;
	description: string;
}

export interface DAYS_OF_THE_WEEK {
	day_code: string;
	day_description: string;
}

export interface TIME {
	time_code: string;
	time_description: string;
}

export interface AMPM {
	code: string;
	decode: string;
}

export interface RootObject {
	uSER: USER;
	gROUP: GROUP;
	aVAILABILITY: AVAILABILITY;
	gROUP_MEMBER: GROUP_MEMBER;
	mEETING: MEETING;
	dAYS_OF_THE_WEEK: DAYS_OF_THE_WEEK;
	tIME: TIME;
	aMPM: AMPM;
}