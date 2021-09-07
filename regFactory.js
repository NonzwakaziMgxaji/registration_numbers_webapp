module.exports = function registrationFactory(pool) {
    let regNums;

    async function enterReg(regNum) {
        regNums = regNum;
        await pool.query('insert into reg_numbers (regNum, town_code) values($1, $2)', [regNums, 1])
    }

    async function getEnteredReg() {
        return regNums;
    }

    async function getAllReg() {
        var allTheRegies = await pool.query("select distinct regNum from reg_numbers")
        return allTheRegies.rows;
        
    }

    




    return {
        enterReg,
        getEnteredReg,
        getAllReg
    }
}