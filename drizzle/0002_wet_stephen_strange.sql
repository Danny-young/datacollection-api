ALTER TABLE "agents" ALTER COLUMN "username" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_email_unique" UNIQUE("email");