import home from "./pages/home.vue";
import block from "./pages/block.vue";
import tx from "./pages/transaction.vue";
import address from "./pages/address.vue";
import notfound from "./pages/notfound.vue";

export default [
    {
        path : "/",
        redirect : {name : "home"}
    },
    {
        path : "/home",
        name : "home",
        component : home
    },
    {
        path : '/block/:blockid',
        component : block
    },
    {
        path : '/tx/:txid',
        component : tx
    },
    {
        path : '/address/:address',
        component : address,
        meta: { title: ':address' }
    },
    {
      path: '/404',
      name: 'NotFound',
      component: notfound
    },
    {
      path: '*',
      redirect: { name: 'NotFound' }
    }
]
