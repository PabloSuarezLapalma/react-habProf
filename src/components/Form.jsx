import React, { useState } from 'react';

const Form = () => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [nroRemito, setNroRemito] = useState('');
    const [transporte, setTransporte] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [chofer, setChofer] = useState('');
    const [chasis, setChasis] = useState('');
    const [acoplado, setAcoplado] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [posicion, setPosicion] = useState('');
    const [sector, setSector] = useState('');
    const [altura, setAltura] = useState('');
    const [ancho, setAncho] = useState('');
    const [largo, setLargo] = useState('');
    const [alto, setAlto] = useState('');
    const [codigoBWS, setCodigoBWS] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission here
    };

    return (
        <form onSubmit={handleSubmit} >
            <div >
                <label >
                    Código BWS:
                    <input type="text" value={codigoBWS} onChange={(e) => setCodigoBWS(e.target.value)}  />
                </label>
            </div>
            <div>
                <label>
                    Fecha:
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </label>
                <label>
                    Hora aproximada de ingreso:
                    <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Nro Remito:
                    <input type="number" value={nroRemito} onChange={(e) => setNroRemito(e.target.value)} />
                </label>
                <label>
                    Transporte:
                    <input type="text" value={transporte} onChange={(e) => setTransporte(e.target.value)} />
                </label>
                <label>
                    Tipo (de Transporte):
                    <input type="text" value={tipoTransporte} onChange={(e) => setTipoTransporte(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Chofer:
                    <input type="text" value={chofer} onChange={(e) => setChofer(e.target.value)} />
                </label>
                <label>
                    Chasis:
                    <input type="text" value={chasis} onChange={(e) => setChasis(e.target.value)} />
                </label>
                <label>
                    Acoplado:
                    <input type="text" value={acoplado} onChange={(e) => setAcoplado(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Descripción:
                    <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </label>
                <label>
                    Cantidad:
                    <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Posición:
                    <input type="text" pattern="[A-Za-z]" maxLength={1} value={posicion} onChange={(e) => setPosicion(e.target.value.toUpperCase())} />
                </label>
                <label>
                    Sector:
                    <input type="text" pattern="[A-Za-z]" maxLength={1} value={sector} onChange={(e) => setSector(e.target.value.toUpperCase())} />
                </label>
                <label>
                    Altura:
                    <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Ancho:
                    <input type="text" value={ancho} onChange={(e) => setAncho(e.target.value)} />
                </label>
                <label>
                    Largo:
                    <input type="text" value={largo} onChange={(e) => setLargo(e.target.value)} />
                </label>
                <label>
                    Alto:
                    <input type="text" value={alto} onChange={(e) => setAlto(e.target.value)} />
                </label>
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
    }

    export default Form;
