import { pgTable, uuid, numeric, text, integer, timestamp, foreignKey, varchar } from "drizzle-orm/pg-core";
import { agentsTable } from "./agentSchema.js";

// Geolocation Table
export const geolocationTable = pgTable("geolocations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),  // Unique identifier for each record
  agentId: varchar("agent_id", { length: 50 }).notNull().references(() => agentsTable.user_name, { onDelete: 'cascade' , onUpdate: 'cascade'}),
  latitude: numeric("latitude", { precision: 10, scale: 8 }).notNull(), // Latitude with high precision
  longitude: numeric("longitude", { precision: 11, scale: 8 }).notNull(), // Longitude with high precision
  accuracy: integer("accuracy").notNull(), // Distance in meters
  description: text("description"), // Optional description of the location
  createdAt: timestamp("created_at").defaultNow(), // Timestamp when the record was created
});

