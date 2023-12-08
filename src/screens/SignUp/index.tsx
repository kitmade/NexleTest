/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {CircleButton, Text, TextInput} from '../../components';
import {useAuth, useTheme} from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import SignUpProvider, {SignUpContext} from './SignUpContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainParamList, Screens} from '../../types';

interface SignUpScreenProps {}

const CheckBoxOverSixteen = () => {
  const {Icons, Layout, Gutters, Fonts} = useTheme();
  const {updateAgeValidation, inputs} = React.useContext(SignUpContext);
  const onPress = () => {
    updateAgeValidation(!inputs.isOverSixteen);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Layout.row, Layout.alignItemsCenter, Gutters.regularBMargin]}>
      {inputs.isOverSixteen ? <Icons.CheckedBox /> : <Icons.CheckBox />}
      <Text style={[Gutters.tinyLMargin, Fonts.regularText]}>
        I am over 16 years of age
      </Text>
    </TouchableOpacity>
  );
};

const SignUpFooter = () => {
  const navigation = useNavigation<NavigationProp<MainParamList>>();

  const {errors, validateInputs} = React.useContext(SignUpContext);
  const {Icons, Layout, Fonts, Gutters} = useTheme();
  const {signUp, isLogin} = useAuth();

  React.useEffect(() => {
    if (isLogin) {
      navigation.navigate(Screens.Categories, {selecteds: []});
    }
  }, [isLogin]);

  const btnDisabled = !!Object.keys(errors).length;

  const onSignUpPress = async () => {
    const value = await validateInputs();
    if (value) {
      signUp(value);
    }
  };

  return (
    <View
      style={[
        Layout.rowBetween,
        Layout.alignItemsCenter,
        Gutters.regularTMargin,
      ]}>
      <Text style={Fonts.mediumText}>Sign Up</Text>
      <CircleButton disabled={btnDisabled} size={54} onPress={onSignUpPress}>
        <Icons.ArrowIcon />
      </CircleButton>
    </View>
  );
};

const PasswordStrength = () => {
  const {inputs, errors} = React.useContext(SignUpContext);
  const {Layout, Colors, Commons, Gutters} = useTheme();

  const validatePassword = (password: string) => {
    let point = 1;
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\|,.<>\\/?~]/g.test(password)) {
      point += 1;
    }
    if (/[0-9]\w+/g.test(password)) {
      point += 1;
    }
    if (/([A-z])\w+/g.test(password)) {
      point += 1;
    }

    if (password.length > 0) {
      return [
        {label: 'Weak', color: '#E05151', point: 1},
        {label: 'Fair', color: '#E3A063', point: 2},
        {label: 'Good', color: '#647FFF', point: 3},
        {label: 'Perfect', color: '#91E2B7', point: 4},
      ][point - 1];
    }
    return {label: '', color: '#647FFF', point: 4};
  };

  const {color, label, point} = validatePassword(inputs.password);
  return (
    <>
      <View style={[Layout.row, Commons.height2]}>
        <View
          style={{
            flex: point,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            flex: 4 - point,
            backgroundColor: Colors['#FFF'],
          }}
        />
      </View>
      <View
        style={[Layout.row, Layout.justifyContentBetween, Gutters.tinyTMargin]}>
        <Text style={[{color: Colors.red}]}>{errors?.password}</Text>
        <Text style={[Layout.textAlignRight, {color: color}]}>{label}</Text>
      </View>
    </>
  );
};

const PasswordInput = () => {
  const {Colors, Commons} = useTheme();
  const {updateInputsField, validateInputs} = React.useContext(SignUpContext);

  const onChangeText = (text: string) => {
    updateInputsField('password', text);
  };

  return (
    <>
      <TextInput
        onBlur={validateInputs}
        onChangeText={onChangeText}
        label="Your Password"
        placeholderTextColor={Colors['rgba(255, 255, 255, 0.5)']}
        style={Commons.noneBorderBottom}
      />
      <PasswordStrength />
    </>
  );
};

const SignUpInputs = () => {
  const {Colors, Gutters} = useTheme();
  const {updateInputsField, errors, validateInputs} =
    React.useContext(SignUpContext);

  return (
    <View style={[Gutters.regularBMargin]}>
      <TextInput
        onBlur={validateInputs}
        onChangeText={text => updateInputsField('email', text)}
        containerStyle={[Gutters.regularBMargin]}
        label="Your Email"
        placeholderTextColor={Colors['rgba(255, 255, 255, 0.5)']}
        errorMsg={errors?.email}
      />
      <PasswordInput />
    </View>
  );
};

const SignUpScreen = ({}: SignUpScreenProps) => {
  const {Colors, Gutters, Fonts, Images, Layout} = useTheme();

  return (
    <SignUpProvider>
      <KeyboardAvoidingView style={Layout.fill} behavior="padding">
        <ImageBackground style={Layout.fill} source={Images.image1}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.7}}
            style={[
              Layout.fill,
              Layout.justifyContentEnd,
              Gutters.mediumHPadding,
            ]}
            colors={['transparent', '#000']}>
            <Text style={[Fonts.extraLargeText, Gutters.regularBMargin]}>
              Let’s get you started!
            </Text>
            <SignUpInputs />
            <CheckBoxOverSixteen />
            <Text style={{color: Colors['rgba(255, 255, 255, 0.5)']}}>
              By clicking Sign Up, you are indicating that you have read and
              agree to the{' '}
              <Text style={{color: Colors['#647FFF']}}>Terms of Service</Text>{' '}
              and <Text style={{color: Colors['#647FFF']}}>Privacy Policy</Text>
            </Text>
            <SignUpFooter />
          </LinearGradient>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SignUpProvider>
  );
};

export default SignUpScreen;
