const model = require('../models/index');
// const Address = require('../models/address');

class LabController {


    async index(req, res) {
        const lab = await model.Lab.findAll({
            where: {status: true},
            include: [
                {
                    model: model.Address,
                    attributes: ['postal_code', 'city', 'neighborhood', 'address', 'uf', 'complement'],
                }
            ]
        });

        return res.json(lab);
    }

    async update(req, res) {
        const {name, status, postal_code, city, neighborhood, address, uf, complement} = req.body;

        const lab = await model.Lab.findOne({where: {id: req.params.id }});

        const idAdress = lab.address_id;

        const addressObject = await model.Address.findOne({where: {id: idAdress }});

        addressObject.postal_code = postal_code;
        addressObject.city = city;
        addressObject.neighborhood = neighborhood;
        addressObject.address = address;
        addressObject.uf = uf;
        addressObject.complement = complement;

        lab.name = name;
        lab.status = status;

        await addressObject.save();

        await lab.save();

        return res.json({addressObject, lab});


    }

    async delete (req, res) {

        // const exam = await model.Exam.findOne({where: {id: req.params.id }});

        const labObject = await model.Lab.findOne({where: {id: req.params.id }});

        if(labObject == null) {
            return res.status(400).json({ error: "lab does not exist." });
        }


        if(labObject.status == true) {

            const lab = await model.Lab.destroy({
                where: {id: req.params.id }
            });

            return res.json(lab);
       } else {
           return res.status(400).json({ error: "Lab need stay with status active to delete." });
       }



    }

    async store(req, res) {
        const {name, status, postal_code, city, neighborhood, address, uf} = req.body;
        let statusLab = true;

        if( postal_code == '' || city == '' || neighborhood == '' || address == '' || uf == '') {
            return res.status(400).json({ error: "Missing fields Address required." });
        }

        if(name == '') {
            return res.status(400).json({ error: "Name of lab required." });
        }

        if(status !== '') {
            statusLab = status;
        }

        const addressObject = await model.Address.create(req.body);

        const labObject = await model.Lab.create({
            name: name,
            status: statusLab,
            address_id: addressObject.id
        })


        return res.json(labObject);
    }

}

module.exports = new LabController();
