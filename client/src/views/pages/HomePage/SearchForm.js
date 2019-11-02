import React, { Component } from 'react';
import { Flex, Box, Button } from 'rebass/styled-components';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { Card, Text, InputField, Divider, InlineCard } from '../../components';
import { bookActions } from '../../../state/books';

class SearchFormEnhanced extends Component {
  state = {
    searchedTerm: '',
  };

  componentDidUpdate() {
    const {
      values: { title },
    } = this.props;
    const { searchedTerm } = this.state;
    if (title !== searchedTerm && title) {
      this.setState({ searchedTerm: title });
    }
  }

  render() {
    const {
      values,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
      isFetchingBookPrices,
      fetchBookPricesDone,
      fetchBookPricesFailed,
    } = this.props;

    const { searchedTerm } = this.state;

    return (
      <>
        <Card
          maxWidth={980 - 32}
          m={['0 16px', '0 16px', '0 auto']}
          bg="lighter"
          borderRadius={4}
          boxShadow="medium"
          p={[2, 3, 3]}
        >
          <Form>
            <Flex flexWrap="wrap">
              <Box p={[2, 3, 3]} width={[1, 2 / 3, 3 / 4]}>
                <InputField
                  id="title"
                  name="title"
                  type="text"
                  placeholder="বই, লেখক অথবা প্রকাশকের নাম..."
                  bg="white"
                  onChange={e => {
                    setFieldValue('title', e.target.value);
                  }}
                  onBlur={setFieldTouched}
                  value={values.title}
                />
              </Box>
              <Box p={[2, 3, 3]} width={[1, 1 / 3, 1 / 4]}>
                <Button
                  width="100%"
                  height={45}
                  type="submit"
                  disabled={
                    Object.keys(touched).length && Object.keys(errors).length
                      ? true
                      : false
                  }
                >
                  দাম দেখুন
                </Button>
              </Box>
              {errors.title && (
                <Box pr={[2, 3, 3]} pl={[2, 3, 3]} width={1}>
                  <Divider height="2px" mt={2} mb={2} bg="light" />
                  <Text color="error" variant="caption">
                    {errors.title}
                  </Text>
                </Box>
              )}
            </Flex>
          </Form>
        </Card>

        {searchedTerm &&
          !isFetchingBookPrices &&
          (fetchBookPricesDone || fetchBookPricesFailed) && (
            <Card
              maxWidth={980 - 32}
              m={['0 16px', '0 16px', '0 auto']}
              mt={[4, 4, 4]}
              bg="lighter"
              borderRadius={4}
              boxShadow="medium"
              p={[2, 3, 3]}
            >
              <Box pr={[2, 3, 3]} pl={[2, 3, 3]} width={1}>
                <Text color="lightDark">
                  আপনি <InlineCard color="secondary">{searchedTerm}</InlineCard>{' '}
                  এর দাম জানতে চেয়েছেন
                </Text>
              </Box>
            </Card>
          )}
      </>
    );
  }
}

const SearchForm = withFormik({
  mapPropsToValues: ({ values }) => ({
    title: '',
    author: '',
    publisher: '',
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('বইয়ের টাইটেল অবশ্যই দিতে হবে'),
    author: Yup.string(),
    publisher: Yup.string(),
  }),
  handleSubmit(values, { props, setStatus, resetForm }) {
    let data = { ...values };
    const { getBookPrices } = props;

    getBookPrices(data);
    resetForm({});
  },
})(SearchFormEnhanced);

const mapStateToProps = ({ books }) => ({
  isFetchingBookPrices: books.isFetchingBookPrices,
  fetchBookPricesDone: books.fetchBookPricesDone,
  fetchBookPricesFailed: books.fetchBookPricesFailed,
});

const mapActionsToProps = {
  getBookPrices: bookActions.getBookPrices,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(SearchForm);
