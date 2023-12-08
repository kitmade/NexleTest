import {Icons, Colors, Gutters, Layout, Fonts, Commons, Images} from '../theme';

type Output = {
  Colors: typeof Colors;
  Icons: typeof Icons;
  Gutters: typeof Gutters;
  Layout: typeof Layout;
  Fonts: typeof Fonts;
  Commons: typeof Commons;
  Images: typeof Images;
};

const useTheme = (): Output => {
  return {
    Icons,
    Colors,
    Gutters,
    Layout,
    Fonts,
    Commons,
    Images,
  };
};

export default useTheme;
