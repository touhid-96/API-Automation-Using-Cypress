const envVariable = require("../fixtures/envVariable.json");
const currentUser = require("../fixtures/currentUser.json");

describe("Delete User", () => {
	it("Deletes a user", () => {
		cy.request({
			method: "DELETE",
			url: envVariable.baseURL + "/user/delete/" + currentUser.userID,
			headers: {
				'Authorization': "Bearer " + envVariable.token,
				'X-AUTH-SECRET-KEY': envVariable.secretKey,
			},
		}).then((responce) => {
			expect(responce.status).eq(200);
            expect(responce.body.message).eq("User deleted successfully");

			//clearing the token
			envVariable.token=null;
			cy.writeFile(
				"cypress/fixtures/envVariable.json",
				JSON.stringify(envVariable)
			);
		});
	});
});