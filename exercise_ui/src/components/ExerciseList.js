import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <caption>Add and Edit Exercises</caption>
            <thead>
                <tr>
                    <th>Delete</th>
                    <th>Exercise Name</th>
                    <th>Number of Repetitions</th>
                    <th>Current Weight</th>
                    <th id='unitHeader'>Unit</th>
                    <th>Date</th>
                    <th id='editHeader'>Edit</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) =>
                    <Exercise
                        exercise={exercise}
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;
