import styles from './index.css';
import { connect } from 'dva'

const mapStateToProps = state => {
  return {menukey:state.menu.menukey}
}

export default connect(mapStateToProps)((props) => {
  return (
    <div className={styles.normal}>
      {
        props.menukey === 'home' && 
        <div>
          上传首页
        </div>
      }
      {
        props.menukey === 'myupload' && 
        <div>
          我的上传
        </div>
      }
    </div>
  );
})