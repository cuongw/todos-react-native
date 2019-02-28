import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import { TodosConsumer } from '../contexts/TodosContext';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      checked: false
    };
  }

  static navigationOptions = {
    headerTitle: 'Edit Todo'
  };

  componentDidMount() {
    const { navigation } = this.props;
    const todo = navigation.getParam('todo');
    this.setState({
      _id: todo._id,
      text: todo.name,
      checked: todo.isCompleted
    });
  }

  onPress() {
    this.setState(state => ({
      checked: !state.checked
    }));
  }

  render() {
    const { checked, text } = this.state;
    return (
      <View style={styles.container}>
        <Input
          name='text'
          value={text}
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          placeholder='Enter your todo...'
          leftIcon={
            <Icon
              name='form'
              size={24}
              color='green'
            />
          }
          leftIconContainerStyle={styles.inputIcon}
          onChangeText={text => this.setState({text})}
        />
        <CheckBox
          title='Active'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='green'
          checked={checked}
          onPress={this.onPress.bind(this)}
          textStyle={styles.checkBox}
        />
        <TodosConsumer>
          {
            ({ onEditTodo }) => {
              const { _id, text: name, checked: isCompleted } = this.state;
              const todo = { _id, name, isCompleted };
              return (
                <Button 
                  containerStyle={styles.button} 
                  title='Save' 
                  titleStyle={{color: 'blue', paddingLeft: 8}} 
                  type='outline' 
                  icon={<Icon name='edit' size={15} color='blue' />}
                  onPress={onEditTodo.bind(this, todo)}
                />
              );
            }
          }
        </TodosConsumer>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    marginBottom: 16
  },
  inputIcon: {
    marginRight: 16
  },
  inputText: {
    fontSize: 24,
    fontWeight: '100',
    color: 'gray'
  },
  checkBox: {
    fontSize: 24,
    fontWeight: '100',
    color: 'gray'
  },
  button: {
    width: 100,
    marginTop: 16,
    marginLeft: 12
  }
});