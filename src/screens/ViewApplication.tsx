import { getApplicationByCode, selectApplicationByCode, selectApplicationByCodeError, selectApplicationByCodeStatus } from '../features/application/applicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Card, CardBody, Container, Flex, Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import {formatDayAndMonth } from '../utils/DateTimeFormatter';
import { CustomBadge } from '../components/ui/CustomBadge';
import { setActiveTab } from '../features/navigation/navigationSlice';
import { TfiCommentAlt } from "react-icons/tfi";
import { useEffect } from 'react';
import NoResult from '../components/NoResult';
import { useAppDispatch } from '../app/store';
import { useParams } from 'react-router-dom';

const ViewApplication = () => {

  const dispatch = useDispatch()
  const appDispatch = useAppDispatch();
  const { basvuruNo } = useParams()
  const code = basvuruNo
  
  const searchByCodeRequestStatus = useSelector(selectApplicationByCodeStatus)
  const searchErrorObject = useSelector(selectApplicationByCodeError)

  const applicationByCode = useSelector(selectApplicationByCode)

  const answersBg = useColorModeValue('#eef4ff', 'gray.700')

  useEffect(() => {
    dispatch(setActiveTab('', 'Başvuru'));
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

  return (
    searchByCodeRequestStatus=== 'loading' ? <p>Loading</p> : searchByCodeRequestStatus === 'failed' ? <NoResult message={searchErrorObject?.message ?? 'Bir hata oluştu'}/> : 
    <Container maxW={'4xl'}>
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
              {applicationByCode?.status && CustomBadge(applicationByCode?.status)}
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
            <Box borderRadius={'4'} p={{ base: "1"}}>
              <p className="flex text-md md:text-lg lg:text-md text-neutal-400 justify-start ">Bu ornek bir cevap.</p>
            </Box>
            <Box borderRadius={'4'} p={{ base: "1"}}>
              <p className="flex text-md md:text-lg lg:text-md text-neutal-400 justify-start ">Bu ornek bir cevap.</p>
            </Box>
          </Flex>
          {applicationByCode?.answers.map((answer) => <span>{answer}</span>)}
        </CardBody>
      </Card>
    </Container>
  )
}

export default ViewApplication