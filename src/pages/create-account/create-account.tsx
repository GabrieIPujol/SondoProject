import './create-account.css'
import { FaLock, FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbCalendar } from "react-icons/tb";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgetPass = () => {

  const navigate = useNavigate()
  function onLoginClickBack() {
    navigate('/SondoProject')
  };
  function onCreateClick() {
    alert('Sua conta foi criada!');
    navigate('/SondoProject')
  };

  const schema = z.object({
    username: z.string().min(3, 'O nome de usuário deve ter mais de 3 caracteres').max(40, 'O nome de usuário é muito longo'),
    email: z.string().email('Email inválido').endsWith('@sondotecnica.com.br', 'O email deve ser do domínio @sondotecnica.com.br'),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres').max(18, 'A senha pode ter no máximo 18 caracteres'),
    confirmPassword: z.string().min(6, 'A confirmação de senha é obrigatória'),
    dateOfBirth: z.date().min(new Date('1900-01-01'), 'Data de nascimento inválida').max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Você deve ter pelo menos 18 anos'),
    agreement: z.boolean()
  }).refine((fields) => fields.agreement === true, {
    path: ['agreement'],
    message: 'Você deve aceitar os termos e condições'
  }).refine((fields) => fields.password !== fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais'
  })

  type FormProps = z.infer<typeof schema>;

  const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  });

  const handleForm = (data: FormProps) => {
    console.log(data);
  };

  return (
    <div className='app'>
      <div className='container'>
        <form onSubmit={handleSubmit(handleForm)}>
          <h1>Cadastrar-se</h1>
          <div className='input-field'>
            <input
              type="text"
              placeholder='Nome completo'
              {...register('username')}
              className={errors.username ? 'input-error' : ''}
            />
            <FaUser className='icon' />
            {errors.username && <span className="error-message">{errors.username.message}</span>}
          </div>

          <div className='input-field'>
            <input
              type='email'
              placeholder='Email'
              {...register('email')}
              className={errors.email ? 'input-error' : ''}
            />
            <MdOutlineMail className='icon-bigger' />
            {errors.email && <span className='error-message'>{errors.email.message}</span>}
          </div>


          <div className='input-field'>
            <input
              type='password'
              placeholder='Senha'
              {...register('password')}
              className={errors.password ? 'input-error' : ''}
            />
            <FaLock className='icon' />
            {errors.password && <span className='error-message'>{errors.password.message}</span>}
          </div>

          <div className='input-field'>
            <input
              type='password'
              placeholder='Confirme a Senha'
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            <FaLock className='icon' />
            {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword.message}</span>}
          </div>

          <div className='input-field'>
            <input
              type='date'
              {...register('dateOfBirth')}
              className={errors.dateOfBirth ? 'input-error' : ''}
            />
            <TbCalendar className='icon-bigger' />
          </div>

          <div className='recall-forget'>
            <label>
              <input type='checkbox' />
              Aceita nossos <span className='link'>Termos de Serviço?</span>
            </label>
          </div>

          <button className='btn' onClick={onCreateClick}>Criar Conta</button>
          <div className='signup-link'>
            <p>Já possui uma conta? <button className='link' onClick={onLoginClickBack}>Tela de Login</button></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgetPass