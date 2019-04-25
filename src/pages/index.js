import styles from './index.css';
import { connect } from 'dva'
import UploadImage from '../components/UploadImage'

const mapStateToProps = state => {
  return {menukey:state.menu.menukey}
}

export default connect(mapStateToProps)((props) => {
  return (
    <div className={styles.normal}>
      {
        props.menukey === 'home' && 
        <div>
          <UploadImage/>
        </div>
      }
      {
        props.menukey === 'myupload' && 
        <div>
          我的上传，还木有找到前端js的SDK，还得自己写token生成算法。之后再开发吧。
        </div>
      }
    </div>
  );
})