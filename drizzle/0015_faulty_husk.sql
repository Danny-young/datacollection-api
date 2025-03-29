ALTER TABLE "collect_data" DROP CONSTRAINT "collect_data_agent_id_agents_username_fk";
--> statement-breakpoint
ALTER TABLE "geolocation" DROP CONSTRAINT "geolocation_agent_id_agents_username_fk";
--> statement-breakpoint
ALTER TABLE "localities" DROP CONSTRAINT "localities_electoralAreaId_electoral_areas_id_fk";
--> statement-breakpoint
ALTER TABLE "collect_data" ALTER COLUMN "agent_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "geolocation" ALTER COLUMN "agent_id" SET DATA TYPE integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "geolocation" ADD CONSTRAINT "geolocation_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localities" ADD CONSTRAINT "localities_electoralAreaId_electoral_areas_id_fk" FOREIGN KEY ("electoralAreaId") REFERENCES "public"."electoral_areas"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
