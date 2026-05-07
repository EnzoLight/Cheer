import React from 'react';
import { Link } from 'react-router-dom';

function ModalLogin() {
    return (
        /* No React, o comentário fora do JSX deve ser assim ou dentro de { } se estiver dentro do return */
        <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 style={{ textAlign: 'center' }} className="modal-title fs-5" id="exampleModalLabel"></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h2 style={{ textAlign: 'center' }}>Bem-vindo de volta</h2>


                        <div className="row justify-content-center" style={{ margin: 'auto' }}>
                            <label>Email:</label>
                            <input id='txt_email_login' type='text' className="form-control" placeholder='voluntario@email.com' />


                            <label className="mt-2">Senha:</label>
                            <input id='txt_senha_login' type='password' className="form-control" placeholder='Senha#123' />

                            <button
                                id='btn_login'
                                style={{ border: 'none', backgroundColor: '#b2d7e4', color: 'black', width: 'fit-content', marginTop: '20px' }}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>

                    <div className="modal-footer justify-content-center" style={{ borderTop: 'solid 1px lightgray' }}>
                        <h4 style={{ marginTop: '10px', textAlign: 'center', fontSize: '1.1rem' }}>Não tem um perfil de voluntário?</h4>
                    </div>

                    <div className="row justify-content-center">
                        <Link style={{ textDecoration: 'none', width: 'fit-content' }} to="/registro">
                            <button
                                style={{ border: 'none', backgroundColor: '#FF8C00', color: 'black', marginBottom: '15px' }}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Registre-se
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalLogin;
