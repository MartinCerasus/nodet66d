const pingController = {};


pingController.ping = (req, res) => {
    res.status(200).json({
        sucess: true
        //message: 'Hello world'
    });
};

module.exports = pingController;
