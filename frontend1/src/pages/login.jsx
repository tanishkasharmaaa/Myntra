import { Box, Image, Input, Button, Text, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });
  const [alertState, setAlertState] = useState({ type: "", message: "", show: false });
const navigate=useNavigate()
  function handleInput(e) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      let res = await fetch(`https://myntra-gs75.onrender.com/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         
          email: formState.email,
          password: formState.password
        })
      });

      let data = await res.json();
      if (res.ok) {
        setAlertState({
          type: "success",
          message: "Login Successful! Welcome aboard.",
          show: true
        });
       localStorage.setItem("token",data.accessToken)
        navigate('/')
      } else {
        setAlertState({
          type: "error",
          message: data.message || "Login failed. Please try again.",
          show: true
        });
      }
    } catch (error) {
      setAlertState({
        type: "error",
        message: "An error occurred. Please try again later.",
        show: true
      });
    }
  }

  return (
    <Box bgColor={"pink.50"} minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flex="1">
        <Box bg="white">
          <Image src="/images/login/login.png" mx="auto" mb={4} width={{ base: "320px", sm: "240px", md: "260px", lg: "320px" }} />
          
          {/* Conditional Alert */}
          {alertState.show && (
            <Alert status={alertState.type} mb={4} borderRadius="md" maxWidth="sm" mx="auto">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>{alertState.type === "success" ? "Success!" : "Error"}</AlertTitle>
                <AlertDescription>{alertState.message}</AlertDescription>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAlertState({ ...alertState, show: false })} />
            </Alert>
          )}

          <Box onSubmit={handleSignUp} as="form" display="flex" flexDirection="column" gap={4} p={5} width={{ base: "320px", sm: "240px", md: "260px", lg: "320px" }}>

            <Input onChange={handleInput} value={formState.email} name="email" type="email" placeholder="Email" size="sm" variant="filled" required />
            <Input onChange={handleInput} value={formState.password} name="password" type="password" placeholder="Password" size="sm" variant="filled" required />

            <Text fontSize="xs" color="gray.500" mt={2}>
              By continuing, I agree to the{" "}
              <Text as="span" fontWeight="bold" color="#fc609c">
                Terms of Use
              </Text>{" "}
              &{" "}
              <Text as="span" fontWeight="bold" color="#fc609c">
                Privacy Policy
              </Text>
            </Text>

            <Button type="submit" backgroundColor="#fc609c" size="sm">
              Login
            </Button>

            <Text fontSize="xs" color="gray.500" mt={0}>
              Having trouble logging in?{" "}
              <Text as="span" fontWeight="bold" color="#fc609c">
                Get help
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export { Login };