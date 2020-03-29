const routes = require('express').Router();
const Mailbox = require('./Mailbox');

const mailboxes = {
  inbox: new Mailbox(require('./data/inbox')),
  outbox: new Mailbox(require('./data/outbox'))
};

routes.get('/:mailbox', (request, response) => {
  const {mailbox} = request.params;
  const result = mailboxes[mailbox];
  if(result) {
    response.status(200).json(result.messages);
  } else {
    response.sendStatus(404);
  }
});

routes.get('/:mailbox/:id', (request, response) => {
  const {mailbox, id} = request.params;
  const result = mailboxes[mailbox].findMessage(id);
  if(result) {
    response.status(200).json(result);
  } else {
    response.sendStatus(404);
  }
});

routes.delete('/:mailbox/:id', (request, response) => {
  const {mailbox, id} = request.params;
  const box = mailboxes[mailbox];
  const message = box.findMessage(id);
  box.deleteMessage(id);
  if(message) {
    response.status(200).json(message);
  } else {
    response.sendStatus(404);
  }
});

routes.post('/:mailbox', (request, response) => {
  const {mailbox} = request.params;
  const {sender, recipient, dateSent, subject, body} = JSON.parse(request.body);
  const message = mailboxes[mailbox].createMessage(sender, recipient, dateSent, subject, body);
  response.status(200).json(message);
});

module.exports = routes;
