import { Layout, Menu, Breadcrumb, Icon} from 'antd';
import { connect } from 'dva'
import styles from './index.css';

const { Header, Footer, Content } = Layout;

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
     <Layout className="layout">
      <Header>
        <div 
          className={styles.logo} 
          // onClick={ () => {
          //   const {dispatch} = props
          //   dispatch({
          //     type: 'menu/chageMenukey',
          //     payload:'modal'
          //   });
          // }}
        >亚如图床</div>
        <div className={styles.setting}>
          <Icon type="setting" />
        </div>
        <Menu
          onClick={ e => {
            const {dispatch} = props
            dispatch({
              type: 'menu/chageMenukey',
              payload:e.key
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
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 780 }}>
          {props.children}
        </div>
        
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        亚如图床 ©2018 Created by 九月大人
      </Footer>
    </Layout>
    </div>
  );
}

export default connect()(BasicLayout);
