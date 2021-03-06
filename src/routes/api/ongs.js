const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('ongs', '/', async (ctx) => {
  const ongs = await ctx.orm.ong.findAll();
  // if we have a current user it will be here
  // console.log('Current user: ', ctx.state.currentUser);
  ctx.body = ctx.jsonSerializer('ongs', {
    attributes: ['name', 'logo', 'email', 'description', 'webpage'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('ongs')}`,
    },
    dataLinks: {
      self: (dataset, ong) => `${ctx.origin}/api/ong/${ong.id}`,
    },
  }).serialize(ongs);
});

module.exports = router;
