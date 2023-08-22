import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';
import { body, validationResult } from 'express-validator';


const PORT = process.env.PORT;
const app = express();
app.use(express.json());


function validateExercise(req) {
    if (req.body.name === undefined || req.body.name === "") {
        console.log("Failed at name.");
        return false;

    } if (typeof req.body.reps === undefined ||
        req.body.reps <= 0 ||
        (Number.isNaN(parseInt(req.body.reps)))) {
        console.log("Failed at reps.");
        console.log(typeof req.body.reps);
        return false;

    }
    console.log(Number.isNaN(req.body.reps));

    if (req.body.weight === undefined ||
        req.body.weight <= 0 ||
        (Number.isNaN(parseInt(req.body.reps)))) {
        console.log("Failed at weight.");
        return false;

    } if (req.body.unit === undefined || req.body.unit <= 0) {
        console.log("Failed at unit.");
        return false;

    } if (req.body.date === undefined) {
        console.log("Failed at date.");
        return false;
    }

    // Let date be a string that's equal to the numbers in
    //  date. If date is NaN, return false.
    let date = req.body.date.split("-").join("")
    if (Number.isNaN(parseInt(date))) {
        return false;
    }

    return true;
}


// CREATE controller ******************************************
app.post('/exercises', (req, res) => {

    // Validate that the different properties of the req are all valid.
    // Throw error any time any property is invalid.
    exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Storage of the exercise failed due to invalid syntax.' });
        });
});



// RETRIEVE controller ****************************************************
// GET movies by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                throw error
            }
        })
        .catch(error => {
            res.status(404).json({ Error: 'Exercise not found' });
        });

});


app.get('/exercises', (req, res) => {
    const filter = {};

    exercises.getExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', (req, res) => {

    try {
        if (validateExercise(req) === false) {
            throw 400;
        }

        exercises.replaceExercise(
            req.params._id,
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        )
            .then(numUpdated => {
                if (numUpdated === 1) {
                    res.json({
                        _id: req.params._id,
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        unit: req.body.unit,
                        date: req.body.date
                    })
                } else {
                    res.status(404).json({ Error: 'Document not found' });
                }
            })
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    };
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});