import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserNavbar from '../../Componentes/InstituicaoNavbar';
import ModalLogin from '../../Componentes/Modais/ModalLogin'
import { motion } from "framer-motion";
import { ScrollAnimate } from "../../Componentes/animacaoScroll";
import InstituicaoNavbar from '../../Componentes/InstituicaoNavbar';

function CriarEvento() {
    return (
        <>
            <section style={{ background: 'linear-gradient(to bottom, #d9fcd6, #FFFFFF )', minHeight: '100vh' }}>
                <InstituicaoNavbar />

                <div className='container mt-5' style={{width: '100%', height: '100%'}}> 
                    <div className='row d-flex align-items-center' style={{ minHeight: '400px' }}>
                        
                        <div style={{ backgroundColor: 'yellow', minHeight: '660px' }} className='col-md-8'>
                            <h2>Coluna 1</h2>
                        </div>
                        
                        <div style={{ backgroundColor: 'green', minHeight: '660px' }} className='col-md-4'>
                            <h2>Coluna 2</h2>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CriarEvento