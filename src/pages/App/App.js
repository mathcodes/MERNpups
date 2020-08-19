import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import PuppyListPage from '../PuppyListPage/PuppyListPage';
import AddPuppyPage from '../AddPuppyPage/AddPuppyPage';
import EditPuppyPage from '../EditPuppyPage/EditPuppyPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import * as puppyService from '../../utils/puppiesService';
import * as dogAPI from '../../utils/dogApi';
import userService from '../../utils/userService';

class App extends Component {
  state = {
    puppies: [],
    user: userService.getUser(),
    breeds: []
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null }, () => this.props.history.push('/'));
  }

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    }, () => {
      this.getAllPuppies();
    });
  }

  handleAddPuppy = async newPupData => {
    await puppyService.create(newPupData);
    this.getAllPuppies();
  }

  handleDeletePuppy= async id => {
    await puppyService.deleteOne(id);
    this.setState(state => ({
      puppies: state.puppies.filter(p => p._id !== id)
    }), () => this.props.history.push('/'));
  }

  handleUpdatePuppy = async updatedPupData => {
    await puppyService.update(updatedPupData);
    this.getAllPuppies();
  }

  getAllPuppies = async () => {
    const puppies = await puppyService.getAll();
    this.setState({
      puppies
    }, () => this.props.history.push('/'));
  }

  async componentDidMount() {
    const breeds = await dogAPI.getAllBreeds();
    this.setState({
      breeds
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Puppies CRUD
          <nav>
            {userService.getUser() ?
              <>
                {userService.getUser().name ? `WELCOME, ${userService.getUser().name.toUpperCase()}` : ''}
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/'>PUPPIES LIST</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/add'>ADD PUPPY</NavLink>
              </>
              :
              <>
                <NavLink exact to='/signup'>SIGNUP</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/login'>LOGIN</NavLink>
                &nbsp;&nbsp;&nbsp;
              </>
            }
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/signup' render={({ history }) => <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} /> }/>
            <Route exact path='/login' render={({ history }) => <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} /> }/>
            <Route exact path='/' render={({ history }) =>
              userService.getUser() ?
              <PuppyListPage puppies={this.state.puppies} handleDeletePuppy={this.handleDeletePuppy} /> :
              <Redirect to='/login'/>
            } />
            <Route exact path='/add' render={() =>
              userService.getUser() ?
              <AddPuppyPage handleAddPuppy={this.handleAddPuppy} breeds={this.state.breeds} /> :
              <Redirect to='/login'/>
            } />
            <Route exact path='/edit' render={({ history, location }) =>
              userService.getUser() ?
              <EditPuppyPage handleUpdatePuppy={this.handleUpdatePuppy} location={location} breeds={this.state.breeds} /> :
              <Redirect to='/login'/>
            } />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;