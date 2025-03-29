ALTER TABLE "collect_data" DROP CONSTRAINT "collect_data_agent_id_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "collect_data" ADD COLUMN "agentId" varchar(150) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_agentId_agents_id_fk" FOREIGN KEY ("agentId") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "agent_id";--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_username_unique" UNIQUE("username");