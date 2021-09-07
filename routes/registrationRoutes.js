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


    return{
        home,
        display
    }
}