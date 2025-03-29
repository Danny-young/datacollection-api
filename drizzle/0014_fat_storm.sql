ALTER TABLE "geolocation" DROP CONSTRAINT "geolocation_agent_id_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "collect_data" ALTER COLUMN "agent_id" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "geolocation" ALTER COLUMN "agent_id" SET DATA TYPE varchar(10);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "geolocation" ADD CONSTRAINT "geolocation_agent_id_agents_username_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("username") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
