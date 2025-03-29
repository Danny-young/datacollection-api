CREATE TABLE IF NOT EXISTS "collections" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "collections_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"agent_id" varchar(50) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"electoral_area" varchar(100) NOT NULL,
	"locality" varchar(100) NOT NULL,
	"id_type" varchar(20) NOT NULL,
	"id_number" text NOT NULL,
	"nationality" varchar(50) NOT NULL,
	"street_name" varchar(150) NOT NULL,
	"valuation_no" varchar(150) NOT NULL,
	"geolocation_id" integer,
	"data_type" varchar(20) NOT NULL,
	"data_type_info" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "geolocations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "geolocations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"agent_id" varchar(50) NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"accuracy" integer NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "collect_data" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "geolocation" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "collect_data" CASCADE;--> statement-breakpoint
DROP TABLE "geolocation" CASCADE;--> statement-breakpoint
ALTER TABLE "agents" DROP CONSTRAINT "agents_username_unique";--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "user_name" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "phone_number" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "first_login" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_agent_id_agents_user_name_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("user_name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_geolocation_id_geolocations_id_fk" FOREIGN KEY ("geolocation_id") REFERENCES "public"."geolocations"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "geolocations" ADD CONSTRAINT "geolocations_agent_id_agents_user_name_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("user_name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "agents" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "agents" DROP COLUMN IF EXISTS "phoneNumber";--> statement-breakpoint
ALTER TABLE "agents" DROP COLUMN IF EXISTS "firstLogin";--> statement-breakpoint
ALTER TABLE "agents" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_name_unique" UNIQUE("user_name");