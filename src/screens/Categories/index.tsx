import * as React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import {Text} from '../../components';
import {useCategories, useTheme} from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import {Category, MainParamList, Screens} from '../../types';
import {NavigationProp, useNavigation} from '@react-navigation/native';

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
  const {Colors, Commons, Layout} = useTheme();

  const handleItemPress = (event: GestureResponderEvent) => {
    setSelected(prev => !prev);
    onPress && onPress(event);
  };

  return (
    <TouchableOpacity onPress={handleItemPress} {...props}>
      <LinearGradient
        style={[
          Commons.categoryItem,
          Layout.center,
          isSelected
            ? Commons.selectedCategoryItem
            : Commons.defaultCategoryItem,
        ]}
        colors={
          isSelected
            ? [Colors['8A32A9'], Colors['8A00FF']]
            : ['transparent', 'transparent']
        }>
        <Text>{name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const numColumns = 3;

const CategoriesScreen = ({}: CategoriesScreenProps) => {
  const navigation =
    useNavigation<NavigationProp<MainParamList, Screens.Categories>>();
  const {Gutters, Images, Commons, Layout} = useTheme();
  const {categories} = useCategories({numColumns});
  const selectedList = React.useRef<Category[]>([]);

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

  return (
    <ImageBackground style={Layout.fill} source={Images.image2}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.3}}
          colors={['transparent', '#000']}>
          <FlatList
            nestedScrollEnabled
            scrollEnabled={false}
            numColumns={numColumns}
            columnWrapperStyle={[
              Gutters.tinyBPadding,
              Layout.justifyContentBetween,
            ]}
            contentContainerStyle={[
              Commons.paddingTop80p,
              Gutters.mediumHPadding,
            ]}
            ListHeaderComponent={<ListHeaderComponent />}
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) =>
              typeof item === 'undefined' ? (
                <View style={Commons.categoryItem} />
              ) : (
                <CategoryItem data={item} onPress={() => onItemPress(item)} />
              )
            }
          />
        </LinearGradient>
      </ScrollView>
    </ImageBackground>
  );
};

export default CategoriesScreen;
