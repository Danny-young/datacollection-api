import { Request, Response } from "express";
import {db} from '../../db/index.js';
import { localitiesTable } from '../../db/localitySchema.js';
import { eq } from "drizzle-orm";
import _ from 'lodash';


export const getLocality = async (req: Request, res: Response) => {

try {
    const locality = await db.select().from(localitiesTable)
    res.json(locality);
    } catch (e) {
     
      res.status(500).send(e);
    }
};

export async function createLocals(req: Request, res: Response){
    // console.log(req.body);
  try {
  const [locality] = await db.insert(localitiesTable).values(req.body).returning();
 
      res.status(201).json(locality);
      } catch (error) {
          // console.error(error);
          res.status(500).send(error);
      
  }
  
  };

  

  export const deleteLocals = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);      
      const [deletelocals] = await db.delete(localitiesTable).where(eq(localitiesTable.id, id)).returning();
  
      if (deletelocals) {
        res.status(404).json({ error: 'Locality not found' });
      }
  
      res.status(200).json({ message: 'Locality deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the Locality' });
    }
  };

  export async function updateLocals(req: Request, res: Response){
    try {
      const id = Number(req.params.id);
      const updates = req.body;
  
      const updatedLocal = await db.update(localitiesTable).set(updates).where(eq(localitiesTable.id, id)).returning();
  
      if (!updatedLocal.length) {
        res.status(404).json({ error: 'locality not found' });
      }
  
      res.status(200).json({ message: 'locality updated successfully', data: updatedLocal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the locality' });
    }
}