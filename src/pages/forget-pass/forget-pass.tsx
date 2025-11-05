import { CiWarning } from 'react-icons/ci';
import './forget-pass.css'
import { FaLock, FaUser } from "react-icons/fa"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPass = () => {

    const navigate = useNavigate()
    function onLoginClick(){
        navigate('/SondoProject') 
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Envio");
        e.preventDefault();
    };

    const [showError, setShowError] = useState<boolean>(false);

    const email:string = "gabriel.velosa@sondotecnica.com.br";
    const [username, setUsername] = useState<string>("");

    const rec:number = 192837465;
    const [recCode, setRecCode] = useState<number>();

    const confirmEmail = (): void => { 
        setShowError(false);

        if (email === username && rec === recCode) {
            alert("Um email será enviado para você com as instruções para redefinir sua senha!") ;
            return;
        } setShowError(true);
    }

    return (
        <div className='app'>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Redefinir Senha</h1>
                    <div className='input-field'>
                        <input type="email" placeholder='Email' onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className='icon' />
                    </div>

                    <div className='input-field'>
                        <input type='number' placeholder='Código de Recuperação' onChange={(e) => setRecCode(Number(e.target.value))} />
                        <FaLock className='icon' />
                    </div>
                    <button className='btn' onClick={confirmEmail}>Recuperar Senha</button>
                    <div className='signup-link'>
                        <p>Lembrou sua senha? <button className='link' onClick={onLoginClick}>Tela de Login</button></p>
                    </div>

                    {showError && (
                        <div className='singin-error'>
                            <CiWarning className='icon-error' />
                            <p>Seu email ou senha estão incorretos!</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ForgetPass