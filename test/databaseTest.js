const assert = require('assert');
const registrationFactory = require('../regFactoryF');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/registration_numbers';

const pool = new Pool({
    connectionString
});

describe('The registration-webapp database', function () {
    let registration = registrationFactory(pool);

    beforeEach(async function () {
        await pool.query("delete from reg_numbers;");
    });
    
    it('should be able to set registration numbers and get them from database', async function () {
        await registration.enterReg("CA 123456");
        assert.deepEqual([{regnum: 'CA 123456'}], await registration.getAllReg())
    });

    it('should test duplication in the database', async function () {
        await registration.enterReg("CA 123456");
        await registration.enterReg("CA 123456");
        assert.equal(1, await registration.countReg())
    });

    it("should be able to display only the registration numbers of selected town", function () {
        await registration.enterReg("CA 123456");
        await registration.enterReg("CY 654321");
        await registration.enterReg("CK 789456");
        await registration.enterReg("CA 222222");
        assert.deepEqual("CA 123456", await registration.selectedTown());
    });

    it('should be able to reset the database', async function(){
        await registration.getAllReg();
        assert.equal(0, await registration.reset())
    });

    after(function () {
        pool.end();
    })
});