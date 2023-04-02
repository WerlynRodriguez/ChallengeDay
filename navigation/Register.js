import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Divider } from '@rneui/base';
import { Image, SocialIcon } from '@rneui/themed';
import InputForm from '../components/InputForm';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

import { fetchRegister } from '../api/fetching';

/** The Register Screen
 * @param {Object} navigation - The navigation object
 * @returns The Register Screen */
export default function Register({ navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm(); // initialise the hook
    const [loading, setLoading] = useState(false); // Loading state [boolean]

    /** On submit function when form is submitted
    * @param {Object} data - The data from the form */
    const onSubmit = data => {
        if (loading) return;

        setLoading(true);
        fetchRegister(data.firstName, data.lastName, data.age)
        .then(response => {
            console.log(response);
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: 'Perfecto',
                text2: 'Registro exitoso',
            });
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
            name="firstName"
            control={control}
            placeholder='Nombre'
            icon={{ type: 'ant-design', name: 'user' }}
            rules={{ 
                required: true,
                pattern: { message: "El nombre de usuario solo puede contener letras", value: /^[A-Za-z]+$/i },
                minLength: { value: 4, message: "El nombre de usuario debe tener al menos 4 caracteres" },
                maxLength: { value: 10, message: "El nombre de usuario no puede tener más de 10 caracteres" }
            }}/>
    
            <InputForm
            name="lastName"
            control={control}
            placeholder='Apellido'
            icon={{ type: 'ant-design', name: 'edit' }}
            rules={{ 
                required: true,
                pattern: { message: "El apellido solo puede contener letras", value: /^[A-Za-z]+$/i },
                minLength: { value: 4, message: "El apellido debe tener al menos 4 caracteres" },
                maxLength: { value: 10, message: "El apellido no puede tener más de 10 caracteres" }
            }}/>

            <InputForm
            name="age"
            keyboardType='numeric'
            control={control}
            placeholder='Edad'
            icon={{ type: 'ant-design', name: 'calendar' }}
            rules={{
                required: true,
                pattern: { message: "La edad solo puede contener números", value: /^[0-9]+$/i },
                minLength: { value: 1, message: "La edad debe tener al menos 1 caracter" },
                maxLength: { value: 2, message: "La edad no puede tener más de 2 caracteres" }
            }}/>
    
            <Button 
            title="Registrarse"
            size='lg'
            containerStyle={styles.containerButton}
            buttonStyle={styles.roundButton}
            loading={loading}
            onPress={handleSubmit(onSubmit)}
            />
    
            <Divider style={{ alignItems: 'center' }}>
                <Text style={{ color: 'grey' }}>O registrate mediante</Text>
            </Divider>
    
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, maxWidth: 200 }}>
                <SocialIcon button type='facebook'/>
                <SocialIcon button type='google'/>
            </View>
    
            <Text >
                ¿Ya tienes una cuenta?
            </Text>
            <Button 
            title="Inicia sesión"
            type="clear"
            containerStyle={{ marginBottom: 20 }}
            onPress={() => navigation.navigate('Login')}
            />
            
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