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
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { TLoginSchema, loginSchema } from '../library/types'
import { login } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../app/store'
import { useLocation, useNavigate } from 'react-router-dom'

export const LoginAdmin = () => {

  const appDispatch = useAppDispatch()
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "basvuru-listesi";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const { isOpen } = useDisclosure()

  const onSubmit = async (data: TLoginSchema) => {
    console.log(data);
    try {
      const { userName, password } = data;
      const payload = await appDispatch(login({ userName, password })).unwrap();
      navigate(from);
      console.log(payload);
    } catch (error) {
      console.error(error);
    }
    reset();
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
            <Stack spacing="5">
            
              <FormControl>
                <FormLabel htmlFor="userName">Email</FormLabel>
                <Input id="userName" type="text" 
                  {...register('userName')}/>
                  {errors.userName && (
                    <p className="text-red-500">{`${errors.userName.message}`}</p>
                  )}
              </FormControl>
              <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <InputRightElement>
              <IconButton
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
              <Button colorScheme='green' type='submit'>Sign in</Button>
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