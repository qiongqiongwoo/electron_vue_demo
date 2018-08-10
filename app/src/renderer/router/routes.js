const Login = resolve => {
  import('@/views/login/login').then(module => {
    resolve(module)
  })
}
const Home = resolve => {
  import('@/views/home/home').then(module => {
    resolve(module)
  })
}
const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'login',
    component: Login
  }
]
export default routes
