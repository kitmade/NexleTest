import * as React from 'react';
import * as yup from 'yup';

interface SignUpContextProps {
  children: React.JSX.Element;
}

type Value = {
  inputs: {email: string; password: string; isOverSixteen: boolean};
  errors: {[key: string]: string};
  updateInputsField: (key: keyof Value['inputs'], text: string) => void;
  updateAgeValidation: (status: boolean) => void;
  validateInputs: () => Promise<
    | {
        email: string;
        password: string;
      }
    | undefined
  >;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(18).required(),
});

export const SignUpContext = React.createContext<Value>({
  inputs: {isOverSixteen: false, email: '', password: ''},
  updateInputsField: () => {},
  updateAgeValidation: () => {},
  validateInputs: () => new Promise(() => undefined),
  errors: {},
});

const SignUpProvider = ({children}: SignUpContextProps) => {
  const [inputs, setInputs] = React.useState<Value['inputs']>({
    email: '',
    password: '',
    isOverSixteen: false,
  });
  const [errors, setErrors] = React.useState({});

  const updateInputsField = (key: keyof Value['inputs'], text: string) => {
    setInputs(prev => ({
      ...prev,
      [key]: text,
    }));
  };

  const updateAgeValidation = (status: boolean) => {
    setInputs(prev => ({
      ...prev,
      isOverSixteen: status,
    }));
  };

  const validateInputs = async () => {
    try {
      const {email, password} = inputs;
      const value = await schema.validate(
        {email, password},
        {abortEarly: false},
      );
      setErrors({});
      return value;
    } catch (e: any) {
      setErrors(
        e.inner.reduce(
          (cur: {[key: string]: string}, {path, message}: any) => ({
            ...cur,
            [path]: message,
          }),
          {},
        ),
      );
    }
  };

  const value = {
    inputs,
    errors,
    updateInputsField,
    updateAgeValidation,
    validateInputs,
  };

  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};

export default SignUpProvider;
