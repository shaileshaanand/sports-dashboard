import {
  Anchor,
  Box,
  Button,
  Center,
  Flex,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import { signinUser } from "../api/api";
import { SignInPayload } from "../types";

const Signin = () => {
  const navigate = useNavigate();

  const signInForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const setAuthToken = useLocalStorage({
    key: "auth_token",
    defaultValue: undefined,
  })[1];

  const signInMutation = useMutation(
    (data: SignInPayload) => signinUser(data),
    {
      onSuccess: (data) => {
        setAuthToken(data?.auth_token);
        navigate("/");
      },
    }
  );
  return (
    <Center>
      <Paper shadow="md" p={30}>
        <Center>
          <Title order={2}>Sign in</Title>
        </Center>
        <form
          onSubmit={signInForm.onSubmit((values) => {
            signInMutation.mutate(values);
          })}
        >
          <Box pos="relative">
            <LoadingOverlay visible={signInMutation.isLoading} />
            <Flex direction="column" gap="md" miw={300}>
              <Box>
                <TextInput
                  label="Email"
                  placeholder="Email"
                  {...signInForm.getInputProps("email")}
                />
              </Box>
              <Box>
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  {...signInForm.getInputProps("password")}
                />
              </Box>
              <Box>
                <Button variant="filled" type="submit" fullWidth>
                  Submit
                </Button>
                <Center>
                  <Text size="sm" mt={8}>
                    Don&apos;t have an account?{"  "}
                    <Anchor component={Link} to="/signup">
                      Signup
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

export default Signin;
