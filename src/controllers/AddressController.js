const model = require('../models/index');

class AddressController {

    async index(req, res) {
        const address = await model.Address.findAll();

        return res.json(address);
    }


    async store(req, res) {
        const {postal_code, city, neighborhood, address, uf} = req.body;

        if( postal_code == '' || city == '' || neighborhood == '' || address == '' || uf == '') {
            return res.status(400).json({ error: "Missing fields required." });
        }

        const addressObject = await model.Address.create(req.body);


        return res.json(addressObject);
    }

}

module.exports = new AddressController();
