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
          colorScheme="pink"
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => onPageChange(index + 1)}
            colorScheme={currentPage === index + 1 ? "orange" : "gray"}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          colorScheme="pink"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
}

export default Pagination;
