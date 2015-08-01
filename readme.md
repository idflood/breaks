# breaks [![Build Status](https://travis-ci.org/idflood/Breaks.svg?branch=master)](https://travis-ci.org/idflood/Breaks)

>


## Install

```
$ npm install --save breaks
```


## Usage

For the best experience the breakpoints defined in Sass/Less/Stylus should be
added as a json string to the `head` font-family like the following.

    head{
      font-family:'{"mobile": "320px","tablet": "768px","desktop": "960px"}';
    }


```js
var isMobile = breaks.is('>=mobile <960px');
// The 'mobile' keyword will be replaced with the corresponding value defined by
// the json array defined in the head font-family.
//
// In this case isMobile will be false or true depending of the following media query:
// (min-width: 320px) and (max-width: 959px)

// There is also the possibility to listen to enter and exit events for the queries:
breaks.enter('>=tablet <desktop', function() {
  console.log('window is bigger or larger than tablet and smaller than desktop.');
});

breaks.exit('>=tablet <desktop', function() {
  console.log('window is smaller than tablet or larger or equal to desktop.');
});

```


## API

### breaks.is(query)

#### query

*Required*
Type: `string`

The simplified query as text.


### breaks.get(breakpoint_name)

#### breakpoint_name

*Required*
Type: `string`

The breakpoint name corresponding to the breakpoints json data.
This returns the breakpoint value as string. ex: "768px"


### breaks.enter(query, callback)

#### query

*Required*
Type: `string`

The simplified query as text.

#### callback

*Required*
Type: `function`
Default: `{}`

The function to call when the query become active.


### breaks.exit(query, callback)

#### query

*Required*
Type: `string`

The simplified query as text.

#### callback

*Required*
Type: `function`
Default: `{}`

The function to call when the query become inactive.


### breaks.remove(callback)

#### callback

*Required*
Type: `function`
Default: `{}`

The callback to remove.


### breaks.on(query, enter_callback, exit_callback)

#### query

*Required*
Type: `string`

The simplified query as text.

#### enter_callback

*Required*
Type: `function`
Default: `{}`

The function to call when the query become active.

#### exit_callback

Type: `function`
Default: `{}`

The function to call when the query become inactive.


## License

MIT © [David Mignot](https://github.com/idflood)
