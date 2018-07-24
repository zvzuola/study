import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/button/Button';

storiesOf('Button', module)
    .add('with text', () => (
        <Button className="u-btn" onClick={action('clicked')}>Hello Button</Button>
    ))
    .add('with some emoji', () => (
        <Button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
    ));