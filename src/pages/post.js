import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getFirebase } from '../firebase';

const Post = ({ match }) => {
  const slug = match.params.slug;

  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();

  if (loading && !currentPost) {
    getFirebase()
      .database()
      .ref()
      .child(`/posts/${slug}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          setCurrentPost(snapshot.val());
        }
        setLoading(false);
      });
  }
  if (loading) {
    return (
      <div className='centerContent'>
        <h1> Loading...</h1>
      </div>
    );
  }

  const postDoesNotExist = !currentPost;
  if (postDoesNotExist) {
    return <Redirect to='/404' />;
  }

  return (
    <>
      <div className='post'>
        <header className='postHeading'>
          <h1 className='postTitle'>{currentPost.title}</h1>
          <em className='postDate'>
            {currentPost.datePretty} by ayobami adedapo
          </em>
          <img
            className='postImage'
            src={currentPost.coverImage}
            alt={currentPost.coverImageAlt}
          />
        </header>
        <div
          className='postContent'
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        ></div>
      </div>
    </>
  );
};

export default Post;
