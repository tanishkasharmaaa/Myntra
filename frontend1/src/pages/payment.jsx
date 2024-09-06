import { Navbar2 } from "../components/navbar2";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Payment() {
  let address = JSON.parse(localStorage.getItem("address"));
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  let [cart, setCart] = useState([]);

  const totalMRP = cart.reduce((acc, curr) => acc + curr.price, 0);
  const totalDiscount = cart.reduce(
    (acc, curr) => acc + (curr.price * curr.discount[0]) / 100,
    0
  );

  async function handleCart() {
    try {
      let res = await fetch(`https://myntra-gs75.onrender.com/product/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      if (res.ok) {
        setCart(data.cartItems);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <>
      <Navbar2 />
      <Box p={6} display="flex" justifyContent="space-around" flexWrap="wrap">
        {/* Delivery Address Section */}
        <Box
  borderWidth="1px"
  borderRadius="lg"
  p={6}
  width={{ base: "100%", md: "45%" }}
  bg="gray.50"
  boxShadow="xl"
  mb={6}
  transition="transform 0.2s"
  _hover={{ transform: "scale(1.02)" }}
>
  <Text fontSize="2xl" fontWeight="700" mb={4} color="teal.600">
    Delivery Address
  </Text>
  <Box
    borderWidth="1px"
    borderRadius="lg"
    p={4}
    bg="white"
    boxShadow="md"
    borderColor="teal.200"
  >
    <Text fontSize="lg" fontWeight="600" mb={2} color="teal.700">
      {address.name}
    </Text>
    <Text mb={2} color="gray.600">
      {address.mobile}
    </Text>
    <Text color="gray.700">{address.address}</Text>
    <Text color="gray.600">{address.locality}</Text>
    <Flex mt={2} color="gray.600">
      <Text>{address.city}, </Text>
      <Text ml={2}>{address.state}, </Text>
      <Text ml={2}>{address.pinCode}</Text>
    </Flex>
  </Box>
</Box>


        {/* Price Details Section */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          width={{ base: "100%", md: "45%" }}
          bg="white"
          boxShadow="lg"
        >
          {/* Coupons Section */}
          <Box mb={4}>
            <Text fontWeight="600" color="gray.600" mb={2}>
              COUPONS
            </Text>
            <Flex alignItems="center" cursor="pointer">
              <FiTag size="20px" color="gray" />
              <Text ml={2} fontSize="md" fontWeight="600" color="blue.500">
                Apply Coupons
              </Text>
            </Flex>
          </Box>
          <hr />

          {/* Price Details */}
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="700" mb={4}>
              PRICE DETAILS ({cart.length} Items)
            </Text>
            <Flex justifyContent="space-between" mb={4}>
              <Box textAlign="left">
                <Text>Total MRP</Text>
                <Text>Discount on MRP</Text>
               
                <Text>Platform Fee</Text>
                <Text>Shipping Fee</Text>
              </Box>
              <Box textAlign="right">
                <Text>₹{totalMRP.toFixed(2)}</Text>
                <Text color="green.500">-₹{totalDiscount.toFixed(2)}</Text>
                
                <Text color="green.500">FREE</Text>
                <Text color="green.500">FREE</Text>
              </Box>
            </Flex>

            <Flex justifyContent="space-between" mb={4}>
              <Text fontWeight="700" fontSize="lg">
                Total Amount
              </Text>
              <Text fontWeight="700" fontSize="lg">
                ₹{(totalMRP - totalDiscount).toFixed(2)}
              </Text>
            </Flex>

            <Button
              bg="salmon"
              color={'white'}
              size="lg"
              width="100%"
              onClick={() => navigate("/confirmation")}
            >
              Continue to Payment
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export { Payment };
