import { BiEditAlt } from "react-icons/bi";
import { Tooltip } from "@chakra-ui/react";

const ApplicationTransactions = () => {
  return (
    <Tooltip label="Başvuruyu Görüntüle" placement="top" hasArrow py="1" px="2">
      <button
        disabled={false}
        className="w-full text-blue-500 hover:text-blue-800 duration-300 rounded-full text-2xl disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <BiEditAlt />
      </button>
    </Tooltip>
  );
};

export default ApplicationTransactions;
