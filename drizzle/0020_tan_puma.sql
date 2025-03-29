ALTER TABLE "collect_data" ADD COLUMN "data_type_info" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "data_type_Info";