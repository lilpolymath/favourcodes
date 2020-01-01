import React from 'react';
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

const Landing = () => {
  return (
    <>
      <div className='landing-page'>
        <div className='image-wrapper'>
          <Particles className='particles' params={particlesOptions} />
        </div>
        <div className='title'>
          <Typewriter
            options={{
              strings: [`Hello there`, `My Name is Ayobami Adedapo`],
              autoStart: true,
              loop: true,
              wrapperClassName: 'primary-text',
              cursorClassName: 'primary-text',
            }}
          />
          <h2 className='secondary-text'>
            Freelance Software Developer for react.js, react native and python
          </h2>
        </div>
      </div>
    </>
  );
};

export default Landing;
