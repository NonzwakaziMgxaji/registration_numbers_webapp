const eish = require('../regFactoryF');

module.exports = function routes(registrationFactory){
    async function home(req, res, next){
        try{
            res.render('index', {
                allReg: await registrationFactory.getAllReg()
            })
        } catch(error){
            console.log(error);
        }
    }

    async function display(req, res, next){
        try{
            if (req.body.regText){
                await registrationFactory.enterReg(req.body.regText)
                req.flash('feedback', "Registration number successfully added!")
            } else if (!req.body.regText){
                req.flash('warning', "Please enter registration number!");
            }
        } catch (error){
            console.log(error);
        }
        res.redirect("/")
    }

    async function selectTheTown(req, res, next){
        try{
            if (req.body.town){
                const regies = await registrationFactory.selectedTown(req.body.town)
                res.render('index', {
                    allReg: regies
                })
            } else if (!req.body.town){
                req.flash('warning', "Please select the town below!")
            }
            
        } catch(error){
            console.log(error);
        }
    }

    async function showAllTowns(req, res, next){
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


    return{
        home,
        display,
        selectTheTown,
        showAllTowns,
        reset
    }
}