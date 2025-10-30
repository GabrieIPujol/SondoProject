import {FaUser, FaLock} from 'react-icons/fa';
import { MdOutlineErrorOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import {useState} from 'react';
import './/login.css';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

const login:React.FC = () => {
    const navigate = useNavigate()
    function onCreateAccountClick(){
        navigate('create-account')
    }
    
    function onForgetPassClick(){
        navigate('forget-pass')
    }

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [showErrorMiss, setShowErrorMiss] = useState<boolean>(false);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        console.log("Envio");
        e.preventDefault();
    };

    const email:string = "gabriel.velosa@sondotecnica.com.br";
    const pass:string = "123456";

    const confirmLogin = ():void => {
        setShowError(false);
        if(username === email && password === pass){
            alert("Login efetuado com sucesso!");
        } else if (username === "" || password === ""){
            setShowErrorMiss(true);
            setShowError(false);
        } else {
            setShowError(true);
            setShowErrorMiss(false);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>
                <div className='input-field'>
                    <input type="email" placeholder='Email' onChange={(e) => setUsername(e.target.value)}/>
                    <FaUser className='icon' />
                </div>
                <div className='input-field'>
                    <input type='password' placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className='icon' />
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
                        <CiWarning className='icon-error'/>
                    <p>Seu email ou senha estão incorretos!</p>
                </div>
                )}

                {showErrorMiss && (
                    <div className='singin-error-missing'>
                        <MdOutlineErrorOutline className='icon-error-missing'/>
                    <p>Preencha todos os campos para prosseguir!</p>
                </div>
                )}

            </form>
        </div>
    )
}

export default login