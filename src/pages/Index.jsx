import React, { useState } from "react";
import { ChakraProvider, Box, Flex, Text, Button, IconButton, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure, VStack, FormControl, FormLabel, theme } from "@chakra-ui/react";
import { FaBars, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [canvasText, setCanvasText] = useState("Your text here...");
  const [fontSize, setFontSize] = useState("20");
  const [activeStep, setActiveStep] = useState(1);
  const maxSteps = 4;

  const nextStep = () => setActiveStep((prev) => (prev < maxSteps ? prev + 1 : prev));
  const prevStep = () => setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  const { isOpen: isLeftOpen, onOpen: onLeftOpen, onClose: onLeftClose } = useDisclosure();
  const { isOpen: isRightOpen, onOpen: onRightOpen, onClose: onRightClose } = useDisclosure();

  const handleTextChange = (e) => setCanvasText(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" minH="100vh">
        {/* Navbar */}
        <Flex as="nav" justifyContent="space-between" alignItems="center" p={4} borderBottomWidth="1px">
          <IconButton variant="ghost" aria-label="Open login drawer" icon={<FaUserCircle />} onClick={onRightOpen} />
          <Text fontSize="xl" fontWeight="bold">
            Worksheet Generator
          </Text>
          <IconButton variant="ghost" aria-label="Open menu drawer" icon={<FaBars />} onClick={onLeftOpen} />
        </Flex>

        {/* Main content */}
        <Flex>
          {/* Canvas area */}
          <Box flex="2" p={4}>
            <Flex alignItems="center" justifyContent="center" h="500px" border="2px" borderColor="gray.200" borderRadius="md">
              <Text fontSize={`${fontSize}px`}>{canvasText}</Text>
            </Flex>
          </Box>

          {/* Sidebar */}
          <Box flex="1" bg="gray.100" p={4}>
            <Box flex="1" bg="gray.100" p={4}>
              <VStack spacing={4} h="80%">
                {activeStep === 1 && (
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel htmlFor="fontSize">Font Size</FormLabel>
                      <Input id="fontSize" type="number" value={fontSize} onChange={handleFontSizeChange} />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="canvasText">Text</FormLabel>
                      <Input id="canvasText" value={canvasText} onChange={handleTextChange} />
                    </FormControl>

                    <Button colorScheme="blackAlpha" onClick={() => {}} mt={4}>
                      Apply Changes
                    </Button>
                  </VStack>
                )}
                {activeStep === 2 && <Box>Step 2 Placeholder</Box>}
                {activeStep === 3 && <Box>Step 3 Placeholder</Box>}
                {activeStep === 4 && <Box>Step 4 Placeholder</Box>}
              </VStack>
              <Flex h="20%" alignItems="center" justifyContent="space-between" p={4} borderTopWidth="1px">
                <Button onClick={prevStep}>Previous</Button>
                <Button onClick={nextStep}>Next</Button>
              </Flex>
            </Box>
          </Box>
        </Flex>

        {/* Left Drawer Menu */}
        <Drawer placement="left" onClose={onLeftClose} isOpen={isLeftOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>{/* Menu content goes here */}</DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Right Drawer Login */}
        <Drawer placement="right" onClose={onRightClose} isOpen={isRightOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>
            <DrawerBody>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} isInvalid={usernameError} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={passwordError} />
              </FormControl>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              {usernameError && (
                <Text color="red.500" fontSize="sm">
                  {usernameError}
                </Text>
              )}
              {passwordError && (
                <Text color="red.500" fontSize="sm">
                  {passwordError}
                </Text>
              )}
              <Button variant="outline" mr={3} onClick={onRightClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  let valid = true;
                  if (!username.trim()) {
                    setUsernameError("Username is required");
                    valid = false;
                  } else {
                    setUsernameError("");
                  }
                  if (!password.trim()) {
                    setPasswordError("Password is required");
                    valid = false;
                  } else {
                    setPasswordError("");
                  }
                  if (valid) {
                  }
                }}
              >
                Login
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
