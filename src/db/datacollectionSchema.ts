import { pgTable, uuid, numeric,varchar, text, integer, timestamp, foreignKey, json } from "drizzle-orm/pg-core";
import { agentsTable } from "./agentSchema.js";
import { geolocationTable } from "./geolocations";



export const collectDataTable = pgTable("collections", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  agent_id: varchar("agent_id", { length: 50 }).notNull().references(() => agentsTable.user_name, { onDelete: 'cascade', onUpdate: 'cascade' }),
  phone_number: varchar("phone_number", { length: 15 }).notNull(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  electoral_area: varchar("electoral_area", { length: 100 }).notNull(),
  locality: varchar("locality", { length: 100 }).notNull(),
  id_type: varchar("id_type", { length: 20 }).notNull(),
  id_number: text("id_number").notNull(),
  nationality: varchar("nationality", { length: 50 }).notNull(),
  street_name: varchar("street_name", { length: 150 }).notNull(),
  valuation_no: varchar("valuation_no", { length: 150 }).notNull(),
  geolocation: json("geolocation").notNull(),
  //geolocation_id: integer("geolocation_id").references(() => geolocationTable.id, { onDelete: 'set null' }),
  valuation_amt: numeric("valuation_amt",{ precision: 7, scale: 2 }).notNull(),
  duration: integer("duration").notNull(),
  data_type: varchar("data_type", { length: 20 }).notNull(),
  data_type_info: varchar("data_type_info", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),

});
  
 