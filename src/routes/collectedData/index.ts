import { Router } from 'express';
import { 
    getCollections, 
    createDataEntry, 
    getDataEntryById, 
    updateDataEntry,
    deleteDataEntry 
 } from './dataControllers.js';

const router =  Router();

// router.get('/', (req, res) => {
//     res.send("The data list for items is available")
// })


router.get('/', getCollections);
router.post('/', createDataEntry);
router.get('/:id', getDataEntryById);
router.put('/:id', updateDataEntry);
router.delete('/:id', deleteDataEntry);


export default router;