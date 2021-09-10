create table towns(
	id serial not null primary key,
	town_name text not null,
    startsWith_string text not null
);

create table reg_numbers(
    id serial not null primary key,
    regNum text not null,
    town_code int not null,
    foreign key (town_code) references towns(id) 
);

INSERT INTO towns (town_name, startsWith_string) VALUES ('capetown', 'CA');
INSERT INTO towns (town_name, startsWith_string) VALUES ('belville', 'CY');
INSERT INTO towns (town_name, startsWith_string) VALUES ('malmesbury', 'CK');
INSERT INTO towns (town_name, startsWith_string) VALUES ('stellenbosch', 'CL');