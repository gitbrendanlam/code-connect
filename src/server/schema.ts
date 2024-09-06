export interface App_Users {
	user_id: number;
	username: string;
	email: string;
	password: string;
}

export interface App_Groups {
	group_id: number;
	group_name: string;
    description: string;
}

export interface Availabilities {
	availability_id: number;
	time: string;
}

export interface Group_Member {
	member_id: number;
	status: string;
}

export interface Week_Days {
	day_code: string;
	day_description: string;
}

export interface Hours {
	hour_code: string;
	hour_description: string;
}

export interface Meridiem {
	code: string;
	decode: string;
}

export interface RootObject {
	app_Users: App_Users;
	app_Groups: App_Groups;
	availabilities: Availabilities;
	group_Members: Group_Member;
	week_Days: Week_Days;
	hours: Hours;
	meridiem: Meridiem;
}