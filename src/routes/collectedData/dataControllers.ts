import { Request, Response } from "express";
import {db} from '../../db/index.js';
import { collectDataTable } from "../../db/datacollectionSchema.js";
import { eq } from "drizzle-orm";
import _ from 'lodash';


export const getCollections = async (req: Request, res: Response) => {

    try {
        const dataCollction = await db.select().from(collectDataTable)
        res.json(dataCollction);
        } catch (e) {
         
          res.status(500).send(e);
        }
    };

    export async function createDataEntry(req: Request, res: Response){
        // console.log(req.body);
      try {
        const [product] = await db.insert(collectDataTable).values(req.body).returning();
        res.status(201).json(product);
      //const data = _.pick(req.body,Object.keys(createAgentSchema.shape));
      // const [dataEntry] =  await db.insert(collectDataTable).values(req.cleanBody).returning();
      //     res.status(201).json(dataEntry);
      } catch (error) {
        res.status(500).send(error);         
      }
      
      };

   
    export  async function getDataEntryById(req: Request, res: Response){
        try {
         const id = req.params.id;
          const [dataEntry] = await db.select().from(collectDataTable).where(eq(collectDataTable.agent_id, id));      
          
          if (!dataEntry) {
            res.status(404).json({ error: 'Data entry id not found' });
          } else {
            res.json(dataEntry);
          }
      
          } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while retrieving the data entry' });
        }
      
      };
    

     export const updateDataEntry = async (req: Request, res: Response) => {    
        try {
          const id = Number(req.params.id);
          const updates = req.body;
      
          const updatedEntry = await db.update(collectDataTable).set(updates).where(eq(collectDataTable.id, id)).returning();
      
          if (!updatedEntry.length) {
            res.status(404).json({ error: 'Data entry not found' });
          }
      
          res.status(200).json({ message: 'Data entry updated successfully', data: updatedEntry });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while updating the data entry' });
        }
      };
      

      export const deleteDataEntry = async (req: Request, res: Response) => {
        try {
          const id = Number(req.params.id);      
          const [deletedEntry] = await db.delete(collectDataTable).where(eq(collectDataTable.id, id)).returning();
      
          if (deletedEntry) {
            res.status(404).json({ error: 'Data entry not found' });
          }
      
          res.status(200).json({ message: 'Data entry deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while deleting the data entry' });
        }
      };
