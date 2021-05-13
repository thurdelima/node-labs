const model = require('../models/index');

class ExamController {

    async index(req, res) {
        const exam = await model.Exam.findAll( {where: {status: true}});

        return res.json(exam);
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

        const examObject = await model.Exam.findOne({where: {id: req.params.id }});

        if(examObject == null) {
            return res.status(400).json({ error: "Exam does not exist." });
        }

        if(examObject.status == true) {

             const exam = await model.Exam.destroy({
                 where: {id: req.params.id }
                });

                return res.json(exam);
        } else {
            return res.status(400).json({ error: "Exam need stay with status active to delete." });
        }





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

module.exports = new ExamController();
