ALTER TABLE "collect_data" ADD COLUMN "electoralAreaId" integer;--> statement-breakpoint
ALTER TABLE "collect_data" ADD COLUMN "localityId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_electoralAreaId_electoral_areas_id_fk" FOREIGN KEY ("electoralAreaId") REFERENCES "public"."electoral_areas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collect_data" ADD CONSTRAINT "collect_data_localityId_localities_id_fk" FOREIGN KEY ("localityId") REFERENCES "public"."localities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "electoral_area";--> statement-breakpoint
ALTER TABLE "collect_data" DROP COLUMN IF EXISTS "locality";