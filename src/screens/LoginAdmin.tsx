import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { TLoginSchema, loginSchema } from '../library/types'
import { login, selectLoginErrorMessage, selectLoginStatus } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from '../app/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const LoginAdmin = () => {

  const appDispatch = useAppDispatch()
  const navigate = useNavigate();

  const loginReqStatus = useSelector(selectLoginStatus)
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null)

  const location = useLocation();
  const from = location.state?.from?.pathname || "basvuru-listesi";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const { isOpen, onToggle } = useDisclosure()

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const { userName, password } = data;
      await appDispatch(login({ userName, password })).unwrap();
      navigate(from);
    } catch (error: any) {
        if(!error.message){
          setLoginErrorMessage('Bir hata oluştu. Lütfen tekrar deneyiniz.')
        }else{
          setLoginErrorMessage(error.message);
        }
      console.log(error);
    }
    reset();
  };

  const handleInputChange = () => {
    setLoginErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'sm' }}>Admin Giriş</Heading>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              {loginErrorMessage && (
                <Alert status='warning'>
                  <AlertIcon />
                  {loginErrorMessage}
                </Alert>
              )}
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="userName">Email</FormLabel>
                  <Input
                    id="userName"
                    type="text"
                    {...register('userName')}
                    onChange={handleInputChange}
                  />
                  {errors.userName && (
                    <p className="text-red-500">{`${errors.userName.message}`}</p>
                  )}
                </FormControl>
                <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <InputRightElement>
              <IconButton
                onClick={onToggle}
                variant="text"
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
              />
            </InputRightElement>
            <Input
              {...register('password')}
              id="password"
              name="password"
              type={isOpen ? 'text' : 'password'}
              autoComplete="current-password"
            />
            
          </InputGroup>
          {errors.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
        </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button isLoading={loginReqStatus === 'loading'} colorScheme='green' type='submit'>Sign in</Button>
              <HStack>   
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
    </form>

)
  
}