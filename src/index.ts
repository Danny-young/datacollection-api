import express, { json,urlencoded } from 'express';
import agentRoutes from './routes/agents/index.js';
import manageRoutes from './routes/manage/index.js';
import electoralAreasRoutes from './routes/electoralArea/index.js';
import localitiesRoutes from './routes/localities/index.js';
import datacollectionRoutes from './routes/collectedData/index.js';
import geolocationRoutes from './routes/geoLocations/index.js';
import mailRoutes from './routes/email/index.js';
import serverless from "serverless-http";
import cors from 'cors';

const port = 3500
const app = express();

app.use(urlencoded({extended:false}))
app.use(json());

app.use(cors({
  origin: '*', // Be more specific in production
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.use('/agents', agentRoutes);
app.use('/manage', manageRoutes);
app.use('/email', mailRoutes);
app.use('/collectedData', datacollectionRoutes);
app.use('/electoralArea', electoralAreasRoutes);
app.use('/geoLocations', geolocationRoutes);
app.use('/localities', localitiesRoutes);
if (process.env.NODE_ENV === "dev") {
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
}); 
}
export const handler = serverless(app);