import { View, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Divider } from '@rneui/base';
import { Image, SocialIcon, Header, Avatar, Text, Card, SpeedDial, Dialog } from '@rneui/themed';
import InputForm from '../../components/InputForm.js';
import { useEffect, useState, useMemo } from 'react';
import Toast from 'react-native-toast-message';
import Pagination from '../../components/Pagination.js';
import { deleteReserva, fetchReservas, updateReserva } from '../../api/fetching.js';

import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../redux/variables/tokenSlice.js';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading.js';

const perPage = 10;

/** The Home for artesano role */
export default function HomeA({navigation}){
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    /** This is the state for the Floating icon */
    const [openDial, setOpenDial] = useState(false);

    /** States for the Dialogs for complete and delete 
     * This is the index of the reserva to be completed or deleted
     * (caused because the FlatList is not a component, so i can't use refs)
     * -1 means no reserva selected */
    const [openConfirm, setOpenConfirm] = useState(-1);
    const [openDelete, setOpenDelete] = useState(-1);

    const [loading, setLoading] = useState(false);
    const [reservas, setReservas] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);

    /** Calculate the total pages and fetch the data */
    const totalPages = useMemo(() => Math.ceil(totalItems / perPage), [totalItems]);

    useEffect(() => {
        const Controller = new AbortController();
        const signal = Controller.signal;

        // Reset state for new fetch (i need to put a loader for async)
        setReservas([]);
        fetchReservas(token, signal, perPage, page*perPage-perPage)
        .then(response => {
            setReservas(response.todos);
            if (response.total !== totalItems) setTotalItems(response.total);
        })
        .catch(error => {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
            });
        })

        // Abort fetch on unmount
        return () => {Controller.abort();}
    }, [page])


    /** This function is called when the user presses the complete button 
     * @param {number} index The index of the reserva to be completed or deleted */
    const onSelectReserva = (index) => {
        if (loading) return;
        if (reservas[index].completed)
            setOpenDelete(index);
        else
            setOpenConfirm(index);
    }

    /** When the dialog complete is confirmed, this function is called
     * @param {number} index The index of the reserva to be completed */
    const completeReserva = (index) => {
        setLoading(true);

        updateReserva(token, reservas[index].id, true)
        .then(response => {
            setReservas((reservas) => {
                reservas[index].completed = true;
                return [...reservas];
            });

            setOpenConfirm(false);
            Toast.show({
                type: 'success',
                text1: 'Éxito',
                text2: 'La reserva ha sido completada',
            });
            setOpenConfirm(-1);
            setOpenDelete(index);
            deleteReserv(index);
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

    /** When the dialog delete is confirmed, this function is called
     * @param {number} index The index of the reserva to be deleted */
    const deleteReserv = (index) => {
        setLoading(true);
        
        deleteReserva(token, reservas[index].id)
        .then(response => {
            setReservas((reservas) => {
                reservas.splice(index, 1);
                return [...reservas];
            });

            setOpenDelete(false);
            Toast.show({
                type: 'success',
                text1: 'Éxito',
                text2: 'La reserva ha sido eliminada',
            });
            setOpenDelete(-1);
            setLoading(false);
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

    return(<>
        <Header
        containerStyle={styles.headerContainer}
        placement='left'
        centerComponent={
            <Text h3 style={{color: 'black', fontWeight:"700"}}>Bienvenido</Text>
        }
        rightComponent={
            <Avatar
            rounded
            source={{ uri: 'https://th.bing.com/th/id/R.affc58c60e815f961ad5f628dd2b13fc?rik=dweX7QZY98mSuw&pid=ImgRaw&r=0' }}
            />
        }/>
        <View style={styles.container}>
            <Pagination
            text="Reservas"
            activePage={page}
            totalPages={totalPages}
            onChange={setPage}/>
        </View>
        <FlatList
        data={reservas}
        numColumns={2}
        contentContainerStyle={{paddingVertical: 20}}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
            <Card containerStyle={{width: '45%', margin: 10}}>
                <Card.Title>{"Reserva " + item.id}</Card.Title>
                <Card.Divider/>
                <Card.Image
                source={{ uri: 'https://th.bing.com/th/id/R.7155cd8426f399b16887ef31b280acfd?rik=RvtPsBdUkJTZFQ&pid=ImgRaw&r=0' }}
                PlaceholderContent={<ActivityIndicator />}/>
                <Text style={{marginBottom: 10}}>
                    {item.todo}
                </Text>
                <Button
                containerStyle={styles.containerButton}
                buttonStyle={styles.roundButton}
                title={item.completed ? "Completada" : "Terminar"}
                onPress={() => onSelectReserva(index)}/>
            </Card>
        )}/>


        <SpeedDial
        isOpen={openDial}
        iconContainerStyle={{backgroundColor: "#2089dc"}}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpenDial(!openDial)}
        onClose={() => setOpenDial(!openDial)}>
            <SpeedDial.Action
            iconContainerStyle={{backgroundColor: 'green'}}
            icon={{ name: 'add', color: '#fff' }}
            title="Añadir"
            onPress={() => {}}/>

            <SpeedDial.Action
            iconContainerStyle={{backgroundColor: '#2089dc'}}
            icon={{ type: 'font-awesome', name: 'eye', color: '#fff' }}
            title="Ver reservas"
            onPress={() => {}}/>
        </SpeedDial>


        <Dialog
        visible={openConfirm !== -1}
        onDismiss={() => setOpenConfirm(-1)}>
            <Dialog.Title title='Completar reserva'/>
            <Text>¿Estas seguro de que quieres completar esta reserva?</Text>

            <Dialog.Actions>
                { loading ? <DialogLoading/> : <>
                    <Button
                    containerStyle={styles.containerButton}
                    buttonStyle={styles.roundButton}
                    title="No, cancelar"
                    onPress={() => setOpenConfirm(-1)}/>
                    <Button
                    containerStyle={styles.containerButton}
                    buttonStyle={{...styles.roundButton, ...styles.dangerButton}}
                    title="Si, completar"
                    onPress={() => completeReserva(openConfirm)}/>
                </>}
            </Dialog.Actions>
        </Dialog>

        <Dialog
        visible={openDelete !== -1}
        onDismiss={() => setOpenDelete(-1)}>
            <Dialog.Title title='Eliminar reserva'/>
            <Text>¿Estas seguro de que quieres eliminar esta reserva?</Text>

            <Dialog.Actions>
                { loading ? <DialogLoading/> : <>
                    <Button
                    containerStyle={styles.containerButton}
                    buttonStyle={styles.roundButton}
                    title="No, cancelar"
                    onPress={() => setOpenDelete(-1)}/>
                    <Button
                    containerStyle={styles.containerButton}
                    buttonStyle={{...styles.roundButton, ...styles.dangerButton}}
                    title="Si, eliminar"
                    onPress={() => deleteReserv(openDelete)}/>
                </>
                }
            </Dialog.Actions>
        </Dialog>
    </>)
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    roundButton: {
        borderRadius: 25,
    },
    dangerButton: {
        backgroundColor: 'red',
    },
    containerButton: {
        width: '100%',
        maxWidth: 600,
        marginVertical: 5,
    },
    headerContainer: {
        backgroundColor: 'white',
        marginBottom: 5,
        width: '100%',
        paddingVertical: 15,
    },
});