import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { CgTrash } from "react-icons/cg";

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td><CgTrash onClick={() => onDelete(exercise._id)} /></td>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td><FiEdit onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}

export default Exercise;