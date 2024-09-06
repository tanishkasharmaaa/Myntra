import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Box, Image, Text, Button, useBreakpointValue, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Wishlist() {
    let token = localStorage.getItem("token");
    let [data, setData] = useState([]);
    let navigate=useNavigate()

    async function fetchData() {
        if (!token) {
            alert("Please login/signup to access wishlist");
        } else {
            try {
                let res = await fetch(`https://myntra-gs75.onrender.com/product/wishlist`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                let getdata = await res.json();
                if (res.ok) {
                    setData(getdata.wishlist);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


   async function moveToCart(ele){
       try {
        let res=await fetch(`https://myntra-gs75.onrender.com/product/wishlist/${ele._id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        let data=await res.json();
        if(res.ok){
        alert('Moved to cart')
        fetchData()
        }
       } catch (error) {
        console.log(error)
       }

    }

    useEffect(() => {
        fetchData();
    }, []);

    const boxSize = useBreakpointValue({ base: '200px', md: '250px', lg: '300px' });
    const imageSize = useBreakpointValue({ base: '100%', md: '90%', lg: '80%' });
    const fontSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
    const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

    return (
        <>{
            data.length==0?(<Box display={'flex'} justifyContent={'center'} ><Box display={'flex'} flexDirection={'column'}><Image  src="/images/cart/cart.png"/><Button bg={'salmon'} color={'white'} onClick={()=>navigate('/')}>GO TO PRODUCTS AND SOMETHING TO WISHLIST</Button></Box> </Box>):(<>
             <Navbar />
            <Box p={4} m={4}>
                <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
                    {data.map((ele) => (
                        <GridItem key={ele._id}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="lg"
                                p={5}
                                bg="white"
                                transition="transform 0.3s ease-in-out"
                                _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
                                textAlign="center"
                            >
                                <Image
                                    width="100%"
                                    height={{ base: "250px", sm: "260px", md: "280px", lg: "300px" }}
                                    objectFit="cover"
                                    src={ele.arrayOfAllImages}
                                    alt={ele.name}
                                    transition="transform 0.3s ease-in-out"
                                    _hover={{ transform: "scale(1.08)" }}
                                />
                                <Text
                                    fontFamily="sans-serif"
                                    fontSize="lg"
                                    fontWeight="bold"
                                    mt={3}
                                    mb={2}
                                    color="gray.800"
                                >
                                    {ele.brand}
                                </Text>
                                <Text
                                    color="gray.500"
                                    fontSize={fontSize}
                                    mb={2}
                                >
                                    {ele.name}
                                </Text>
                                <Text
                                    fontFamily="sans-serif"
                                    fontSize="lg"
                                    fontWeight="semibold"
                                    color="teal.600"
                                    mb={4}
                                >
                                    ₹{ele.price}
                                </Text>
                                <Button
                                    colorScheme="teal"
                                    size="md"
                                    fontWeight="bold"
                                    _hover={{ bg: "teal.500", transform: "scale(1.05)" }}
                                    onClick={() => moveToCart(ele)}
                                >
                                    Move to Cart
                                </Button>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
            </>)
        }
           
        </>
    );
}

export { Wishlist };
