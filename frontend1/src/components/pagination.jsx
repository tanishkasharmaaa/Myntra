// Pagination.js
import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <Box mt={4} textAlign="center">
      <HStack spacing={4} justify="center">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          border={'2px solid pink'}
          bg={'none'}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => onPageChange(index + 1)}
            bg={currentPage === index + 1 ? "none" : "black.200"}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          border={'2px solid pink'}
          bg={'none'}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
}

export default Pagination;
