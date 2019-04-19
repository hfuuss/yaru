import React, { Component } from 'react'
import { Layout, Menu, Icon, Modal,Carousel,Form,Input,Button} from 'antd';
import { connect } from 'dva'
import styles from './index.css';

const { Header, Footer, Content } = Layout;

class BasicLayout extends Component {
constructor(props) {
  super(props);
  this.state = {
    visible: false,
    loveVisible: false
  }
}

showModal = () => {
  this.setState({
    visible: true,
  });
}

handelInputChange =  (k,v) => {
  this.setState({
    [k]:v
  })
}
handleOk = (e) => {
  const {dispatch} = this.props
  dispatch({
    type: 'config/chageConfigKey',
    payload: {
      accessKey: 'a',
      secretKey: 'b',
      bucket: 'd',
      host:'d',
    }
  })
  this.setState({
    visible: false,
  });
}

handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
  });
}


render () {
  const { getFieldDecorator } = this.props.form
  const {dispatch} = this.props
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

    return (
      <div className={styles.normal}>
       <Layout className="layout">
        <Header>
          <div 
            className={styles.logo} 
            onClick={ () => window.location.reload()}
          >小小图床</div>
          <div className={styles.love} 
             onClick={ () => this.handelInputChange('loveVisible',true)}
          >
            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
          </div>
          <div className={styles.setting} 
             onClick={ () => this.handelInputChange('visible',true)}
          >
            <Icon type="setting" />
          </div>
          <Menu
            onClick={ e => {
              
              dispatch({
                type: 'menu/chageMenukey',
                payload: e.key
              });
            }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">首页</Menu.Item>
            <Menu.Item key="myupload">我的上传</Menu.Item>
            <Menu.Item key="#">Chrome插件</Menu.Item>
          </Menu>
          
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ margin: '16px 0' }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 780 }}>
            {this.props.children}
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          小小图床 ©2018 Created by 九月大人
        </Footer>
      </Layout>
      <Modal
        title="修改配置"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={() => this.handelInputChange('visible',false)}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item 
            label="userName"
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item
            label="password"
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">登陆</Button>
          </Form.Item>
        
        </Form>
      </Modal>
      <Modal
        title="小小小仙女"
        visible={this.state.loveVisible}
        onOk={this.handleOk}
        onCancel={() => this.handelInputChange('loveVisible',false)}
      >
      <Carousel autoplay>
        <img alt={''} src={"http://images.hfuusec.cn/18-12-28/52902299.jpg"}  />
        <img alt={''} src={"http://images.hfuusec.cn/18-12-28/61565077.jpg"}  />
        <img alt={''} src={"http://images.hfuusec.cn/18-12-28/26270668.jpg"}  />
        <img alt={''} src={"http://images.hfuusec.cn/18-12-28/76561905.jpg"}  />
        <img alt={''} src={"http://images.hfuusec.cn/18-12-28/72791839.jpg"}  />
      </Carousel>
      </Modal>
      </div>
    );
  }
}

export default connect()(Form.create({ name: 'config' })(BasicLayout));
