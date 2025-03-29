import { pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { electoralAreasTable } from "./electoralAreaSchema.js";

export const localitiesTable = pgTable("localities", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    code: varchar({ length: 5 }).notNull(), // Example: "LA" for Labone
    electoralAreaId: integer().references(() => electoralAreasTable.id , { onDelete: 'cascade' , onUpdate: 'cascade'}),
  });