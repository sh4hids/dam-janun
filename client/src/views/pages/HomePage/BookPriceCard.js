import React from 'react';
import { Box } from 'rebass/styled-components';
import { Card, Text, Divider, InlineCard } from '../../components';
const { convertNumbers } = require('bn-number-utils');

const BookPriceCard = ({ title, author, price, shop, link }) => (
  <Box
    p={[0, 2, 3]}
    pb={[4, 4, 4]}
    width={[1, 1 / 2, 1 / 3]}
    maxWidth={[`${100}%`, `${100 / 2}%`, `${100 / 3}%`]}
    flexGrow={1}
  >
    <Card
      bg="lighter"
      boxShadow="medium"
      borderRadius={4}
      p={[3, 3, 4]}
      position="relative"
      height="100%"
    >
      <InlineCard
        display="inline-block"
        borderRadius={4}
        p={'4px 12px'}
        position="absolute"
        top={-20}
        bg="lighter"
        boxShadow="mediumTop"
      >
        <Text color="lightDark" textAlign="center">
          {shop}
        </Text>
      </InlineCard>
      <a href={link}>
        <Text variant="h5" color="primary">
          {title}
        </Text>
      </a>
      <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
      <Text color="lightDark">{author || '-'}</Text>
      <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
      <Text color="secondary">৳ {convertNumbers(price)}</Text>
    </Card>
  </Box>
);

export default BookPriceCard;
