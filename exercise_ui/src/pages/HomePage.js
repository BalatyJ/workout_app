import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExercise }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of movies
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }


    // UPDATE a movie
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }


    // DELETE an exercise 
    const onDeleteExercise = async _id => {
        if (!(window.confirm("Are you sure you want to delete this exercise?") === true))
            return null;
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the exercises on inital start up.
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the movies
    return (
        <>
            <article>
                <h2>Exercise Database</h2>
                <p>Keep track of all your exercises all in one place! Here you can enter
                    information about your exercises and we'll update our database so you can keep track
                    of which exercises you've done on which days.
                </p>
                <ExerciseList
                    exercises={exercises}
                    onEdit={onEditExercise}
                    onDelete={onDeleteExercise}
                />
            </article>
        </>
    );
}

export default HomePage;