const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '6fe647dacb9a43e9be582502d8718975'});

const handleAPICall = (req, res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('Unable to work with API'));
  }
  
  const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.json('Unable to get entries'));
  }
  
  module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
  }