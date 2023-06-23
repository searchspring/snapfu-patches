#!/bin/bash
# bash script for moving from Cypress 8.5.0 -> 12.15.0

# create new spec file directory
mkdir -p ./tests/cypress/e2e

# if integration directory exists, and is not empty
if [ -d ./tests/cypress/integration ]; then
    if [ -n "ls ./tests/cypress/integration" ]; then
        cp ./tests/cypress/integration/* ./tests/cypress/e2e
    fi

    rm -rf ./tests/cypress/integration
fi

# rename spec files if they exist
if [ -n "ls ./tests/cypress/e2e/*.spec.js" ]; then 
    for file in ./tests/cypress/e2e/*.spec.js; do
        mv -- "$file" "${file%.spec.js}.cy.js"
    done
fi

mv ./tests/cypress/support/index.js ./tests/cypress/support/e2e.js

rm ./tests/cypress.json

cp ./patch/tests/cypress.config.js ./tests/cypress.config.js
cp ./patch/tests/cypress/support/commands.js ./tests/cypress/support/commands.js