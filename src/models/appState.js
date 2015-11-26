import m from 'mithril';

const messages = m.prop([]);

const appState = {
  messages() {
    return messages().slice();
  },
  addMessage(msg) {
    messages().push(msg);
  }
};

export default appState;
