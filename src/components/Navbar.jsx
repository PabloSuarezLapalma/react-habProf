import React, { useState } from 'react';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#" onClick={handleDropdown}>Movimientos</a>
          {showDropdown && (
            <ul>
              <li><a href="#">Registrar Ingreso</a></li>
              <li><a href="#">Registrar Egreso</a></li>
              <li><a href="#">Relocalizar</a></li>
            </ul>
          )}
        </li>
        <li><a href="#">Gestion</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
