import React, { Component } from 'react';

// importComponent sera une référence à une fonction !
const asyncComponent = (importComponent) => {
  return class extends Component {
    // La propriété component du state sera set par le component qui sera dynamiquement load par la fonction importComponent
    // Le code qui gère ça est dans componentDidMount
    state = {
      component: null,
    };

    componentDidMount() {
      // On a donc une fonction qui nous retourne une promesse
      importComponent()
        // la promesse n'aura qu'un argument default, qui est le component qu'on a load dynamiquement
        .then((cmp) => {
          this.setState({ component: cmp.default });
        });
    }

    render() {
      // On initialise C à la valeur component du state. Et donc si le state a été mis en place, C sera alors un component.
      const C = this.state.component;
      // Dans le return, si C existe, c'est un component à qui on passe toutes les props de asyncComponent, comme le 
      // ferait un HOC normal (ben oui, asyncComponent retourne une classe avec une méthode render)
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
