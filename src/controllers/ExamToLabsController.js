const model = require('../models/index');

class ExamToLabsController {

    async index(req, res) {
        const exam = await model.ExamToLabs.findAll({
            include: [
                {
                    model: model.Lab,
                    attributes: ['name', 'status'],
                    include: [
                        {
                            model: model.Address,
                            attributes: ['postal_code', 'city', 'neighborhood', 'address', 'uf', 'complement']
                        }
                    ]
                },
                {
                    model: model.Exam,
                    attributes: ['name', 'type_exam', 'status'],
                }
            ]
        });

        return res.json(exam);
    }

    async searchExam(req, res) {

        let labs = [];

        const examObject = await model.Exam.findOne({where: {name: req.params.exam }});

        if(examObject == null) {
            return res.status(400).json({ error: "Exam does not exist" });
        }

        let exam = await model.ExamToLabs.findAll({
            where: {exam_id: examObject.id},
            include: [

                {
                    model: model.Lab,
                    attributes: ['name', 'status'],
                    include: [
                        {
                            model: model.Address,
                            attributes: ['postal_code', 'city', 'neighborhood', 'address', 'uf', 'complement']
                        }
                    ]
                }

            ]
        });

        if(exam.length == 0) {
            return res.status(400).json({ error: "its not have Lab associated" });
        }


        exam.forEach((element, index) => {

            labs.push({lab: element.Lab.dataValues, address: element.Lab.Address.dataValues});
        });


         return res.json({exam: examObject, labs: labs});

    }

    async disassociate(req, res) {

        const {lab_id, exam_id} = req.body;

        const exam = await model.Exam.findOne({where: {id: exam_id }});
        const lab = await model.Lab.findOne({where: {id: lab_id }});

        if(exam == null || lab == null) {
            return res.status(400).json({ error: "Exam or Lab does not exist" });
        }

        const associateExist = await model.ExamToLabs.findOne({where: {lab_id: lab_id, exam_id: exam_id }});

        if(associateExist == null) {
            return res.status(400).json({ error: "That associate is not exist" });
        }

        const assosDelete = await model.ExamToLabs.destroy({where: {lab_id: lab_id, exam_id: exam_id }});

        return res.json(assosDelete);
    }

    async associate(req, res) {

        const {lab_id, exam_id} = req.body;

        const exam = await model.Exam.findOne({where: {id: exam_id }});
        const lab = await model.Lab.findOne({where: {id: lab_id }});



        if(exam == null || lab == null) {
            return res.status(400).json({ error: "Exam or Lab does not exist" });
        }


        if(exam.status == false || lab.status == false) {
            return res.status(400).json({ error: "Exam or Lab does not active" });
        }


        const associateExist = await model.ExamToLabs.findOne({where: {lab_id: lab_id, exam_id: exam_id }});

        if(associateExist !== null) {
            return res.status(400).json({ error: "That associate is already exist" });
        }




        const examToLabsObject = await model.ExamToLabs.create({
            lab_id: lab_id,
            exam_id: exam_id
        });


        return res.json(examToLabsObject);
    }

    async update(req, res) {

        const {name, type_exam, status} = req.body;

        const exam = await model.Exam.findOne({where: {id: req.params.id }});

        exam.name = name;
        exam.type_exam = type_exam;
        exam.status = status;

        await exam.save();

        return res.json(exam);

    }

    async delete (req, res) {

        const exam = await model.Exam.destroy({
            where: {id: req.params.id }
        });

        return res.json(exam);

    }


    async store(req, res) {
        const {name, type_exam, status} = req.body;

        let statusExam = true;

        if( name == '' || type_exam == '' ) {
            return res.status(400).json({ error: "Missing fields required." });
        }

        if(status !== '') {
            statusExam = status;
        }

        const examObject = await model.Exam.create(req.body);


        return res.json(examObject);
    }

}

module.exports = new ExamToLabsController();
