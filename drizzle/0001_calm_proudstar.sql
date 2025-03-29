ALTER TABLE "agents" ALTER COLUMN "phoneNumber" SET DATA TYPE varchar(35);--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "firstLogin" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;