import { Box, Heading, Image, Text, Button, Input, Divider, UnorderedList, ListItem, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

function SinglePage() {
  let { id } = useParams();
  let [data, setData] = useState([]);
  let token = localStorage.getItem("token");
  const toast = useToast();  // Initialize the toast hook

  async function fetchProduct() {
    try {
      let res = await fetch(`https://myntra-gs75.onrender.com/product/all_Product?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let getData = await res.json();
      if (res.ok) {
        setData(getData.products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWishlist(ele) {
    if (!token) {
      toast({
        title: "Please log in or sign up.",
        description: "You need to be logged in to add products to your wishlist.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      let res = await fetch(`https://myntra-gs75.onrender.com/product/wishlist/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: ele.name,
          category: ele.category,
          images: ele.arrayOfAllImages,
          size: ele.sizes,
          brand: ele.brand,
          price: ele.price,
          color: ele.color,
          discount: ele.discount
        })
      });

      if (!res.ok) {
        toast({
          title: "Error adding to wishlist",
          description: "There was an issue adding the product to your wishlist.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      let data = await res.json();
      toast({
        title: "Added to wishlist",
        description: `The product ${ele.name} was added to your wishlist.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "An error occurred while adding the product to the wishlist.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error('Error while adding to wishlist:', error);
    }
  }


  async function handleCart(ele) {
    if (!token) {
      toast({
        title: "Please log in or sign up.",
        description: "You need to be logged in to add products to your cart.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      let res = await fetch(`https://myntra-gs75.onrender.com/product/add-to-cart/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: ele.name,
          category: ele.category,
          images: ele.arrayOfAllImages,
          size: ele.sizes,
          brand: ele.brand,
          price: ele.price,
          color: ele.color,
          discount: ele.discount
        })
      });

      if (!res.ok) {
        toast({
          title: "Error adding to wishlist",
          description: "There was an issue adding the product to your cart.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      let data = await res.json();
      toast({
        title: "Added to Cart",
        description: `The product ${ele.name} was added to your Cart.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "An error occurred while adding the product to the wishlist.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error('Error while adding to cart:', error);
    }
  }


  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <Box>
      <Navbar />
      <Box p={8}>
        {data.map((product) => (
          <Box key={product._id} display={{ base: 'block', md: 'flex' }} gap={6} mb={12}>
            {/* Product Images */}
            <Box>
              <Image src={product.arrayOfAllImages[0]} alt={product.name} borderRadius="md" boxShadow="md" />
            </Box>

            {/* Product Details */}
            <Box flex={1} p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
              <Heading fontFamily="sans-serif" mb={2}>{product.brand}</Heading>
              <Text fontFamily="sans-serif" fontSize="lg" color="gray.600" mb={4}>{product.name}</Text>
              <Divider my={4} />
              <Text fontSize="2xl" fontWeight="bold" mb={2}>₹{product.price}</Text>
              <Text color="teal.600" fontWeight="600" mb={4}>Inclusive of all taxes</Text>

              <Box mb={4}>
                {product.size.map((ele, index) => (
                  <Button key={index} size="sm" variant="outline" mr={2} mb={2} borderRadius="full">{ele}</Button>
                ))}
              </Box>

              {/* Action Buttons */}
              <Box mb={4}>
                <Button colorScheme="pink" mr={4} size="lg" onClick={()=>handleCart(product)}>Add to bag</Button>
                <Button
                  onClick={() => handleWishlist(product)}
                  variant="outline"
                  size="lg"
                  borderColor="pink.400"
                  _hover={{ bg: "pink.50", borderColor: "pink.600" }}
                >
                  Wishlist
                </Button>
              </Box>

              <Divider my={4} />

              {/* Delivery Option */}
              <Text fontSize="lg" fontWeight="600" mb={2}>DELIVERY OPTION</Text>
              <Input placeholder="Enter pin code" maxW="sm" mb={4} />
              <Text fontSize="sm" color="gray.500">Please enter PIN code to check delivery time & Pay on Delivery Availability</Text>

              <UnorderedList spacing={2} mt={4} color="gray.600">
                <ListItem>100% Original Products</ListItem>
                <ListItem>Pay on delivery might be available</ListItem>
                <ListItem>Easy 7 days returns and exchanges</ListItem>
              </UnorderedList>
            </Box>

            {/* Offers Section */}
            <Box flex={1} p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
              <Text fontSize="xl" fontWeight="bold" color="red.600" mb={2}>Best Price: ₹1099</Text>
              <UnorderedList spacing={2} color="gray.600">
                <ListItem>Applicable on: Orders above ₹1399 (only on first purchase)</ListItem>
                <ListItem>Coupon code: <Text as="span" fontWeight="bold">MYNTRA400</Text></ListItem>
                <ListItem>Coupon Discount: ₹400 off (check cart for final savings)</ListItem>
              </UnorderedList>
              <Text fontSize="lg" color="red.600" fontWeight="bold" mt={4} mb={2}>View Eligible Products</Text>
              <Text fontSize="lg" fontWeight="bold" mb={2}>10% Discount on Kotak Credit and Debit Cards.</Text>
              <UnorderedList spacing={2} color="gray.600">
                <ListItem>Max Discount up to ₹1000 on every spends.</ListItem>
              </UnorderedList>
              <Text fontSize="lg" color="red.600" fontWeight="bold" mt={4} mb={2}>Terms & Condition</Text>
              <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>7.5% Discount on Myntra Kotak Credit Card.</Text>
              <UnorderedList spacing={2} color="gray.600">
                <ListItem>Max Discount up to ₹750 on every spends.</ListItem>
              </UnorderedList>
              <Text fontSize="lg" color="red.600" fontWeight="bold" mt={4} mb={2}>EMI option available.</Text>
              <UnorderedList spacing={2} color="gray.600">
                <ListItem>EMI starting from Rs.70/month</ListItem>
              </UnorderedList>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export { SinglePage };
