module.exports = function registrationFactory(pool) {
    async function enterReg(regNum) {
        await pool.query("select regNum from reg_numbers where regNum = $1", [regNum])
        const townId = await checkStartsWith(regNum);
        await pool.query('insert into reg_numbers (regNum, town_code) values($1, $2)', [regNum, townId])
    }

    async function selectedTown(startsWith_code) {
        let townId = await checkStartsWith(startsWith_code)
        let reg = await pool.query("select regNum from reg_numbers where town_code = $1", [townId]);
        return reg.rows;
    }

    async function checkStartsWith(regNums) {
        let upper = regNums.toUpperCase();
        let sub = upper.substring(0, 2)
        let regId = await pool.query("select id from towns where startsWith_string = $1", [sub]);
        return regId.rows[0].id;
    }

    async function getAllReg() {
        var allTheRegies = await pool.query("select regNum from reg_numbers")
        return allTheRegies.rows;
    }

    async function countReg() {
        var regreg = await pool.query("select distinct regNum from reg_numbers")
        return regreg.rowCount;
    }

    async function checkExistingReg(reg) {
        let regExist = await pool.query("select regNum from reg_numbers where regNum = $1", [reg])
        return regExist.rowCount;
    }

    async function reset() {
        var resetAll = await pool.query("delete from reg_numbers")
        return resetAll.rows;
    }

    return {
        enterReg,
        getAllReg,
        checkStartsWith,
        selectedTown,
        countReg,
        reset,
        checkExistingReg
    }
}