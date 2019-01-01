import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux'
import Singup from '../screens/signup'
import SignIn from '../screens/signin'
import Roote from '../screens/Roote'
import Steps from '../screens/Steps'
import Home from '../screens/home'
import Menu from '../screens/menu'
import Thankyou from '../screens/Thankyou'
import StepDesc from '../screens/stepDescription'
import ForgetPassword from '../screens/ForgetPassword'
import Maps from '../screens/Maps'
import firebase from 'firebase'


class Route extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#fe5960'}} titleStyle={{color: 'white'}}>
        <Scene>
          <Scene key='Home' component={Home} hideNavBar={false} title="Cities"/>
          <Scene key='Signin' component={SignIn} hideNavBar={true} />
          <Scene key='Singup' component={Singup} hideNavBar={true} />
          <Scene key='Thankyou' component={Thankyou} hideNavBar={true} />
          <Scene key='StepDesc' component={StepDesc} hideNavBar={false} title="Steps" tintColor='white'/>
          <Scene key='Home' component={Home} hideNavBar={true} />
          <Scene key='Steps' component={Steps} hideNavBar={false} title="Steps" tintColor='white'/>
          <Scene key='Roote' component={Roote} hideNavBar={false} title="Routes" tintColor='white'/>
          <Scene key='Menu' component={Menu} hideNavBar={true} />
          <Scene key='Maps' component={Maps} hideNavBar={false} title="Maps" tintColor='white'/>
          <Scene key='ForgetPassword' component={ForgetPassword} hideNavBar={true} />
        </Scene>
      </Router>
    )
  }
}

export default Route