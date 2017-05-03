import React from 'react';
import 'normalize.css/normalize.css';
import '../src/common/assets/fonts/tpanel/css/tpanel.css';
import '../src/common/styles/storybook.sss';
import getImage from '../src/common/data/images';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import HugeButton from '../src/common/components/HugeButton';
import ThemePrice from '../src/common/components/ThemePrice';
import ThemeInfo from '../src/common/components/ThemeInfo';
import Theme from '../src/common/components/Theme';

storiesOf('Theme', module)
  .add('Full width item', () => (
    <Theme />
  ));

storiesOf('PriceBox', module)
  .add('With price', () => (
    <ThemePrice
      price={69}
      onOrderClick={() => {}} />
  ))
  .add('Free', () => (
    <ThemePrice
      price={0}
      onOrderClick={() => {}} />
  ));

storiesOf('ThemeInfo', module)
  .add('Normal', () => (
    <ThemeInfo 
      browsers={['IE10', 'IE11', 'Edge', 'Firefox', 'Safari', 'Chrome', 'Opera']}
      responsive={true}
      highRes={true}
      useCase="انواع فروشگاه های آنلاین مانند دیجیکالا یا بامیلو و مناسب برای  فروش انوع کالا ها به صورت آنلاین" 
      layoutsCount={8} />
  ));

storiesOf('HugeButton', module)
  .add('With icon', () => (
    <HugeButton iconClass="icon-video">
      افزودن به سفارش
    </HugeButton>
  ))
  .add('With image', () => (
    <HugeButton height="50px" retinaImage={getImage('shoppingCart')}>
      افزودن به سفارش
    </HugeButton>
  ))
  .add('No icon', () => (
    <HugeButton />
  ));
