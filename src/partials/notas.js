import React from 'react';
import '../App.css';

function notas() {
    return (
        <div className="col-md-4 mx-auto sep">
            <div className="card text-center">
                <div className="card-header">
                    <h3>Agregar Nota</h3>
                </div>
                <div className="card-body">
                    <form action="/agregarTrabajos" method="POST">
                        <div className="form-group">
                            <input type="text" name="titulo" id="tit" className="form-control" placeholder="Titulo" autofocus />
                            
                            
                        </div>
                        <div className="form-group">
                            <textarea name="descripcion" id="des" className="form-control" placeholder="Descripcion"></textarea>
                            
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit">
                                guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default notas;