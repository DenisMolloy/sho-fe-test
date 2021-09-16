import React from 'react'
import RichText from 'frontend-ui/RichText'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import BlogIntroCard from 'Components/BlogIntroCard'
import Container from 'Components/Container'
import Divider from 'Components/Divider'
import exampleRichText from './exampleRichText'
import './styles.css'

const BlogPost = (blogPost = {}) => {
  if(blogPost && Object.keys(blogPost).length === 0) return "No props passed"

  const { heroImage, content } = blogPost

  if(!heroImage) return

  return (
    <Container m={5}>
      <ResponsiveImage src={heroImage} />
      <BlogIntroCard {...blogPost} />
      <Divider/>
      <RichText source={content || exampleRichText} />
    </Container>
  )
}
export default BlogPost;