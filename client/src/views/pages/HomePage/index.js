import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { connect } from 'react-redux';

import { MainLayout } from '../../layouts';
import { Card, Text, Loader } from '../../components';
import BookPriceCard from './BookPriceCard';
import SearchForm from './SearchForm';

const HomePage = ({
  bookPrices,
  isFetchingBookPrices,
  fetchBookPricesDone,
  fetchBookPricesFailed,
}) => (
  <MainLayout>
    <>
      <SearchForm />
      <Flex
        flexWrap="wrap"
        flexDirection="row"
        maxWidth={980}
        m={['0 16px', '0 16px', '0 auto']}
        mt={[3, 4, 4]}
        pt={[3, 0, 0]}
      >
        {bookPrices.length ? (
          bookPrices.map((book, i) => <BookPriceCard key={i} {...book} />)
        ) : (
          <Box width={1} p={[0, 2, 3]}>
            <Card boxShadow="medium" bg="lighter" borderRadius={4}>
              {isFetchingBookPrices && !fetchBookPricesDone && (
                <Text textAlign="center" p={3}>
                  <>
                    <Loader
                      width={36}
                      borderLeftColor="primary"
                      position="relative"
                      top={-12}
                      mr={2}
                    />{' '}
                    বই খোঁজা হচ্ছে...
                  </>
                </Text>
              )}
              {(fetchBookPricesDone || fetchBookPricesFailed) &&
                !isFetchingBookPrices && (
                  <Text textAlign="center" p={3}>
                    দেখানোর মতো কিছু নেই
                  </Text>
                )}
            </Card>
          </Box>
        )}
        <Box width={1} p={[0, 2, 3]}>
          <Card borderRadius={4}>
            <Text textAlign="center" p={3} color="lightDark">
              বিঃ দ্রঃ এই প্রজেক্টের সকল কোড উন্মুক্ত এবং সার্চের কোনো তথ্য
              সংগ্রহ বা সংরক্ষণ করা হয় না।
            </Text>
          </Card>
        </Box>
      </Flex>
    </>
  </MainLayout>
);

const mapStateToProps = ({ books }) => ({
  bookPrices: books.prices,
  isFetchingBookPrices: books.isFetchingBookPrices,
  fetchBookPricesDone: books.fetchBookPricesDone,
  fetchBookPricesFailed: books.fetchBookPricesFailed,
});

export default connect(mapStateToProps)(HomePage);
