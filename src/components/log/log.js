import { root, item } from './log.css';

function controller(attrs) {
  const { messages } = attrs;

  return { messages };
}

function view(ctrl) {
  const { messages } = ctrl;

  return (
    <ul className={root}>
      { messages().map(msg => <li className={item}><span>{msg}</span></li>) }
    </ul>
  );
}

const Log = { controller, view };

export default Log;
