import {Router} from 'express'


import {
getLocality,
createLocals,
updateLocals,
deleteLocals

} from "./localitiesControllers.js"

import { validateData } from "../../middlewares/validationMiddleware.js";
import { createAgentSchema } from "../../db/agentSchema.js";


const router = Router();


router.get('/', getLocality);
router.post('/', createLocals)
router.put('/:id', updateLocals)
router.delete('/:id', deleteLocals)



export default router;