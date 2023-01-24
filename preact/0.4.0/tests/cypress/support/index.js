// ***********************************************************
// Custom Snap Cypress Configuration
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// ignore 3rd party uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => false);

beforeEach(() => {
	// make references to requests available
	cy.intercept(/.*searchspring.io\/api\/search\/search/).as('search');
	cy.intercept(/.*searchspring.io\/api\/search\/autocomplete/).as('autocomplete');

	// prevent v2 and v3 assets
	cy.intercept(/.*searchspring.net\/search\/*/, (req) => {
		req.destroy();
	});
	cy.intercept(/.*searchspring.net\/autocomplete\/*/, (req) => {
		req.destroy();
	});
	cy.intercept(/.*searchspring.net\/ajax_search\/js\/*/, (req) => {
		req.destroy();
	});

	// prevent snap assets
	cy.intercept(/.*snapui.searchspring.io\/.*.js$/, (req) => {
		req.destroy();
	});

	// prevent 3rd party assets
	cy.intercept(/.*widget.privy.com\/*/, (req) => {
		req.destroy();
	});
	cy.intercept(/.*.swymrelay.com\/*/, (req) => {
		req.destroy();
	});
});