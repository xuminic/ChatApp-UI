import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isRead: boolean;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
        isRead: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      mockBackendResponse();
    }
  };

  const mockBackendResponse = () => {
    const responseMessage: Message = {
      id: messages.length + 2,
      text: `Response to "${inputText}"`,
      isUser: false,
      isRead: false,
    };
    setMessages((prevMessages) => [...prevMessages, responseMessage]);
    setUnreadCount((prevCount) => prevCount + 1);
  };

  const handleReadMessage = (id: number) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, isRead: true } : msg
    );
    setMessages(updatedMessages);
    setUnreadCount((prevCount) => prevCount - 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleReadMessage(item.id)}>
            <View
              style={[
                styles.messageBubble,
                item.isUser ? styles.userBubble : styles.systemBubble,
              ]}
            >
              <Text>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
      <View style={styles.unreadContainer}>
        <Text style={styles.unreadCount}>{unreadCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  systemBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ececec',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  unreadContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


