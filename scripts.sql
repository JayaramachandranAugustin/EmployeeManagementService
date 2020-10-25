create table employee(
		id integer NOT NULL DEFAULT nextval('employee_seq'),
		name varchar(50) NOT NULL,
		date_of_joining timestamp NOT NULL,
		designation varchar(25),
		gender varchar(10),
		email varchar(50),
		bio varchar(500),
		constraint emp_cons PRIMARY KEY(id)
);

create table team(
		id integer NOT NULL DEFAULT nextval('team_seq'),
		name varchar(50) NOT NULL,
		email varchar(50),
		description varchar(500),
		constraint team_cons PRIMARY KEY(id)
);

create table employee_assignment(
		id integer NOT NULL DEFAULT nextval('employee_assignment_seq'),
		employee_id integer NOT NULL,
		team_id integer NOT NULL,
		constraint employe_assignment_cons PRIMARY KEY(id),
	    constraint fk_employee FOREIGN KEY(employee_id) REFERENCES employee(id),
	    constraint fk_team FOREIGN KEY(team_id) REFERENCES team(id)
)