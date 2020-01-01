import React, { useState, useEffect } from 'react';
import { getFirebase } from '../firebase';
import marked from 'marked';

const MiddleMan = () => {
  const [notAuth, setNotAuth] = useState(false);

  if (!notAuth) {
    return <Login />;
  } else {
    return <Create />;
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const adminLogin = () => {
    getFirebase()
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        setErrorMessage('Invalid Email or Password.');
      });
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Create />;
  }

  return (
    <div className='centerContent'>
      <h1>Unauthorized User. Please sign in.</h1>
      <form>
        <p className='errorMessage'>{errorMessage}</p>
        <input
          placeholder='Email Address'
          name='email'
          type='email'
          value={email}
          required=''
          className='login'
          onChange={({ target: { value } }) => {
            setEmail(value);
          }}
        />
        <br />
        <input
          className='login'
          placeholder='Password'
          name='password'
          value={password}
          type='password'
          onChange={({ target: { value } }) => {
            setPassword(value);
          }}
        />
      </form>
      <button onClick={adminLogin}>Login</button>
    </div>
  );
};

const generateDate = () => {
  const now = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };

  const year = now.getFullYear();

  let month = now.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let day = now.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return {
    formatted: `${day}-${month}-${year}`,
    pretty: now.toLocaleDateString('en-US', options),
  };
};

const labelStyles = {
  display: 'block',
  marginBottom: 4,
};

const inputStyles = {
  width: '100%',
  height: '2rem',
  lineHeight: '2rem',
  verticalAlign: 'middle',
  fontSize: '1rem',
  marginBottom: '1.5rem',
  padding: '0 0.25rem',
};

const Create = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageAlt, setCoverImageAlt] = useState('');
  const [content, setContent] = useState('');

  const createPost = () => {
    const date = generateDate();
    setContent(marked(content));
    const newPost = {
      title,
      datePretty: date.pretty,
      dateFormatted: date.formatted,
      slug,
      coverImage,
      coverImageAlt,
      content,
    };

    getFirebase()
      .database()
      .ref()
      .child(`posts/${slug}`)
      .set(newPost)
      .then(() => this.props.history.push(`/`))
      .catch(error => alert(error));
  };

  return (
    <>
      <div className='createPost'>
        <h1>Create a new post</h1>
        <section style={{ margin: '2rem 0' }}>
          <label style={labelStyles} htmlFor='title-field'>
            Title
          </label>
          <input
            style={inputStyles}
            id='title-field'
            type='text'
            value={title}
            onChange={({ target: { value } }) => {
              setTitle(value);
            }}
          />

          <label style={labelStyles} htmlFor='slug-field'>
            Slug
          </label>
          <input
            style={inputStyles}
            id='slug-field'
            type='text'
            value={slug}
            onChange={({ target: { value } }) => {
              setSlug(value);
            }}
          />

          <label style={labelStyles} htmlFor='cover-image-field'>
            Cover image
          </label>
          <input
            style={inputStyles}
            id='cover-image-field'
            type='text'
            value={coverImage}
            onChange={({ target: { value } }) => {
              setCoverImage(value);
            }}
          />

          <label style={labelStyles} htmlFor='cover-image-alt-field'>
            Cover image alt
          </label>
          <input
            style={inputStyles}
            id='cover-image-alt-field'
            type='text'
            value={coverImageAlt}
            onChange={({ target: { value } }) => {
              setCoverImageAlt(value);
            }}
          />

          <label style={labelStyles} htmlFor='content-field'>
            Content
          </label>
          <textarea
            style={{ ...inputStyles, height: 200, verticalAlign: 'top' }}
            id='content'
            type='text'
            value={content}
            onChange={({ target: { value } }) => {
              setContent(value);
            }}
          />
          <div
            style={{
              ...inputStyles,
              borderWidth: 2,
              height: 200,
              overflow: 'auto',
              verticalAlign: 'top',
            }}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={createPost}>Create</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default MiddleMan;
