var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '42d4d3d7-d826-4830-b409-d40535fc4f54',
    appPassword: 'wp0x51opQbTaO68tof3gAdp'
});
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("%s, I heard: %s", session.userData.name, session.message.text);
    session.send("Say 'help' or something else...");
});
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

// Add first run dialog
bot.dialog('firstRun', [
    function (session) {
        // Update versio number and start Prompts
        // - The version number needs to be updated first to prevent re-triggering 
        //   the dialog. 
        session.userData.version = 1.0;
        builder.Prompts.text(session, "Hello... What is your name?");
    },
    function (session, results) {
        // We'll save the users name and send them an initial greeting. All 
        // future messages from the user will be routed to the root dialog.
        session.userData.name = results.response;
        session.endDialog("Hi %s, say something to me and I'll echo it back.", session.userData.name);
    }
]).triggerAction({
    onFindAction: function (context, callback) {
        // Trigger dialog if the users version field is less than 1.0
        // - When triggered we return a score of 1.1 to ensure the dialog is always triggered.
        var ver = context.userData.version || 0;
        var score = ver < 1.0 ? 1.1 : 0.0;
        callback(null, score);
    },
    onInterrupted: function (session, dialogId, dialogArgs, next) {
        // Prevent dialog from being interrupted.
        session.send("Sorry... We need some information from you first.");
    }
});

// Add help dialog
bot.dialog('help', function (session) {
    session.send("I'm a simple echo bot.");
}).triggerAction({
    matches: /^help/i
});
