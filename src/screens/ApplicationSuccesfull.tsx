import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../features/navigation/navigationSlice";
import { Alert, AlertIcon, Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { getApplicationByCode, selectNewApplication } from "../features/application/applicationSlice";
import { useAppDispatch } from "../app/store";
import { formatDateTime } from "../utils/DateTimeFormatter";

const ApplicationSuccesfull = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const applicationData = useSelector(selectNewApplication)

  useEffect(() => {
    dispatch(setActiveTab("", "Başvuru Başarılı"));
     (async() => {
      try {
        if (applicationData?.code) {
          const code = applicationData.code;
          const response = await appDispatch(getApplicationByCode({code})).unwrap();
          console.log(response,'fatma');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Card p={{ base: "4", md: "8" }} m={{ base: "4", md: "8" }}>
      <CardHeader>
        <Heading size="md"><Alert status="success">
              <AlertIcon />
              <Text>Başvuru oluşturduğunuz için teşekkür ederiz.</Text>
            </Alert></Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs">
              Başvuru Sahibi
            </Heading>
            <Text pt="2" fontSize="md">
              {applicationData?.firstName} {applicationData?.lastName}
            </Text>
          </Box>
          <Box>
            <Heading size="xs">
              Başvuru Nedeni
            </Heading>
            <Text pt="2" fontSize="sm">
              {applicationData?.applicationReason}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" >
              Başvuru Tarihi
            </Heading>
            <Text pt="2" fontSize="sm">
              {applicationData?.createdAt && formatDateTime(applicationData?.createdAt)}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" >
              Başvuru Kodu
            </Heading>
            <Text pt="2" fontSize="sm">
              {applicationData?.code}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ApplicationSuccesfull;
