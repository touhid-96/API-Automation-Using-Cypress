const envVariable = require("../fixtures/envVariable.json");
const currentUser = require("../fixtures/currentUser.json");

describe("Search User", () => {
	it("Searchs a user", () => {
		cy.request({
			method: "GET",
			url: envVariable.baseURL + "/user/search/id/" + currentUser.userID,
			headers: {
				'Authorization': "Bearer " + envVariable.token,
			},
		}).then((responce) => {
			expect(responce.status).eq(200);
            expect(responce.body.message).eq("User found");
		});
	});
});