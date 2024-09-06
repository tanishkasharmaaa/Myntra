import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiHeart } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { Input, Box, Flex, Icon, useBreakpointValue, Image, Tooltip, MenuButton, Menu, MenuList, MenuItem, Button, IconButton, Text } from "@chakra-ui/react";
import { Search } from "./search";

import { useToast } from "@chakra-ui/react";

function Navbar() {
  const nav = [
    { title: "MEN", link: "/men", info: (<Box><Image borderRadius="md" boxShadow="md" width={{ base: "300px", sm: "500px", md: "800px", lg: "1000px" }} height="auto" objectFit="cover" src="/images/navbar/men.png" /></Box>) },
    { title: "WOMEN", link: "/women", info: (<Box><Image borderRadius="md" boxShadow="md" width={{ base: "300px", sm: "500px", md: "800px", lg: "1000px" }} height="auto" objectFit="cover" src="/images/navbar/women.png" /></Box>) },
    { title: "KIDS", link: "/kids", info: (<Box><Image borderRadius="md" boxShadow="md" width={{ base: "300px", sm: "500px", md: "800px", lg: "1000px" }} height="auto" objectFit="cover" src="/images/navbar/kids.png" /></Box>) },
    { title: "BEAUTY", link: "/", info: (<Box><Image borderRadius="md" boxShadow="md" width={{ base: "300px", sm: "500px", md: "800px", lg: "1000px" }} height="auto" objectFit="cover" src="/images/navbar/beauty.png" /></Box>) },
    { title: "HOME & LIVING", link: "/", info: (<Box width={'100%'}><Image borderRadius="md" boxShadow="md" width={{ base: "300px", sm: "500px", md: "800px", lg: "1000px" }} height="auto" objectFit="cover" src="/images/navbar/Home&Living.png" /></Box>) },
  ];
  const toast = useToast();
  
  const token = localStorage.getItem("token");
  const displaySearch = useBreakpointValue({ base: "none", md: "flex" });
  const displayIcons = useBreakpointValue({ base: "none", md: "flex" });
  const navigate = useNavigate();

  const handleClick = () => {
    if (token) {
      navigate('/wishlist');
    } else {
      toast({
        title: 'Login Required',
        description: 'Please login/signup to access this page.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    }
  };

  const handleCart = () => {
    if (token) {
      navigate('/cart');
    } else {
      toast({
        title: 'Login Required',
        description: 'Please login/signup to access this page.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    }
  };
  return (
    <Flex
    width={'100%'}
      as="nav"
      align="center"
      justifyContent="space-between"
      padding={{ base: "2px 8px", md: "5px 10px" }}
      borderBottom="1px solid lightgrey"
      backgroundColor="#fff"
      wrap="wrap"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Logo */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        padding={{ base: "5px", sm: "12px", md: "10px", lg: "10px" }}
      >
        <Link to="/">
          <Image
            src="/images/home/myntra.png"
            alt="Myntra Logo"
            width={{ base: "40px", sm: "40px", md: "60px", lg: "80px" }}
            height="auto"
            transition="width 0.3s ease"
          />
        </Link>
      </Box>

      {/* Links */}
      <Flex
        flex="1"
        justify="center"
        gap={{ base: "10px", sm: "12px", md: "18px", lg: "24px" }}
        wrap="wrap"
      >
        {nav.map((ele, index) => (
          <Tooltip
            key={index}
            label={
              <Box
                width={{ base: "300px", sm: "500px", md: "800px", lg: "1000px" }}
                height="100%"
              >
                {ele.info}
              </Box>
            }
            bg="transparent"
          >
            <Link to={ele.link}>
              <Box
                pt={{ base: "1", sm: "0", md: "2", lg: "2" }}
                fontWeight="700"
                fontSize={{ base: "13px", sm: "13px", md: "15px", lg: "16px" }}
                position="relative"
                _hover={{ color: "#fc03c2" }}
                color="gray.700"
                cursor="pointer"
                textAlign="center"
                transition="color 0.3s ease"
                _after={{
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
                  bottom: "-2px",
                  left: "0",
                  backgroundColor: "#fc03c2",
                  transition: "width 0.3s ease-in-out"
                }}
                hover={{
                  color: "#fc03c2",
                  _after: {
                    width: "100%"
                  }
                }}
              >
                {ele.title}
              </Box>
            </Link>
          </Tooltip>
       ) )}
      </Flex>

      {/* Search Bar */}
      <Search />

      {/* Icons */}
      <Flex
        display={displayIcons}
        gap={{ base: "10px", md: "20px", lg: "25px" }}
        align="center"
        justify="flex-end"
        flexShrink={0}
      >
        <Menu>
          <MenuButton as={IconButton} icon={<CiUser />} fontSize={{ base: "24px", md: "28px" }} cursor="pointer" backgroundColor={'transparent'}/>
          <MenuList p={4} backgroundColor={'white'} borderRadius="md" shadow="md">
            <Box textAlign="center" p={3}>
              {token ? (
                <>
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    Welcome
                  </Text>
                  <Text fontSize="sm" color="gray.500" mb={3}>
                    To access account and manage orders
                  </Text>
                </>
              ) : (
                <>
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    Hello, Guest!
                  </Text>
                  <Text fontSize="sm" color="gray.500" mb={3}>
                    Please log in to continue.
                  </Text>
                  <Button
                colorScheme="white"
                backgroundColor={'#fc609c'}
               
                size="sm"
                borderRadius={"none"}
                _hover={{ bg: "#fc609c", color: "#fff" }}
                onClick={() => navigate("/signup")}
              >
                LOGIN/SIGNUP
              </Button>
                </>
              )}
              
            </Box>

            {/* Additional Menu Items */}
            {/* <MenuItem as={Link} to="/account-settings">
              Account Settings
            </MenuItem> */}
            <MenuItem as={Link} to="/order-history">
              Order History
            </MenuItem>
            <MenuItem as={Link} to="/wishlist">
              Wishlist
            </MenuItem>
            <MenuItem onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                bgColor={'#fc609c'}
                variant="outline"
                display={'flex'}
                justifyContent={'center'}
                _hover={{ bgColor: "#fc609c", color: "#fff" }}
                size="sm"
                width="100%">
              <Text
                 color="White"
              >
                Log Out
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
        <Button
      onClick={handleClick}
      bg="transparent"
      _hover={{ bg: 'gray.100' }} // Optional: Add hover effect if needed
      p={0} // Removes default padding
      aria-label="Wishlist"
    >
      <Icon
      
        as={CiHeart}
        boxSize={{ base: "24px", md: "28px" }}
        cursor="pointer"
        transition="color 0.3s ease"
      />
    </Button>

        
<Button onClick={handleCart}
      bg="transparent"
      _hover={{ bg: 'gray.100' }} 
      p={0} 
      aria-label="Cart" >
  <Icon as={BsBag} boxSize={{ base: "24px", md: "28px" }} cursor="pointer" transition="color 0.3s ease" /></Button>
        
      </Flex>
    </Flex>
  );
}

export default Navbar;
