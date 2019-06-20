import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, Button, View} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this._onPressButton = this._onPressButton.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.resetBuilder = this.resetBuilder.bind(this);
    this.orderPlayers = this.orderPlayers.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
  }

  get initialState() {
    return {
      players: [],
      name: '',
      score: ''
    };
  }

  resetBuilder() {
    this.setState(this.initialState);
  }

  _onPressButton() {
    Alert.alert(this.state.score)
  }

  addPlayer() {
    if (this.state.name != '' && this.state.score != '') {
      this.setState({
        players: [ ...this.state.players, {
          'name': this.state.name,
          'score': this.state.score
        }],
        name: '',
        score: '',
      });
      this.refs.name.focus();
    }
  }

  orderPlayers() {
    const {players} = this.state;
    this.setState({
      players: players.sort(function(obj1, obj2) {
        // Ascending: first age less than the previous
        return obj2.score - obj1.score
      })
    })
  }

  nextPlayer() {
    const {players} = this.state;
    let current = players.shift();

    this.setState({ 
      players: [ ...players, current],  
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerGeneral}>
          <Text style={styles.title}>Role a Iniciativa</Text>
        </View>

        <View style={styles.containerPlayers}>
          {this.state.players.map((item, index) => (
            <Text style={[styles.players, index == 0 ? styles.firstPlayer : '']} key={index}>{item.name} - {item.score}</Text>
          ))}
        </View>

        <View style={styles.containerGeneral}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite o nome do jogador"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            ref = 'name'
          />
          <TextInput
            style={styles.textInput}
            placeholder="Digite o dado do jogador"
            onChangeText={(score) => this.setState({score})}
            value={this.state.score}
            keyboardType={'numeric'}
            ref = 'score'
          />
        </View>

        <View style={styles.containerGeneral}>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.addPlayer}
              title="Salvar"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.orderPlayers}
              title="Ordenar"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.resetBuilder}
              title="Limpar"
            />
          </View>
        </View>

        <View style={styles.containerGeneral}>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.nextPlayer}
              title="Próximo Jogador"
            />
          </View>
        </View>

        {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          
          
        </View> */}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerGeneral: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  firstPlayer: {
    backgroundColor: '#0AA980',
    padding: 10,
    fontSize: 20,
  },
  containerPlayers: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  players: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
    borderBottomColor: '#222',
    borderBottomWidth: 2,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: 'gray', 
    borderWidth: 1,
    borderColor: "#000",
  }
});
