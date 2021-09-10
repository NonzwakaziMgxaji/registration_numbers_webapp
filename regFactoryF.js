module.exports = function registrationFactory(pool) {

    async function enterReg(regNum) {
        // var regPlate = regNum.toUpperCase();
        var regex = /^((CA|CY|CK|CL)\s\d{3}\-\d{3})$|^((CA|CY|CK|CL)\s\d{3}\d{3})$|^((CA|CY|CK|CL)\s\d{3}\s\d{3})$/;
        var testRegularExp = regex.test(regNum)

        if(testRegularExp){
        var regNumber = await pool.query("select regNum from reg_numbers where regNum = $1", [regNum])
        const townId = await checkStartsWith(regNum);
        if (regNumber.rowCount === 0) {
            await pool.query('insert into reg_numbers (regNum, town_code) values($1, $2)', [regNum, townId])
        } 
        // else if(regNums.rowCount === 1){
        //     req.flash('warning', "Registration number already exists!");
        // }
        } else{
            console.log("a");
        }
    }

    async function getAllReg() {
        var allTheRegies = await pool.query("select regNum from reg_numbers")
        return allTheRegies.rows;
    }

    async function checkStartsWith(regNums) {
        regNums.toUpperCase();
        var sub = regNums.substring(0, 2);
        const regId = await pool.query("select id from towns where startsWith_string = $1", [sub]);
        return regId.rows[0].id;
    }

    async function selectedTown(radioBtn) {
        let reg;

        if (radioBtn === "capetown") {
            reg = await pool.query("select regNum from reg_numbers where town_code = $1", [1]);
        } else if (radioBtn === "bellville") {
            reg = await pool.query("select regNum from reg_numbers where town_code = $1", [2]);
        } else if (radioBtn === "malmesbury") {
            reg = await pool.query("select regNum from reg_numbers where town_code = $1", [3]);
        } else if (radioBtn === "stellie") {
            reg = await pool.query("select regNum from reg_numbers where town_code = $1", [4]);
        }
        return reg.rows;
    }

    async function countReg() {
        var regreg = await pool.query("select distinct regNum from reg_numbers")
        return regreg.rowCount;
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
        reset
    }
}