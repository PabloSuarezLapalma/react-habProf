import React, { Component } from "react";

class Alerta extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state.visible = false;
    this.state.mensaje = "";
    this.state.color = "";
    this.state.borde = "";
    this.state.duracion = 0;
  }

  mostrar() {
    this.setState({ visible: true });
  }

  ocultar() {
    this.setState({ visible: false });
  }

  render() {
    const { mensaje, color, borde, duracion } = this.props;
    const { visible } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <div
        className="alerta z-50 "
        style={{
          background: color,
          border: `1px solid ${borde}`,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div className="alerta-contenido">
          <p>{mensaje}</p>
          <button onClick={this.ocultar}>Cerrar</button>
        </div>
      </div>
    );
  }
}

export default Alerta;