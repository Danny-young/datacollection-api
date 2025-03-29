import { integer, pgTable, varchar, boolean, timestamp  } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';



export const agentsTable = pgTable("agents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 150 }).notNull().unique(),
  user_name: varchar({ length: 50 }).unique().notNull(),
  phone_number: varchar({ length: 15 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  first_login: boolean().notNull().default(true),
  created_at: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(), // Add trigger for automatic updates
  role: varchar({ length: 35 }).default("agent").notNull(), 
});

  // export const createUserSchema = createInsertSchema(agentsTable).omit({
  //   id: true, 
  // }).pick({
  //   name: true,
  //   email: true,
  //   phoneNumber: true,
    
  // }); ;


  
  export const createAgentSchema = createInsertSchema(agentsTable).pick({
    email: true,
    name: true,
    phone_number: true,

       
  });

  export const loginSchema = createInsertSchema(agentsTable).pick({
    user_name: true,
    password: true,  
        
  });
  
  export const changePasswordSchema = z.object({
    user_name: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(50, 'Username must not exceed 50 characters'), // Required for identifying the user
    oldPassword: z
      .string()
      .min(8, 'Old password must be at least 8 characters long'), // Current password for verification
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long')
      .regex(/[A-Z]/, 'New password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'New password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'New password must contain at least one number')
      .regex(
        /[@$!%*?&]/,
        'New password must contain at least one special character (@, $, !, %, *, ?, &)'
      ),
  });
  