const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const static = require('koa-static')
const app = new Koa();


app.use(koaNunjucks({
    ext: 'njk',
    path: path.join(__dirname, './views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));
app.use(static(
    path.join(__dirname, './static')
))

app.use(bodyParser()); // 解析request的body

const router = require('koa-router')()
    // app.use( async ( ctx ) => {
    //   ctx.body = 'hello world'
    // })

router.get('/sw', async(ctx, next) => {
    await ctx.render('serviceworker', { title: '我是用来测试serviceWorker的' });
})
router.get('/wb', async(ctx, next) => {
    await ctx.render('workbox', { title: '我是用来测试workbox的' });
})
app.use(router.routes());
app.listen(9000);
console.log('app started at port 9000...')