import React, { Fragment, Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom";
import "./index.css";
// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import AddContact from "./Components/AddContact/AddContact"
// API 
import {updateContacts,getAllContacts} from './services/apiservice'
import EditContact from "./Components/EditContact/EditContact";


class App extends Component {


  componentDidMount(){
    getAllContacts().then(data =>{
      console.log(data)
      if(data === null){
        this.setState({
          List: []
        }) 
        }else {
          this.setState({
            List: data
          })
      }
    })
  }

  state = {
    List: [
      
    ],
    CurrentContact: []
  };
  onEdit = (Id) =>{
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const CurrentContact = this.state.List[index]
    
    this.setState({
      CurrentContact: CurrentContact
    })
  }
  onDelete = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const partOne = this.state.List.slice(0, index);
    const partTwo = this.state.List.slice(index + 1);
    const tmpList = [...partOne, ...partTwo];
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList)
  };
  changeStatus = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    if (this.state.List[index].Status === "Family") {
      this.state.List[index].Status = "Work";
      this.setState({
        List: this.state.List,
      });
    } else if (this.state.List[index].Status === "Work") {
      this.state.List[index].Status = "Friends";

      this.setState({
        List: this.state.List,
      });
    } else if (this.state.List[index].Status === "Friends") {
      this.state.List[index].Status = "Family";

      this.setState({
        List: this.state.List,
      });
    }
  };

  onAddContact = (newContact) => {
    let tmpList = this.state.List.slice()
    tmpList.unshift(newContact)
    this.setState({
      List: tmpList
    })
    updateContacts(tmpList)
  }
  render() {
    const { List, CurrentContact } = this.state;

    return (
      <Fragment>

        <Router>
          <Header />
          <Switch>

            <Route path="/" exact render={() => <ContactList ContactList={List} onDelete={this.onDelete} changeStatus={this.changeStatus} EditContact={this.onEdit} />}
            />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />
            <Route path="/add-contact" exact render={() => <AddContact onAddContact={this.onAddContact} />} />
            <Route path="/Edit-contact" exact render={() => <EditContact CurrentContact={CurrentContact} />} />

            <Route component={NotFound} />
          </Switch>

        </Router>
        <Footer />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
{/* onDelete={this.onDelete}
            ContactList={List}
            changeStatus={this.changeStatus} */}