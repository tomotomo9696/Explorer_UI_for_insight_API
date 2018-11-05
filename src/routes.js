/*
import home from "./pages/home.vue";
import block from "./pages/block.vue";
import blockHeight from "./pages/block-height.vue";
import tx from "./pages/transaction.vue";
import address from "./pages/address.vue";
import blocks from "./pages/blocks.vue";
import broadcast from "./pages/broadcast-tx.vue";
import notfound from "./pages/notfound.vue";
*/
const home        = () => import(/* webpackChunkName: "home" */ "./pages/home.vue");
const block       = () => import(/* webpackChunkName: "block" */ "./pages/block.vue");
const blockHeight = () => import(/* webpackChunkName: "height" */ "./pages/block-height.vue");
const tx          = () => import(/* webpackChunkName: "tx" */ "./pages/transaction.vue");
const address     = () => import(/* webpackChunkName: "address" */ "./pages/address.vue");
const blocks      = () => import(/* webpackChunkName: "blocks" */ "./pages/blocks.vue");
const status    = () => import(/* webpackChunkName: "status" */ "./pages/status.vue");
const broadcast   = () => import(/* webpackChunkName: "broadcast" */ "./pages/broadcast-tx.vue");
const notfound    = () => import(/* webpackChunkName: "notfound" */ "./pages/notfound.vue");
const scanqr    = () => import(/* webpackChunkName: "scanqr" */ "./pages/scanQRCode.vue");

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
        path : '/block-height/:blockHeight',
        component : blockHeight
    },
    {
        path : '/tx/:txid',
        component : tx
    },
    {
        path : '/address/:address',
        component : address,
    },
    {
        path : '/blocks/:date?',
        component : blocks
    },
    {
        path : '/status',
        component : status
    },
    {
        path : '/broadcast',
        component : broadcast,
    },
    {
        path : '/scanqr',
        component : scanqr,
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
