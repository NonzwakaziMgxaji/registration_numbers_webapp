const assert = require('assert');
const registrationFactory = require('../regFactoryF');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/registration_numbers';

const pool = new Pool({
    connectionString
});

describe('The registration-webapp database', function () {

    beforeEach(async function () {
        await pool.query("delete from reg_numbers;");
    });

    it('should be able to set registration numbers and get them from database', async function () {
        let registration = registrationFactory(pool);
        await registration.enterReg("CA 123456");
        assert.deepEqual([{regnum: 'CA 123456'}], await registration.getAllReg())
    });

    it('should test duplication in the database', async function () {
        let registration = registrationFactory(pool);
        await registration.enterReg("CA 123456");
        await registration.enterReg("CA 123456");
        assert.equal(1, await registration.countReg())
    });

    it("should be able to display only the registration numbers of selected town", function () {
        let registration = registrationFactory(pool);
        registration.enterReg("CA 123456");
        registration.enterReg("CY 654321");
        registration.enterReg("CK 789456");
        registration.enterReg("CA 222222");
        assert.equal("CA 123456", await registration.selectedTown("capetown"));
    });

    it('should be able to reset the database', async function(){
        let registration = registrationFactory(pool);
        await registration.getAllReg();
        assert.equal(0, await registration.reset())
    });

    after(function () {
        pool.end();
    })
});