import { getApplicationByCode, selectApplicationByCode, selectApplicationByCodeError, selectApplicationByCodeStatus } from '../features/application/applicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, CardBody, Container, Flex, Text } from '@chakra-ui/react';
import {formatDayAndMonth } from '../utils/DateTimeFormatter';
import { CustomBadge } from '../components/ui/CustomBadge';
import { setActiveTab } from '../features/navigation/navigationSlice';
import { useEffect } from 'react';
import NoResult from '../components/NoResult';
import { useAppDispatch } from '../app/store';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import AnswerList from '../components/answerList/AnswerList';

const ViewApplication = () => {

  const dispatch = useDispatch()
  const appDispatch = useAppDispatch();
  const { basvuruNo } = useParams()
  const code = basvuruNo
  
  const searchByCodeRequestStatus = useSelector(selectApplicationByCodeStatus)
  const searchErrorObject = useSelector(selectApplicationByCodeError)

  const applicationByCode = useSelector(selectApplicationByCode)

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
    searchByCodeRequestStatus=== 'loading' ? <Loading /> : searchByCodeRequestStatus === 'failed' ? <NoResult message={searchErrorObject?.message ?? 'Bir hata oluştu'}/> : 
    <Container maxW={'4xl'}>
    <Card p={{ base: "4" }} m={{ base: "4" }}>
        <CardBody display={"flex"} w={"full"} >
          <div className="inset-x-0 w-full">
            <h1 className="flex text-lg md:text-xl lg:text-2xl text-neutal-400 font-bold justify-start">{`${applicationByCode?.applicationReason.slice(0, 20)}...`}</h1>
            <Flex mt={{ base: "none", md: "4", lg: "4" }} justifyContent={'space-between'} align="center">
              <Flex alignItems={'center'}>
                  <Avatar size="sm" src="avatar.jpg" />
                  <Flex flexDir="column" ml={4} display={{ base: "none", md: "flex", lg: "flex" }}>
                      <Text color="gray">{applicationByCode?.firstName}</Text>
                      <Text color="gray">{applicationByCode?.createdAt && formatDayAndMonth(applicationByCode?.createdAt)}</Text>
                  </Flex>
              </Flex>
              {applicationByCode?.status && <CustomBadge status={applicationByCode?.status}/>}
            </Flex>
            <h3 className="flex text-md md:text-lg lg:text-xl text-neutal-400 justify-start my-4">{applicationByCode?.applicationReason}</h3>
           
          </div>
        </CardBody>
      </Card>
      {applicationByCode && <AnswerList application={applicationByCode} />}
    </Container>
  )
}

export default ViewApplication