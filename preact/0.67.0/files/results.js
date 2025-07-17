
// begin beacon tracking testing
describe('Tracking', () => {
	it('sends beacon events', function () {
		if (!config.selectors.results?.productWrapper) this.skip();

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
		cy.wait(`@beacon2/search/render`).then((render) => {
			expect(render.response.body).to.have.property('success').to.equal(true);
		});

		const firstResult = cy.get(`${config.selectors.results.productWrapper}[href], ${config.selectors.results.productWrapper} a[href]`)
			.first()
			.should('exist')
			.scrollIntoView();

		// uncomment the block below to add impression tracking testing
		// cy.wait(`@beacon2/search/impression`).then((impression) => {
		// 	expect(impression.response.body).to.have.property('success').to.equal(true);
		// });

		// click tracking
		firstResult.trigger('click', { force: true });
		cy.wait(`@beacon2/search/clickthrough`).then((clickthrough) => {
			expect(clickthrough.response.body).to.have.property('success').to.equal(true);
		});
	});
});
// end beacon tracking testing