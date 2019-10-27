import React, { Component } from "react";
import { Flex, Box, Button } from "rebass/styled-components";
import { Input } from "@rebass/forms";
import { Image, Menu, Card, Text, Divider, InlineCard } from "../components";
import logo from "../assets/images/logo-outlined.svg";

class HomePage extends Component {
  state = {
    count: 0
  };

  handleIncrease = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrease = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <>
        <Box bg="primary" height={60} mb={[3, 3, 4]}>
          <Box width={1} maxWidth={980} pr={3} pl={3} m="0 auto">
            <Flex flexWrap="wrap">
              <Box width={1 / 2}>
                <a href="/">
                  <Image width={40} mt={10} src={logo} alt="Damjanun" />
                </a>
              </Box>
              <Box width={1 / 2}>
                <Menu>
                  <li>
                    <a href="/">About</a>
                  </li>
                  <li>
                    <a href="/">GitHub</a>
                  </li>
                  <li>
                    <a href="/">Hello</a>
                  </li>
                  <li>
                    <a href="/">C</a>
                  </li>
                </Menu>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Card
          maxWidth={980 - 32}
          m={["0 16px", "0 16px", "0 auto"]}
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
          m={["0 16px", "0 16px", "0 auto"]}
          mt={[3, 4, 4]}
          pt={[3, 0, 0]}
        >
          <Box p={[0, 2, 3]} pb={[4, 4, 0]} width={[1, 1 / 2, 1 / 3]}>
            <Card
              bg="lighter"
              boxShadow="medium"
              borderRadius={4}
              p={[3, 3, 4]}
              position="relative"
            >
              <InlineCard
                display="inline-block"
                borderRadius={4}
                p={"4px 12px"}
                position="absolute"
                top={-20}
                bg="lighter"
                boxShadow="mediumTop"
              >
                <Text color="lightDark" textAlign="center">
                  রকমারি.কম
                </Text>
              </InlineCard>
              <a href="/">
                <Text variant="h5" color="primary">
                  ওয়াসওয়াসা : শয়তানের কুমন্ত্রণা
                </Text>
              </a>
              <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
              <Text color="lightDark">
                আল্লামা হাফিয ইবনুল কায়্যিম আল জাওযী
              </Text>
              <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
              <Text color="lightDark">মূল্যঃ ৳১৩৪</Text>
            </Card>
          </Box>
          <Box p={[0, 2, 3]} pb={[4, 4, 0]} width={[1, 1 / 2, 1 / 3]}>
            <Card
              bg="lighter"
              boxShadow="medium"
              borderRadius={4}
              p={[3, 3, 4]}
              position="relative"
            >
              <InlineCard
                display="inline-block"
                borderRadius={4}
                p={"4px 12px"}
                position="absolute"
                top={-20}
                bg="lighter"
                boxShadow="mediumTop"
              >
                <Text color="lightDark" textAlign="center">
                  ওয়াফিলাইফ.কম
                </Text>
              </InlineCard>
              <a href="/">
                <Text variant="h5" color="primary">
                  ওয়াসওয়াসা : শয়তানের কুমন্ত্রণা
                </Text>
              </a>
              <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
              <Text color="lightDark">
                আল্লামা হাফিয ইবনুল কায়্যিম আল জাওযী
              </Text>
              <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
              <Text color="lightDark">মূল্যঃ ৳১৩৪</Text>
            </Card>
          </Box>
          <Box p={[0, 2, 3]} pb={[4, 4, 0]} width={[1, 1 / 2, 1 / 3]}>
            <Card
              bg="lighter"
              boxShadow="medium"
              borderRadius={4}
              p={[3, 3, 4]}
              position="relative"
            >
              <InlineCard
                display="inline-block"
                borderRadius={4}
                p={"4px 12px"}
                position="absolute"
                top={-20}
                bg="lighter"
                boxShadow="mediumTop"
              >
                <Text color="lightDark" textAlign="center">
                  নিয়ামাহসপ.কম
                </Text>
              </InlineCard>
              <a href="/">
                <Text variant="h5" color="primary">
                  ওয়াসওয়াসা : শয়তানের কুমন্ত্রণা
                </Text>
              </a>
              <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
              <Text color="lightDark">
                আল্লামা হাফিয ইবনুল কায়্যিম আল জাওযী
              </Text>
              <Divider height="2px" mt={2} mb={2} bg="light"></Divider>
              <Text color="lightDark">মূল্যঃ ৳১৩৪</Text>
            </Card>
          </Box>
        </Flex>
      </>
    );
  }
}

export default HomePage;
