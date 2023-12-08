/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Text} from '../../components';
import {useCategories, useTheme} from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import {Category, MainParamList, Screens} from '../../types';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

interface CategoriesScreenProps {}

const ListHeaderComponent = () => {
  const {Fonts, Gutters} = useTheme();
  return (
    <View style={Gutters.regularBMargin}>
      <Text style={[Fonts.extraLargeText, Gutters.mediumBMargin]}>
        Wellcome to Nexle Entrance Test
      </Text>
      <Text style={Fonts.regularText}>
        Please select categories what you would like to see on your feed. You
        can set this later on Filter.
      </Text>
    </View>
  );
};

const CategoryItem = ({
  data,
  onPress,
  ...props
}: {data: Category} & TouchableOpacityProps) => {
  const {name} = data;
  const [isSelected, setSelected] = React.useState(false);
  const {Colors, Commons, Layout, Gutters} = useTheme();

  const selectedStyle = {
    backgroundColor: isSelected ? Colors['#647FFF'] : 'transparent',
    borderColor: isSelected
      ? Colors['#647FFF']
      : Colors['rgba(255, 255, 255, 0.12)'],
  };

  const handleItemPress = (event: GestureResponderEvent) => {
    setSelected(prev => !prev);
    onPress && onPress(event);
  };

  return (
    <TouchableOpacity
      onPress={handleItemPress}
      style={[
        Commons.categoryItem,
        Layout.center,
        Gutters.tinyRMargin,
        selectedStyle,
      ]}
      {...props}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const DoneButton = ({onPress, ...props}: TouchableOpacityProps) => {
  const route = useRoute<RouteProp<MainParamList, Screens.Categories>>();

  const {Gutters} = useTheme();

  const onDonePress = (e: GestureResponderEvent) => {
    console.log('submit selecteds: ', route?.params.selecteds || []);
    onPress && onPress(e);
  };

  return (
    <TouchableOpacity
      onPress={onDonePress}
      style={Gutters.mediumRPadding}
      {...props}>
      <Text>Done</Text>
    </TouchableOpacity>
  );
};

const CategoriesScreen = ({}: CategoriesScreenProps) => {
  const navigation =
    useNavigation<NavigationProp<MainParamList, Screens.Categories>>();
  const {Gutters, Images, Commons, Layout} = useTheme();
  const {categories} = useCategories();
  const selectedList = React.useRef<Category[]>([]);
  const [end, setEnd] = React.useState({x: 0, y: 0.7});

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: DoneButton,
    });
  }, []);

  const onItemPress = (category: Category) => {
    const {id} = category;
    if (selectedList.current.some(curSelected => curSelected.id === id)) {
      selectedList.current = selectedList.current.filter(
        curSelected => curSelected.id !== id,
      );
    } else {
      selectedList.current.push(category);
    }
    navigation.setParams({selecteds: selectedList.current});
  };
  const _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      contentOffset: {y},
    } = event.nativeEvent;

    setEnd(prev => {
      // default value for y is 0.7
      const calculatedY = prev.y - (y % 0.7);

      return {
        x: prev.x,
        y: calculatedY > 0.7 ? 0.7 : calculatedY < 0 ? 0 : calculatedY,
      };
    });
  };

  return (
    <ImageBackground style={Layout.fill} source={Images.image2}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={end}
        colors={['transparent', '#000']}>
        <FlatList
          onScroll={_onScroll}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          columnWrapperStyle={[Gutters.tinyBPadding]}
          contentContainerStyle={[
            Commons.paddingTop80p,
            Gutters.mediumHPadding,
          ]}
          ListHeaderComponent={<ListHeaderComponent />}
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CategoryItem data={item} onPress={() => onItemPress(item)} />
          )}
        />
      </LinearGradient>
    </ImageBackground>
  );
};

export default CategoriesScreen;
