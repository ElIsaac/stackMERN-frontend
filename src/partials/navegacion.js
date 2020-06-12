import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <nav className="navbar navbar-expand-lg navbar-col bg-light navbar-css">
          <h1 className="color1"><span className="badge badge-secondary color1">
            Home
          </span> Ruben Sepulveda<img src={logo} className="App-logo" alt="logo" /></h1>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link color1" href="/"><b>Inicio</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link color1" href="/paquetes"><b>Paquetes</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link color1" href="/galeria"><b>Galeria</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link color1" href="/contacto"><b>Contacto</b></a>
              </li>
            </ul>

          </div>
        </nav>

      </header>

    </div>
  );
}

export default App;