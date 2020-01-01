import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirebase } from '../firebase';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: false,
      },
    },
    color: {
      value: '#000000',
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
      color: '#9b0808',
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out',
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  if (loading && !blogPosts.length) {
    getFirebase()
      .database()
      .ref('/posts')
      .orderByChild('dateFormatted')
      .once('value')
      .then(snapshot => {
        let posts = [];

        const snapshotVal = snapshot.val();
        for (let slug in snapshotVal) {
          posts.push(snapshotVal[slug]);
        }

        const newestFirst = posts.reverse();
        setBlogPosts(newestFirst);
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <div className='centerContent'>
        <h1>Loading Posts... </h1>
      </div>
    );
  }

  return (
    <>
      <div className='bg-wrapper'>
        <Particles className='particles-copy' params={particlesOptions} />
      </div>
      <div className='blog'>
        <h1>Blog posts</h1>
        <p>Have a nice stay while reading.</p>
        {blogPosts.map(blogPost => (
          <section key={blogPost.slug} className='card'>
            <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} />
            <div className='card-content'>
              <Link to={`/${blogPost.slug}`}>
                <h2>
                  {blogPost.title} &mdash;{' '}
                  <span style={{ color: '#5e5e5e' }}>
                    {blogPost.datePretty}
                  </span>
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${blogPost.content.substring(0, 250)}...`,
                  }}
                ></p>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Home;
