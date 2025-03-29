ALTER TABLE "collect_data" DROP CONSTRAINT "collect_data_agent_id_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "geolocation" DROP CONSTRAINT "geolocation_agent_id_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "phoneNumber" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "collect_data" ALTER COLUMN "phone_number" SET DATA TYPE varchar(15);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_agent_id_agents_username_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "geolocation" ADD CONSTRAINT "geolocation_agent_id_agents_username_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
