ALTER TABLE "collections" DROP CONSTRAINT "collections_geolocation_id_geolocations_id_fk";
--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "geolocation" json NOT NULL;--> statement-breakpoint
ALTER TABLE "collections" DROP COLUMN IF EXISTS "geolocation_id";