// components/CreateProfile.js
import React, { Component } from "react";

// import the service file since we need it to send (and get) the data to(from) server
import service from '../components/api/service';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          campus: "",
          coarse: "",
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
        
        service.saveNewProfile(this.state)
        .then(res => {
            console.log('added: ', res);
            // here you would redirect to some other page 
        })
        .catch(err => {
            console.log("Error while adding the profile: ", err);
        });
    }  
    
    render() {
        return (
          <div>
            <h2>New Profile</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>Campus</label>
                <input 
                    type="text" 
                    name="campus" 
                    value={ this.state.campus } 
                    onChange={ e => this.handleChange(e)} />
                <label>Coarse</label>
                <textarea 
                    type="text" 
                    name="coarse" 
                    value={ this.state.coarse } 
                    onChange={ e => this.handleChange(e)} />
                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
                <button type="submit">Save new Profile</button>
            </form>
          </div>
        );
    }
}

export default CreateProfile;