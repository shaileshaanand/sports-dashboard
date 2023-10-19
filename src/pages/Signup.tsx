import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation } from "react-query";

import { createUser } from "../api/api";
import { CreateUserPayload } from "../types";

const Signup = () => {
  const signUpForm = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const setAccessToken = useLocalStorage({
    key: "access_token",
    defaultValue: undefined,
  })[1];

  const createUserMutation = useMutation(
    (data: CreateUserPayload) => createUser(data),
    {
      onSuccess: (data) => {
        setAccessToken(data?.auth_token);
      },
    }
  );
  return (
    <Center p="md">
      <Paper shadow="md">
        <Center>
          <Title order={2}>Sign Up</Title>
        </Center>
        <form
          onSubmit={signUpForm.onSubmit((values) => {
            createUserMutation.mutate(values);
          })}
        >
          <Box pos="relative">
            <LoadingOverlay visible={createUserMutation.isLoading} />
            <Flex direction="column" gap="md" miw={300}>
              <TextInput
                label="Name"
                placeholder="Name"
                {...signUpForm.getInputProps("name")}
              />
              <TextInput
                label="Email"
                placeholder="Email"
                {...signUpForm.getInputProps("email")}
              />
              <Input.Wrapper label="Password">
                <PasswordInput
                  placeholder="Password"
                  {...signUpForm.getInputProps("password")}
                />
              </Input.Wrapper>
              <Button variant="filled" type="submit">
                Submit
              </Button>
            </Flex>
          </Box>
        </form>
      </Paper>
    </Center>
  );
};

export default Signup;
