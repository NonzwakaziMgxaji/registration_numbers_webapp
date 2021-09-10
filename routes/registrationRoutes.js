const eish = require('../regFactoryF');

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
                var regex = /^((CA|CY|CK|CL)\s\d{3}\-\d{3})$|^((CA|CY|CK|CL)\s\d{3}\d{3})$|^((CA|CY|CK|CL)\s\d{3}\s\d{3})$/;
                var testRegularExp = regex.test(req.body.regText)
                if (testRegularExp) {
                    await registrationFactory.enterReg(req.body.regText)
                    req.flash('feedback', "Registration number successfully added!")
                }
                else {
                    req.flash('warning', "Please enter valid registration number!");
                }
            } else if (!req.body.regText) {
                req.flash('warning', "Please enter registration number!");
            }
        } catch (error) {
            console.log(error);
        }
        res.redirect("/")
    }

    async function selectTheTown(req, res, next) {
        try {
            if (req.body.town) {
                const regies = await registrationFactory.selectedTown(req.body.town)
                res.render('index', {
                    allReg: regies
                })
            } else if (!req.body.town) {
                req.flash('warning', "Please select the town below!")
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function showAllTowns(req, res, next) {
        try {
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