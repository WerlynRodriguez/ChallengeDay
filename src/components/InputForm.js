import { Controller } from "react-hook-form";
import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";

/** The InputForm component for validation
 * @param {{name: string, keyboardType: string, control: Object, rules: Object, placeholder: string, secureTextEntry: boolean, icon: Object}} props - The props
 * @returns The InputForm component
 * @example
 * <InputForm name="username" control={control} rules={{ required: true }} placeholder='Username' secureTextEntry={false} error={errors.username} icon={null}/>
 */
const InputForm = ({
    name,
    keyboardType = "default",
    control,
    rules = {},
    placeholder = '',
    secureTextEntry = false,
    icon = null,
}) => {
    return (
        <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Input
            maxLength={rules?.maxLength?.value}
            keyboardType={keyboardType}
            placeholder={placeholder}
            leftIcon={icon}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            secureTextEntry={secureTextEntry}
            errorMessage={error?.message}
            errorStyle={{ color: 'red' }}
            renderErrorMessage={error ? true : false}
            containerStyle={styles.inputStyle}
            />
        )}
        rules={rules}
        />
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: 'white', 
        borderRadius: 15, 
        marginVertical: 5,
    },
});

export default InputForm;