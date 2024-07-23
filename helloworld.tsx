import { AppRegistry, Text, View, Button } from 'react-native';
import React from 'react';

const HelloWorldApp = () => {
  const [count, setCount] = React.useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <View>
      <Text>Hello world!</Text>
      <Text>{count}</Text>
      <Button onPress={incrementCount} title="Increase Count" />
    </View>
  );
};

export default HelloWorldApp;

AppRegistry.registerComponent('HelloWorld', () => HelloWorldApp);
