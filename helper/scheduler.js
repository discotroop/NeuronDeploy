const cron = require('node-cron');

import {sendReminder} from "../helper/email"
import {getArticles} from '../controllers/articleController'

//cron check db for matches that day. To send an email. 5A. should be sufficiently early to miss anything scheduled that day - needs to be runing where express is running.
cron.schedule('0 5 * * *', async function() {
  console.log('daily 5A check');
  const articles = getArticles();
  
  //for each article, find matches meeting today and send email reminder
  for(let i=0; i<articles.data.length; i++){
    const matches = articles.data[i].matched //is array [{},{},...]
  
    let today = new Date().toISOString().split('T')[0]

    let matchTimes = matches.filter(match => match.start.includes(today)) //will be new array of objs. 
    matchTimes.forEach(matchObj =>{  
        sendReminder(matchObj.email,matchObj.matchedEmail)      
    });
  }
});

