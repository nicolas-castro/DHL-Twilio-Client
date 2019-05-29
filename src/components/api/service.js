import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewContact(newContact) {
    console.log('new contact is: ', newContact)
    return service.post('/contacts/create', newContact, {withCredentials:true})
      .then(res => res.data)
      .catch(errorHandler);
  },

  sendSMS (newSMS) {
    console.log('new SMS is: ', newSMS);
    return service.post('/sms/out', newSMS, {withCredentials:true})
      .then(res => res.data)
      .catch(errorHandler);
  }

  
}

