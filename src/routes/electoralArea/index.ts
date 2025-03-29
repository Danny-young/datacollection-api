import {Router} from 'express'


import {
getAreas,
createAreas,
updateAreas,
getAreaId,
deleteArea

} from "./electoralAreaControllers.js"

import { validateData } from "../../middlewares/validationMiddleware.js";
import { createAgentSchema } from "../../db/agentSchema.js";


const router = Router();


router.get('/', getAreas);
router.get('/:id', getAreaId);
router.delete('/:id', deleteArea);
router.post('/', createAreas)
router.put('/:id', updateAreas)



export default router;