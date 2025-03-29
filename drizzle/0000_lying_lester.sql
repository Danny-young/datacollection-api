CREATE TABLE IF NOT EXISTS "agents" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "agents_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"email" varchar(150) NOT NULL,
	"username" varchar(150) NOT NULL,
	"phoneNumber" varchar(15) NOT NULL,
	"password" varchar(255) NOT NULL
);
