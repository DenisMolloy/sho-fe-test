import React from 'react'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Container from 'Components/Container'
import Icon from 'Components/Icon'
import Flex from 'Components/Flex'
import Link from 'Components/Link'
import Heading from 'Components/Heading'
import Text from 'Components/Text'
import { ImFacebook2, ImTwitter, ImPinterest, ImPrinter, ImInstagram } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
// import './styles.css'

const blogIntroStyles = {
  container: {
    backgroundColor: 'black',
    color: 'white',
    padding: '30px 50px',
  },
  authorSummaryImage: {
    borderRadius: '50%',
    width: 145,
    marginBottom: 18,
  },
}

const BlogIntroCard = props => {
  if (props && Object.keys(props).length === 0) return null
  const { title, sport, author, authorImage, createdDate, summary, heroImage } = props || {}

  return (
    <Container
      height={{
        lg: 650,
        md: 950,
        base: 1050,
      }}
    >
      <Container
        height="400px"
        width="100vw"
        backgroundImage={`url(${heroImage.src || ''})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      ></Container>
      <Container
        variant="solid"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        margin="auto"
        width={{
          lg: '65%',
          base: '90%',
        }}
        position="relative"
        top="-170px"
        style={blogIntroStyles.container}
      >
        {/* Left Blog Summary */}
        <Container flexBasis={{ lg: '70%', base: '100%' }}>
          <Heading as="h2" mb="1.5rem" textTransform="uppercase">
            {title}
          </Heading>
          <Flex display="inline-flex" width="full" borderY="1px solid white">
            <Text
              color="green"
              fontWeight="bold"
              p="25px"
              pl="0"
              borderRight="1px solid white"
              textTransform="uppercase"
              fontSize="sm"
              _before={{ content: `'+'`, marginRight: '8px', color: 'white' }}
            >
              {sport}
            </Text>
            <Text p="25px" fontSize="sm" fontStyle="italic">
              {createdDate}
            </Text>
          </Flex>
          <Text py="25px">{summary}</Text>
          <Container>
            Share:
            <Flex mt="10px">
              <Icon
                as={ImFacebook2}
                mr="15px"
                size="md"
                cursor="pointer"
                _hover={{ color: 'green' }}
              />
              <Icon
                as={MdEmail}
                mr="15px"
                size="md"
                cursor="pointer"
                _hover={{ color: '#8dc641' }}
              />
              <Icon
                as={ImPrinter}
                mr="15px"
                size="md"
                cursor="pointer"
                _hover={{ color: 'green' }}
              />
              <Icon
                as={ImTwitter}
                mr="15px"
                size="md"
                cursor="pointer"
                _hover={{ color: 'green' }}
              />
              <Icon
                as={ImPinterest}
                mr="15px"
                size="md"
                cursor="pointer"
                _hover={{ color: 'green' }}
              />
            </Flex>
          </Container>
        </Container>
        {/* Right - Author Summary */}
        <Container
          pl={{ lg: '30px', base: '0' }}
          flexBasis={{ lg: '30%', base: '100%' }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          top={{ lg: '-55px', md: '10px', base: '10px' }}
          mt={{ lg: '0px', md: '20px', base: '20px' }}
          mb={{ lg: '0px', md: '20px', base: '20px' }}
        >
          <ResponsiveImage
            src={authorImage.src || ''}
            alt={authorImage.alt || ''}
            width={authorImage.width || 100}
            height={authorImage.height || 100}
            style={blogIntroStyles.authorSummaryImage}
          />
          <Flex justifyContent="center">
            <Text
              color="green"
              fontWeight="bold"
              fontSize="xs"
              mb="18px"
              textTransform="uppercase"
              _before={{
                content: `'by'`,
                marginRight: '2px',
                color: '#97999c',
                fontStyle: 'italic',
                textTransform: 'lowercase',
              }}
            >
              {' '}
              {author}
            </Text>
          </Flex>
          <Link
            href="https://kokatat.com/team/sage-donnelly"
            target="_blank"
            rel="noreferrer noopener"
            mb="25px"
            textTransform="uppercase"
            fontSize="sm"
          >
            Read More
          </Link>
          <Flex width="full" borderY="1px solid white" justifyContent="center" maxWidth="170px">
            <Container p="10px 17px 15px" borderRight="1px solid white">
              <Icon
                as={ImFacebook2}
                size="md"
                color="#97999c"
                cursor="pointer"
                _hover={{ color: '#8dc641' }}
              />
            </Container>
            <Container p="10px 17px 15px" borderRight="1px solid white">
              <Icon
                as={ImTwitter}
                size="md"
                color="#97999c"
                cursor="pointer"
                _hover={{ color: '#8dc641' }}
              />
            </Container>
            <Container p="10px 17px 15px">
              <Icon
                as={ImInstagram}
                size="md"
                color="#97999c"
                cursor="pointer"
                _hover={{ color: '#8dc641' }}
              />
            </Container>
          </Flex>
        </Container>
      </Container>
    </Container>
  )
}
export default BlogIntroCard
