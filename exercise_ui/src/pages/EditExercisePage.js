import React from 'react';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';


export const EditExercisePage = ({ exercise }) => {
    //  Sets a state variable for each property in exercise.
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date);

    const history = useHistory();

    // Check if date or unit are undefined. If so, let the user know there was an error,
    //  and return to the home page.



    const editExercise = async () => {
        if (!(window.confirm("Do you want to edit your exercise" +
            " with the provided information ? ") === true)) {
            return null;
        }
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.status === 200) {
            alert(`Status Code: ${response.status} Successfully edited exercise!`);
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    };

    // Determines which option should be selected within Select for unit.
    const findSelectedOption = () => {
        const option = document.getElementById(exercise.unit);
        option.selected = true;
        return;
    };




    // Calls a function on initial load to select the correct option within Select.
    useEffect(() => {
        findSelectedOption();
    }, []);



    return (
        <>
            <article>
                <h2>Edit Exercises</h2>
                <p>Edit any of your exercises here. Also your weight and reps
                    have to be at least 1 or greater.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); }} noValidate>
                    <fieldset>
                        <legend>Enter details of your exercise: </legend>

                        <label for="name">Exercise name: </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                            required />

                        <label for="reps">Repetitions performed: </label>
                        <input
                            type="number"
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
                            <option value="lbs" id="lbs">Lbs</option>
                            <option value="kgs" id="kgs">Kgs</option>
                            <option value="miles" id="miles">Miles</option>
                            <option value="kms" id="kms">Kms</option>
                        </select><br></br>

                        <label for="date">Date exercise was performed: </label>
                        <input
                            type="Date"
                            value={date.substring(0, 10)}
                            onChange={e => setDate(e.target.value)}
                            id="date"
                            required />

                        <label for="submit">
                            <button
                                onClick={editExercise}
                                id="submit"
                            >Save Exercise</button></label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default EditExercisePage;