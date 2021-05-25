import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import AddContact from "./Components/AddContact/AddContact";
// API
import { updateContacts, getAllContacts } from "./services/apiservice";
import EditContact from "./Components/EditContact/EditContact";

class App extends Component {
  componentDidMount() {
    getAllContacts().then((data) => {
      console.log(data);
      if (data === null) {
        this.setState({
          List: [],
        });
      } else {
        this.setState({
          List: data,
        });
      }
    });
  }

  state = {
    List: [],
    CurrentContact: [],
    findContact: "",
    findProp: "",
  };
  addEditContact = (Id, newContact) => {
    let index = this.state.List.findIndex((elem) => elem.Id === Id);
    let tmpList = this.state.List.slice();
    if (index == 0) {
      tmpList.splice(0, 1, newContact);
    } else {
      tmpList.splice(index, index, newContact);
    }
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList);
  };
  onEdit = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const currentContact = this.state.List[index];
    this.setState({
      CurrentContact: currentContact,
    });
  };
  onDelete = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    const partOne = this.state.List.slice(0, index);
    const partTwo = this.state.List.slice(index + 1);
    const tmpList = [...partOne, ...partTwo];
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList);
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
    let tmpList = this.state.List.slice();
    tmpList.unshift(newContact);
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList);
  };
  searchName = (event) => {
    let searchName = event.target.value;
    this.setState({
      findContact: searchName,
    });
  };
  searchProp = (event) => {
    let searchProp = event.target.value;
    this.setState({
      findProp: searchProp,
    });
  };
  onShowContact = (items, searchValue) => {
    if (searchValue.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return (
        item[`${this.state.findProp}`]
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1
      );
    });
  };

  render() {
    const showContact = this.onShowContact(
      this.state.List,
      this.state.findContact,
      this.state.findProp
    );
    const { CurrentContact } = this.state;
    return (
      <Fragment>
        <Router>
          <Header searchName={this.searchName} searchProp={this.searchProp} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <ContactList
                  ContactList={showContact}
                  onDelete={this.onDelete}
                  changeStatus={this.changeStatus}
                  onEdit={this.onEdit}
                />
              )}
            />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />
            <Route
              path="/add-contact"
              exact
              render={() => <AddContact onAddContact={this.onAddContact} />}
            />
            <Route
              path="/Edit-contact"
              exact
              render={() => (
                <EditContact
                  Contact={CurrentContact}
                  addEditContact={this.addEditContact}
                />
              )}
            />

            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
