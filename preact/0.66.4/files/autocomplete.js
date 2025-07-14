
/// beacon2-tests start
describe('Tracking', () => {
    /// beacon2-tests-autocomplete start
    it('tracked autocomplete render, impression, clickthrough', () => {
        const url = config.url;

        cy.visit(url);
		cy.addLocalSnap();

		cy.waitForBundle().then(() => {
			cy.window().then((window) => {
				expect(window.searchspring).to.exist;
			});
		});

		if (config.disableGA) {
			window[`ga-disable-${config.disableGA}`] = true;
		}

		if (config.selectors.website.openInputButton) {
			cy.get(config.selectors.website.openInputButton).first().click({ force: true });
		}

		cy.get(config.selectors.website.input).first().should('exist').focus().type(config.startingQuery, {force: true});

		cy.wait('@autocomplete').should('exist');

		new Cypress.Promise.all([cy.wait(`@beacon2/autocomplete/render`)]).then(([render]) => {
			expect(render.response.body).to.have.property('success').to.equal(true);
		}).then(() => {
			const firstResult = cy.get(`${config.selectors.autocomplete.result} a`).first();
			if (firstResult) {
				firstResult.click({ force: true });
			} else {
				const firstResult = cy.get(`${config.selectors.autocomplete.result}`).first();
				firstResult.click({ force: true });
			}

			cy.wait(`@beacon2/autocomplete/clickthrough`).then(({ request, response }) => {
				expect(response.body).to.have.property('success').to.equal(true);
			});
		});

		//impression tracking?
		// new Cypress.Promise.all([cy.wait(`@beacon2/autocomplete/impression`)]).then(([impression]) => {
		// 	expect(impression.response.body).to.have.property('success').to.equal(true);
		// })
		
    });
    /// beacon2-tests-autocomplete end
});
/// beacon2-tests end