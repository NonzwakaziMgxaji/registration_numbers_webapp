const regNo = require('../regFactoryF');

const pg = require("pg");
const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/registration_numbers';
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = function routes(registrationFactory) {
    async function home(req, res, next) {
        try {
            res.render('index', {
                allReg: await registrationFactory.getAllReg()
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function display(req, res, next) {
        try {
            if (req.body.regText) {
                if ((await pool.query("select regNum from reg_numbers where regNum = $1", [req.body.regText])).rowCount === 0){
                    var regex = /^((CA|CY|CK|CL)\s\d{3}\-\d{3})$|^((CA|CY|CK|CL)\s\d{3}\d{3})$|^((CA|CY|CK|CL)\s\d{3}\s\d{3})$/;
                    var testRegularExp = regex.test(req.body.regText)
                    if (testRegularExp) {
                        await registrationFactory.enterReg(req.body.regText)
                        req.flash('feedback', "Registration number successfully added!")
                    }
                    else {
                        req.flash('warning', "Please enter valid registration number using provided format!");
                    }
                } 
                else {
                    req.flash('warning', "Registration number already exists!");
                }
            } else if (!req.body.regText) {
                req.flash('warning', "Please enter registration number below!");
            }
        } catch (error) {
            console.log(error);
        }
        res.redirect("/")
    }

    async function selectTheTown(req, res, next) {
        try {
            let regies;
            if (req.body.town) {
                req.flash('feedback', "You've successfully displayed registration numbers of " + req.body.town)
                regies = await registrationFactory.selectedTown(req.body.town)
            } else {
                req.flash('warning', "Please select the town below!")
            }

            res.render('index', {
                allReg: regies
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function showAllTowns(req, res, next) {
        try {
            req.flash('feedback', "You've successfully displayed all registration numbers in the database!")
            res.render('index', {
                allReg: await registrationFactory.getAllReg()
            })
            
        }
        catch (error) {
            console.log(error);
        }
    }

    async function reset(req, res, next) {
        try {
            await registrationFactory.reset();
            req.flash('feedback', "You've successfully reset the database!")
            res.redirect("/")
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        home,
        display,
        selectTheTown,
        showAllTowns,
        reset
    }
}