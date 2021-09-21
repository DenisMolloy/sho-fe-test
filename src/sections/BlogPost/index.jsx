import React from 'react'
import RichText from 'frontend-ui/RichText'
import BlogIntroCard from 'Components/BlogIntroCard'
import Container from 'Components/Container'
import './styles.css'

const BlogPost = ({ blogPost }) => {
  console.log('this is blogPost: ', blogPost)
  if (blogPost === null) return 'No props passed'

  const { content } = blogPost

  return (
    <Container>
      <BlogIntroCard {...blogPost} />
      <RichText source={content || []} />
    </Container>
  )
}
export default BlogPost
