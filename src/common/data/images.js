import has from 'lodash/has';
import { isBrowser } from '../utils/windowUtils';

const images = isBrowser() ? {
  logo_black: {
    svg: require("../assets/images/tarino_logo_black.svg"),
    normal: require("../assets/images/tarino_logo_black.png")
  },
  sample_avatar: require("../assets/images/sample_avatar.jpg"),
  avatar: {
    normal: require("../assets/images/avatar.jpg"),
    retina: require("../assets/images/avatar.svg"),
  },
  host: {
    normal: require("../assets/images/host.png"),
    retina: require("../assets/images/host.svg"),
  },
  gift1: require("../assets/images/gift1.png"),
  rocket: require("../assets/images/rocket.svg"),
  wordpress: require("../assets/images/wordpress.svg"),
  drupal: require("../assets/images/drupal.svg"),
  joomla: require("../assets/images/joomla.svg"),
  woocommerce: require("../assets/images/woocommerce.svg"),
  wallet: require("../assets/images/wallet.svg"),
  'credit-card': require("../assets/images/credit-card.svg"),
  safebox: require("../assets/images/safebox.svg"),
  cartToCart: require("../assets/images/cartToCart.svg"),
  'pasargad-bank': require("../assets/images/pasargad-bank.png"),
  'persian-bank': require("../assets/images/persian-bank.svg"),
  'mellat-bank': require("../assets/images/mellat-bank.svg"),
  iran: require("../assets/images/iran.svg"),
  germany: require("../assets/images/germany.svg"),
  dropbox: require("../assets/images/dropbox.svg"),
  'google-drive': require("../assets/images/google-drive.svg"),
  // Bank Cards and Plains
  'mellatCard': {
    normal: require("../assets/images/mellatCard.jpg"),
    retina: require("../assets/images/mellatCard@2x.jpg"),
  },
  'parsianCard': {
    normal: require("../assets/images/parsianCard.jpg"),
    retina: require("../assets/images/parsianCard@2x.jpg"),
  },
  'pasargadCard': {
    normal: require("../assets/images/pasargadCard.jpg"),
    retina: require("../assets/images/pasargadCard@2x.jpg"),
  },
  'mellatPlain': {
    normal: require("../assets/images/mellatPlain.jpg"),
    retina: require("../assets/images/mellatPlain@2x.jpg"),
  },
  'parsianPlain': {
    normal: require("../assets/images/parsianPlain.jpg"),
    retina: require("../assets/images/parsianPlain@2x.jpg"),
  },
  'pasargadPlain': {
    normal: require("../assets/images/pasargadPlain.jpg"),
    retina: require("../assets/images/pasargadPlain@2x.jpg"),
  },
  // Invoice Stamps
  'notPaidStamp': {
    normal: require("../assets/images/notPaidStamp.png"),
    retina: require("../assets/images/notPaidStamp@2x.png"),
  },
  'paidCircularStamp': {
    normal: require("../assets/images/paidCircularStamp.png"),
    retina: require("../assets/images/paidCircularStamp@2x.png"),
  },
  'expiredStamp': {
    normal: require("../assets/images/expiredStamp.png"),
    retina: require("../assets/images/expiredStamp@2x.png"),
  },
  'megaphone': {
    normal: require("../assets/images/megaphone.png"),
    retina: require("../assets/images/megaphone.svg"),
  },
  // Result
  'sad': {
    normal: require("../assets/images/sad.png"),
    retina: require("../assets/images/sad.svg"),
  },
  'achievement': {
    normal: require("../assets/images/achievement.png"),
    retina: require("../assets/images/achievement.svg"),
  },
  // Themes
  'themeBanner': require("../assets/images/themeBanner.png"),
  'shoppingCart': {
    normal: require("../assets/images/shoppingCart.png"),
    retina: require("../assets/images/shoppingCart@2x.svg"),
  },
  'unlimitedSupport': {
    normal: require("../assets/images/unlimitedSupport.png"),
    retina: require("../assets/images/unlimitedSupport.svg"),
  },
  'cancel': {
    normal: require("../assets/images/cancel.png"),
    retina: require("../assets/images/cancel.svg"),
  },
  // Service Progress
  'checked': {
    normal: require("../assets/images/checked.png"),
    retina: require("../assets/images/checked.svg"),
  },
  // Backup
  'dropboxGuide': require("../assets/images/dropboxGuide.jpg"),
  // --
  'locked': require("../assets/images/locked.svg"),
  'calendar': require("../assets/images/calendar.svg"),
  // --
  'layout-demo': require("../assets/images/layout-demo.png"),
  // --
  'newCloud': require("../assets/images/newCloud.svg"),
  'backup-restore': require("../assets/images/backup-restore.svg")
} : {};

export default function getImage(name) {
  if (has(images, name)) {
    return images[name];
  } else {
    return '';
  }
}
