import React from 'react'
import RichText from 'frontend-ui/RichText'
import BlogIntroCard from 'Components/BlogIntroCard'
import Container from 'Components/Container'
// import './styles.css'

const BlogPost = ({ blogPost }) => {
  console.log('this is blogPost: ', blogPost)
  if (blogPost === null) return null

  const { content } = blogPost || {}

  return (
    <Container>
      <BlogIntroCard {...blogPost} />
      <Container
        width={{
          lg: '65%',
          base: '90%',
        }}
        margin="auto"
      >
        <RichText source={content || []} />
      </Container>
    </Container>
  )
}
export default BlogPost
