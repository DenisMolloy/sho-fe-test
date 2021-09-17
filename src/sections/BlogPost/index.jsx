import React from 'react'
import RichText from 'frontend-ui/RichText'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import BlogIntroCard from 'Components/BlogIntroCard'
import Container from 'Components/Container'
import Divider from 'Components/Divider'
import './styles.css'

const BlogPost = (blogPost = {}) => {
  console.log("this is blogPost: ", blogPost)
  if(blogPost && Object.keys(blogPost).length === 0) return "No props passed"

  const { heroImage, content } = blogPost

  if(!heroImage) return null

  return (
    <Container m={5}>
      <ResponsiveImage src={heroImage || ""} />
      <BlogIntroCard {...blogPost} />
      <Divider/>
      <RichText source={content || []} />
    </Container>
  )
}
export default BlogPost;