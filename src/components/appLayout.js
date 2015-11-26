/* eslint-disable no-unused-vars*/
import m from 'mithril';
/* eslint-enable no-unused-vars*/

import Log from './log/log';
import Entry from './entry/entry';

function controller(attrs) {
  const { messages } = attrs;

  return {
    messages
  };
}

function view(ctrl) {
  return (
    <div>
      <Entry {...ctrl} />
      <Log {...ctrl} />
    </div>
  );
}

const AppLayout = { controller, view };

export default AppLayout;
