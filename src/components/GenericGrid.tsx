import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  
  const GenericGrid = ({columns, rowData}:{columns: any, rowData: any}) => {

    return (
      <TableContainer width={'80vw'} ml={{ base: '2', md: '4', lg: '6' }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map((column : any) => (
                <Th key={column.field}>{column.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rowData?.map((data: any) => (
              <Tr key={data._id}>
                {columns?.map((column : any) => (
                    <Td key={column.field}>
                        {column.cellRenderer ? column.cellRenderer(data) : column.valueFormatter ? column.valueFormatter(data[column.field]) : data[column.field]}
                    </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  
  export default GenericGrid;
  