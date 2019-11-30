
/**
 * route的hash钩子函数
 * hash变化的时候，只能监听到
 *  "hashChangeStart",
    "hashChangeComplete"
 */
import {withRouter} from 'next/router';
import Link from 'next/link';

const RouterB = ({ router }) => <Link href="MyCountFun"><button>B</button></Link>

export default withRouter(RouterB);