import { Request, Response } from "express";
import {db} from '../../db/index.js';
import { agentsTable, createAgentSchema } from '../../db/agentSchema.js';
import { eq } from "drizzle-orm";
import _ from 'lodash';


export const getAgents = async (req: Request, res: Response) => {

try {
    const agent = await db.select().from(agentsTable)
    res.json(agent);
    } catch (e) {
     
      res.status(500).send(e);
    }
};

export async function createAgent(req: Request, res: Response){
    // console.log(req.body);
  try {
  const data = _.pick(req.body,Object.keys(createAgentSchema.shape));
  const [agent] =  await db.insert(agentsTable).values(req.cleanBody).returning();
      res.status(201).json(agent);
      } catch (error) {
          // console.error(error);
          res.status(500).send(error);
      
  }
  
  };

  export  async function getAgentById(req: Request, res: Response){
    try {
     const id = (req.params.id);
      const [dataAgent] = await db.select().from(agentsTable).where(eq(agentsTable.user_name, id));      
      
      if (!dataAgent) {
        res.status(404).json({ error: 'Data entry id not found' });
      } else {
        res.json(dataAgent);
      }
  
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the data entry' });
    }
  
  };

  
  export async function updateAgent(req: Request, res: Response){
    try {
      const id = Number(req.params.id);
      const updates = req.body;
  
      const updatedAgent = await db.update(agentsTable).set(updates).where(eq(agentsTable.id, id)).returning();
  
      if (!updatedAgent.length) {
        res.status(404).json({ error: 'Data entry not found' });
      }
  
      res.status(200).json({ message: 'Data entry updated successfully', data: updatedAgent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the data entry' });
    }
}


export const deleteAgent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);      
    const [deletedAgent] = await db.delete(agentsTable).where(eq(agentsTable.id, id)).returning();

    if (deletedAgent) {
      res.status(404).json({ error: 'Agent not found' });
    }

    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting an agent' });
  }
};
