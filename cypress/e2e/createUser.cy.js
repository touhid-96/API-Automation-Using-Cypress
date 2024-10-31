const envVariable = require("../fixtures/envVariable.json");
const currentUser = require("../fixtures/currentUser.json");
const { faker } = require('@faker-js/faker');

describe("Create User", () => {
	it("Creates a user", () => {
		cy.request({
			method: "POST",
			url: envVariable.baseURL + "/user/create",
			headers: {
				'Authorization': "Bearer " + envVariable.token,
				'X-AUTH-SECRET-KEY': envVariable.secretKey,
			},
			body: {
				name: faker.internet.username(),
				email: faker.internet.email(),
				password: "1234",
				phone_number: "017" + Math.floor(10000000 + Math.random() * 90000000),
				nid: ""+ Math.floor(1000000000 + Math.random() * 9000000000),
				role: "Customer",
			},
		}).then((responce) => {
			expect(responce.status).eq(201);
			currentUser.userID = responce.body.user.id;
            currentUser.userEmail = responce.body.user.email;
            currentUser.userPhoneNumber = responce.body.user.phone_number;
            cy.writeFile(
				"cypress/fixtures/currentUser.json",
				JSON.stringify(currentUser)
			);
		});
	});
});
