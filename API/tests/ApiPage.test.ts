import { expect } from '@playwright/test';
import test from '@lib/baseTests';

test.describe('Booking', () => {
	let bookingId: number;

	test('Create booking', async ({ apiPage }) => {
		const bookingData = {
			firstname: 'Jim',
			lastname: 'Brown',
			totalprice: 111,
			depositpaid: true,
			bookingdates: {
				checkin: '2018-01-01',
				checkout: '2019-01-01',
			},
			additionalneeds: 'Breakfast',
		};

		const response = await apiPage.createBooking(bookingData);
		let bodyResponse = await response.json();
		bookingId = bodyResponse.bookingid;
		expect(response.status()).toBe(200);
	});

	test('Update booking', async ({ apiPage }) => {
		const bookingData = {
			"firstname": "James",
			"lastname": "Brown",
			"totalprice": 111,
			"depositpaid": true,
			"bookingdates": {
				"checkin": "2018-01-01",
				"checkout": "2019-01-01"
			},
			"additionalneeds": "Breakfast"
		};

		const response = await apiPage.updateBooking(bookingId, bookingData);
		expect(response.status()).toBe(200);

	});

	test('Delete bokking', async ({ apiPage }) => {
		const responseDelete = await apiPage.deleteBooking(bookingId);
		expect(responseDelete.status()).toBe(201);
		const response = await apiPage.getBooking(bookingId);
		expect(response.status()).toBe(404);
	});
});
