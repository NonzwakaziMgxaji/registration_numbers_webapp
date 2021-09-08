module.exports = function registrationFactory(pool) {
    
    async function enterReg(regNum) {
        // regNums = regNum;
        const townId = await checkStartsWith(regNum);
        await pool.query('insert into reg_numbers (regNum, town_code) values($1, $2)', [regNum, townId])
    }

    async function getEnteredReg() {
        return regNum;
    }

    async function getAllReg() {
        var allTheRegies = await pool.query("select distinct regNum from reg_numbers")
        return allTheRegies.rows;
    }

    async function checkStartsWith(regNums){
        regNums.toUpperCase();
        var sub = regNums.substring(0,2);
        const regId = await pool.query("select id from towns where startsWith_string = $1", [sub]);
        return regId.rows[0].id;
    }
    
    // async function selectedTown(radioBtn){
    //     const a = ""
    //     if(radioBtn === "capetown"){
    //         a = await pool.query("select distinct regNum from reg_numbers where town_code = $1", [1]);
    //     } else if(radioBtn === "bellville"){
    //         a = await pool.query("select distinct regNum from reg_numbers where town_code = $1", [2]);
    //     } else if(radioBtn === "malmesbury"){
    //         a = await pool.query("select distinct regNum from reg_numbers where town_code = $1", [3]);
    //     } else if (radioBtn === "stellie"){
    //         a = await pool.query("select distinct regNum from reg_numbers where town_code = $1", [4]);
    //     }
    //     console.log(a);
    //     return a;
    // }

    // var filteredred = await pool.query("select * from reg_numbers where town_id = ${town_id}")

    async function reset() {
        var resetAll = await pool.query("delete from reg_numbers")
        return resetAll.rows;
    }

    return {
        enterReg,
        getEnteredReg,
        getAllReg,
        checkStartsWith,
        // selectedTown,
        reset
    }
}