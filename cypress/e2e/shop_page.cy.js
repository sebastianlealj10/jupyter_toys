const get_toy_price = (toyName) => {
    cy.contains(toyName).parent().children('td').eq(1).then(($td) => {
        cy.log($td.text().substring(1));
        cy.wrap($td.text().substring(1)).as('toyPrice');
    });
}

const get_toy_quantity = (toyName) => {
    cy.contains(toyName).parent().children('td').eq(2).children().invoke('attr', 'value').then(($quantity) => {
        cy.log($quantity);
        cy.wrap($quantity).as('toyQuantity');
    });
}

const get_sub_total = (toyName) => {
    cy.contains(toyName).parent().children('td').eq(3).then(($td) => {
        cy.log('Toy subtotal')
        cy.log($td.text().substring(1));
        cy.wrap(Number($td.text().substring(1))).as('toySubTotal');
    });
}

const calculate_sub_total = (toyName) => {
    get_toy_price(toyName);
    get_toy_quantity(toyName);
    get_sub_total(toyName);
    cy.get('@toyPrice').then(toyPrice => {
        cy.get('@toyQuantity').then(toyQuantity => {
            cy.log(toyQuantity);
            cy.log(toyPrice)
            const subTotal = toyPrice * toyQuantity;
            cy.wrap(Number(subTotal)).as('CalculatedSubTotal');
        });
    });
    cy.get('@toySubTotal').then(subTotal => {
        cy.get('@CalculatedSubTotal').then(CalculatedSubTotal => { expect(subTotal).equal(CalculatedSubTotal) })
    })
}

const get_sub_totals = (toys) => {
    var subTotals = [];
    toys.forEach(toy => {
        calculate_sub_total(toy);
        cy.get('@CalculatedSubTotal').then(subTotal => {
            subTotals.push(subTotal)
        });
    });
    cy.wrap(subTotals).as('subtotals');
}

const validate_total = (toys) => {
    get_sub_totals(toys);
    cy.get('@subtotals').then(subtotals => {
        var subTotals = Object.assign([], subtotals);
        var total = 0;
        subTotals.forEach(subtotal => {
            total += subtotal;
        });
        cy.contains(`Total: ${total}`).should('be.visible');
    });
}

describe('Validation over the Shop page - Test cases 3 and 4', () => {
    it('The Shop page should allow to add products to the cart', () => {
        cy.contains('Funny Cow').parent().contains('Buy').click().click();
        cy.contains('Cart').parent().contains('2').should('be.visible');
        cy.contains('Fluffy Bunny').parent().contains('Buy').click();
        cy.contains('Cart').parent().contains('3').should('be.visible').click();
        cy.contains('Funny Cow').parent().get('.cart-item').should('be.visible');
        cy.contains('Fluffy Bunny').parent().get('.cart-item').should('be.visible');
    });

    it('The Shop page should calculate the totals of the checked items', () => {
        cy.contains('Stuffed Frog').parent().contains('Buy').click().click();
        cy.contains('Cart').parent().contains('2').should('be.visible');
        cy.contains('Fluffy Bunny').parent().contains('Buy').click().click().click().click().click();
        cy.contains('Cart').parent().contains('7').should('be.visible');
        cy.contains('Valentine Bear').parent().contains('Buy').click().click().click();
        cy.contains('Cart').parent().contains('10').should('be.visible').click();
        validate_total(['Fluffy Bunny', 'Stuffed Frog', 'Valentine Bear']);
    });

    beforeEach(() => {
        cy.visit('https://jupiter.cloud.planittesting.com/');
        cy.contains('Shop').click();
    });
})