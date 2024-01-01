import { addAnswerToApplication, adjustApplicationStatus, getApplicationByCode, selectApplicationByCode, selectApplicationByCodeError, selectApplicationByCodeStatus } from '../features/application/applicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Card, CardBody, Container, Flex, FormControl, FormLabel, Heading, IconButton, Input, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import {formatDayAndMonth } from '../utils/DateTimeFormatter';
import { setActiveTab } from '../features/navigation/navigationSlice';
import { TfiCommentAlt } from "react-icons/tfi";
import { useEffect, useState } from 'react';
import NoResult from '../components/NoResult';
import { useAppDispatch } from '../app/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TAddNewAnswerToApplication, addNewAnswerToApplication } from '../library/types';
import { MdArrowBackIos } from 'react-icons/md';
import Loading from '../components/Loading';

const ModifyApplication = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddNewAnswerToApplication>({
    resolver: zodResolver(addNewAnswerToApplication),
  });

  const dispatch = useDispatch()
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { basvuruNo } = useParams()
  const code = basvuruNo
  
  const [applicationStatus, setApplicationStatus] = useState<string>('pending')
  const searchByCodeRequestStatus = useSelector(selectApplicationByCodeStatus)
  const searchErrorObject = useSelector(selectApplicationByCodeError)

  const applicationByCode = useSelector(selectApplicationByCode)

  const answersBg = useColorModeValue('#eef4ff', 'gray.700')
  const inputBg = useColorModeValue('white', 'gray.700')

  useEffect(() => {
    dispatch(setActiveTab('Admin', 'Başvuru'));
     (async() => {
      try {
        if(code){
          await appDispatch(getApplicationByCode({code})).unwrap();
        } 
      } catch (error: any) {
        console.log(error)
      } 
    })()
  }, [])

  const handleApplicationStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    const statusObj = {status: newStatus}
    setApplicationStatus(newStatus);
    try {
      if(applicationByCode?._id)
      await appDispatch(adjustApplicationStatus({ id: applicationByCode?._id, statusObj })).unwrap();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAddNewAnswer = async (data: TAddNewAnswerToApplication) => {
    const answerObj = {answer: data.newAnswer}
    try {
      if(applicationByCode?._id)
        await appDispatch(addAnswerToApplication({ id: applicationByCode?._id, answerObj })).unwrap();
      if(code)
        await appDispatch(getApplicationByCode({ code })).unwrap();
    } catch (error: any) {
      console.log(error);
    }
    reset();
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    searchByCodeRequestStatus=== 'loading' ? <Loading/> : searchByCodeRequestStatus === 'failed' ? <NoResult message={searchErrorObject?.message ?? 'Bir hata oluştu'}/> : 
    <Container maxW={'4xl'}>
      <Box ml={4}>
          <IconButton
              icon={<MdArrowBackIos />}
              aria-label="Go back"
              onClick={handleGoBack}
          />
      </Box>
      <Card p={{ base: "4" }} m={{ base: "4" }}>
        <CardBody display={"flex"} w={"full"} >
          <div className="inset-x-0 max-w-full">
            <h1 className="flex text-lg md:text-xl lg:text-2xl text-neutal-400 font-bold justify-start">{applicationByCode?.applicationReason}</h1>
            <Flex mt={{ base: "none", md: "4", lg: "4" }} justifyContent={'space-between'} align="center">
              <Flex alignItems={'center'}>
                  <Avatar size="sm" src="avatar.jpg" />
                  <Flex flexDir="column" ml={4} display={{ base: "none", md: "flex", lg: "flex" }}>
                      <Text color="gray">{applicationByCode?.firstName}</Text>
                      <Text color="gray">{applicationByCode?.createdAt && formatDayAndMonth(applicationByCode?.createdAt)}</Text>
                  </Flex>
              </Flex>
              <FormControl display="flex" flexDirection="column" w={'auto'}>
                <FormLabel>Durum</FormLabel>
                <Stack spacing={3}>
                  <Select variant='filled' value={applicationStatus} onChange={handleApplicationStatusChange}>
                    <option value='pending'>Beklemede</option>
                    <option value='solved'>Çözüldü</option>
                    <option value='rejected'>İptal Edildi</option>
                  </Select>
                </Stack>
              </FormControl>
            </Flex>
            <h3 className="flex text-md md:text-lg lg:text-xl text-neutal-400 justify-start my-4">{applicationByCode?.applicationReason}Daha önce oluşturduğunuz başvurunuzu başvuru kodu ile sorgulayabilirsiniz.</h3>
           
          </div>
        </CardBody>
      </Card>
      <Flex alignItems={'center'} gap={'2'} ml={4}>
        <TfiCommentAlt size={'25'}/>
        <Heading size={'md'}>Yanıtlar</Heading>
      </Flex>
      <Card p={{ base: "4" }} m={{ base: "4" }} bg={answersBg} borderLeft={'4px'} borderColor="purple.500">
        <CardBody >
          <Flex flexDirection={'column'} className="flex-row inset-x-0 max-w-full" gap={'4'}>
            {applicationByCode?.answers.map((answer, index) => (
              <Flex alignItems={'center'} borderRadius={'4'} key={index} gap={4}>
                <Avatar size={'xs'}/>
                <p className="flex text-md md:text-lg lg:text-md text-neutal-400 justify-start ">{answer}</p>
              </Flex>
            )
            )}
          </Flex>
        </CardBody>
      </Card>
      <Card p={{ base: "4" }} pl={{ base: "12" }} m={{ base: "4" }} bg={answersBg} borderLeft={'4px'} borderColor="purple.500">
        <form onSubmit={handleSubmit(handleAddNewAnswer)}>
          <FormControl>
            <FormLabel htmlFor="newAnswer">Yeni Cevap Ekle</FormLabel>
            <Flex>
              <Input id="newAnswer" type="text" {...register("newAnswer")} bg={inputBg} placeholder='Cevap yazın' borderRightRadius={0} borderLeftRadius={4} />
              <Button type='submit' colorScheme='green' size='md' borderLeftRadius={0} borderRightRadius={4}>
                Ekle
              </Button>
            </Flex>
            {errors.newAnswer && (
              <p className="text-red-500">{`${errors.newAnswer.message}`}</p>
            )}
          </FormControl>
        </form>
      </Card>
    </Container>
  )
}

export default ModifyApplication