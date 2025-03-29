CREATE TABLE IF NOT EXISTS "geolocation" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "geolocation_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"agent_id" integer NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"close_meter" integer NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "collect_data" DROP CONSTRAINT "collect_data_electoralAreaId_electoral_areas_id_fk";
--> statement-breakpoint
ALTER TABLE "collect_data" DROP CONSTRAINT "collect_data_localityId_localities_id_fk";
--> statement-breakpoint
ALTER TABLE "collect_data" ADD COLUMN "agent_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "collect_data" ADD COLUMN "electoral_area" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "collect_data" ADD COLUMN "locality" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "collect_data" ADD COLUMN "id_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "electoral_areas" ADD COLUMN "region" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "electoral_areas" ADD COLUMN "metropolitan" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "electoral_areas" ADD COLUMN "municipalities" varchar(100) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "geolocation" ADD CONSTRAINT "geolocation_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "electoralAreaId";--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "localityId";--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "ghana_card";--> statement-breakpoint
ALTER TABLE "electoral_areas" DROP COLUMN IF EXISTS "name";