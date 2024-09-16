import { Box, Input, List, ListItem, Text, Checkbox, Link ,Image,Select,CloseButton} from "@chakra-ui/react";
import { AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogCloseButton,AlertDialogFooter,AlertDialogBody,Button,AlertDialogHeader } from "@chakra-ui/react";
import { Navbar2 } from "../components/navbar2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbTruckReturn } from "react-icons/tb";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import {Footer} from '../components/footer'
import { FiTag } from "react-icons/fi";
import { color } from "@chakra-ui/react";
import Navbar from "../components/navbar";


function Cart() {
let token=localStorage.getItem("token")
let[cart,setCart]=useState([]);
let [dialogProductId,setDialogProductId]=useState("")
const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
const navigate=useNavigate()

    const totalMRP = cart.reduce((acc, curr) => acc + curr.price, 0);
    const totalDiscount = cart.reduce(
      (acc, curr) => acc + (curr.price * curr.discount[0]) / 100,
      0
    );
    

async function handleCart(){
    try {
        let res=await fetch(`https://myntra-gs75.onrender.com/product/cart`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        let data=await res.json();
        if(res.ok){
            setCart(data.cartItems)
            
        }
    } catch (error) {
        console.log(error)
    }
}


async function handleRemoveProduct(ele){
  console.log(ele)
  try {
    let res=await fetch(`https://myntra-gs75.onrender.com/product/cart/${ele._id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    let data=await res.json();
    if(res.ok){
      
       onClose()
       handleCart()
      
    }
} catch (error) {
    console.log(error)
}
}


async function handleMoveToWishList(ele){

  try {
    let res = await fetch(`https://myntra-gs75.onrender.com/product/wishlist/${ele.productID}`,{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
});
let data = await res.json();
console.log(data);  // Check the response here to ensure it's working
if(res.ok){
  handleRemoveProduct(ele)
  onClose();
  handleCart();  // Refresh the cart after moving item
} else {
  console.error("Failed to move to wishlist", data);
}
  } catch (error) {
    console.log(error)
  }
}

console.log(cart)
useEffect(()=>{
    handleCart()
},[])
  return (
    <>
   
    {
        cart.length==0?(<Box display={'flex'} justifyContent={'center'} ><Box display={'flex'} flexDirection={'column'}><Image  src="/images/cart/cart.png"/><Button bg={'salmon'} color={'white'} onClick={()=>navigate('/wishlist')}>GO TO WISHLIST TO ADD PRODUCTS</Button></Box> </Box>):(
            <>
           <Navbar/><Box border="1px solid gray" display="flex" flexDirection={'row'} p={4} maxWidth="1200px" margin="0 auto" gap={6}>
      <Box >
        {/* Left Side - Offers */}
        <Box flex="1" flexDirection={'row'} border="1px solid" borderColor={'gray.600'} borderRadius="md" p={4}>
          <Text fontWeight="600" fontSize="lg" mb={4}>% Available Offers</Text>
          <List spacing={2}>
            <ListItem color="gray.600">10% Instant Discount on Kotak Credit and Debit Cards on a min spend of ₹3500. TCA</ListItem>
          </List>
        </Box>

        {/* Right Side - Cart Items */}
        <Box flex="2" border="1px solid " borderColor={'gray.600'} borderRadius="md" p={4}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
            <Checkbox colorScheme="red" />
            <Text fontSize="lg" fontWeight="500">{cart.length}/{cart.length} ITEMS SELECTED</Text>
            <Box>
              <Link color="blue.500" mx={2}>REMOVE</Link>
              |
              <Link color="blue.500" mx={2}>MOVE TO WISHLIST</Link>
            </Box>
          </Box>
        </Box>
<Box >
{
  cart.map((ele) => (
    <Box key={ele._id} position="relative" display="flex" p={4} gap={6} alignItems="center" borderBottom="1px solid gray">
  {ele.arrayOfAllImages?.length > 0 && (
    <Box display="flex" gap={4} width="100%">
      {/* Close Button */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen && ele._id === dialogProductId}  // Check if the dialog is for the current product
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Do you want to remove {ele.name} from the cart?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => handleRemoveProduct(ele)}>
              Remove
            </Button>
            <Button colorScheme="red" onClick={() => handleMoveToWishList(ele)} ml={3}>
              Move to Wishlist
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CloseButton onClick={() => { onOpen(); setDialogProductId(ele._id); }} position="absolute" top="8px" right="8px" />
      <Image src={ele.arrayOfAllImages} width="150px" objectFit="cover" />
          <Box flex="1">
            <Text fontWeight="600" fontSize="lg">{ele.brand}</Text>
            <Text color="gray.500" fontSize="md">{ele.name}</Text>

            <Select mt={3} placeholder="Select Size">
              {ele.size?.length === 0 ? (
                <option value={ele.sizes}>{ele.sizes}</option>
              ) : (
                ele.size.map((eleSize) => (
                  <option key={eleSize} value={eleSize}>{eleSize}</option>
                ))
              )}
            </Select>

            <Box display="flex" alignItems="center" mt={4} gap={2}>
              <Text fontSize="lg" fontWeight="bold">₹{ele.price}</Text>
              <Text textDecoration="line-through" color="gray.500">₹{((ele.price/(100-ele.discount[0])*100)).toFixed(2)}</Text>
              <Text color="red.500">{ele.discount} OFF</Text>
            </Box>

            <Box display="flex" alignItems="center" mt={2} color="green.500">
              <TbTruckReturn />
              <Text ml={2}>14 days return available</Text>
            </Box>
          </Box>
    </Box>
  )}
</Box>

  ))
}

</Box>

        
      </Box><Box borderWidth="1px" borderRadius="lg" p={4} maxW="600px" margin="0 auto">
      {/* Coupons Section */}
      <Box mb={4}>
        <Text fontWeight="600" color="gray.600" mb={2}>
          COUPONS
        </Text>
        <Box display="flex" alignItems="center" cursor="pointer">
          <FiTag size="20px" color="gray" />
          <Text ml={2} fontSize="md" fontWeight="600" color="blue.500">
            Apply Coupons
          </Text>
        </Box>
      </Box>
      <hr />

      {/* Donation Section */}
      <Box my={4}>
        <Text fontSize="lg" fontWeight="700" color="gray.600" mb={3}>
          SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
        </Text>
        <Box display="flex" alignItems="center" mb={3}>
          <Checkbox mr={2} />
          <Text fontSize="lg" fontWeight="600">
            Donate and make a difference
          </Text>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={{ lg: "repeat(4, 1fr)", base: "repeat(2, 1fr)" }}
          gap={2}
          mb={4}
        >
          <Button borderRadius="20px" variant="outline" >
            ₹10
          </Button>
          <Button borderRadius="20px" variant="outline">
            ₹20
          </Button>
          <Button borderRadius="20px" variant="outline">
            ₹50
          </Button>
          <Button borderRadius="20px" variant="outline">
            ₹100
          </Button>
        </Box>
        <Text fontSize="lg" fontWeight="700" color="salmon" cursor="pointer">
          Know More
        </Text>
      </Box>
      <hr />

      {/* Price Details Section */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="700" mb={4}>
          PRICE DETAILS ({cart.length} Items)
        </Text>
        <Box display="flex" justifyContent="space-between" mb={4}>
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
        </Box>

        <Box display="flex" justifyContent="space-between" mb={4}>
          <Text fontWeight="700" fontSize="lg">
            Total Amount
          </Text>
          <Text fontWeight="700" fontSize="lg">
            ₹{(totalMRP - totalDiscount).toFixed(2)}
          </Text>
        </Box>

        <Box textAlign="center">
          <Button bg="salmon" color="white" width="100%" _hover={{ bg: "red.400" }} onClick={()=>navigate('/address')}>
            PLACE ORDER
          </Button>
        </Box>
      </Box>
    </Box></Box>
      <Footer/>
            </>
        )
    }
      
    </>
  );
}

export { Cart };
