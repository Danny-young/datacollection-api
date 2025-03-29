CREATE TABLE IF NOT EXISTS "collect_data" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "collect_data_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"agent_id" uuid NOT NULL,
	"phone_number" numeric NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"electoral_area" varchar(100) NOT NULL,
	"locality" varchar(100) NOT NULL,
	"id_type" varchar(20) NOT NULL,
	"ghana_card" text NOT NULL,
	"nationality" varchar(50) NOT NULL,
	"street_name" varchar(150) NOT NULL,
	"valuation_no" varchar(150) NOT NULL,
	"geolocation_id" integer,
	"data_type" varchar(20) NOT NULL,
	"data_type_Info" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "electoral_areas" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "electoral_areas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"code" varchar(5) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "localities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"code" varchar(5) NOT NULL,
	"electoralAreaId" integer
);
--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "role" varchar(35) DEFAULT 'agent' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_geolocation_id_geolocation_id_fk" FOREIGN KEY ("geolocation_id") REFERENCES "public"."geolocation"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localities" ADD CONSTRAINT "localities_electoralAreaId_electoral_areas_id_fk" FOREIGN KEY ("electoralAreaId") REFERENCES "public"."electoral_areas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
