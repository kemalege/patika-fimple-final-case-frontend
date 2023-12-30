import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TNewApplicationSchema, newApplicationSchema } from "../library/types";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import {
  applyToNewApplication,
  selectApplyToNewApplicationStatus,
} from "../features/application/applicationSlice";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../features/navigation/navigationSlice";

const NewApplication = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {dispatch(setActiveTab('', 'Başvuru Oluştur')); }, [])

  const newApplicationRequestStatus = useSelector(
    selectApplyToNewApplicationStatus
  );
  const [newApplicationErrorMessage, setNewApplicationErrorMessage] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TNewApplicationSchema>({
    resolver: zodResolver(newApplicationSchema),
  });

  const onSubmit = async (applicationBody: TNewApplicationSchema) => {
      try {
        const response = await appDispatch(applyToNewApplication(applicationBody)).unwrap();
        if (response.success) {
          navigate("/basvuru-basarili");
        } 
      } catch (error) {
        setNewApplicationErrorMessage('Bir hata oluştu');
      }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        maxW="lg"
        py={{ base: "12", md: "8" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              {/* <Heading size={{ base: "xs", md: "sm" }}>Yeni Başvuru Oluştur</Heading> */}
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              {newApplicationErrorMessage && (
                <Alert status="warning">
                  <AlertIcon />
                  {newApplicationErrorMessage}
                </Alert>
              )}
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="firstName">Ad</FormLabel>
                  <Input id="firstName" type="text" {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-red-500">{`${errors.firstName.message}`}</p>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">Soyad</FormLabel>
                  <Input id="lastName" type="text" {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-red-500">{`${errors.lastName.message}`}</p>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="age">Yaş</FormLabel>
                  <Input id="age" type="number" {...register("age")} />
                  {errors.age && (
                    <p className="text-red-500">{`${errors.age.message}`}</p>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="identity">TC Kimlik Numarası</FormLabel>
                  <Input id="identity" type="number" {...register("identity")} />
                  {errors.identity && (
                    <p className="text-red-500">{`${errors.identity.message}`}</p>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="applicationReason">Başvuru Nedeni</FormLabel>
                  <Input id="applicationReason" type="text" {...register("applicationReason")} />
                  {errors.applicationReason && (
                    <p className="text-red-500">{`${errors.applicationReason.message}`}</p>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="address">Adres Bilgisi</FormLabel>
                  <Input id="address" type="text" {...register("address")} />
                  {errors.address && (
                    <p className="text-red-500">{`${errors.address.message}`}</p>
                  )}
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button
                  isLoading={newApplicationRequestStatus === "loading"}
                  colorScheme="green"
                  type="submit"
                >
                  Başvuru Oluştur
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
};

export default NewApplication;
