const OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const CLIENT_ID = '9ea059b3c6c07429068c'
const CLIENT_SECRET = 'bf7b49f61fcc054f6aa1a909d5e5d3dea1b134e9'
const TOKEN_URL = 'https://github.com/login/oauth/access_token'
const CODE_URL= `${OAUTH_URL}?client_id=${CLIENT_ID}&scope=${SCOPE}`

module.exports = {
  GITHUB_AUTH: {
    CLIENT_ID,
    CLIENT_SECRET,
    TOKEN_URL,
    CODE_URL,
    OAUTH_URL,
    SCOPE
  }
}

// 流程
// 1. 注册 OAuth APP的应用
// 2. 保存client_id client_secret
// 3. 访问GET: https://github.com/login/oauth/authorize?client_id=c4cde05e70e67a88ea&scope=user
// 4. 跳转 http://localhost:3000/auth?code=8b309cc23b4c403f95 保存 code 字段
// 5. https://github.com/login/oauth/access_token POST请求 body:{client_id,client_secret,code} 获取token
// 6. https://api/github.com/user POST请求：  body:{client_id,client_secret} header: {Authorization: token token}