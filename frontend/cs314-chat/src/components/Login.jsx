import React from "react";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="email">
        <Input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        onClick={submitHandler}
        colorScheme="pink"
        width="100%"
        style={{ marginTop: 15 }}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Login;
