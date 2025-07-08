import {Box,ListItem,List} from '@chakra-ui/react'

function MenMenu(){
    return<>
    <Box display={''}>
    <Box>
        <Text>Topwear</Text>
         <List>Casual Shirt</List>
         <List>Formal Shirts</List>
         <List>Sweatshirts</List>
         <List>Sweaters</List>
         <List>Jackets</List>
         <List>Blazers & Coats</List>
         <List>Suits</List>
         <List>Rain Jackets</List>
    </Box>
    <Box>
        <Text>Bottomwear</Text>
        <List>Jeans</List>
        <List>Casual Trousers</List>
        <List>Formal Trousers</List>
        <List>Shorts</List>
        <List>Track Pants & Joggers</List>
    </Box>
    <Box>
        <Text>Footwear</Text>
        <List>Casual</List>
        <List>Casual Trousers</List>
        <List>Shorts</List>
        <List>Track Pants & Joggers</List>
    </Box>
    <Box>
        <Text>Fashion Accessories</Text>
        <List>Wallets</List>
        <List>Belts</List>
        <List>Perfumes & Body Mists</List>
        <List>Trimmers</List>
        <List>Deodorants</List>
        <List>Ties,Cufflinks & Pocket Squares</List>
        <List>Accessory Gift Sets</List>
        <List>Caps & Hats</List>
        <List>Mufflers , Scarves & Gloves</List>
        <List>Phone Cases</List>
        <List>Rings & Writer</List>
        <List>Helmets</List>
    </Box></Box>
    </>
}

export {MenMenu}