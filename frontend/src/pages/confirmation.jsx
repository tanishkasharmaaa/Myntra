import { Navbar2 } from "../components/navbar2";
import {
  Box,
  Text,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  RadioGroup,
  Stack,
  Radio,
  Divider,
  Image,
  Input,
  VStack
} from "@chakra-ui/react";
import { BsCashCoin, BsCreditCard2BackFill } from "react-icons/bs";
import { CiWallet, CiBank } from "react-icons/ci";
import { SiContactlesspayment } from "react-icons/si";
import { FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Confirmation() {
  let address = JSON.parse(localStorage.getItem("address"));
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  let [cart, setCart] = useState([]);
  let [selectedPayment, setSelectedPayment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pin, setPin] = useState("");
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

  const handlePaymentConfirmation = () => {
    if (selectedPayment === "cash") {
      toast({
        title: "Order placed successfully.",
        description: "Your order has been confirmed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } else if (selectedPayment !== "cash" && pin !== "") {
      toast({
        title: "Order placed successfully.",
        description: "Your order has been confirmed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    }
  };

  const openModalForPayment = (paymentOption) => {
    setSelectedPayment(paymentOption);
    onOpen();
  };

  return (
    <>
      <Navbar2 />
      <Box p={6} bg="gray.100" minHeight="100vh">
        <Box display={"flex"} justifyContent={"center"} flexDirection={"row"} gap={8}>
          <Box flex="1" bg="white" borderRadius="md" boxShadow="md" p={6}>
            <Text fontWeight={700} fontSize={"lg"} mb={4}>
              Bank Offer
            </Text>
            <Text mb={4}>
              10% Instant Discount on Kotak Credit and Debit Cards on a min
              spend of ₹3500. TCA
            </Text>
            <Text mb={4} fontWeight={700} fontSize={"lg"}>
              Choose Payment Mode
            </Text>
            <Box display={"flex"} flexDirection={"column"} gap={4}>
              <Box
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                p={4}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
                onClick={() => openModalForPayment("cash")}
                bg={selectedPayment === "cash" ? "teal.50" : "transparent"}
              >
                <BsCashCoin size="24px" />
                <Text ml={3} fontSize={"md"}>Cash On Delivery (Cash/UPI)</Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                p={4}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
                onClick={() => openModalForPayment("card")}
              >
                <BsCreditCard2BackFill size="24px" />
                <Text ml={3} fontSize={"md"}>Credit/Debit Card</Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                p={4}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
                onClick={() => openModalForPayment("wallet")}
              >
                <CiWallet size="24px" />
                <Text ml={3} fontSize={"md"}>Wallets</Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                p={4}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
                onClick={() => openModalForPayment("payLater")}
              >
                <BsCashCoin size="24px" />
                <Text ml={3} fontSize={"md"}>Pay Later</Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                p={4}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
                onClick={() => openModalForPayment("emi")}
              >
                <SiContactlesspayment size="24px" />
                <Text ml={3} fontSize={"md"}>EMI</Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                p={4}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
                onClick={() => openModalForPayment("netBanking")}
              >
                <CiBank size="24px" />
                <Text ml={3} fontSize={"md"}>Net Banking</Text>
              </Box>
            </Box>

            {/* Payment Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {selectedPayment === "cash" ? "Confirm Order" : "Enter Payment Details"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {selectedPayment === "cash" ? (
                    <Text textAlign="center" fontSize="lg">
                      Do you want to place your order with Cash on Delivery?
                    </Text>
                  ) : (
                    <>
                      <Text textAlign="center" fontSize="lg">
                        Enter your PIN to confirm the payment.
                      </Text>
                      <Input
                        type="password"
                        placeholder="Enter PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        mt={4}
                        size="lg"
                        variant="outline"
                      />
                    </>
                  )}
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="teal"
                    mr={3}
                    onClick={handlePaymentConfirmation}
                    borderRadius="full"
                    px={6}
                    size="lg"
                  >
                    Confirm
                  </Button>
                  <Button variant="ghost" onClick={onClose} borderRadius="full" px={6} size="lg">
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>

          <Box
      borderWidth="1px"
      borderRadius="md"
      p={6}
      width={{ base: "100%", md: "40%" }}
      bg="white"
      boxShadow="lg"
      borderColor="gray.200"
    >
      {/* Coupons Section */}
      <Box mb={4} borderBottomWidth="1px" borderBottomColor="gray.200" pb={4}>
        <Text fontWeight="600" color="gray.600" mb={2}>
          COUPONS
        </Text>
        <Flex alignItems="center" cursor="pointer">
          <FiTag size="20px" color="blue.500" />
          <Text ml={2} fontSize="md" fontWeight="600" color="blue.500">
            Apply Coupons
          </Text>
        </Flex>
      </Box>

      <Divider my={4} />

      {/* Cart Items */}
      <Box mb={4}>
        {cart.map((ele) => (
          <Box
            key={ele._id}
            display="flex"
            alignItems="center"
            bg="gray.50"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
            boxShadow="sm"
            p={4}
            mb={2}
          >
            <Image
              src={ele.arrayOfAllImages}
              alt={ele.name}
              borderRadius="md"
              boxSize="100px"
              objectFit="cover"
              mr={4}
            />
            <VStack align="start" spacing={1} flex="1">
              <Text fontWeight="bold" fontSize="md">
                {ele.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {ele.brand}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Added on: {new Date(ele.addedDate).toLocaleDateString()}
              </Text>
            </VStack>
          </Box>
        ))}
      </Box>

      <Divider my={4} />

      {/* Price Details */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="700" mb={4} color="gray.800">
          PRICE DETAILS ({cart.length} Items)
        </Text>
        <Flex justifyContent="space-between" mb={4}>
          <Box textAlign="left">
            <Text fontSize="sm" color="gray.600">
              Total MRP
            </Text>
            <Text fontSize="sm" color="gray.600">
              Discount on MRP
            </Text>
            <Text fontSize="sm" fontWeight="600" color="gray.800">
              Total Amount
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="sm" color="gray.800">
              ₹{totalMRP.toFixed(2)}
            </Text>
            <Text fontSize="sm" color="green.500">
              - ₹{totalDiscount.toFixed(2)}
            </Text>
            <Text fontSize="sm" fontWeight="600" color="gray.800">
              ₹{(totalMRP - totalDiscount).toFixed(2)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
    </Box>
      </Box>
    </>
  );
}

export {Confirmation};
