import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import Post from './pages/post';
import NoMatch from './pages/no-match';
import Create from './pages/create';
import About from './pages/about';
import Footer from './pages/footer';
import Landing from './pages/landing';

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 140,
//       density: {
//         enable: true,
//         value_area: 800,
//       },
//     },
//   },
// };

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'>
          <h2>Favour Codes</h2>
        </Link>
        <Link to='/blog'>
          <h2>Blog</h2>
        </Link>
      </nav>
      <div>
        <main>
          {/* <Particles className='particles' params={particlesOptions} /> */}
          <Switch>
            <Route path='/create' component={Create} />
            <Route exact path='/blog' component={Home} />
            <Route path='/404' component={NoMatch} />
            <Route path='/:slug' component={Post} />
            <Route path='/about' component={About} />
            <Route exact path='/'>
              <Landing />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
