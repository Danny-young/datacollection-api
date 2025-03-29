import { Request, Response } from "express";
import {db} from '../../db/index.js';
import { electoralAreasTable } from '../../db/electoralAreaSchema.js';
import { eq } from "drizzle-orm";
import _ from 'lodash';


export const getAreas = async (req: Request, res: Response) => {

try {
    const area = await db.select().from(electoralAreasTable)
    res.json(area);
    } catch (e) {
     
      res.status(500).send(e);
    }
};

export async function createAreas(req: Request, res: Response){
    // console.log(req.body);
  try {
  const [area] = await db.insert(electoralAreasTable).values(req.body).returning();

      res.status(201).json(area);
      } catch (error) {
          // console.error(error);
          res.status(500).send(error);
      
  }
  
  };

  
  export  async function getAreaId(req: Request, res: Response){
    try {
     const id = Number(req.params.id);
      const [dataArea] = await db.select().from(electoralAreasTable).where(eq(electoralAreasTable.id, id));      
      
      if (!dataArea) {
        res.status(404).json({ error: 'Data entry id not found' });
      } else {
        res.json(dataArea);
      }
  
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the data entry' });
    }
  
  };

  

  export const deleteArea = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);      
      const [deleteArea] = await db.delete(electoralAreasTable).where(eq(electoralAreasTable.id, id)).returning();
  
      if (deleteArea) {
        res.status(404).json({ error: 'Electoral Area not found' });
      }
  
      res.status(200).json({ message: 'Electoral Area deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the Electoral Area' });
    }
  };

  
  export async function updateAreas(req: Request, res: Response){
    res.send('updateAgent');
    try {
      const id = Number(req.params.id);
      const updates = req.body;
  
      const updatedEntry = await db.update(electoralAreasTable).set(updates).where(eq(electoralAreasTable.id, id)).returning();
  
      if (!updatedEntry.length) {
        res.status(404).json({ error: 'Electoral Area not found' });
      }
  
      res.status(200).json({ message: 'Electoral Area updated successfully', data: updatedEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the data entry' });
    }
}