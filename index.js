const shellEnv = require('shell-env');
const spawn = require('child_process').spawn;

const env = shellEnv.sync();

const getGreeting = () => {
  const { greeting, greetingArgs } = window.config.getConfig();
  const child = spawn(greeting, greetingArgs, { env });

  return new Promise(
    (resolve, reject) => {
      let stdout = '';
      let stderr = '';
      child.stdout.on('data', data => stdout += data);
      child.stderr.on('data', data => stderr += data);

      child.on('close', () => {
        if (stderr) console.error(stderr);
        resolve(`${stdout.replace(/\n/g, '\n\r')}\n\r`);
      });
    }
  )
};

let newSession = false;
let greetingPromise;
module.exports.middleware = store => next => action => {
  let sessionJustAdded = false;

  if ('SESSION_ADD' === action.type) {
    newSession = true;
    sessionJustAdded = true;
    greetingPromise = getGreeting();
  }

  const uid = store.getState().sessions.activeUid;
  if (newSession && uid && !sessionJustAdded) {
    newSession = false;
    greetingPromise.then(
      data => {
        store.dispatch({
          type: 'SESSION_PTY_DATA',
          uid,
          data,
        });
        next(action);
      }
    );
  } else {
    next(action);
  }
};
