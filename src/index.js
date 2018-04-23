import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import Card from "material-ui/Card";
import Fade from "material-ui/transitions/Fade";
import PropTypes from 'prop-types';

import TabContent from "./components/TabContent";
import Login from './Login';
import Register from "./Register";

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexBasis: '25rem',
      flexGrow: 0
    }
  }
});

class LoginRegister extends Component {

  static propTypes = {
    transitionTimeout: PropTypes.number,
    header: PropTypes.element,
    footer: PropTypes.element,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    onLoginWithProvider: PropTypes.func,
    onRegisterWithProvider: PropTypes.func,
    providers: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    transitionTimeout: 1000,
    providers: [
      'facebook',
      'github',
      'twitter'
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      tab: 0
    }
  }

  render() {
    const {
      classes,
      transitionTimeout,
      header,
      footer,
      onLogin,
      onLoginWithProvider,
      onRegister,
      onRegisterWithProvider,
      providers
    } = this.props;

    const {tab} = this.state;

    let activeTab;
    switch (tab) {
      case 0:
        activeTab =
            <TabContent>
              <Login onLogin={onLogin}
                     onLoginWithProvider={onLoginWithProvider}
                     providers={providers}
              />
            </TabContent>;
        break;

      case 1:
        activeTab =
            <TabContent>
              <Register onRegister={onRegister}
                        onRegisterWithProvider={onRegisterWithProvider}
                        providers={providers}
              />
            </TabContent>;
        break;
    }

    return (
        <div className={classes.root}>
          <Card className={classes.card}>

            {header && <div>{header}</div>}

            <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
            >
              <Tab label="Login"/>
              <Tab label="Register"/>
            </Tabs>

            {
              transitionTimeout > 0 ?
                  <Fade key={tab} in={true} timeout={transitionTimeout}>
                    {activeTab}
                  </Fade>
                  : activeTab
            }

            {footer && <div>{footer}</div>}
          </Card>
        </div>
    );
  }

  handleTabChange = (event, value) => {
    this.setState({tab: value});
  }
}

export const PROVIDER_FACEBOOK = 'facebook';
export const PROVIDER_GITHUB = 'github';
export const PROVIDER_TWITTER = 'twitter';

export default withStyles(styles)(LoginRegister);