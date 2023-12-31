import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { setActiveTab } from "../features/navigation/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPendingApplications, selectPendingApplications } from "../features/application/applicationSlice";
import { useAppDispatch } from "../app/store";
import ApplicationColumnDef from "../columnDefinitions/ApplicationDef";

const PendingApplicationList = () => {

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const pendingApplicationList = useSelector(selectPendingApplications)
  console.log(pendingApplicationList,'pendingApplicationList');

  useEffect(() => {
    dispatch(setActiveTab("Admin", "Bekleyen Başvurular"));
  }, []);

  useEffect(() => {
    dispatch(setActiveTab('', 'Başvuru'));
     (async() => {
      try {
          await appDispatch(getPendingApplications()).unwrap();
      } catch (error: any) {
        console.log(error)
      } 
    })()
  }, [])


  return (
    <TableContainer width={'80vw'} ml={{ base: '2', md: '4', lg: '6' }}>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            {ApplicationColumnDef.map((column) => (
              <Th>{column.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          {pendingApplicationList?.map((application) => (
            <Tr key={application._id}>
              {ApplicationColumnDef?.map((column) => (
                <Td key={column.field}>{application[column.field]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PendingApplicationList;
