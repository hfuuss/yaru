import styles from './index.css';
import { connect } from 'dva'
// import UploadImage from '../components/UploadImage'

const mapStateToProps = state => {
  return {menukey:state.menu.menukey}
}

export default connect(mapStateToProps)((props) => {
  return (
    <div className={styles.normal}>
     
    </div>
  );
})