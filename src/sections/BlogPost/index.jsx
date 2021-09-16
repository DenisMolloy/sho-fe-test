import React from 'react'
import RichText from 'frontend-ui/RichText'
import Banner from 'Components/Banner'
import BlogIntroCard from 'Components/BlogIntroCard'
import Container from 'Components/Container'
import Divider from 'Components/Divider'
import exampleRichText from './exampleRichText'
import './styles.css'

const BlogPost = (blogPost = {}) => {
  console.log("This is blogPost:", blogPost)
  const { heroImage, content }= blogPost
 
  return (
    <Container m={5}>
      <Banner src={heroImage} />
      <BlogIntroCard {...blogPost} />
      <Divider/>
      <RichText source={content || exampleRichText} />
    </Container>
  )
}
export default BlogPost;