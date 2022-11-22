import { Router } from 'express'
import {createCorte, deleteCorte, getCorte, getCortes, updateCorte} from '../controllers/corte.controller.js'


const router = Router()

router.get('/corte', getCorte)

router.get('/corte/:id', getCortes)

router.post('/corte', createCorte)

router.patch('/corte/:id', updateCorte)

router.delete('/corte/:id', deleteCorte)

export default router