import React from 'react';
import { Link } from 'react-router-dom';

function ModalLogin() {
    return (
        <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered"> {/* Adicionei centralização vertical */}
                <div className="modal-content" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    <div className="modal-header" style={{ borderBottom: 'none', padding: '20px 20px 0 20px' }}>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div className="modal-body" style={{ padding: '0 40px 20px 40px' }}>
                        <h2 style={{ 
                            textAlign: 'center', 
                            fontFamily: 'Poppins', 
                            fontWeight: 700, 
                            color: '#333',
                            marginBottom: '30px' 
                        }}>
                            Bem-vindo de volta
                        </h2>
                        
                        <div className="row justify-content-center">
                            <div className="col-12 mb-3">
                                <label style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.9rem', color: '#666', marginBottom: '5px', display: 'block' }}>
                                    Email:
                                </label>
                                <input 
                                    id='txt_email_login' 
                                    type='text' 
                                    className="form-control"
                                    placeholder='voluntario@email.com'
                                    style={{ borderRadius: '8px', padding: '12px', border: '1px solid #ddd', fontFamily: 'Poppins' }}
                                />
                            </div>
                            
                            <div className="col-12 mb-4">
                                <label style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.9rem', color: '#666', marginBottom: '5px', display: 'block' }}>
                                    Senha:
                                </label>
                                <input 
                                    id='txt_senha_login' 
                                    type='password' 
                                    className="form-control"
                                    placeholder='Senha#123'
                                    style={{ borderRadius: '8px', padding: '12px', border: '1px solid #ddd', fontFamily: 'Poppins' }}
                                />
                            </div>

                            <button 
                                id='btn_login' 
                                style={{ 
                                    border: 'none', 
                                    backgroundColor: '#b2d7e4', 
                                    color: 'black', 
                                    width: '30%', 
                                    padding: '12px',
                                    borderRadius: '8px',
                                    fontFamily: 'Montserrat',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }} 
                                type="button" 
                                className="btn" 
                                data-bs-dismiss="modal"
                            >
                                ENTRAR
                            </button>
                        </div>
                    </div>

                    <div className="modal-footer justify-content-center" style={{ borderTop: '1px solid #eee', padding: '20px', backgroundColor: '#f9f9f9', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                        <h4 style={{ 
                            textAlign: 'center', 
                            fontFamily: 'Poppins', 
                            fontSize: '0.95rem', 
                            color: '#555',
                            margin: '0'
                        }}>
                            Não tem um perfil de voluntário?
                        </h4>
                    </div>
                    
                    <div className="text-center" style={{ paddingBottom: '25px', backgroundColor: '#f9f9f9', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                        <Link style={{ textDecoration: 'none' }} to="/registro">
                            <button 
                                style={{ 
                                    border: 'none', 
                                    backgroundColor: '#FF8C00', 
                                    color: 'black', 
                                    padding: '10px 30px',
                                    borderRadius: '8px',
                                    fontFamily: 'Montserrat',
                                    fontWeight: 700,
                                    boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
                                }} 
                                type="button" 
                                className="btn" 
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
