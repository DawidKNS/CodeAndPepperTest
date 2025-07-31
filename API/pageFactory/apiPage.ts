import { BrowserContext, Page } from "@playwright/test";
import testConfig from "@config/*";

export class APIPage {
	readonly page: Page;
	readonly context: BrowserContext;
	readonly url = testConfig.use!.testConfig!.api.baseURL;

	constructor(page: Page, context: BrowserContext) {
		this.page = page;
		this.context = context;
	}

	async createToken(): Promise<string> {
		const response = await this.page.request.post(`${this.url}/auth`, {
			data: { username: 'admin', password: 'password123' },
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		return data.token;
	}

	async createBooking(bookingData: any): Promise<any> {
		const response = await this.page.request.post(`${this.url}/booking`, {
			headers: {
				'Content-Type': 'application/json',
			},
			data: bookingData
		});

		return response;
	}

	async updateBooking(bookingId: number, bookingData: any): Promise<any> {
		console.log("Booking ID:", bookingId);
		let token = await this.createToken();
		const response = await this.page.request.put(`${this.url}/booking/${bookingId}`, {
			data: bookingData,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Cookie': 'token=' + token
			}
		});
		return response;
	}

	async deleteBooking(bookingId: number): Promise<any> {
		let token = await this.createToken();
		const response = await this.page.request.delete(`${this.url}/booking/${bookingId}`, {
			headers: {
				'Content-Type': 'application/json',
				'Cookie': 'token=' + token
			}
		});

		return response;
	}

	async getBooking(bookingId: number): Promise<any> {
		const response = await this.page.request.get(`${this.url}/booking/${bookingId}`);
		return response;
	}
}