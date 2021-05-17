import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    Avatar: "",
    Gender: "",
    Name: "",
    Phone: "",
    Email: "",
    Status: "",
    DynamicImg: "",
    isRedirect: false,
  };
  getName = (e) => {
    const Name = e.target.value;
    console.log(Name);
    this.setState({
      Name: Name,
    });
  };
  getEmail = (e) => {
    const Email = e.target.value;
    console.log(Email);
    this.setState({
      Email: Email,
    });
  };
  getPhone = (e) => {
    const Phone = e.target.value;
    console.log(Phone);
    this.setState({
      Phone: Phone,
    });
  };
  getAvatar = (e) => {
    const Avatar = e.target.value;
    console.log(Avatar);
    this.setState({
      Avatar: Avatar,
    });
  };
  getGender = (e) => {
    const Gender = e.target.value;
    console.log(Gender);
    this.setState({
      Gender: Gender,
    });
  };
  getStatus = (e) => {
    const Status = e.target.value;
    console.log(Status);
    this.setState({
      Status: Status,
    });
  };
  sendForm = (e) => {
    e.preventDefault();
    const { Avatar, Gender, Name, Phone, Email, Status } = this.state;
    const { onAddContact } = this.props;
    const newContact = {
      Id: uuidv4(),
      Avatar: Avatar,
      Gender: Gender,
      Name: Name,
      Phone: Phone,
      Email: Email,
      Status: Status,
    };
    this.setState({
      isRedirect: true,
    });
    onAddContact(newContact);
  };
  ShowImage = (e) =>{
    const  Gender = this.state.Gender;  
    const DynamicImg = e.target.value
    this.setState({        
        DynamicImg : `https://randomuser.me/portraits/${Gender}/${DynamicImg}.jpg`,
        Avatar:DynamicImg
    })
  }
  render() {
    const { Avatar, Gender, Name, Phone, Email, Status, isRedirect,DynamicImg } =
      this.state;
    if (isRedirect) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="container">
          <h2 className='mt-3' style={{textAlign:'center',fontSize:'35px'}}>Add new contact</h2>
          <form onSubmit={this.sendForm}>
              <div className='row col-12'>
              <div className='col-6'>
            <div className="form-group">
              <fieldset disabled="">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder={Name}
                  onChange={this.getName}
                  required
                />
              </fieldset>
            </div>

            <div className="form-group">
              <fieldset>
                <label className="form-label mt-4">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder={Email}
                  onChange={this.getEmail}
                  required

                />
              </fieldset>
            </div>

            <div className="form-group">
              <label className="form-label mt-4">Phone</label>
              <input
                type="number"
                placeholder={Phone}
                className="form-control"
                onChange={this.getPhone}
                required

              />
            </div>

            <div className="form-group">
              <label className="form-label mt-4">Status</label>
              <input
                type="text"
                placeholder={Status}
                className="form-control"
                onChange={this.getStatus}
                required

              />
            </div>
            </div>
            <div className='col-5 ShowImage mt-5 ml-5' style={{backgroundImage:`url('${DynamicImg}')`}}></div>
            </div>
            <div>
            <div className="form-group col-12">
              <label className="col-form-label col-form-label-lg mt-4">
                Gender
              </label>
              <select
                className="form-control"
                type="text"
                onClick={this.getGender}
                required

              >
                <option selected disabled></option>
                <option value='men'>Male</option>
                <option value='women'>Female</option>

              </select>
            </div>

            <div className="form-group  col-12">
              <label className="col-form-label mt-4">Avatar</label>
              <input
                type="number"
                min="0"
                max="99"
                className="form-control"
                onChange={(this.getAvatar,this.ShowImage)}
                required

              />
            </div>
            </div>
            <div className="row justify-content-center col-12">
              <button type="submit" className="btn btn-danger col-6 mb-5 mt-4 ">
                Save
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default AddContact;
