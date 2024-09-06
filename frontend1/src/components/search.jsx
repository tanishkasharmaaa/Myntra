import { Flex, Input, Box, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Search() {
  let token = "your-jwt-token-here"; // Replace with your actual token
  const displaySearch = useBreakpointValue({ base: "none", md: "flex" });
  const [display, setDisplay] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // State to track selected suggestion
  const [inputFocused, setInputFocused] = useState(false);
  const navigate = useNavigate();

  function handleInput(e) {
    const value = e.target.value;
    setSearchInput(value);
    setDisplay(value.length > 0);
    setSelectedIndex(-1); // Reset selection index when typing
  }

  async function handleSearchInput(query) {
    try {
      let url;
      if (["men", "women", "kid"].includes(query.toLowerCase())) {
        url = `https://myntra-gs75.onrender.com/product/all_product?ForCategory=${query}`;
      } else {
        url = `https://myntra-gs75.onrender.com/product/all_product?q=${query}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSearchData(data.products || []);
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchInput.length > 0) {
      handleSearchInput(searchInput);
    } else {
      setSearchData([]);
    }
  }, [searchInput]);

  function handleKeyDown(e) {
    if (!inputFocused || searchData.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === searchData.length - 1 ? 0 : prevIndex + 1
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex <= 0 ? searchData.length - 1 : prevIndex - 1
      );
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        // Handle suggestion selection
        setSearchInput(searchData[selectedIndex].name);
        setDisplay(false); // Hide the dropdown
        navigate(`/searchPage/${searchData[selectedIndex].name}`);
      } else {
        // Handle search input value
        handleSearchInput(searchInput);
        setDisplay(false); // Hide the dropdown
        navigate(`/searchPage/${searchInput}`);
      }
    }
  }

  function handleSuggestionClick(name) {
    setSearchInput(name);
    setDisplay(false); // Hide the dropdown
    navigate(`/searchPage/${name}`);
  }

  return (
    <Flex
      flex="1"
      display={displaySearch}
      maxWidth={{ base: "100%", md: "400px", lg: "500px" }}
      justifyContent="center"
      padding="0 10px"
      position="relative"
      zIndex="1000"
    >
      <Input
        onChange={handleInput}
        value={searchInput}
        placeholder="Search for products, brands and more"
        border="1px solid #eaeaea"
        borderRadius="md"
        padding="10px"
        backgroundColor="#f1f1f1"
        _focus={{ borderColor: "gray.400" }}
        fontSize={{ base: "12px", md: "14px", lg: "16px" }}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onKeyDown={handleKeyDown}
      />
      {display && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt="2"
          bg="white"
          border="1px solid #eaeaea"
          borderRadius="md"
          boxShadow="lg"
          zIndex="1000"
          padding="10px"
        >
          {searchData.length > 0 ? (
            searchData.map((ele, index) => (
              <Text
                key={ele._id}
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                bg={index === selectedIndex ? "gray.100" : "white"}
                padding="8px"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                onClick={() => handleSuggestionClick(ele.name)}
              >
                {ele.name}
              </Text>
            ))
          ) : (
            <Text fontSize={{ base: "12px", md: "14px", lg: "16px" }}>No results found</Text>
          )}
        </Box>
      )}
    </Flex>
  );
}

export { Search };
