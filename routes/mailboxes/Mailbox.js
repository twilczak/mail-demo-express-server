'use strict';
const uuid = require('node-uuid');
const loremIpsum = require('lorem-ipsum').loremIpsum;
const _ = require('underscore');
const {findWhere, without} = _;

function Mailbox(messages = []){
    this.messages = messages.map(({sender, recipient, dateSent, subject, body}) => createMessage(sender, recipient, dateSent, subject, body));
}

const createMessage = (sender, recipient, date, subject, body = loremIpsum({count:25})) => {
    return {
        id : uuid.v4(),
        sender: sender,
        recipient,
        dateSent: date,
        subject,
        body
    };
};

Mailbox.prototype.createMessage = function(sender, recipient, date, subject, body) {
    const message = createMessage(sender, recipient, date, subject, body);
    this.messages.push(message);
    return message;
};

Mailbox.prototype.deleteMessage = function(id) {
    const message = findWhere(this.messages, {id: id});
    this.messages = without(this.messages, message);
};

Mailbox.prototype.findMessage = function (id) {
    return findWhere(this.messages, {id: id});
};

module.exports = Mailbox;
