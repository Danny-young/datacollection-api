import { pgTable, varchar, integer } from "drizzle-orm/pg-core";

export const electoralAreasTable = pgTable("electoral_areas", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  region: varchar({ length: 100 }).notNull(),
  metropolitan: varchar({ length: 100 }).notNull(),
  municipalities: varchar({ length: 100 }).notNull(),
  code: varchar({ length: 5 }).notNull(), // Example: "ES" for East Legon
});
