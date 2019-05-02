// components/CreateProfile.js
import React, { Component } from "react";

// import the service file since we need it to send (and get) the data to(from) server
import service from './api/service';

class CreateContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: "",
          lastName: "",
          cellNumber:"",
          imageUrl: "",
          owner: "",
        };
    }
    
    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    // this method handles just the file upload
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("imageUrl", e.target.files[0]);
        
        service.handleUpload(uploadData)
        .then(response => {
            // console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            this.setState({ imageUrl: response.secure_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    // this method submits the form
    handleSubmit = e => {
        e.preventDefault();
        
        service.saveNewContact(this.state)

        .then(res => {
            console.log('added: ', res);
            // here you would redirect to some other page 
            this.setState({firstName: "", lastName: "", cellNumber: "",imageUrl: "",});
        })
        .catch(err => {
            console.log("Error while adding contact: ", err);
        });
    }  
    
    render() {
        return (
          <div>
            <h2>New Contact</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>First Name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    value={ this.state.firstName } 
                    onChange={ e => this.handleChange(e)} />
                <label>Last Name</label>
                <input 
                    type="text" 
                    name="lastName" 
                    value={ this.state.lastName } 
                    onChange={ e => this.handleChange(e)} />
                <label>Cell Number</label>
                <input 
                    type="tel" 
                    name="cellNumber" 
                    value={ this.state.cellNumber } 
                    onChange={ e => this.handleChange(e)} />
                <label>Picture</label>
                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
                <button type="submit">Save new Contact</button>
            </form>
          </div>
        );
    }
}

export default CreateContact;