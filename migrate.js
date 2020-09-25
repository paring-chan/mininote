const knex = require('knex')(require('./config.json').db)


;(async () => {
    await knex.schema.createTable('guilds', t => {
        t.text('id').notNullable()
        t.json('warns').defaultTo('{}').notNullable()
    })
    await knex.destroy()
    console.log('complete')
})()
