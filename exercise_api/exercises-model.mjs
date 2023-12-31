// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if (err) {
        res.status(500).json({ error: '500: Connection to the server failed.' });
    } else {
        console.log('Successfully connected to MongoDB Movies collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1

    },
    reps: {
        type: Number,
        required: true,
        min: 1
    },
    weight: {
        type: Number,
        required: true,
        min: 1
    },
    unit: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Compile the model from the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);


// CREATE model *****************************************
const createExercise = async (user, reps, userWeight, unit, date) => {
    try {
        const exercise = new Exercise({
            name: user,
            reps: reps,
            weight: userWeight,
            unit: unit,
            date: date
        });
        return exercise.save();
    }
    catch (error) {
        return error;
    }
}


// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const getExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}


// DELETE model based on ID  *****************************************
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
};


// REPLACE model *****************************************************
const replaceExercise = async (_id, user, reps, userWeight, unit, date) => {
    try {
        const result = await Exercise.replaceOne({ _id: _id }, {
            name: user,
            reps: reps,
            weight: userWeight,
            unit: unit,
            date: date
        });
        return result.modifiedCount;
    }
    catch (error) {
        return 0;
    }
}



// Export our variables for use in the controller file.
export { createExercise, getExercises, findExerciseById, replaceExercise, deleteById }