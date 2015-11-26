import { root, input, button } from './entry.css';

import m from 'mithril';
import appState from '../../models/appState';

function controller() {
  return {
    message: m.prop(''),

    send() {
      const { message } = this;

      if (message()) {
        appState.addMessage(message());
        message('');
      }
    }
  };
}

function view(ctrl) {
  return (
    <div className={root}>
      <input
        className={input}
        autocomplete="off"
        onchange={m.withAttr('value', ctrl.message)}
        value={ctrl.message()}
      />
      <button type="button" className={button} onclick={() => ctrl.send()}>
        Add message
      </button>
    </div>
  );
}

const Entry = { controller, view };

export default Entry;
