import express from 'express'

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'Tall building',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];



export default router;