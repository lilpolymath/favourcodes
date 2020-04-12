import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import Typewriter from 'typewriter-effect';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const NoMatch = () => (
  <>
    <div className='landing-page'>
      <div className='background-wrapper'>
        <Particles className='particles' params={particlesOptions} />
      </div>
      <div className='title'>
        <Typewriter
          options={{
            strings: [`Yikes...`, `No idea how you got here`],
            autoStart: true,
            loop: true,
            wrapperClassName: 'primary-text',
            cursorClassName: 'primary-text',
          }}
        />
        <p className='secondary-text'>
          but there's no place like{` `}
          <Link className='secondary-text' to='/'>
            Home
          </Link>
        </p>
      </div>
    </div>
  </>
);

export default NoMatch;
