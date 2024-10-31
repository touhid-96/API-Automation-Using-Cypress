const envVariable = require("../fixtures/envVariable.json");

describe("User Login", () => {
	it("Passing valid username and password", () => {
		cy.request({
			method: "POST",
			url: envVariable.baseURL + "/user/login",
			body: {
				email: "admin@roadtocareer.net",
				password: "1234",
			},
		}).then((responce) => {
			expect(responce.status).eq(200);
			var jwtToken = responce.body.token;
			envVariable.token = jwtToken;
			cy.writeFile(
				"cypress/fixtures/envVariable.json",
				JSON.stringify(envVariable)
			);
		});
	});
});
