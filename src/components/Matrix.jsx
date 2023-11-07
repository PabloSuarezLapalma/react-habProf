import React, { useState } from 'react';

function YourComponent() {
    // Create a 10x10 matrix with all cells initially white
    const [matrix, setMatrix] = useState(Array(10).fill().map(() => Array(10).fill('white')));

    // Function to change the color of a cell
    const changeColor = (rowIndex, colIndex) => {
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = newMatrix[rowIndex][colIndex] === 'white' ? 'blue' : 'white';
        setMatrix(newMatrix);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', maxWidth: '30vw'}}>
            {/* Existing form code... */}
            <div className='flex flex-wrap'>
                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((color, colIndex) => (
                            <div
                                key={colIndex}
                                onClick={() => changeColor(rowIndex, colIndex)}
                                style={{ backgroundColor: color, height: '1.5rem', width: '1.5rem', margin: '0.1rem' }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YourComponent;