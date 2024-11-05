CREATE SCHEMA IF NOT EXISTS login
  AUTHORIZATION login;

CREATE TABLE IF NOT EXISTS login.user
(
  id smallserial NOT NULL,
  user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
  user_password character varying(512) COLLATE pg_catalog."default" NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);

