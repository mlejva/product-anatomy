CONST = {} // Create namespace for constants

/* ----- General constants ----- */
CONST.BOOTSTRAP_MAX_WIDTH = 12;
CONST.COLORS_PER_ROW = 2;
CONST.COLORS_PER_ROW_MODAL = 2;

CONST.PLATFORMS = ['website', 'ios', 'macos', 'windows', 'android', 'linux'];

CONST.ENTER_KEY_CODE = 13;

CONST.DIV_CLASS_CONTENT = 'content';
CONST.ERROR_MSG = 'It looks that something went horribly wrong, please DON\'T PANIC, take your towel and reload the page!';

CONST.PAGE_BASE_URL = 'https://product-anatomy.firebaseapp.com/';
/* ---------- */

/* ----- Constants for Product object ----- */
CONST.PROD_OBJ_NAME = 'name';
CONST.PROD_OBJ_URL = 'url';
CONST.PROD_OBJ_DESCRIPTION = 'description';
CONST.PROD_OBJ_LAUNCHED = 'launched';
CONST.PROD_OBJ_PLATFORMS = 'platforms';
CONST.PROD_OBJ_FOUNDERS = 'founders';
CONST.PROD_OBJ_TECH = 'productTech';
CONST.PROD_OBJ_FONTS = 'productFonts';
CONST.PROD_OBJ_COLORS = 'productColors'
/* ---------- */

/* ----- Constants for search ----- */
CONST.SEARCH_FORM_ID = 'search-form';
CONST.SEARCH_RESULTS_ID = 'search-results';
CONST.ANNOUNCEMENT_ID = 'announcement';
CONST.SEARCHBOX_ID = 'searchbox';

CONST.NOTHING_FOUND_TEXT = 'Oops, I guess nothing like this exists. Yet...';
CONST.SEARCH_RESULT_TEXT_SINGULAR = 'Showing anatomy of 1 product.';
CONST.SEARCH_RESULT_TEXT_PLURAL = 'Showing anatomy of <count> products.';
CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE = '<count>';
/* ---------- */


/* ----- Constants for product ----- */
CONST.DIV_CLASS_BOTTOM_BUTTON_WRAPPER = 'bottom-button-wrapper';

CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER = 'logo-wrapper';
CONST.DIV_CLASS_PRODUCT_NAME = 'product-name';
CONST.DIV_CLASS_PRODUCT_URL = 'product-url';
CONST.DIV_CLASS_PRODUCT_DESCRIPTION = 'product-description';
CONST.DIV_CLASS_PRODUCT_PLATFORMS = 'product-platforms';
CONST.DIV_CLASS_PRODUCT_LAUNCHED = 'product-launched';

CONST.DIV_CLASS_PRODUCT_FOUNDERS_WRAPPER = 'product-founders-wrapper';
CONST.DIV_CLASS_PRODUCT_FOUNDERS = 'product-founders';

CONST.DIV_CLASS_PRODUCT_API = 'product-api';

CONST.DIV_CLASS_PRODUCT_PLATFORM_NAME = 'product-platform-name';

CONST.DIV_CLASS_PRODUCT_TECHNOLOGY_WRAPPER = 'product-technology-wrapper';
CONST.DIV_CLASS_PRODUCT_TECHNOLOGY = 'product-technology';

CONST.DIV_CLASS_PRODUCT_FONTS_WRAPPER = 'product-fonts-wrapper';
CONST.DIV_CLASS_PRODUCT_PLATFORM_FONTS = 'product-platform-fonts';

CONST.DIV_CLASS_PRODUCT_COLORS_WRAPPER = 'product-colors-wrapper';
CONST.DIV_CLASS_PRODUCT_PLATFORM_COLORS = 'product-platform-colors';
CONST.DIV_CLASS_PRODUCT_COLOR = 'product-color';
CONST.DIV_CLASS_PRODUCT_COLOR_TEXT = 'product-color-text';

CONST.DIV_CLASS_DELIMITER = 'product-delimiter';

CONST.DIV_COLOR_FOUNDER_TAG = '#d0021b';

CONST.DIV_TEXT_BOTTOM_BUTTON = 'Show anatomy of product';
CONST.DIV_TEXT_PRODUCT_PLATFORMS = 'Platforms ';
CONST.DIV_TEXT_PRODUCT_LAUNCHED = 'Launched ';
CONST.DIV_TEXT_PRODUCT_FOUNDERS = 'Founded by ';
CONST.DIV_TEXT_PRODUCT_API = 'API ';
CONST.DIV_TEXT_PRODUCT_FONTS = 'Fonts ';
/* ---------- */

/* ----- Constants for Algolia ----- */
CONST.ALGOLIA_APP_ID = 'E6GMBD7AHH';
CONST.ALGOLIA_SEARCH_API_KEY = 'b16f75ff361831fb81ba036f782904eb';
CONST.ALGOLIA_INDEX_PRODUCTS = 'products';
/* ---------- */

/* ----- Constants for Firebase ----- */
CONST.CONFIG = {
  apiKey: 'AIzaSyBJf4MX7uWsGQfoleAnoj7T2vg5boS1FUs',
  authDomain: 'product-anatomy.firebaseapp.com',
  databaseURL: 'https://product-anatomy.firebaseio.com',
  storageBucket: 'product-anatomy.appspot.com'
};

CONST.FIREBASE_PRODUCTS_PATH = '/products';

CONST.FIREBASE_PRODUCT_ID = 'objectID';
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
CONST.DIV_CLASS_TAG_ROW = 'tag-row';

CONST.DIV_CLASS_TAG_WRAPPER = 'tag-wrapper';

CONST.DIV_CLASS_TAG = 'tag';
CONST.DIV_CLASS_TAG_GLOBAL = 'tag-global'; // DELETE
CONST.DIV_CLASS_TAG_STATIC = 'tag-static'; // DELETE
CONST.DIV_CLASS_TAG_MODAL = 'tag-modal'; // DELETE


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
