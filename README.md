# OPZ.js

Parser for midi received from [teenage engineering's OP-Z sequencer](https://teenage.engineering/products/op-z).

Decodes events from the [Web MIDI API](https://www.w3.org/TR/webmidi/). Also refer to [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)

[TEENAGE ENGINEERING OPZ MIDI DOCS](https://teenage.engineering/guides/op-z/midi)

**Assumes you have an OP-Z.**

![op-z](https://teenage.engineering/_img/5bc066ec1a41630004a9ce50_512.png)

## Table of Contents

* [Examples](#examples)
* [Installation](#installation)
  * [Install with NPM](#install-with-npm)
  * [Install for Browser](#install-for-browser)
* [Documentation](#documentation)
  * [Functions](#functions)
  * [Table of Values](#table-of-values)
    * [Control values](#control-values)
    * [Buttons that do NOT send MIDI](#buttons-that-do-not-send-midi)
* [Usage](#usage)
  * [OP\-Z Setup](#op-z-setup)
  * [Code Examples](#code-examples)
    * [Node Example](#node-example)
    * [Browser Example](#browser-example)
* [Notes](#notes)
  * [Step components](#step-components)
* [Contributions](#contributions)
* [Contact](#contact)
* [Credit](#credit)
* [License](#license)


## Examples

1. [MIDI TETRIS](http://tetris.nathanwillson.com/): (https://github.com/nbw/tetris)

1. [SHAPES](https://github.com/nbw/shapes)


## Installation

### Install with NPM

```
npm install opzjs
```

### Install for Browser

**Option 1:** Download  [opz.js](/opz.js) from dist folder.

```
<script src="[path to opz.js file]><script>
```

**Option 2:** Build distribution.
  1. Clone repo
  2. `npm run build`
  3. Copy new file saved in dist

  Note: run `Make install` if you're missing js-yaml

```
<script src="[path to opz.js file]><script>
```

## Documentation
### Functions

* `decode(data)`: data is an array of integer values (ex. [252], [123, 45, 0], etc.)

Returns an Object.
```
{
  track: ...,
  action: ...,
  velocity: ...,
  value: ...
}
```

* `velocity (data)`: data is an array of integer values (ex. [252], [123,45,0], etc.)

Returns an Integer between 0 to 127.

### Table of Values

| field                     | value                                                                                                        |
|---------------------------|--------------------------------------------------------------------------------------------------------------|
| track                     | kick, snare, perc, sample, bass, lead, arp, chord,  fx1, fx2, tape, master,  perform, module, lights, motion |
| action                    | keys, dial, pitch bend                                                                                       |
| velocity                  | 0-127                                                                                                        |
| value (action=key)        | ``` { value: 101   note: F } ```                                                                             |
| value (action=dial)       | ``` { dial: 0, dialColor: "green", page: 3, pageColor: "yellow" }```                                         |
| value (action=pitch_bend) | ``` { absolute: 0, // 0 - 128   relative: 64, // 0 - 128 } ```                                               |

#### Control values

| field        | value              |
|--------------|--------------------|
| track        | clock, start, stop |
| action       | clock, start, stop |                                                                                       |
| velocity     | -1                 |
| value        | ``` {} ```         |

#### Buttons that do NOT send MIDI

The following buttons do not send midi. However, a number of them can be "inferred" through the context
of the keyboard key or the dials. Example, pressing the kick track button on it's own will not send midi
but pressing a keyboard key while using the kick track will (and then there's enough information to
glean that it was a kick).

* track buttons
* play
* stop
* +/- octave shift
* project, mixer, tempo, screen

#### Dial kill (stop button)

When the OP-Z is playing and the stop key is pressed [a series of midi notes](https://github.com/nbw/opz/issues/1) are sent to quiet the dials. As it's unclear
which page (or color) these messages apply to, they've been labeled as "kill".

Example:
```js
{
  track: "kick",
  action: "dial",
  velocity: 0,
  value: {
    dial: 2
    dialColor: "kill"
    page: 30
    pageColor: "kill"
  }
}
```

## Usage
### OP-Z Setup

1. Plug OP-Z into computer
2. Ensure "MIDI OUT ENABLE" is ON (use the app or refer to teenage engineering docs)

### Code Examples
#### Node Example

The following example uses [justinlatimer's node-midi library](https://github.com/justinlatimer/node-midi). Comments have been removed. Please refer to the docs for more information.

```javascript
const midi = require('midi');
const opz = require('opzjs');

// Set up a new input.
const input = new midi.Input();

// Count the available input ports.
console.log("port count: ", input.getPortCount());

// Get the name of a specified input port.
if (input.getPortCount() > 0){
  console.log(input.getPortName(0));
  // Configure a callback.
  input.on('message', (deltaTime, message) => {
    console.log(`m: ${message} d: ${deltaTime}`);
    console.log(opz.decode(message)); // <--------- OPZ.
    /*
    {
      track: "kick",
      action: "keys",
      velocity: 100,
      value: {
        value: 101,
        note: "F"
      }
    }
    */
  });

  // Open the first available input port.
  input.openPort(0);

  // Close the port when done.
  setTimeout(function() {
    input.closePort();
  }, 100000);
}
```

#### Browser Example

1. Setup/listen for a midi input

The following listens for midi input from ALL input sources. If you want to specifically filter midi from the OP-Z then look into `midiAccess.inputs` or find an example online.

Assumes you've put opz.js in the same folder.

```html
<script src="/opz.js"></script>
<script type="text/javascript">

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
  // midiAccess.data is an array of values [255], [120,0,100], etc.
  const input = OPZ.decode(midiAccess.data)
  /*
    Example:
    input =  {
      track: "kick",
      action: "keys",
      velocity: 100,
      value: {
        value: 101,
        note: "F"
      }
    }
  */
}
</script>
```

## Notes
### Step components

Step components are not sent explicitly as midi notes. Though, for example, in the case of trippling a note (x2 component) three notes are sent.

## Contributions

Contributions or suggestions are welcome.

## Contact

[@nathanwillson](https://twitter.com/nathanwillson)

## Credit

OP-Z photo from teenage engineering's website.

## License

MIT
