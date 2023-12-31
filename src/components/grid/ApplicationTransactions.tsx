import { BiEditAlt } from "react-icons/bi";
import { Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ApplicationTransactions = (data: any) => {


  return (
    <Tooltip label="Başvuruyu Görüntüle" placement="top" hasArrow py="1" px="2">
      <Link to={`/admin/basvuru/${data.code}`}
        className="w-full text-blue-500 hover:text-blue-800 duration-300 rounded-full text-2xl disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <BiEditAlt />
      </Link>
    </Tooltip>
  );
};

export default ApplicationTransactions;
