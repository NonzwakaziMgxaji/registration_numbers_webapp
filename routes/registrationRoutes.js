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
                await registrationFactory.checkExistingReg(req.body.regText)
                if (await registrationFactory.checkExistingReg(req.body.regText) === 0) {
                    var regex = /^((CA|ca|CY|cy|CK|ck|CL|cl)\s\d{3}\-\d{3})$|^((CA|ca|CY|cy|CK|ck|CL|cl)\s\d{3}\d{3})$|^((CA|ca|CY|cy|CK|ck|CL|cl)\s\d{3}\s\d{3})$/;
                    var testRegularExp = regex.test(req.body.regText)
                    if (testRegularExp) {
                        let regNumber = req.body.regText
                        await registrationFactory.enterReg(regNumber)
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
            const selectedTown = req.body.town;
            if (selectedTown) {
                if ((await registrationFactory.selectedTown(selectedTown)).length < 1) {
                    req.flash('feedback', "No registration number for this town yet!")
                } else {
                    req.flash('feedback', "You've successfully displayed all the registration numbers starting with " + selectedTown)
                    regies = await registrationFactory.selectedTown(selectedTown)
                }
                res.render('index', {
                    allReg: regies,
                })
            } else {
                req.flash('warning', "Please select the town below!")
                res.redirect('/')
            }
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