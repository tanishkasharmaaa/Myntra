import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Image,
  Text,
  Spinner,
  Center,
  Button,
  useToast,
} from "@chakra-ui/react";
import { SideBar } from "../components/sideBar";
import Pagination from "../components/Pagination"; // Import Pagination component
import { Footer } from "../components/footer";

function SearchPage() {
  const { id } = useParams(); // Get search query from URL params
  const [data, setData] = useState([]); // Store search results in state
  const [loading, setLoading] = useState(true); // Loading state
  const [color, setColor] = useState([]); // Color filter state (array)
  const [brand, setBrand] = useState([]); // Brand filter state (array)
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

  const toast = useToast(); // Chakra UI toast hook
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Function to fetch data based on the search query
  async function fetchQueryData() {
    let url = `https://myntra-gs75.onrender.com/product/all_Product?q=${id}&page=${currentPage}`;

    // Append color filter if available
    if (color.length > 0) {
      url += `&color=${color[0]}`;
    }

    // Append brand filter if available
    if (brand.length > 0) {
      url += `&brand=${brand[0]}`;
    }
    if(id==="ethnic"||id==="clothing"||id=="party"||id=="casuals"||id=="formals"||id=="shoes"||id=="watches"){
      url+=`&category=${id}`
    }

    try {
    
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const getdata = await res.json();

      if (res.ok) {
        setData(getdata.products); // Store the products data in state
        setTotalPages(getdata.totalPages); // Set total pages from response
      } else {
        throw new Error(getdata.message || "Failed to fetch products");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  }

  // Function to add a product to the wishlist
  async function wishlist(ele) {
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please login/signup to add the product to the wishlist.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/signup");
      return;
    }

    try {
      const res = await fetch(
        `https://myntra-gs75.onrender.com/product/wishlist/${ele._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: ele.name,
            category: ele.category,
            images: ele.arrayOfAllImages[0],
            size: ele.sizes,
            brand: ele.brand,
            price: ele.price,
            color: ele.color,
            discount: ele.discount,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Added to wishlist.",
          description: `${ele.name} has been added to your wishlist!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.message || "Failed to add product to wishlist");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  // Fetch data when component mounts or search query/color/page changes
  useEffect(() => {
    fetchQueryData();
  }, [id, color, brand, currentPage]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <>
      <Navbar />
      <Box display="flex">
        <Box>
          <SideBar color={setColor} product={data} brand={setBrand} />
        </Box>
        <Box p={6} bg="white" flex="1">
          <Text
            fontSize="4xl"
            fontWeight="bold"
            mb={8}
            textAlign="center"
            color="teal.700"
          >
            Search Results
          </Text>
          <Box
            display="grid"
            gridTemplateColumns={{
              lg: "repeat(4, 1fr)",
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
            }}
            rowGap={{ base: 3, lg: 6, md: 4 }}
            columnGap={{ base: 3, lg: 6, md: 4 }}
          >
            {data.length > 0 ? (
              data.map((ele) => (
                <Box
                  key={ele._id}
                  border="1px solid"
                  borderColor="gray.300"
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  transition="transform 0.3s, box-shadow 0.3s"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 6px 16px",
                  }}
                >
                  {/* Image Box */}
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={0}
                  >
                    <Link to={`/${ele._id}`}>
                    <Image
                      width="100%"
                      height={{ base: "260px", sm: "260px", md: "260px", lg: "260px" }}
                      src={ele.arrayOfAllImages[0]}
                      alt={ele.name}
                      transition="transform 0.3s ease-in-out"
                      _hover={{ transform: "scale(1.05)" }}
                    /></Link>
                  </Box>

                  {/* Content Box */}
                  <Box p={2} borderTopWidth="1px" borderColor="gray.200">
                    <Link to={`/${ele._id}`}>
                      <Badge colorScheme="orange" fontSize="sm" mb={2}>
                        {ele.discount} OFF
                      </Badge>

                      <Text fontSize="lg" fontWeight="semibold" isTruncated>
                        {ele.brand}
                      </Text>
                      <Text fontSize="md" color="gray.500" isTruncated>
                        {ele.name}
                      </Text>

                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="grey.600"
                        mt={2}
                      >
                        ${ele.price}
                      </Text>
                    </Link>

                    <hr
                      style={{ margin: "12px 0", borderTop: "1px solid gray.200" }}
                    />

                    {/* Button */}
                    <Button
                      onClick={() => wishlist(ele)}
                      width="100%"
                      colorScheme="pink"
                      variant="solid"
                      mt={1}
                      _hover={{ bg: "pink.100" }}
                    >
                      Add to Wishlist
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Text fontSize="xl" color="gray.600" textAlign="center">
                No products found.
              </Text>
            )}
          </Box>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Box>
      </Box>
      <Footer/>
    </>
  );
}

export { SearchPage };
