import React, { Component } from 'react';
import { Flex, Box, Button } from 'rebass/styled-components';
import { Input } from '@rebass/forms';
import { connect } from 'react-redux';

import { MainLayout } from '../../layouts';
import { Card, Text } from '../../components';
import BookPriceCard from './BookPriceCard';
import { bookActions } from '../../../state/books';

class HomePage extends Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    const { getBookPrices } = this.props;
    getBookPrices({
      title: 'সীরাত বিশ্বকোষ',
      author: 'মাকতাবাতুল আযহার',
    });
  }

  handleIncrease = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrease = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    const {
      bookPrices,
      isFetchingBookPrices,
      fetchBookPricesDone,
    } = this.props;

    return (
      <MainLayout>
        <>
          <Card
            maxWidth={980 - 32}
            m={['0 16px', '0 16px', '0 auto']}
            bg="lighter"
            borderRadius={4}
            boxShadow="medium"
            p={[2, 3, 3]}
          >
            <Flex flexWrap="wrap">
              <Box p={[2, 3, 3]} width={[1, 1 / 2, 1 / 4]}>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="বইয়ের নাম..."
                  bg="white"
                />
              </Box>
              <Box p={[2, 3, 3]} width={[1, 1 / 2, 1 / 4]}>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="লেখক..."
                />
              </Box>
              <Box p={[2, 3, 3]} width={[1, 1 / 2, 1 / 4]}>
                <Input
                  id="publisher"
                  name="publisher"
                  type="text"
                  placeholder="প্রকাশক..."
                />
              </Box>
              <Box p={[2, 3, 3]} width={[1, 1 / 2, 1 / 4]}>
                <Button width="100%" height={45} variant="outline">
                  দাম দেখুন
                </Button>
              </Box>
            </Flex>
          </Card>
          <Flex
            flexWrap="wrap"
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
                  <Text textAlign="center" p={3}>
                    {isFetchingBookPrices && !fetchBookPricesDone
                      ? 'Fetching prices...'
                      : 'Nothing found'}
                  </Text>
                </Card>
              </Box>
            )}
          </Flex>
        </>
      </MainLayout>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  bookPrices: books.prices,
  isFetchingBookPrices: books.isFetchingBookPrices,
  fetchBookPricesDone: books.fetchBookPricesDone,
});

const mapActionsToProps = {
  getBookPrices: bookActions.getBookPrices,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(HomePage);
