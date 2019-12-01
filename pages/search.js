import {withRouter} from 'next/router';

function Search({router}) {
    // console.log(router)
    return(
        <span>{router.query.query}</span>
    )
}
export default withRouter(Search);