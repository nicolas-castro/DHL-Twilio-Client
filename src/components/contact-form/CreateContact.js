import React, { Component } from "react";
// import the service file since we need it to send (and get) the data to(from) server
import service from '../api/service';
import FormContactDetails from './FormContactDetails'
import Confirm from "./Confirm";
import { Redirect } from 'react-router-dom';


class CreateContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
          step: 1,
          firstName: "",
          lastName: "",
          cellNumber: "",
          imageUrl: "",
          owner: "",
        };
    }
    
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1,
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => e => {  
        this.setState({[input]: e.target.value});
    }

    handlePhoneChange = input => e => {
        this.setState({[input]: "+1" + e.target.value});
    }

    // this method handles just the file upload
    handleFileUpload = e => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);

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
        // e.preventDefault();
        const { step } = this.state;

        service.saveNewContact(this.state)

        .then(res => {
            console.log('added: ', res);
            // here you would redirect to some other page 
            this.setState({firstName: "", lastName: "", cellNumber: "",imageUrl: "", step: step + 1});
        })
        .catch(err => {
            console.log("Error while adding contact: ", err);
        });
    }  
    
    render() {
        const { step } = this.state;
        const { firstName, lastName, cellNumber, imageUrl, owner } = this.state;
        const values = { firstName, lastName, cellNumber, imageUrl, owner }
        // eslint-disable-next-line default-case
        switch(step){
            case 1: 
                return(
                    <FormContactDetails 
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleFileUpload={this.handleFileUpload}
                        handlePhoneChange={this.handlePhoneChange}
                        values={values}
                    />
            );
            case 2:
                return(
                    <Confirm 
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleFileUpload={this.handleFileUpload}
                        handleSubmit={this.handleSubmit}
                        values={values}
                    />
                )
            case 3:
            return <Redirect to='/contacts'/>
        }
    }
}

export default CreateContact;

