import { toast } from 'react-toastify';
import { Input } from '../../components/Input';
import { InputIcon } from '../../components/InputIcon/InputIcon';
import { ForgotPassword as fpassword } from '../../services';
import {
  ForgotContainer,
  ForgotPasswordMain,
  ForgotSection,
  InputWrapper,
} from './ForgotPasswordStyles';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../../components/Buttons';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const ForgotPassword = () => {
  const forgotPasswordSchema = z.object({
    mail: z.string().email('Formato do e-mail inválido').nonempty('E-mail obrigatório'),
  });

  type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();

  const handleButtonClick = async (data: ForgotPasswordType) => {
    const body: ForgotPasswordType = {
      mail: data.mail,
    };
    try {
      await fpassword(body);
      navigate('/login', { replace: true });
      toast.success('Enviamos um e-mail com um link para que você possa alterar sua senha. :)', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/');
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        toast.error('E-mail não encontrado!', {
          position: 'bottom-right',
        });
      }
    }
  };

  const handleForgotPassword = (body: ForgotPasswordType) => {
    handleButtonClick(body);
  };

  return (
    <ForgotPasswordMain>
      <ForgotContainer onSubmit={handleSubmit(handleForgotPassword)}>
        <h2>Recuperar senha</h2>
        <ForgotSection>
          <div>
            <InputWrapper>
              <Input type="text" aria-label="mail" placeholder="E-mail" {...register('mail')} />
              <InputIcon path="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
            </InputWrapper>
            {errors.mail && <span>{errors.mail.message}</span>}
          </div>
        </ForgotSection>
        <MyButton type="submit">Recuperar</MyButton>
      </ForgotContainer>
    </ForgotPasswordMain>
  );
};
