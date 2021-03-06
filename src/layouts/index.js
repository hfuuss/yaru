import React, { Component } from 'react'
import { Layout, Menu, Icon, Modal,Form,Input,Button} from 'antd';
import { connect } from 'dva'
import UploadImage from '../components/UploadImage'
import styles from './index.css';

const { Header, Footer, Content } = Layout;

class BasicLayout extends Component {
constructor(props) {
  super(props);
  this.state = {
    visible: false,
    loveVisible: false,
    menukey: 'home'
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
  this.setState({
    visible: false,
  });
}

handleSubmit = (e) => {
  e.preventDefault();
  const {dispatch} = this.props

  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
    Object.keys(values).map(key => localStorage.setItem(key,values[key]));
    dispatch({
      type: 'config/chageConfigKey',
      payload: {
        accessKey:  values['yaccessKey'],
        secretKey:  values['ysecretKey'],
        bucket:  values['ybucket'],
        host: values['yhost']
      }
    })
    this.setState({
      visible: false,
    });
  })
}


render () {
  const { getFieldDecorator } = this.props.form
  const {menukey} = this.state
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
              this.setState({
                menukey: e.key,
              })
            }}
            theme="dark"
            mode="horizontal"
            selectedKeys={menukey}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">首页</Menu.Item>
            <Menu.Item key="myupload">我的上传</Menu.Item>
            <Menu.Item key="chrome_plugin">Chrome插件</Menu.Item>
          </Menu>
          
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ margin: '16px 0' }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 780 }}>
              <div className={styles.container}>
              {menukey === 'home' && <UploadImage/>}
              {
                menukey === 'myupload' && 
                <div>
                  我的上传，还木有找到前端js的SDK，还得自己写token生成算法。之后再开发吧。
                </div>
              }
              {
                menukey === 'chrome_plugin' && 
                <div>
                   待开发插件
                </div>
              }
            </div>
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          小小图床 ©2019 Created by 九月大人
        </Footer>
      </Layout>
      {/* 弹框 */}
      <Modal
        title="修改配置"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={() => this.handelInputChange('visible',false)}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item 
            label="空间名称"
          >
            {getFieldDecorator('ybucket', {
              rules: [{ required: true, message: '请输入空间名称!如：demo' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入空间名称!" />
            )}
          </Form.Item>
          <Form.Item
            label="AK"
          >
            {getFieldDecorator('yaccessKey', {
              rules: [{ required: true, message: '请输入Access Key！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入Access Key！" />
            )}
          </Form.Item>
          <Form.Item
            label="SK"
          >
            {getFieldDecorator('ysecretKey', {
              rules: [{ required: true, message: '请输入Secret Key！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入Secret Key！" />
            )}
          </Form.Item>
          <Form.Item
            label="域名"
          >
            {getFieldDecorator('yhost', {
              rules: [{ required: true, message: '请输入域名!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入域名，例如http://xxxx.z0.glb.clouddn.com/" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        
        </Form>
      </Modal>
      <Modal
        title="小小小仙女"
        visible={this.state.loveVisible}
        onOk={this.handleOk}
        onCancel={() => this.handelInputChange('loveVisible',false)}
      >
        <img width="100%" alt={''} src={"http://images.hfuusec.cn/18-12-28/52902299.jpg"}  />
      </Modal>
      </div>
    );
  }
}

export default connect()(Form.create({ name: 'config' })(BasicLayout));
