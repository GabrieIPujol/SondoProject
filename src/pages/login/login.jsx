import {FaUser, FaLock} from 'react-icons/fa';
import {useState} from 'react';
import './login.css';

const login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        console.log("Envio");
        e.preventDefault();
    }

    const email = "gabriel.velosa@sondotecnica.com.br";
    const pass = "123456";

    const confirmLogin = () => {
        if(username === email && password === pass){
            alert("Login efetuado com sucesso!");
        } else if (username === "" || password === ""){
            alert("Por favor, preencha todos os campos.");
        } else {
            alert("Email ou senha incorretos.");
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>
                <div className='input-field'>
                    <input type="email" placeholder='Email' onChange={(e) => setUsername(e.target.value)}/>
                    <FaUser className='icon' />
                </div>
                <div className='input-field'>
                    <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className='icon' />
                </div>

                <div className='recall-forget'>
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <button onClick={confirmLogin}>Entrar</button>

                <div className="signup-link">
                    <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
                </div>

            </form>
        </div>
    )
}

export default login