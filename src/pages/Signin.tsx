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
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { signinUser } from "../api/api";
import { useAppStore } from "../state/store";
import { SignInPayload } from "../types";

const Signin = () => {
  const navigate = useNavigate();

  const signInForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const setAuthToken = useAppStore((state) => state.setAuthToken);

  const signInMutation = useMutation({
    mutationFn: (data: SignInPayload) => signinUser(data),
    onSuccess: (data) => {
      if (data.auth_token) {
        setAuthToken(data?.auth_token);
        navigate("/");
      } else {
        signInForm.setErrors({
          email: "Invalid credentials",
          password: "Invalid credentials",
        });
      }
    },
  });

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
            <LoadingOverlay visible={signInMutation.isPending} />
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
