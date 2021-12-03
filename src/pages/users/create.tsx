import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, } from "@chakra-ui/react";
import Link from "next/link";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Input } from '../../components/Form/Input';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'senhas precisam ser iguais'),
});

export default function CreateUser() {
  const { register, handleSubmit, formState, formState: { errors } } = useForm({ resolver: yupResolver(createUserFormSchema) });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(data);

  }
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="¨6">
        <Sidebar />
        <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
                {...register('email')}

              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="passord_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha" as="a" >
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">Confirmar</Button>

            </HStack>


          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}