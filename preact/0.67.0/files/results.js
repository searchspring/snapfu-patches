
/// beacon2-tests start
describe('Tracking', () => {
    it('tracked search render, impression, clickthrough', () => {
        const url = config.pages.find(page => `${page.id}`.toLowerCase() == 'search')?.url || config.pages[0].url;

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

		cy.snapController().then(({ store }) => {
			expect(typeof store).to.equal('object');

			expect(store).to.haveOwnProperty('pagination');
			expect(store.pagination.totalResults).to.be.greaterThan(0);
			expect(store.pagination.page).to.equal(1);
		});

		new Cypress.Promise.all([cy.wait(`@beacon2/search/render`)]).then(([render]) => {
			expect(render.response.body).to.have.property('success').to.equal(true);
		}).then(() => {
			const firstResult = cy.get(`${config.selectors.autocomplete.result} a`).first();
			if (firstResult) {
				firstResult.click({ force: true });
			} else {
				const firstResult = cy.get(`${config.selectors.autocomplete.result}`).first();
				firstResult.click({ force: true });
			}

			cy.wait(`@beacon2/search/clickthrough`).then(({ request, response }) => {
				expect(response.body).to.have.property('success').to.equal(true);
			});
		});

		//impression tracking?
		// new Cypress.Promise.all([cy.wait(`@beacon2/autocomplete/impression`)]).then(([impression]) => {
		// 	expect(impression.response.body).to.have.property('success').to.equal(true);
		// })
	});
});
/// beacon2-tests end