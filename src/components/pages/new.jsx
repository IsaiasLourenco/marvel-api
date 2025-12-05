class BankAccount {
    static changeAccountType(accountYype) {
        this.newAccountType = accountYype;
        return this.newAccountType;
    }

    constructor({ newAccountType = "Normal" } = {} ) {
        this.newAccountType = newAccountType;
    }
}

const customer = new BankAccount({ newAccountType: "Gold" });
console.log(customer.changeAccountType("Preferred"));