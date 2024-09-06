import { Text, Box, Button, Input, Flex, FormControl, useToast } from "@chakra-ui/react";
import { Navbar2 } from "../components/navbar2";
import { useEffect, useState } from "react";
import { FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Address() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    address: "",
    locality: "",
    city: "",
    state: ""
  });

  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  let [cart, setCart] = useState([]);
  const toast = useToast();

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const { name, mobile, pinCode, address, locality, city, state } = formData;
    return name && mobile && pinCode && address && locality && city && state;
  };

  // Handle Add Address Button Click
  const handleAddAddress = () => {
    console.log(formData)
    if (validateForm()) {
      // If all fields are filled, navigate to payment
      localStorage.setItem("address",JSON.stringify(formData))
      navigate('/payment');
    } else {
      // Show toast alert for incomplete form
      toast({
        title: "Incomplete Information",
        description: "Please provide complete info",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Navbar2 />
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="center"
        align="flex-start"
        p={4}
        gap={8}
      >
        {/* Address Form Section */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          width={{ base: "100%", lg: "45%" }}
          bg="white"
          boxShadow="lg"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            CONTACT DETAILS
          </Text>
          <FormControl mb={4}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              mb={4}
              borderColor="gray.300"
              _focus={{ borderColor: "salmon" }}
            />
            <Input
              type="text"
              name="mobile"
              placeholder="Mobile No."
              value={formData.mobile}
              onChange={handleInputChange}
              mb={4}
              borderColor="gray.300"
              _focus={{ borderColor: "salmon" }}
            />
          </FormControl>

          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            ADDRESS
          </Text>
          <FormControl mb={4}>
            <Input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleInputChange}
              mb={4}
              borderColor="gray.300"
              _focus={{ borderColor: "salmon" }}
            />
            <Input
              type="text"
              name="address"
              placeholder="Address (House No, Building, Street, Area)*"
              value={formData.address}
              onChange={handleInputChange}
              mb={4}
              borderColor="gray.300"
              _focus={{ borderColor: "salmon" }}
            />
            <Input
              type="text"
              name="locality"
              placeholder="Locality / Town"
              value={formData.locality}
              onChange={handleInputChange}
              mb={4}
              borderColor="gray.300"
              _focus={{ borderColor: "salmon" }}
            />
          </FormControl>

          <Flex gap={4} mb={4}>
            <Input
              type="text"
              name="city"
              placeholder="City / District*"
              value={formData.city}
              onChange={handleInputChange}
              borderColor="gray.300"
              _focus={{ borderColor: "salmon" }}
            />
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              borderColor="gray.300"
              _focus={{ borderColor: "salmon" }}
            />
          </Flex>

          <Button
            bg="salmon"
            color="white"
            width="100%"
            _hover={{ bg: "red.400" }}
            onClick={handleAddAddress}
          >
            ADD ADDRESS
          </Button>
        </Box>

        {/* Price Details Section */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          width={{ base: "100%", lg: "35%" }}
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
                <Text>Coupon Discount</Text>
                <Text>Platform Fee</Text>
                <Text>Shipping Fee</Text>
              </Box>
              <Box textAlign="right">
                <Text>₹{totalMRP.toFixed(2)}</Text>
                <Text color="green.500">-₹{totalDiscount.toFixed(2)}</Text>
                <Text color="salmon" cursor="pointer">
                  Apply Coupon
                </Text>
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
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export { Address };