import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../features/navigation/navigationSlice";
import { Card, CardBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSearchApplicationByCode, searchApplicationByCode } from "../library/types";

const CheckApplicationStatus = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActiveTab("", "Başvuru Sorgula"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSearchApplicationByCode>({
    resolver: zodResolver(searchApplicationByCode)
  })
  
  const onSearchByCode = async (data: TSearchApplicationByCode) => {
    const { code } = data;
    navigate('/basvuru/'+code);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSearchByCode)}>
      <Card p={{ base: "4", md: "8" }} m={{ base: "4", md: "8" }} >
        <CardBody display={"flex"} justifyContent={'center'} >
          <div className="flex-row inset-x-0">
            <h1 className="flex text-lg md:text-xl lg:text-2xl text-neutal-400 font-bold justify-start">Başvuru Sorgula</h1>
            <h3 className="flex text-md md:text-lg lg:text-xl text-neutal-400 justify-start my-4">Daha önce oluşturduğunuz başvurunuzu başvuru kodu ile sorgulayabilirsiniz.</h3>
            <div className="flex flex-col w-[70vw]">
                <div className="flex flex-col mt-4">
                  <div className="flex flex-row">
                    <input {...register('code')}
                      id="code"
                      name="code"
                      type="text"
                      placeholder="Başvuru kodu giriniz"
                      className="flex justify-start w-fit py-3 pl-5 outline-none shadow-lg rounded-l-lg"/>
                      <button className="flex rounded-r-lg items-center justify-center w-16 bg-chakra-green-400 text-white shadow-lg">
                        <IoSearch />
                      </button>
                  </div>
                  {errors.code && (
                          <p className="text-red-500">{`*${errors.code.message}`}</p>
                  )}
                </div>
            </div>  
          </div>
        </CardBody>
      </Card>
    </form>
  );
};

export default CheckApplicationStatus;
