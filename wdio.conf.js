const shared = {
    host: 'localhost',
    port:4444,
    path:'/wd/hub',
    coloredLogs:true,
    screenshotPath:'./errorShots',
    waitforTimeout:10000,
    connectionRetryTimeout:90000,
    connectionRetryCount:3,
    maxInstances:1
};

exports.chrome={
    ...shared,
    desireCapabilities:{
        browserName:'chrome',
        chromeOptions:{
            args:["disable-gpu", "no-sandbox","disable-setuid-sandbox","incognito","disable-dev-shm-usage"] 
        }
    }
};