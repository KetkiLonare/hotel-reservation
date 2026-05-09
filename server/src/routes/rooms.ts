import { Router } from 'express';
import {
  getRooms,
  bookRooms,
  bookManual,
  randomOccupancy,
  resetRooms,
  getBookings,
} from '../controllers/roomController.js';

const router = Router();

router.get('/', getRooms);
router.post('/book', bookRooms);
router.post('/book-manual', bookManual);
router.post('/random', randomOccupancy);
router.delete('/reset', resetRooms);
router.get('/bookings', getBookings);

export default router;
