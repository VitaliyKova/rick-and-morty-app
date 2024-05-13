import React, { useState } from "react";
import "../styles/Filter.css";

const Filter = ({ onFilter }) => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('');

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleStatusChange = event => {
        setStatus(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onFilter({ name, status })
    };

    return (
        <div className="filter">
            <form className="filter__form" onSubmit={handleSubmit}>
                <input className="filter__input" type="text" value={name} onChange={handleNameChange} placeholder="Filter by name" />
                <select className="filter__select" value={status} onChange={handleStatusChange}>
                    <option value="">Filter by status</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">unknown</option>
                </select>
                <button className="filter__button" type="submit">Apply</button>
            </form>
        </div>
    );
};

export default Filter;