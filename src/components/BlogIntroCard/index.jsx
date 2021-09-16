import React from 'react'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Container from 'Components/Container'
import Heading from 'Components/Heading'
import Text from 'Components/Text'
import './styles.css'

const BlogIntroCard = (props) => {
  if(props && Object.keys(props).length === 0) return "No props passed"

  const {title, sport, author, authorImage, createdDate, summary} = props

  return (
    <Container 
      className="blog-intro-container"
      variant="solid" 
      m={5}
    >
      <Heading as="h1">
        Title: {title}
      </Heading>
      <Text>Author: {author}</Text>
      <ResponsiveImage src={authorImage} />
      <Text>Created: {createdDate}</Text>
      <Text>Sport: {sport}</Text>
      <Text>Summary: {summary}</Text>
    </Container>
  )
}
export default BlogIntroCard;