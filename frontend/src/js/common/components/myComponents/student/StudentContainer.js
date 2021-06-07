import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/students/student';
import ListStudent from './listStudents';


const ms2p = (state) => {
  return {
    ...state.student,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListStudent);