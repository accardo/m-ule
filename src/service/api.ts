const url = process.env.REACT_APP_BASE_URL
const api = {
  getToken: `${url}/api/users/getToken`, // 获取用户认证Token
}
export default api