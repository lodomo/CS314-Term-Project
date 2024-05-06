import React from "react";
import {
  Box,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import Login from "./login.jsx";
import Signup from "./signup.jsx";

const LoginPage = () => {
  return (
    <Container centerContent maxW="xl">
      <Box
        bg="white"
        w="100%"
        p={4}
        d="flex"
        justifyContent="center"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default LoginPage;
