
// begin beacon tracking testing
describe('Tracking', () => {
	it('makes api request', function () {
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

		cy.get(config.selectors.website.input).first().should('exist').focus().type(config.startingQuery, { force: true });

		cy.wait('@autocomplete').should('exist');
	});

	it('tracks render', () => {
		cy.wait(`@beacon2/autocomplete/render`).then((render) => {
			expect(render.response.body).to.have.property('success').to.equal(true);
		});
	});

	// unskip the block below to add impression tracking testing
	it.skip('tracks impression', () => {
		cy.wait(`@beacon2/autocomplete/impression`).then((impression) => {
			expect(impression.response.body).to.have.property('success').to.equal(true);
		});
	});

	it('tracks clickthrough', () => {
		cy.get(`${config.selectors.autocomplete.result}[href], ${config.selectors.autocomplete.result} a[href]`)
			.first()
			.should('exist')
			.click({ force: true });

		cy.wait(`@beacon2/autocomplete/clickthrough`).then((clickthrough) => {
			expect(clickthrough.response.body).to.have.property('success').to.equal(true);
		});
	});
});
// end beacon tracking testing