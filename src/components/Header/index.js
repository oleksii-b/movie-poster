import React, {PureComponent} from 'react';

import header from './header';


export default class Header extends PureComponent {
  render = () => header(this.props)
}
