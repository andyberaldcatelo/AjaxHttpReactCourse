// Important :Quand on utilise import comme ci-dessous, on informe webpack des dépendances qu'on va utiliser.
// Du coup, il les télécharge toutes tout de suite. Donc le lazy loading ne fonctionne pas avec cette méthode.
// Mais en cas de lazy loading, il faudra quand même que webpack soit au courant de l'existance des dépendances
// à load plus tard, et qu'il réserve du bundle.

import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';

// Comme prévu dans asyncComponent, il faut que son argument soit une fonction !
const AsyncNewPost = asyncComponent(() => {
  // import() permet de lancer l'import seulement lorsque la fonction est exécutée. Et cette fonction ne sera exécutée
  // qu'au moment où on voudra RENDER la constante AsyncNewPost à l'écran. Et où va t'on tiliser cette constante ?
  // Lors du Routing ! Il suffit donc de remplacer NewPost dans la Route par AsyncNewPost.
  // Ainsi, après routing, asyncComponent.js va recevoir le component qu'on a importé pour lui ICI, qui est NewPost.js
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true,
  };

  render() {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to='/posts/'
                  exact
                  activeClassName='my-active'
                  activeStyle={{
                    color: '#fa923f',
                    textDecoration: 'underline',
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    hash: '#submit',
                    search: '?quick-submit=true',
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={()=> <h1>Home</h1>} />
        <Route path="/"  render={()=> <h1>Home2</h1>} /> */}
        <Switch>
          {this.state.auth ? (
            <Route path='/new-post' component={AsyncNewPost} />
          ) : null}
          <Route path='/posts' component={Posts} />
          <Route render={() => <h1>Not Found</h1>} />
          {/* <Redirect from='/' to='/posts' /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
