import { Request, Response } from "express";
import {db} from '../../db/index.js';
import { geolocationTable } from '../../db/geolocations.js';
import { eq } from "drizzle-orm";
import _ from 'lodash';


export const getgeolocations = async (req: Request, res: Response) => {

try {
    const geo = await db.select().from(geolocationTable)
    res.json(geo);
    } catch (e) {
     
      res.status(500).send(e);
    }
};

export async function createGeolocation(req: Request, res: Response){
    // console.log(req.body);
  try {
  const [geo] = await db.insert(geolocationTable).values(req.body).returning();

      res.status(201).json(geo);
      } catch (error) {
          // console.error(error);
          res.status(500).send(error);
      
  }
  
  };

  
  export  async function getGeoId(req: Request, res: Response){
    try {
     const id = Number(req.params.id);
      const [dataGeo] = await db.select().from(geolocationTable).where(eq(geolocationTable.id, id));      
      
      if (!dataGeo) {
        res.status(404).json({ error: 'Data entry id not found' });
      } else {
        res.json(dataGeo);
      }
  
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the data entry' });
    }
  
  };

  

  export const deleteGeo = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);      
      const [deletegeolocation] = await db.delete(geolocationTable).where(eq(geolocationTable.id, id)).returning();
  
      if (deletegeolocation) {
        res.status(404).json({ error: 'Geolocation not found' });
      }
  
      res.status(200).json({ message: 'Geolocation deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the Geolocation' });
    }
  };

  
  export async function updateGeo(req: Request, res: Response){
    res.send('updateGeo');
    try {
      const id = Number(req.params.id);
      const updates = req.body;
  
      const updatedgeo = await db.update(geolocationTable).set(updates).where(eq(geolocationTable.id, id)).returning();
  
      if (!updatedgeo.length) {
        res.status(404).json({ error: 'Geolocation not found' });
      }
  
      res.status(200).json({ message: 'Geolocation updated successfully', data: updatedgeo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the Geolocation' });
    }
}