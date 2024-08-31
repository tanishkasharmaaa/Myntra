import { Box, Text, keyframes } from "@chakra-ui/react";

// Keyframe animation for moving text
const moveText = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

function Footer() {
  return (
    <Box
      width="100%"
      bg="black"
      height={'200px'}
      py={6}
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      boxShadow="0px -4px 20px rgba(0, 0, 0, 0.5)"
    >
      <Box
        as="div"
        animation={`${moveText} 12s linear infinite`}
        whiteSpace="nowrap"
        display="flex"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "xl", md: "3xl" }} // Responsive font size
          fontWeight="bold"
          color="white"
          textAlign="center"
          textShadow="2px 2px 10px rgba(255, 255, 255, 0.6)"
        >
          Made By{" "}
          <Text
            as="span"
            mx={1}
            role="img"
            animation="glow 1.5s ease-in-out infinite"
            textShadow="0 0 20px #ff9, 0 0 30px #ff9"
          >
            ✨
          </Text>{" "}
          Tanishka
        </Text>
      </Box>
    </Box>
  );
}

export { Footer };

