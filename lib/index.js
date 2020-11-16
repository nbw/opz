const _MIDI = require('./opz.json');

const error = (value) => {
  console.log('[OPZ]: Untracked midi value. Please create an issue https://github.com/nbw/opz/issues');
  console.log(`[OPZ]: ${value}`);
  return value;
}

const get = (...args) => {
  let value = _MIDI;
  for (let i = 0; i < args.length; i++) {
    value = value[args[i]];
    if (!value) throw 'Untracked value';
  }
  return value;
}

const track = (input) => {
  if (input.length < 1) return null;
  return get('track', input[0]);
};

const action = (input) => {
  if (input.length < 1) return null;
  return get('action', input[0]);
};

const note = (input) => {
  if (input.length < 2) return null;
  const n = input[1];
  return {
    value: n,
    note: get('notes', n % 12)
  };
};

const dial = (input) => {
  if (input.length < 2) return null;
  const d = input[1];
  return {
    dial: (d - 1 ) % 4, // 0 - 3
    dialColor: get('dial', 'color', d % 100),
    page: Math.floor((d - 1) / 4), // 0 - 3
    pageColor: get('dial', 'page', track(input), d % 100)
  };
};

const pitch = (input) => {
  if (input.length < 3) return null;
  return {
    absolute: input[1],
    relative: input[2]
  };
}

const value = (input) => {
  if (input.length < 3) return null;

  switch(action(input)) {
    case 'keys':
      return note(input);
    case 'dial':
      return dial(input);
    case 'pitch bend':
      return pitch(input);
    default:
      return {};
  }
};

const velocity = (input) => {
  if (input.length < 3) return -1;
  return input[2];
};

const control = (input) => {
  const c = get('control', input[0]);
  return {
    track: c,
    action: c,
    velocity: velocity(input),
    value: {},
  };
}

const decode = (input) => {
  try {
    if (input.length === 1) return control(input);
    if (input.length === 2) return null;

    return {
      track: track(input),
      action: action(input),
      velocity: velocity(input),
      value: value(input),
    };
  } catch(e) {
    error(input);
  }
};

module.exports = {
  decode,
  velocity,
};
