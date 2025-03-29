import {Router} from 'express'


import {
getAgents,
createAgent,
updateAgent,
deleteAgent,
getAgentById
} from "./agentControllers.js"

import { validateData } from "../../middlewares/validationMiddleware.js";
import { createAgentSchema } from "../../db/agentSchema.js";


const router = Router();


router.get('/', getAgents);
router.post('/', validateData(createAgentSchema), createAgent)
router.put('/:id', updateAgent)
router.get('/:id', getAgentById)
router.delete('/:id', deleteAgent)



export default router;