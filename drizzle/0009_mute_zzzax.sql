ALTER TABLE "collect_data" DROP CONSTRAINT "collect_data_agentId_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "collect_data" ADD COLUMN "agent_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "agentId";