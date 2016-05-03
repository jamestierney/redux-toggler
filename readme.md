# Redux toggler
A Redux implementation for simple React and React Native toggle animations.

## Installation
```npm install --save redux-toggler```

## Usage
### Step 1
Add the redux-toggler reducer to your reducers. You will only have to do this once, no matter how many times your app uses toggler.

```
import { combineReducers } from 'redux'
import { togglerReducer as toggler } from 'redux-toggler'

export default combineReducers({
  // All your other reducers here
  toggler,
})
```

### Step 2
Decorate your component with toggler(). This will provide your component with props which you can use to animate your components.
```
import React, { Component, TouchableHighlight, View, Text } from 'react-native'
import { toggler } from 'redux-toggler'

const Demo = (props) => {
  const maxHeight = 80
  const height = maxHeight * props.toggler.percent / 100
  return (
    <View style={{top: 20}}>
      <TouchableHighlight onPress={props.toggle}>
        <Text>Toggle</Text>
      </TouchableHighlight>
      <View style={{overflow: 'hidden', backgroundColor:'#bca', height }}>
        <Text>Panel content</Text>
      </View>
    </View>
  )
}
export default toggler('demo')(Demo)
```

Note: the key provided as the first argument to toggler is the unique key for this toggle animation.
You can share the information with other components by using the same key.

## Props available
* toggle() - action to start a toggle animation process. If a toggle action is in progress, it will reverse the direction.
* toggler  - object containing:
    * toggleState - ['OPEN', 'CLOSED', 'OPENING', 'CLOSING']
    * percent - number between 0 and 100 which you can use to create your animations

## Example
```
import React, { Component, TouchableWithoutFeedback, Image, View, Text, StyleSheet } from 'react-native'
import { toggler } from 'redux-toggler'

const demoToggler = toggler('demo')   // partially apply function to 'demo' key

const MAX_HEIGHT = 280

const getHeight = (percent) => MAX_HEIGHT * percent / 100

const getRotation = (percent, state) => {
  const rotation = percent / 100 * 180
  if (state && state == 'CLOSING') return 360 - rotation
  return rotation
}

const ToggleButton = demoToggler((props) => {
  const { percent, toggleState } = props.toggler
  const style = {
    transform: [{rotateZ: getRotation(percent, toggleState) + 'deg'}]
  }
  return (
    <TouchableWithoutFeedback onPress={props.toggle}>
      <Image
        style={[styles.icon, style]}
        source={require('./chevron-down.png')}
      />
    </TouchableWithoutFeedback>
  )
})

const Panel = demoToggler((props) => {
  const { percent } = props.toggler
  const height = getHeight(percent)
  const style = {
    // height,
    opacity: percent / 100,
    top: height - MAX_HEIGHT + 63,
  }
  const paragraphs = [
    "Lorem ipsum dolor sit amet, eam liber euripidis aliquando ei. Nam oratio tollit corrumpit et, justo possim conceptam eu mel, at his debet doming prompta. Id quaeque ornatus ius. Possit officiis nec an, cu natum epicurei gubergren duo. Suscipit adolescens instructior sed id."",
    "Ex cibo numquam per, mea eu decore percipit. Eum soluta option id, rebum lucilius est ex. Eum an possim reprehendunt, est clita gubergren vulputate cu, voluptatibus definitiones sed eu. Duo recteque persequeris id, at his denique omnesque appetere. Pri no saperet persequeris consequuntur. Duo posse platonem dissentiet ei, vim te reque melius conclusionemque."",
  ];
  return (
    <View style={[styles.panel, style]}>
      {paragraphs.map((content, i) => <Text key={i} style={styles.paragraph}>{content}</Text>)}
    </View>
  )
})

const NavBar = (props) => {
  return (
    <View style={styles.container}>
      <Panel />
      <View style={styles.header}>
        <Text style={styles.title}>Demo</Text>
        <View style={styles.buttonContainer}>
          <ToggleButton />
        </View>
      </View>
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 62,
  },

  header: {
    backgroundColor: '#EFEFF2',
    paddingTop: 20,
    top: 0,
    height: 64,
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#0A0A0A',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  icon: {
    margin: 5,
  },

  panel: {
    top: 63,
    backgroundColor: '#bca',
    alignSelf: 'stretch',
    overflow: 'hidden',
  },

  paragraph: {
    padding: 10,
  },

})
```
