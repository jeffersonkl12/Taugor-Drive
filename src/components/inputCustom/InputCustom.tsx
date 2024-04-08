import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

interface InputProps {
  type?: "text" | "number" | "email" | "password";
  label?: string;
  value?: string;
  placeholder?: string;
  ref?: React.MutableRefObject<any>;
  error?: string;
  disabled?: boolean;
  secure?: boolean;
  styleContainerInput?: ViewStyle;
  styleInput?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChangeText?: (text: string) => void;
  onChangeBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const InputCustom = ({
  type,
  label,
  value,
  placeholder,
  ref,
  error,
  disabled,
  secure,
  styleContainerInput,
  styleInput,
  leftIcon,
  rightIcon,
  onChangeText,
  onChangeBlur,
}: InputProps) => {
  return (
    <>
      <View style={[styles.container, styleContainerInput]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputContainer}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <TextInput
            style={[
              styles.input,
              styleInput,
              error ? styles.errorInput : undefined,
            ]}
            ref={ref}
          
            keyboardType={type === "number" ? "numeric" : "default"}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            editable={!disabled}
            onBlur={onChangeBlur}
            secureTextEntry={secure}
            underlineColorAndroid={"transparent"}
          />
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    color: "#344054",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#6c757d",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "#344054",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  icon: {
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: "#db4437",
  },
});

export default InputCustom;