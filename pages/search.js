import { withRouter } from 'next/router';
import { memo,isValidElement } from 'react';
import { Row,Col,List ,Pagination} from 'antd';
import Link from 'next/Link';
//仓库概述组件
import Repo from '../components/Repo';

const api = require('../lib/api');
/**
 * sort 排序方式
 * order 排序顺序
 * lang 仓库得项目开发语言
 * page分页
 */
const LANGUAGES = ['JavaScript','HTML','CSS','TypeScript','Java','Ruby','C#'];
const SORT_TYPES=[{
    name:'Best Match'
},
    {
        name:'Most Stars',
        value:'stars',
        order:'desc'
    },
    {
        name:'Fewest Stars',
        value:'Stars',
        order:'asc'
    },
    {
        name:'Most forks',
        value:'forks',
        order:'desc'
    },
    {
        name:'Fewest forks',
        value:'forks',
        order:'asc'
    },
    {
        name:'Recently updated',
        value:'updated',
        order:'desc'
    },

];
const selectedStyle= {
    borderLeft:'2px solid #e36209',
    fontWeight:'500'
}

//空方法
function noop() {}
const per_page = 20


const FilterLink = memo(({name,query,lang,sort,order,page})=>{
    let queryString = `?query=${query}`
    if (lang) queryString += `&lang=${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`;
    if(page) queryString +=`&page=${page}`;
     queryString += `&per_page=${per_page}`
    //isValidElement 是不是合理的ele
    return <Link href={`/search${queryString}`}>
        {
            isValidElement(name) ? name : <a>{name}</a>
        }
    </Link>
})


function Search({ router, repos }) {
  
    const { ...querys } = router.query;
    const { lang, sort, order, page } = router.query
  
    return(
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        style={{marginBottom:'20px'}}
                        dataSource={LANGUAGES}
                        renderItem={ item=>{
                            const selected = lang===item;
                            return (<List.Item style={selected ? selectedStyle :null}>
                                      {
                                          selected ? <span>{item}</span> : <FilterLink  {...querys} lang={item} name={item}/>
                                      }
                                  </List.Item>)
                        }}
                    />
                    <List
                        bordered
                        header={<span className="list-header">排序</span>}
                        style={{marginBottom:'20px'}}
                        dataSource={SORT_TYPES}
                        renderItem={ item=>{
                            let selected = false;
                            if(item.name==='Best Match' && !sort){
                                selected = true;
                            }else if(item.value===sort &&item.order===order){
                                selected = true;
                            }
                            return (<List.Item style={selected ? selectedStyle : null}>
                              {
                                selected ? <span>{item.name}</span> : <FilterLink {...querys}  name={item.name} order={item.order} sort={item.value}/>
                              }
                            </List.Item>)
                        }}
                    />
          </Col>
          <Col span={18}>
                    <h3 className="repos-title">{repos.total_count}个仓库</h3>
                    {
                        repos.items.map((item,ind)=><Repo repo={item} key={item.id}/>)
                    }
                    <div className="pagination">
                        <Pagination
                            pageSize={per_page}
                            current={Number(page) || 1}
                            total={1000}//repos.total_count github处理1000之前的结果
                            onChange={noop}
                            itemRender={(page,type,ol)=>{
                                const p = type==='page' ? page : type==='prev' ? page-1 : page+1;
                                const name = type==='page' ?page :ol;
                                return <FilterLink {...querys} page={p} name={name}/>
                            }}
                        />
                    </div>
            </Col>

            </Row>

            <style jsx>{`
                .root{
                    padding:20px 0;
                }
                .list-header{
                  font-size:16px;
                  font-weight:800;
              }
              .repos-title{
                  font-size:24px;
                  border-bottom:1px solid #eee;
                  line-height:50px;
              }
              .pagination{
                    padding:20px;
                    text-align:center;
              }
            `}</style>
        </div>
    )
}

/**
 * 获取搜索条件数据
 * @param ctx
 * @returns {Promise<void>}
 */
Search.getInitialProps= async ({ctx})=>{
    // console.log('getInitialProps-ctx',ctx)
    const { query,sort,lang,order,page} = ctx.query;
    if(!query){
        return {
            repos:{
                total_count:0
            }
        }
    }
//?q=react+language:javascript&sort=starts&order=desc&page=2
    let queryString = `?q=${query}`;
    if(lang) queryString += `+language:${lang}`;
    if(sort) queryString += `&sort=${sort}&order=${order || 'desc'}`;
    if (page) queryString += `&page=${page}`;
    queryString += `&per_page=${per_page}`

    const result = await api.request({
        url:`/search/repositories${queryString}`
    });

    return {
        repos :result.data
    }
}
export default withRouter(Search);