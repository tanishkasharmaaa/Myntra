import { Box, Text, Radio, RadioGroup, Stack, useColorModeValue, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function SideBar({ color, brand }) {
  const [selectedColor, setSelectedColor] = useState(""); // State for color filter
  const [selectedBrand, setSelectedBrand] = useState(""); // State for brand filter

  const colors = [
    "red", "green", "blue", "yellow", "cyan", "magenta", "black", "white",
    "gray", "purple", "pink", "orange", "brown", "beige", "lime", "olive",
    "teal", "navy", "maroon", "silver", "gold", "peach"
  ];

  const brands = [
    "BIBA", "Louis Philippe", "Manyavar", "AND", "Zara", "Roadster", "Sangria", "Van Heusen",
    "HIGHLANDER", "Titan", "Casio", "Fossil", "Apple", "Timex", "Nike", "Adidas", "Hush Puppies", "Mochi", "Woodland",
    "Mothercare","H&M","Carter's","Zara Kids","Gap Kids","Tommy Hilfiger Kids","Pepe Jeans Kids","United Colors of Benetton Kids",
    "Max Kids","Marks & Spencer Kids","Babyhug","Fabindia Kids","H&M Kids","Mango Kids","Faye Kids","Zivame Kids","Levi's Kids","Little Kangaroos","Gini & Jony"
  ];

  // Remove filters
  function handleFilterRemove() {
    setSelectedColor(""); // Reset color
    setSelectedBrand(""); // Reset brand
  }

  // Update selected color when the color radio button changes
  function handleColorChange(value) {
    setSelectedColor(value);
  }

  // Update selected brand when the brand radio button changes
  function handleBrandChange(value) {
    setSelectedBrand(value);
  }

  // Trigger callback to send selected filters to the parent component
  useEffect(() => {
    color(selectedColor ? [selectedColor] : []);
    brand(selectedBrand ? [selectedBrand] : []);
  }, [selectedColor, selectedBrand, color, brand]);

  return (
    <>
      {/* Remove Filters Button */}
      <Button
        onClick={handleFilterRemove}
        border={'solid'}
        borderRadius={'none'}
        mb={6}
        bg="transparent"
        variant="solid"
        width="100%"
        // bg={useColorModeValue("gray.600", "gray.200")}
        color='grey'
        _hover={{ bg: useColorModeValue("gray.700", "gray.300") }}
      
      >
        Remove Filters
      </Button>

      {/* Color Filter */}
      <Text fontSize="xl" fontWeight="semibold" mb={4} textAlign="center" color={useColorModeValue("gray.800", "gray.200")}>
        Filter by Color
      </Text>
      <Box
        height="40vh"
        width={{ base: "full", md: "250px" }} // Responsive width
        bg={useColorModeValue("white", "gray.700")}
        p={4}
        boxShadow="lg"
        borderRadius="lg"
        overflowY="auto" // Enable vertical scrolling
        mb={8}
      >
        <RadioGroup onChange={handleColorChange} value={selectedColor}>
          <Stack spacing={4}>
            {colors.map((uniqueColor) => (
              <Radio key={uniqueColor} value={uniqueColor} size="lg">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  borderRadius="md"
                  bg={selectedColor === uniqueColor ? "gray.100" : "transparent"}
                  _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
                  transition="background-color 0.2s"
                >
                  <Box
                    width="22px"
                    height="22px"
                    borderRadius="full"
                    bg={uniqueColor}
                    mr={3}
                    boxShadow="sm"
                    border="1px solid"
                    borderColor={useColorModeValue("gray.300", "gray.500")}
                  />
                  <Text fontSize="md" color={useColorModeValue("gray.800", "gray.100")}>
                    {uniqueColor.charAt(0).toUpperCase() + uniqueColor.slice(1)}
                  </Text>
                </Box>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>

      {/* Brand Filter */}
      <Text fontSize="xl" fontWeight="semibold" mb={4} textAlign="center" color={useColorModeValue("gray.800", "gray.200")}>
        Filter by Brand
      </Text>
      <Box
        height="40vh"
        width={{ base: "full", md: "250px" }}
        bg={useColorModeValue("white", "gray.700")}
        p={4}
        boxShadow="lg"
        borderRadius="lg"
        overflowY="auto"
      >
        <RadioGroup onChange={handleBrandChange} value={selectedBrand}>
          <Stack spacing={4}>
            {brands.map((uniqueBrand) => (
              <Radio key={uniqueBrand} value={uniqueBrand} size="lg">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  borderRadius="md"
                  bg={selectedBrand === uniqueBrand ? "gray.100" : "transparent"}
                  _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
                  transition="background-color 0.2s"
                >
                  <Text fontSize="md" color={useColorModeValue("gray.800", "gray.100")}>
                    {uniqueBrand}
                  </Text>
                </Box>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    </>
  );
}

export { SideBar };
