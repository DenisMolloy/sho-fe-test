import React from 'react'
import './styles.css'

const BlogPost = (blogPost = {}) => {
  console.log("This is blogPost:", blogPost)
  return (
    <div>
      <h1>This is a blog post</h1>
    </div>
  )
}
export default BlogPost
