const ascii = require('ascii-table');
let table = new ascii("Events");
table.setHeading('Events', ' Load status');

const {readdirSync, readdir} = require('fs');
module.exports = (client) => {
    readdirSync("./events/").forEach((file) => {
        const events = readdirSync("./events/").filter((file) => file.endsWith(".js"));
        for(let file of events)
        {
            let pull = require(`../events/${file}`);
            if(pull.name)
            {
                client.events.set(pull.name, pull)
                table.addRow(file,'Event Loaded!');

            } else {
                table.addRow(file, 'Event Error');
                continue;
            }
        }
    });
    console.log("Event handler is ready");
}