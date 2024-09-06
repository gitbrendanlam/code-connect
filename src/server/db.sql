CREATE TABLE IF NOT EXISTS
  App_Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  );

CREATE TABLE IF NOT EXISTS
  App_Groups (
    group_id SERIAL PRIMARY KEY,
    group_name varchar(255),
    group_description varchar(255)
  );

CREATE TABLE IF NOT EXISTS
  Availabilities (
    availability_id INTEGER PRIMARY KEY,
  	time VARCHAR(5)
  );

CREATE TABLE IF NOT EXISTS
  Group_Members (
    member_id INTEGER PRIMARY KEY,
  	status VARCHAR(255)
  );

CREATE TABLE IF NOT EXISTS
	Week_Days (
  	day_code VARCHAR(2) PRIMARY KEY,
  	day_description VARCHAR(255)
  );

CREATE TABLE IF NOT EXISTS
	Hours (
  	hour_code VARCHAR(2) PRIMARY KEY,
  	hour_description VARCHAR(5)
  );

CREATE TABLE IF NOT EXISTS
	Meridiem (
  	code VARCHAR(2) PRIMARY KEY,
  	decode VARCHAR(2)
  );

-- Unable to utilize DROP CONSTRAINT IF EXISTS with free version of PostgresSQL provided by ElephantSQL (Version 11.19)
-- Foreign Keys were set up and then the code to initialisze the FK columns and relations were commented out as to not 
-- continuously receive a syntax error for constraint "column_name" for relation "table_name" already exists.

-- ALTER TABLE IF EXISTS Availabilities
--   ADD COLUMN IF NOT EXISTS app_user INTEGER,
--   DROP CONSTRAINT IF EXISTS fk_app_user,
--   ADD CONSTRAINT fk_app_user FOREIGN KEY IF NOT EXISTS(app_user) REFERENCES App_Users (user_id),
--   ADD COLUMN IF NOT EXISTS day VARCHAR(2),
--   DROP CONSTRAINT IF EXISTS fk_day,
--   ADD CONSTRAINT fk_day FOREIGN KEY (day) REFERENCES Week_Days (day_code),
--   ADD COLUMN IF NOT EXISTS hour VARCHAR(2),
--   DROP CONSTRAINT IF EXISTS fk_hour,
--   ADD CONSTRAINT fk_hour FOREIGN KEY (hour) REFERENCES Hours (hour_code);

-- ALTER TABLE IF EXISTS Group_Members
--   ADD COLUMN IF NOT EXISTS app_user INTEGER,
--   DROP CONSTRAINT IF EXISTS fk_app_user,
--   ADD CONSTRAINT fk_app_user FOREIGN KEY (app_user) REFERENCES App_Users (user_id),
--   ADD COLUMN IF NOT EXISTS app_group INTEGER,
--   DROP CONSTRAINT IF EXISTS fk_app_group,
--   ADD CONSTRAINT fk_app_group FOREIGN KEY (app_group) REFERENCES App_Groups (group_id);

-- ALTER TABLE IF EXISTS Hours
-- ADD COLUMN IF NOT EXISTS ampm VARCHAR(2),
-- DROP CONSTRAINT IF EXISTS fk_ampm,
--   ADD CONSTRAINT fk_ampm FOREIGN KEY (ampm) REFERENCES Meridiem (code);