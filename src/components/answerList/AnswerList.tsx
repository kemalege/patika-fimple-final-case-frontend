import { Avatar, Card, CardBody, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { TfiCommentAlt } from "react-icons/tfi"
import { Application } from "../../app/type"

const AnswerList = ({application}:{application: Application }) => {

  const answersBg = useColorModeValue('#eef4ff', 'gray.700')
  
  return (
    <>
    <Flex alignItems={'center'} gap={'2'} ml={4}>
        <TfiCommentAlt size={'25'}/>
        <Heading size={'md'}>Yanıtlar</Heading>
      </Flex>
      <Card p={{ base: "4" }} m={{ base: "4" }} bg={answersBg} borderLeft={'4px'} borderColor="purple.500">
        <CardBody >
          <Flex flexDirection={'column'} className="flex-row inset-x-0 w-full" gap={'4'}>
            {application?.answers.map((answer, index) => (
              <Flex alignItems={'center'} borderRadius={'4'} key={index} gap={4}>
                <Avatar size={'xs'}/>
                <p className="flex text-md md:text-lg lg:text-md text-neutal-400 justify-start ">{answer}</p>
              </Flex>
            )
            )}
          </Flex>
        </CardBody>
      </Card>
      </>
  )
}

export default AnswerList