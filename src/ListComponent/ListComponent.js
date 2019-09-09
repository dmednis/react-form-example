import React from 'react';
import './ListComponent.css';

function ListComponent({idx, value, onChange, onRemove}) {
    return (
        <div className="list-component">
            <input type="text" value={value} onChange={(e) => onChange(idx, e.target.value)}/>
            <button onClick={(e) => {
                e.preventDefault()
                onRemove(idx);
            }}>X
            </button>
        </div>
    );
}

export default ListComponent;