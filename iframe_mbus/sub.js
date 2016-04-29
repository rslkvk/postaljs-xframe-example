// optional: you can add a topic as third parameter.
var subscribe = (function (subId, channel) {
    //optional part of initializing
    var topic = "#";
    if(arguments.length == 3) {
        topic = arguments[2];
    }

    postal.instanceId(pubId);
    console.log("subscriber <"+subId+">" + "is initialized...");

    /*
     ||---------------------- From the PostalJS Documentation -----------------------||
     || You can optionally configure postal.xframe with the configure call.          ||
     || `allowedOrigins` is an array of origins that you can use to determine        ||
     || if you want to federate with postal instances loaded in another window       ||
     || from those origins.  If another host attempts to federate with you from      ||
     || an origin not listed in that array, the local instance of postal will        ||
     || not allow it. The local instance of postal will not send any messages to     ||
     || (nor process any from) an origin not listed in this array.                   ||
     || `defaultOriginUrl` is the default value that will be provided as the         ||
     || "targetUrl" when postal.xframe calls `window.postMessage(msg, targetUrl)`    ||
     || if it hasn't been specified for that remote window already.                  ||
     ||     postal.fedx.transports.xframe.configure({                                ||
     ||         allowedOrigins : [ "http://some.host.com", "http://another.com" ],   ||
     ||         defaultOriginUrl : "http://some.host.com",                           ||
     ||         enabled: true // this is redundant - just showing that it's here     ||
     ||     });                                                                      ||
     ||------------------------------------------------------------------------------||
     */
    // As we use the reverse proxy we can skip this step
    // postal.fedx.transports.xframe.configure({
    //     allowOrigins: ["./index.html", ""],
    //     defaultOriginUrl: ["./index.html"]
    // })

    postal.fedx.addFilter([
        {channel: channel, topic: "#", direction: "in"}
    ]);

    postal.fedx.signalReady();


    console.log("subscriber \""+subId+"\"" + " is ready on" +
        " channel \"" + channel+"\"...");

    return function(data) {
        console.log("publishing from " + pubId +" " +
            "on channel " + channel + "..." );

        postal.publish({
            channel: channel,
            topic: topic,
            data: data
        })  ;

        console.log("... " + JSON.stringify(data));
        return false;
    };

} ("parent", "frame"));