import { Image, Box, Text, Grid } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";

function Home() {
  const arrImage = [
    { img: "/images/home/mainSlider1.png", q: "Kids" },
    { img: "/images/home/mainSlider2.png", q: "Bag" },
    { img: "/images/home/mainSlider3.png", q: "Shoes" },
    { img: "/images/home/mainSlider4.png", q: "Bag" },
    { img: "/images/home/mainSlider5.png", q: "Shirt" },
  ];

  const smallSlider = [
    { img: "/images/home/smallSlider1.png", q: "Casuals" },
    { img: "/images/home/smallSlider2.png", q: "Saree" },
    { img: "/images/home/smallSlider3.png", q: "Shirt" },
    { img: "/images/home/smallSlider4.png", q: "Shoe" },
  ];

  const gridImages = [
    { img: "/images/home/1.png", q: "Ethnic" },
    { img: "/images/home/2.png", q: "Casuals" },
    { img: "/images/home/5.png", q: "Women" },
    { img: "/images/home/6.png", q: "Shoes" },
    { img: "/images/home/7.png", q: "Long" },
    { img: "/images/home/8.png", q: "watch" },
    { img: "/images/home/9.png", q: "Kids" },
    { img: "/images/home/10.png", q: "Shoes" },
    { img: "/images/home/11.png", q: "Footwear" },
    { img: "/images/home/12.png", q: "Formal" },
    { img: "/images/home/13.png", q: "Ethnic" },
    { img: "/images/home/14.png", q: "Women" },
    { img: "/images/home/15.png", q: "Formal" },
    { img: "/images/home/17.png", q: "Formal" },
    { img: "/images/home/18.png", q: "Casual" },
  
  ];

  const [pageNo, setPageNo] = useState(0);
  const [smallSlideNo, setSmallSlideNo] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPageNo((prevPageNo) => (prevPageNo + 1) % arrImage.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [arrImage.length]);

  useEffect(() => {
    const smallSliderIntervalId = setInterval(() => {
      setSmallSlideNo((prevSmallSlideNo) => (prevSmallSlideNo + 1) % smallSlider.length);
    }, 5000);

    return () => clearInterval(smallSliderIntervalId);
  }, [smallSlider.length]);

  return (
    <>
      <Navbar />
      {/* Main Slider */}
      <Box
        w="100%"
        h="100%"
        mt={0}
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Link to={`/searchPage/${arrImage[pageNo].q}`}>
          <Image
            src={arrImage[pageNo].img}
            alt={`Carousel image ${pageNo}`}
            objectFit="cover"
            w="100%"
            h="full"
          />
        </Link>
      </Box>

      {/* Category Search Heading */}
      <Box display="flex" justifyContent="center" mt={8}>
        <Text
          fontSize={{base:"x-large",lg:"xxx-large",md:"xx-large",sm:"x-large"}}
          color="grey"
          fontWeight="600"
          fontFamily="sans-serif"
        >
          FOR CATEGORY SEARCH
        </Text>
      </Box>

      {/* Small Slider */}
      <Box
        
        mt={8}
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Link to={`/searchPage/${smallSlider[smallSlideNo].q}`}>
          <Image
            src={smallSlider[smallSlideNo].img}
            alt={`Small carousel image ${smallSlideNo}`}
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Link>
      </Box>
      <Box>
        <Box mt={8}
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Text
          fontSize={{base:"x-large",lg:"xxx-large",md:"xx-large",sm:"x-large"}}
          color="grey"
          fontWeight="600"
          fontFamily="sans-serif"
        >
          FOR BRANDS & TITLE
        </Text>
        </Box>
        <Grid
        mt={8}
      display={'grid'}
      gridTemplateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)', lg: 'repeat(5, 1fr)' }}
      gap={4}
    >
      {gridImages.map((ele, index) => (
        <Box key={index}>
          <Link to={`/searchPage/${ele.q}`}>
          <Image src={ele.img} width={{base:"100%"}}/>
          </Link>
        </Box>
      ))}
    </Grid>
      </Box>
      <Footer/>
    </>
  );
}

export { Home };
