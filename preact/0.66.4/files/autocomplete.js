

/// beacon2-tests start
describe('Tracking', () => {
    /// beacon2-tests-autocomplete start
    it('tracked autocomplete render, impression, clickthrough', () => {
        const url = config.url;

        cy.visit(url);
        cy.get(config.selectors.website.input).first().type(config.startingQuery);

        new Cypress.Promise.all([cy.wait(`@beacon2/autocomplete/render`), cy.wait(`@beacon2/autocomplete/impression`)]).then(([render, impression]) => {
            expect(render.response.body).to.have.property('success').to.equal(true);
            expect(impression.response.body).to.have.property('success').to.equal(true);
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
    });
    /// beacon2-tests-autocomplete end
});
/// beacon2-tests end