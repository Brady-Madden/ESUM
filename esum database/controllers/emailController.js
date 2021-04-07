const email = require('../models/email');

const email_index = (req, res) => {
  email.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { email: result, title: 'All emails' });
    })
    .catch(err => {
      console.log(err);
    });
}

const email_details = (req, res) => {
  const id = req.params.id;
  email.findById(id)
    .then(result => {
      res.render('details', { email: result, title: 'email Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'email not found' });
    });
}

const email_create_get = (req, res) => {
  res.render('create', { title: 'Create a new email' });
}

const email_create_post = (req, res) => {
  const newEmail = new email(req.body);
  newEmail.save()
    .then(result => {
      res.redirect('/email');
    })
    .catch(err => {
      console.log(err);
    });
}

const email_delete = (req, res) => {
  const id = req.params.id;
  email.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/email' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  email_index, 
  email_details, 
  email_create_get, 
  email_create_post, 
  email_delete
}