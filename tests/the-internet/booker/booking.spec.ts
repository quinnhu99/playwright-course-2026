import {test, expect} from '@playwright/test';  
import {z} from 'zod';

const bookingIdsSchema = z.array(z.object({
  bookingid: z.number(),  
}));

test('GET /booking', async ({request}) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');
  expect(response.status()).toBe(200);

  const bookings = await response.json();
  console.log(bookings);
   expect(() => bookingIdsSchema.parse(bookings)).not.toThrow();
});

const bookingDetailsSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({
    checkin: z.string(),
    checkout: z.string(),
  }),
  additionalneeds: z.string().optional(),
}); 

test('GET /booking with specific ID', async ({request}) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking/3');
  expect(response.status()).toBe(200);  
  const bookingsDetails = await response.json(); 
  //const {firstname, lastname} = bookingsDetails;
  console.log(bookingsDetails);
  //expect(firstname).toBe('Alice');
  //expect(lastname).toBe('Smith');
  expect(() => bookingDetailsSchema.parse(bookingsDetails)).not.toThrow();
  
});

test('POST /booking', async ({request}) => {
  const newBooking = {
    firstname: 'Alice',
    lastname: 'Smith', 
    totalprice: 150,
    depositpaid: true,
    bookingdates: { 
      checkin: '2026-05-01',
      checkout: '2026-05-10',
    },
    additionalneeds: 'Breakfast',
  }; 
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: newBooking,
    headers: { 
      'Content-Type': 'application/json',
    },
  });
  expect(response.status()).toBe(200);
  const createdBookingResponse = await response.json();
  console.log(createdBookingResponse);
  expect(createdBookingResponse.bookingid).toBeDefined();
  expect(() => bookingDetailsSchema.parse(createdBookingResponse.booking)).not.toThrow();
  const {booking} = createdBookingResponse;
  expect(booking).toMatchObject(newBooking);
});

test('PUT /booking/{id}', async ({request}) => {
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin', 
      password: 'password123',
    },
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  expect(authResponse.status()).toBe(200);
  const authData = await authResponse.json();
  const token = authData.token;
  const updatedBooking = {
    firstname: 'Bob', 
    lastname: 'Johnson',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2026-06-01',
      checkout: '2026-06-10',
    },
    additionalneeds: 'Late checkout',  
  };
  const response = await request.put('https://restful-booker.herokuapp.com/booking/2', {
    data: updatedBooking,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    },
  });
  const updatedBookingResponse = await response.json();
  expect(response.status()).toBe(200);
  expect(updatedBookingResponse).toMatchObject(updatedBooking);
  expect(() => bookingDetailsSchema.parse(updatedBookingResponse)).not.toThrow();  
});

test('PATCH /booking/{id}', async ({request}) => {
  const updatedBooking = {
    firstname: 'Bob',
    lastname: 'Johnson',
  };
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });    
  expect(authResponse.status()).toBe(200);
  const authData = await authResponse.json();
  const token = authData.token;

  const getRamdomBookingResponse = await request.get('https://restful-booker.herokuapp.com/booking');
  expect(getRamdomBookingResponse.status()).toBe(200);
  const bookings = await getRamdomBookingResponse.json();
  const randomBooking = bookings[Math.floor(Math.random() * bookings.length)];
  //console.log('Randomly selected booking:', randomBooking);

  const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${randomBooking.bookingid}`, {
    data: updatedBooking,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    },
  });
  const updatedBookingResponse = await response.json();
  expect(response.status()).toBe(200); 
  expect(updatedBookingResponse.firstname).toBe(updatedBooking.firstname);
  expect(updatedBookingResponse.lastname).toBe(updatedBooking.lastname);
  expect(() => bookingDetailsSchema.parse(updatedBookingResponse)).not.toThrow();
});

test('DELETE /booking/{id}', async ({request}) => { 
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123',
    },
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  expect(authResponse.status()).toBe(200);
  const authData = await authResponse.json();
  const token = authData.token;
  const getRamdomBookingResponse = await request.get('https://restful-booker.herokuapp.com/booking');
  expect(getRamdomBookingResponse.status()).toBe(200);
  const bookings = await getRamdomBookingResponse.json();
  const randomBooking = bookings[Math.floor(Math.random() * bookings.length)];  
  const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${randomBooking.bookingid}`, {
    headers: {  
      'Cookie': `token=${token}`
    },
  });
  expect(response.status()).toBe(201);
  const getDeletedBookingResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${randomBooking.bookingid}`);
  expect(getDeletedBookingResponse.status()).toBe(404);
});