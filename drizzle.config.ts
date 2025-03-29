import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/agentSchema.js',
    './src/db/datacollectionSchema.js',
    './src/db/electoralAreaSchema.js',
    './src/db/geolocations.js',
    './src/db/localitySchema.js'
     ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose:true,
  strict:true,
});