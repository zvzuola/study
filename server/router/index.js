const Router = require('koa-router');

let router = new Router();
router.get(/^(?!\/api\/)/, async (ctx) => {
    await ctx.render('index');
});

// 区块链应用请求路由 start
const Web3 = require('web3')
const ethVoting = require('../../eth-voting/index')
let data;
router.post('/api/vote', async (ctx) => {
    if (!data) {
        data = await ethVoting()
    }
    const contractInstance = data.contractInstance
    const params = JSON.parse(ctx.request.body);
    const account = data.account
    await contractInstance.methods.voteForCandidate(Web3.utils.asciiToHex(params.name)).send({ from: account })
    const count = await contractInstance.methods.totalVotesFor(Web3.utils.asciiToHex(params.name)).call()
    ctx.body = {
        code: 200,
        count
    }
})

router.post('/api/getCount', async (ctx) => {
    if (!data) {
        data = await ethVoting()
    }
    const contractInstance = data.contractInstance
    const params = JSON.parse(ctx.request.body);
    const count = await contractInstance.methods.totalVotesFor(Web3.utils.asciiToHex(params.name)).call()
    ctx.body = {
        code: 200,
        count
    }
})
// 区块链应用请求路由 end

module.exports = router;