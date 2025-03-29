ALTER TABLE "collect_data" DROP CONSTRAINT "collect_data_agent_id_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "agent_id";