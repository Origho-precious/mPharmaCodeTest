import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const TableCol = withStyles((theme) => ({
  head: {
    backgroundColor: '#335D7E',
    color: '#FFF',
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

export default TableCol;