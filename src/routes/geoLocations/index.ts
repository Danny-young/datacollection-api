import {Router} from 'express'


import {
getgeolocations,
createGeolocation,
deleteGeo,
getGeoId,
updateGeo

} from "./geolocationControllers.js"

import { validateData } from "../../middlewares/validationMiddleware.js";
import { createAgentSchema } from "../../db/agentSchema.js";


const router = Router();


router.get('/', getgeolocations);
router.get('/:id', getGeoId);
router.delete('/:id', deleteGeo);
router.post('/', createGeolocation)
router.put('/:id', updateGeo)



export default router;