import Container from 'Components/Container'
import Heading from 'Components/Heading'
import Text from 'Components/Text'
import React from 'react'
import BlogPostPreview from 'Components/BlogPostPreview'
import './styles.css'
import VStack from 'Components/VStack'

const BlogListing = ({ blogPosts }) => {
  if (!blogPosts) return 'null'

  return (
    <Container textAlign="center" p={{ lg: 10, md: 5, base: 2 }}>
      <Heading as="h1" my={2}>
        Kokatat Blog
      </Heading>
      <Text fontStyle="italic">Get inspired for your next adventure...</Text>
      <VStack spacing="10" my="10">
        {blogPosts ? (
          blogPosts.map(blog => <BlogPostPreview key={blog.title} {...blog} />)
        ) : (
          <Text>Writing more blog posts...check back soon!</Text>
        )}
      </VStack>
    </Container>
  )
}

export default BlogListing
