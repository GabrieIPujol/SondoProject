import { FaUser, FaLock } from 'react-icons/fa';
import { MdOutlineErrorOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import { useState } from 'react';
import './/login.css';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const login: React.FC = () => {
    const navigate = useNavigate()
    function onCreateAccountClick() {
        navigate('create-account')
    }

    function onForgetPassClick() {
        navigate('forget-pass')
    }

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string | number>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [showErrorMiss, setShowErrorMiss] = useState<boolean>(false);
    const [emailValidationError, setEmailValidationError] = useState<boolean>(false);
    const [passwordValidationError, setPasswordValidationError] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Envio");
        e.preventDefault();
    };

    //Transformar o usuario em objeto
    const email: string = "gabriel.velosa@sondotecnica.com.br";
    const emailSchema = z.string().email().endsWith('@sondotecnica.com.br');
    const emailValidation = emailSchema.safeParse(username);

    const pass: string | number = "123456";
    const passwordSchema = z.string().endsWith(pass).min(6, 'A senha precisa ter no mínimo 6 caracteres').max(12, 'A senha pode ter no máximo 12 caracteres');
    const passwordValidation = passwordSchema.safeParse(password);

    const confirmLogin = (): void => {
        setEmailValidationError(false);
        setPasswordValidationError(false);
        setShowError(false);
        setShowErrorMiss(false);

        if (username === "" || password === "") {
            setShowErrorMiss(true);
            return;
        }

        const isEmailInvalid:Boolean = !emailValidation.success;
        const isPasswordInvalid:Boolean = !passwordValidation.success;

        if (isEmailInvalid || isPasswordInvalid) {
            if (isPasswordInvalid) {
                setPasswordValidationError(true);
                setShowError(true);
            }
            if (isEmailInvalid) {
                setEmailValidationError(true);
                setShowError(true);
            } return;
        }

        if (username === email && password === pass) {
            alert("Login efetuado com sucesso!");
        } return
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>
                <div className='input-field'>
                    <input type="email" placeholder='Email' onChange={(e) => setUsername(e.target.value)} />
                    <FaUser className='icon' />
                    {emailValidationError && (
                        <p className='error'> <IoIosWarning className='warning' /> O email está incorreto.</p>
                    )}
                </div>

                <div className='input-field'>
                    <input type='password' placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
                    <FaLock className='icon' />
                    {passwordValidationError && (
                        <p className='error'> <IoIosWarning className='warning' /> A senha está incorreta.</p>
                    )}
                </div>

                <div className='recall-forget'>
                    <label>
                        <input type='checkbox' />
                        Lembre de mim
                    </label>
                    <button className='link' onClick={onForgetPassClick}>Esqueceu a senha?</button>
                </div>

                <button className='btn' onClick={confirmLogin}>Entrar</button>

                <div className='signup-link'>
                    <p>Não tem uma conta? <button className='link' onClick={onCreateAccountClick}>Cadastre-se</button></p>
                </div>

                {showError && (
                    <div className='singin-error'>
                        <CiWarning className='icon-error' />
                        <p>Seu email ou senha estão incorretos!</p>
                    </div>
                )}

                {showErrorMiss && (
                    <div className='singin-error-missing'>
                        <MdOutlineErrorOutline className='icon-error-missing' />
                        <p>Preencha todos os campos para prosseguir!</p>
                    </div>
                )}

            </form>
        </div>
    )
}

export default login