import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Divider } from '@rneui/base';
import { Image, SocialIcon } from '@rneui/themed';
import InputForm from '../components/InputForm.js';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

import { fetchLogin } from '../api/fetching';
import { useSelector, useDispatch } from 'react-redux';
import { setAsyncToken, selectToken } from '../redux/variables/tokenSlice.js';

// const jwt = require('jsonwebtoken');

/** The Login Screen
 * @param {Object} navigation - The navigation object
 * @returns The Login Screen */
export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  // const decToken = token ? jwt.decode(token.token) : null;

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      // username: decToken ? decToken.username : '',
    }
  }); // initialise the hook
  const [loading, setLoading] = useState(false); // Loading state [boolean]

  /** On submit function when form is submitted
   * @param {Object} data - The data from the form */
  const onSubmit = data => {
    if (loading) return;

    setLoading(true);
    fetchLogin(data.username, data.password)
    .then(response => {
      Toast.show({
        type: 'success',
        text1: 'Perfecto',
        text2: 'Inicio de sesión exitoso',
      });
      dispatch(setAsyncToken(response.token));
      navigation.replace('HomeA');
    })
    .catch(error => {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    })
  }

  return (
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>

      <Image
      source={{ uri: 'https://th.bing.com/th/id/R.affc58c60e815f961ad5f628dd2b13fc?rik=dweX7QZY98mSuw&pid=ImgRaw&r=0' }}
      style={{ 
        width: 200, 
        height: 200, 
        marginVertical: 20, 
        borderRadius: 25
      }}
      PlaceholderContent={<ActivityIndicator />}
      />

      <InputForm
      name="username"
      control={control}
      placeholder='Usuario'
      icon={{ type: 'ant-design', name: 'user' }}
      rules={{ 
        required: true,
        pattern: { value: /^[A-Za-z0-9]+$/i, message: "El nombre de usuario solo puede contener letras y números" },
        minLength: { value: 4, message: "El nombre de usuario debe tener al menos 4 caracteres" },
        maxLength: { value: 10, message: "El nombre de usuario no puede tener más de 10 caracteres" }
      }}
      />

      <InputForm
      name="password"
      control={control}
      placeholder='Contraseña'
      secureTextEntry={true}
      icon={{ type: 'ant-design', name: 'lock' }}
      rules={{ 
        required: true,
        pattern: { value: /^[A-Za-z0-9]+$/i, message: "La contraseña solo puede contener letras y números" },
        minLength: { value: 4, message: "La contraseña debe tener al menos 4 caracteres" },
        maxLength: { value: 12, message: "La contraseña no puede tener más de 12 caracteres" }
      }}
      />

      <Button 
      title="Iniciar sesión"
      size='lg'
      containerStyle={styles.containerButton}
      buttonStyle={styles.roundButton}
      loading={loading}
      onPress={handleSubmit(onSubmit)}
      />

      <Divider style={{ alignItems: 'center' }}>
        <Text style={{ color: 'grey' }}>O inicia mediante</Text>
      </Divider>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, maxWidth: 200 }}>
        <SocialIcon button type='facebook'/>
        <SocialIcon button type='google'/>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 600, marginBottom: 20 }}>
        <Button title="Recuperar" type="clear" />
        <Button 
        title="Regístrate" 
        type="clear"
        onPress={() => navigation.navigate('Register')}/>
      </View>
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roundButton: {
    borderRadius: 25,
  },
  containerButton: {
    width: '100%',
    maxWidth: 600,
    marginVertical: 20,
  }
});