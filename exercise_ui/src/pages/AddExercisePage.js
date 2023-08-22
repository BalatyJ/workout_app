import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [reps, setReps] = useState('');
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        if (!(window.confirm("Do you want to submit your exercise?") === true)) {

            return null;
        }

        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added exercise!");
        } else {
            alert(`Failed to add exercise: status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <>
            <article>
                <h2>Record an exercise</h2>
                <p>Any exercises you've done can be entered here. You should include the exercise you did,
                    how many reps you performed, your current weight, the unit of your weight or of the distance you traveled
                    (miles or kms), and the date the exercise was performed. This exercise will be stored in our database so you
                    can reference it at your own convenience!<br></br><br></br>Keep in mind that all fields are required,
                    and the number of reps and weight has to be greater than 1.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); }} noValidate>
                    <fieldset>
                        <legend>Enter Exercise Details: </legend>


                        <label for="name">Exercise name: </label>
                        <input
                            type="text"
                            value={name}
                            placeholder=""
                            onChange={e => setName(e.target.value)}
                            id="name"
                            required />

                        <label for="reps">Repetitions performed: </label>
                        <input
                            type="number"
                            placeholder=""
                            value={reps}
                            onChange={e => {
                                if (e.target.value <= 0) {
                                    e.target.setCustomValidity("Needs to be 1 or higher.");
                                } else {
                                    e.target.setCustomValidity("");
                                }
                                setReps(e.target.value)
                            }}
                            id="reps"
                            required />

                        <label for="weight">Your current weight: </label>
                        <input
                            type="number"
                            placeholder=""
                            value={weight}
                            onChange={e => {
                                if (e.target.value <= 0) {
                                    e.target.setCustomValidity("Needs to be 1 or higher.");
                                } else {
                                    e.target.setCustomValidity("");
                                }
                                setWeight(e.target.value)
                            }}
                            id="weight"
                            required />


                        <label for="unit">Unit</label><br></br>
                        <select name="unit" id="unit" onChange={e => setUnit(e.target.value)} required>
                            <option value="lbs" selected required>Lbs</option>
                            <option value="kgs" required>Kgs</option>
                            <option value="miles" required>Miles</option>
                            <option value="kms" required>Kilometers</option>
                        </select><br></br>

                        <label for="date">Date exercise was performed: </label>
                        <input
                            type="Date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            id="date"
                            required /><br></br>


                        <label for="submit">Add Exercise to your exercise record.</label><br></br>
                        <button
                            type="submit"
                            onClick={addExercise}
                            id="submit"
                        >Record Exercise</button>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;