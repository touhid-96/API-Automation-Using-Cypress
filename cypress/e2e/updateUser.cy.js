const envVariable = require("../fixtures/envVariable.json");
const currentUser = require("../fixtures/currentUser.json");
const { faker } = require('@faker-js/faker');

describe("Update User", () => {
	it("Updates a user", () => {
		cy.request({
			method: "PATCH",
			url: envVariable.baseURL + "/user/update/" + currentUser.userID,
			headers: {
				'Authorization': "Bearer " + envVariable.token,
				'X-AUTH-SECRET-KEY': envVariable.secretKey,
			},
			body: {
				email: faker.internet.email,
				phone_number: "017" + Math.floor(10000000 + Math.random() * 90000000),
			},
		}).then((responce) => {
			expect(responce.status).eq(200);
            expect(responce.body.message).eq("User updated successfully");
            currentUser.userEmail = responce.body.user.email;
            currentUser.userPhoneNumber = responce.body.user.phone_number;
            cy.writeFile(
				"cypress/fixtures/currentUser.json",
				JSON.stringify(currentUser)
			);
		});
	});
});
