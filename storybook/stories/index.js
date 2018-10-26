import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/button/Button';
import Toast from '../components/toast/Toast';
import Modal from '../components/modal/Modal';
import Tabs from '../components/tabs/Tabs';

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

class ModalDemo extends React.Component {
    state = {
        show: false
    }

    render() {
        return (<div>
            <Button onClick={() => this.setState({ show: true })}>show modal</Button>
            <Modal show={this.state.show} maskClick={() => this.setState({ show: false })}>
                <div style={{ padding: 10, backgroundColor: '#fff', borderRadius: '4px' }}>点击遮罩关闭Modal</div>
            </Modal>
        </div>)
    }
}

storiesOf('Modal', module)
    .add('modal', () => (<ModalDemo />))

storiesOf('Tabs', module)
    .add('normal tabs', () => (<Tabs>
        <Tabs.TabPane label='第一项'>第一项内容</Tabs.TabPane>
        <Tabs.TabPane label='第二项'>第二项内容</Tabs.TabPane>
    </Tabs>))