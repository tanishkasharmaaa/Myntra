import { Stepper, Step, StepTitle, StepSeparator, Box, Image, Text } from "@chakra-ui/react"
import { LuShieldCheck } from "react-icons/lu"
import { useSteps } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const steps = [
  { title: 'Cart', description: 'Contact Info', path: '/cart' },
  { title: 'Address', description: 'Date & Time', path: '/address' },
  { title: 'Payment', description: 'Select Rooms', path: '/payment' },
]

function Navbar2() {
  const navigate = useNavigate()

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={3}
      px={4}
      bg="white"
      boxShadow="md"
      width="100%"
    >
      {/* Logo Section */}
      <Box textAlign={{ base: 'center', md: 'left' }}>
        <Link to="/">
          <Image
            src="/images/home/myntra.png"
            alt="Myntra Logo"
            width={{ base: "60px", md: "70px", lg: "80px" }}
            height="auto"
            transition="width 0.3s ease"
          />
        </Link>
      </Box>

      {/* Stepper Section */}
      <Stepper
        size="lg"
        index={activeStep}
        width={{ base: '100%', md: '400px' }}
        direction={{ base: 'vertical', md: 'horizontal' }}
        colorScheme="green"
      >
        {steps.map((step, index) => (
          <Step key={index} onClick={() => navigate(step.path)}>
            <Box flexShrink="0">
              <Link to={step.path}>
                <StepTitle fontSize={{ base: '14px', md: '16px' }} color={activeStep === index ? "green.600" : "gray.600"}>
                  {step.title}
                </StepTitle>
              </Link>
            </Box>
            {index !== steps.length - 1 && <StepSeparator />}
          </Step>
        ))}
      </Stepper>

      {/* Secure Section */}
      <Box display="flex" alignItems="center">
        <LuShieldCheck fontSize="25px" color="green" />
        <Text color="gray.600" fontSize="sm" ml={2}>
          100% SECURE
        </Text>
      </Box>
    </Box>
  )
}

export { Navbar2 }
