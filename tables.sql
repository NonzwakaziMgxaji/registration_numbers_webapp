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