const cron = require('node-cron');


exports.fistCron =    cron.schedule('*/2 * * * *',()=>{
        console.log('running every two minute');
    })
    
 
