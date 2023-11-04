import {
  Anchor,
  Box,
  Button,
  Center,
  Flex,
  Input,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { createUser } from "../api/api";
import { CreateUserPayload } from "../types";

const Signup = () => {
  const navigate = useNavigate();

  const signUpForm = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const setAuthToken = useLocalStorage({
    key: "auth_token",
    defaultValue: undefined,
  })[1];

  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: (data) => {
      if (data.auth_token) {
        setAuthToken(data.auth_token);
      }
      navigate("/");
    },
  });
  return (
    <Center p="md">
      <Paper shadow="md" p={30}>
        <Center>
          <Title order={2}>Sign Up</Title>
        </Center>
        <form
          onSubmit={signUpForm.onSubmit((values) => {
            createUserMutation.mutate(values);
          })}
        >
          <Box pos="relative">
            <LoadingOverlay visible={createUserMutation.isPending} />
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
              <Box>
                <Button variant="filled" type="submit" fullWidth>
                  Submit
                </Button>
                <Center>
                  <Text size="sm" mt={8}>
                    Already have an account?{"  "}
                    <Anchor component={Link} to="/signin">
                      Signin
                    </Anchor>
                  </Text>
                </Center>
              </Box>
            </Flex>
          </Box>
        </form>
      </Paper>
    </Center>
  );
};

export default Signup;
