CONST = {} // Create namespace for constants

/* ----- General constants ----- */
CONST.BOOTSTRAP_MAX_WIDTH = 12;
CONST.COLORS_PER_ROW = 2;
CONST.COLORS_PER_ROW_MODAL = 2;

CONST.PLATFORMS = ['website', 'ios', 'macos', 'windows', 'android', 'linux'];

CONST.ENTER_KEY_CODE = 13;

CONST.DIV_CLASS_CONTENT = 'content';
CONST.DIV_CLASS_ANNOUNCEMENT = 'announcement';
CONST.ERROR_MSG = 'It looks that something went horribly wrong, please DON\'T PANIC, take your towel and reload the page!';
/* ---------- */

/* ----- Constants for Product object ----- */
CONST.PROD_OBJ_NAME = 'name';
CONST.PROD_OBJ__URL = 'url';
CONST.PROD_OBJ_DESCRIPTION = 'description';
CONST.PROD_OBJ_LAUNCHED = 'launched';
CONST.PROD_OBJ_PLATFORMS = 'platforms';
CONST.PROD_OBJ_FOUNDERS = 'founders';
CONST.PROD_OBJ_TECH = 'productTech';
CONST.PROD_OBJ_FONTS = 'productFonts';
CONST.PROD_OBJ_COLORS = 'productColors'
/* ---------- */

/* ----- Constants for search ----- */
CONST.SEARCHBOX_ID = 'searchbox';

CONST.DIV_CLASS_SEARCH_RESULTS = 'search-results';

CONST.NOTHING_FOUND_TEXT = 'Oops, I guess nothing like this exists. Yet...';
CONST.SEARCH_RESULT_TEXT_SINGULAR = 'Showing anatomy of 1 product.';
CONST.SEARCH_RESULT_TEXT_PLURAL = 'Showing anatomy of <count> products.';
CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE = '<count>';
/* ---------- */

/* ----- Constants for static product card ----- */
CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER = 'logo-img-wrapper';
CONST.DIV_CLASS_PRODUCT_LOGO = 'logo-img';

CONST.DIV_CLASS_PRODUCT_NAME = 'product-name';
CONST.DIV_TEXT_PRODUCT_NAME =  'Name ';

CONST.DIV_CLASS_PRODUCT_URL = 'product-url';

CONST.DIV_CLASS_PRODUCT_DESCRIPTION = 'product-description';

CONST.DIV_CLASS_PRODUCT_PLATFORMS = 'product-platforms';
CONST.DIV_TEXT_PRODUCT_PLATFORMS = 'Platforms ';

CONST.DIV_CLASS_PRODUCT_FOUNDERS = 'product-founders';
CONST.DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER = 'founders-names-wrapper';
CONST.DIV_TEXT_PRODUCT_FOUNDERS = 'Founded by ';

CONST.DIV_CLASS_BOTTOM_BUTTON_WRAPPER = 'bottom-button-wrapper';
CONST.DIV_CLASS_BOTTOM_BUTTON = 'bottom-button';
CONST.BOTTOM_BUTTON_TEXT = 'Show anatomy of product';
/* ---------- */

/* ----- Constant for modal product card ----- */
CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER_MODAL = 'logo-img-wrapper-modal';
CONST.DIV_CLASS_PRODUCT_LOGO_MODAL = 'logo-img-modal';

CONST.DIV_CLASS_PRODUCT_NAME_MODAL = 'product-name-modal';
CONST.DIV_TEXT_PRODUCT_NAME_MODAL = 'Name ';

CONST.DIV_CLASS_PRODUCT_URL_MODAL = 'product-url-modal';

CONST.DIV_CLASS_PRODUCT_DESCRIPTION_MODAL = 'product-description-modal';

CONST.DIV_CLASS_PRODUCT_LAUNCHED = 'product-launched';
CONST.DIV_TEXT_PRODUCT_LAUNCHED = 'Launched ';

CONST.DIV_CLASS_PRODUCT_PLATFORMS_MODAL = 'product-platforms-modal';
CONST.DIV_TEXT_PRODUCT_PLATFORMS_MODAL = 'Platforms ';

CONST.DIV_CLASS_PRODUCT_FOUNDERS_WRAPPER_MODAL = 'product-founders-wrapper-modal';
CONST.DIV_CLASS_PRODUCT_FOUNDERS_NAMES_MODAL = 'product-founders-names-modal';
CONST.DIV_TEXT_PRODUCT_FOUNDERS_MODAL = 'Founded by ';
CONST.FOUNDER_TAG_COLOR = '#d0021b';

CONST.DIV_CLASS_PRODUCT_API_MODAL = 'product-api-modal';
CONST.DIV_TEXT_PRODUCT_API_MODAL = 'API ';

CONST.DIV_CLASS_TECHNOLOGY_DELIMITER_MODAL = 'product-technology-delimiter-modal';

CONST.DIV_CLASS_PRODUCT_TECHNOLOGY_WRAPPER_MODAL = 'product-technology-wrapper';
CONST.DIV_CLASS_PRODUCT_TECHNOLOGY_NAME_MODAL = 'product-technology-name';
CONST.DIV_CLASS_PRODUCT_SUBTECHNOLOGY_MODAL = 'product-subtechnology';

CONST.DIV_CLASS_DESIGN_DELIMITER_MODAL = 'product-design-delimiter-modal';

CONST.DIV_CLASS_PRODUCT_FONTS_WRAPPER_MODAL = 'product-fonts-wrapper-modal';
CONST.DIV_CLASS_PRODUCT_PLATFORM_FONTS_NAME_MODAL = 'product-platform-fonts-name-modal';
CONST.DIV_CLASS_PRODUCT_PLATFORMS_FONTS_MODAL = 'product-platforms-fonts-modal';
CONST.DIV_CLASS_PRODUCT_FONTS_MODAL = 'product-fonts-modal';
CONST.DIV_TEXT_PRODUCT_FONTS_MODAL = 'Fonts ';

CONST.DIV_CLASS_PRODUCT_COLORS_WRAPPER_MODAL = 'product-colors-wrapper-modal';
CONST.DIV_CLASS_PRODUCT_PLATFORM_COLORS_NAME_MODAL = 'product-platform-colors-name-modal';
CONST.DIV_CLASS_PRODUCT_PLATFORM_COLORS_MODAL = 'product-platform-colors-modal';
CONST.DIV_CLASS_PRODUCT_COLOR_MODAL = 'product-color-modal';
CONST.DIV_CLASS_PRODUCT_COLOR_TEXT_MODAL = 'product-color-text-modal';
/* ---------- */

/* ----- Constants for Firebase ----- */
CONST.CONFIG = {
  apiKey: 'AIzaSyBJf4MX7uWsGQfoleAnoj7T2vg5boS1FUs',
  authDomain: 'product-anatomy.firebaseapp.com',
  databaseURL: 'https://product-anatomy.firebaseio.com',
  storageBucket: 'product-anatomy.appspot.com'
};

CONST.FIREBASE_PRODUCTS_PATH = '/products';

CONST.FIREBASE_PRODUCT_ID = 'id';
CONST.FIREBASE_PRODUCT_NAME = 'name';
CONST.FIREBASE_PRODUCT_PLATFORMS = 'platforms';
CONST.FIREBASE_PRODUCT_FONTS = 'fonts';
CONST.FIREBASE_PRODUCT_COLORS = 'colors';
CONST.FIREBASE_PRODUCT_URL = 'url';
CONST.FIREBASE_PRODUCT_DESCRIPTION = 'description';
CONST.FIREBASE_PRODUCT_LAUNCHED = 'launched';
CONST.FIREBASE_PRODUCT_FOUNDERS = 'founders';
CONST.FIREBASE_PRODUCT_FOUNDERS_TWITTER = 'founders-twitter';
CONST.FIREBASE_PRODUCT_API = 'api';
CONST.FIREBASE_PRODUCT_TECHNOLOGY = 'technology';
CONST.FIREBASE_PRODUCT_LOGO_URL = 'logo-url';
CONST.FIREBASE_PRODUCT_TWITTER_USERNAME = 'twitter-username';
/* ---------- */

/* ----- Constants for Twitter ----- */
CONST.TWITTER_BASE_ADDRESS = 'https =//www.twitter.com/';
/* ---------- */

/* ----- Constants for tags ----- */
CONST.DIV_CLASS_TAG_WRAPPER = 'tag-wrapper';

CONST.DIV_CLASS_TAG = 'tag';

CONST.DIV_CLASS_TAG_GLOBAL = 'tag-global';
CONST.DIV_CLASS_TAG_ROW = 'tag-row';

CONST.DIV_CLASS_TAG_STATIC = 'tag-static';

CONST.DIV_CLASS_TAG_MODAL = 'tag-modal';

//CONST.DIV_CLASS_TAG_ADDED = 'tag-added';

CONST.TAG_COLORS = ['orange', 'goldenrod', 'purple', 'blue', 'brown', '#0000CD', '#5F9EA0', '#808000', '#D2691E', 'red'];
CONST.PLATFORM_TAG_COLORS = {
  website: '#ff7473',
  ios: '#ffc952',
  macos: '#47b8e0',
  windows: '#58c9b9',
  android: '#d1b6e1',
  linux: '#ce6d39'
};

CONST.GLOBAL_TAGS = ['Android', 'iOS', 'Linux', 'macOS', 'Website', 'Windows'];
/* ---------- */
