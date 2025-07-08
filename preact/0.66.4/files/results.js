

/// beacon2-tests start
describe('Tracking', () => {
    /// beacon2-tests-autocomplete start
    it('tracked search render, impression, clickthrough', () => {
        const url = config.pages.find(page => `${page.id}`.toLowerCase() == 'search')?.url || config.pages[0].url;

        cy.visit(url);

        new Cypress.Promise.all([cy.wait(`@beacon2/search/render`), cy.wait(`@beacon2/search/impression`)])
            .then(([render, impression]) => {
                expect(render.response.body).to.have.property('success').to.equal(true);
                expect(impression.response.body).to.have.property('success').to.equal(true);
            })
            .then(() => {
                const firstResult = cy.get(`${config.selectors.results.productWrapper} a`).first();
                if (firstResult) {
                    firstResult.click({ force: true });
                } else {
                    const firstResult = cy.get(`${config.selectors.results.productWrapper}`).first();
                    firstResult.click({ force: true });
                }

                cy.wait(`@beacon2/search/clickthrough`).then((clickthrough) => {
                    expect(clickthrough.response.body).to.have.property('success').to.equal(true);
                });
            });
    });
    /// beacon2-tests-autocomplete end
});
/// beacon2-tests end