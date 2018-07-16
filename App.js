/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Dimensions} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = {
      productImages: [],
      fetching: false
    }
  }

  componentDidMount() {
    this.setState({ fetching: true})
    fetch('https://hplussport.com/api/products.php')
      .then(response => response.json())
      .then(products => products.map(product => product.image))
      .then(productImages => this.setState({
        productImages,
        fetching: false
      }))
      .catch(err => console.error('error fetching data', err))
  }

  render() {
    return (
      <ScrollView horizontal={true}>
        <ActivityIndicator size="large"
          style={styles.spinner}
          animating={this.state.fetching} />
          {this.state.productImages.map((uri, i) => (
            <Image style={styles.thumb} key={i} source={{ uri }} />
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  thumb: {
    width: 375,
    resizeMode: 'cover'
  }
});
