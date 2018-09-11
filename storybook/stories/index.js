import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/button/Button';
import Toast from '../components/toast/Toast';

storiesOf('Button', module)
    .add('with text', () => (
        <Button className="u-btn" onClick={action('clicked')}>Hello Button</Button>
    ))
    .add('with type', () => (
        <Button type='primary' onClick={action('clicked')}>Hello Button</Button>
    ))
    .add('with ghost', () => (
        <div style={{ backgroundColor: '#bec8c8', padding: 10 }}>
            <Button ghost onClick={action('clicked')}>Hello Button</Button>
        </div>
    ))
    .add('with type ghost', () => (
        <Button type='primary' ghost onClick={action('clicked')}>Hello Button</Button>
    ))


storiesOf('Toast', module)
    .add('Toast info', () => (
        <Button className="u-btn" onClick={() => Toast.info('toast info')}>Toast</Button>
    ))
    .add('Toast success', () => (
        <Button className="u-btn" onClick={() => Toast.success('toast success')}>Toast</Button>
    ))
    .add('Toast not close', () => (
        <div>
            <Button className="u-btn" onClick={() => Toast.info('toast not close', 0)}>toast not close</Button>
            <Button className="u-btn" onClick={() => Toast.hide()}>close Toast</Button>
        </div>
    ))
