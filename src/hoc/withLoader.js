import React from 'react';
import {Spring} from 'react-spring';


export default function withLoader(Component) {
  return class WithLoader extends React.Component {
    static displayName = `WithLoader(${Component.displayName || Component.name || 'Component'})`;

    state = {
      isLoaderVisible: false
    }

    componentWillMount = () => {
      setTimeout(() => this.showLoader(this), 1000);
    }

    componentWillReceiveProps = () => {
      this.setState({
        isLoaderVisible: false
      });

      setTimeout(() => this.showLoader(this), 1000);
    }

    showLoader = (self) => {
      self.props.isLoading
      &&
        self.setState({
          isLoaderVisible: true
        });
    }

    render = () => {
      return (
        this.props.isLoading
        ?
          <Spring
            from={{
              opacity: 0,
            }}
            to={{
              opacity: 1,
            }}
          >
            {
              () => (
                this.state.isLoaderVisible
                &&
                  <div className='h4 text-center'>
                    Идет загрузка...
                  </div>
              )
            }
          </Spring>
        :
          <Component
            {...this.props}
          />
      );
    }
  };
};
