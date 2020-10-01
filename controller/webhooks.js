const Controller = {};

Controller.register = function (req, res){
    res.status(200).send({ title: 'Express' });
}

module.exports = Controller;
