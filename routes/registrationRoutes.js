const eish = require('../regFactory');

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
            }
        } catch (error){
            console.log(error);
        }
        res.redirect("/")
    }

    // async function selectTheTown(req, res, next){
    //     try{
    //         if (req.body.town){
    //             await registrationFactory.selectedTown(req.body.town)
    //         }
    //     } catch(error){
    //         console.log(error);
    //     }
    // }

    async function reset(req, res, next) {
        try {
            var resetAll = await registrationFactory.reset();
            res.redirect("/")
        }
        catch (error) {
            console.log(error);
        }
    }


    return{
        home,
        display,
        // selectTheTown,
        reset
    }
}