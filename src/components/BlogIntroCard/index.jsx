import React from 'react'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import { Box } from '@chakra-ui/react'
import Container from 'Components/Container'
import Flex from 'Components/Flex'
import Link from 'Components/Link'
import Heading from 'Components/Heading'
import Text from 'Components/Text'
import './styles.css'

// color: '#8dc641',

const blogIntroStyles = {
  container: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '30px 50px',
  },
  postSummary: {
    flex: 2,
  },
  authorSummary: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    top: -55,
  },
  authorSummaryImage: {
    borderRadius: '50%',
    width: 145,
    marginBottom: 25,
  },
}

const BlogIntroCard = props => {
  if (props && Object.keys(props).length === 0) return 'No props passed'

  const { title, sport, author, authorImage, createdDate, summary } = props

  return (
    <Container
      className="blog-intro-container"
      variant="solid"
      m={5}
      mt={0}
      style={blogIntroStyles.container}
    >
      <Container style={blogIntroStyles.postSummary}>
        <Heading as="h2" mb="1.5rem" textTransform="uppercase">
          {title}
        </Heading>
        <Flex display="inline-flex" width="full" borderY="1px solid white">
          <Text
            color="#8dc641"
            p="25px"
            pl="0"
            borderRight="1px solid white"
            textTransform="uppercase"
            _before={{ content: `'+'`, marginRight: '8px', color: 'white' }}
          >
            {sport}
          </Text>
          <Text p="25px" fontStyle="italic">
            {createdDate}
          </Text>
        </Flex>
        <Text py="25px">{summary}</Text>
        <Container>Share: [icons]</Container>
      </Container>
      <Container style={blogIntroStyles.authorSummary}>
        <ResponsiveImage src={authorImage} style={blogIntroStyles.authorSummaryImage} />
        <Flex justifyContent="center">
          <Text
            color="#8dc641"
            textTransform="uppercase"
            mb="25px"
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
        <Link href="https://kokatat.com/team/sage-donnelly" target="_blank" mb="25px">
          Read More
        </Link>
        <Flex width="full" borderY="1px solid white">
          Author Icons
        </Flex>
      </Container>
    </Container>
  )
}
export default BlogIntroCard
