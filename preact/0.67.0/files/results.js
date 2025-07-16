
// begin beacon tracking testing
describe('Tracking', () => {
	it('makes api request', function () {
		const url = config.pages.find((page) => `${page.id}`.toLowerCase() == 'search')?.url || config.pages[0].url;

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

		cy.wait('@search').should('exist');
	});

	it('tracks render', () => {
		cy.wait(`@beacon2/search/render`).then((render) => {
			expect(render.response.body).to.have.property('success').to.equal(true);
		});
	});

	// unskip the block below to add impression tracking testing
	it.skip('tracks impression', () => {
		cy.wait(`@beacon2/search/impression`).then((impression) => {
			expect(impression.response.body).to.have.property('success').to.equal(true);
		});
	});

	it('tracks clickthrough', () => {
		cy.wait(1000); // wait for results to load
		cy.get(`${config.selectors.results.productWrapper}[href], ${config.selectors.results.productWrapper} a[href]`)
			.first()
			.should('exist')
			.click({ force: true });

		cy.wait(`@beacon2/search/clickthrough`).then((clickthrough) => {
			expect(clickthrough.response.body).to.have.property('success').to.equal(true);
		});
	});
});
// end beacon tracking testing