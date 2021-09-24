import React from 'react'
import VStack from 'Components/VStack'
import Text from 'Components/Text'
import Container from 'Components/Container'
import Heading from 'Components/Heading'
import Link from 'frontend-link'
import Flex from 'Components/Flex'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'

const blogPreview = {
  authorImage: {
    borderRadius: '50%',
    width: 125,
    marginBottom: 18,
  },
}

export default function BlogPostPreview(props) {
  if (props && Object.keys(props).length === 0) return null
  const { name, title, sport, author, authorImage, createdDate, summary, heroImage } = props || {}

  return (
    <Link href={`/blog/${name}`}>
      <Container>
        <Container
          height="100px"
          width="100%"
          backgroundImage={`url(${heroImage.src || ''})`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        />
        <Container
          display="flex"
          flexDirection={{ lg: 'row', md: 'row', base: 'column-reverse' }}
          width="100%"
          py={{ lg: 2, md: 5, base: 4 }}
          marginTop="0px"
          bgColor="black"
          color="white"
        >
          {/* author card */}
          <Container
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
            top={{ lg: '-45px', md: '10px', base: '10px' }}
          >
            <ResponsiveImage
              src={authorImage.src || ''}
              alt={authorImage.alt || ''}
              width={authorImage.width || 100}
              height={authorImage.height || 100}
              style={blogPreview.authorImage}
            />
            <Text
              color="green.200"
              fontWeight="bold"
              fontSize="xs"
              mb="18px"
              textTransform="uppercase"
              _before={{
                content: `'by'`,
                marginRight: '2px',
                fontWeight: 'normal',
                color: 'gray.300',
                fontStyle: 'italic',
                textTransform: 'lowercase',
              }}
            >
              {' '}
              {author}
            </Text>
          </Container>
          {/* Blog Summary */}
          <Flex flex="2" direction="column" alignItems="flex-start" py={3} flexWrap="wrap">
            <Heading as="h3" textTransform="uppercase" margin={{ lg: 0, md: 0, base: 'auto' }}>
              {title}
            </Heading>
            <Flex display="inline-flex" width="full" borderY="1px solid white">
              <Text
                color="green.200"
                fontWeight="bold"
                p={2}
                pl={{ lg: '0', md: '0', base: '10px' }}
                borderRight="1px solid white"
                textTransform="uppercase"
                fontSize="sm"
                _before={{ content: `'+'`, marginRight: '8px', color: 'white' }}
              >
                {sport}
              </Text>
              <Text p={2} fontSize="sm" fontStyle="italic">
                {createdDate}
              </Text>
            </Flex>
            <Text pt={2} px={{ lg: 0, md: 0, base: 4 }} textAlign="start">
              {summary}
            </Text>
          </Flex>
        </Container>
      </Container>
    </Link>
  )
}
