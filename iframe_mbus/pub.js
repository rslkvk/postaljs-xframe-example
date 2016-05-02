// optional: you can add a topic as third parameter.
var pub = (function() {
    var parentId, parentChannel, topic;
    function init(pId, pChannel) { 
        //optional part of initializing
        topic = "#";
        if (arguments.length == 4) {
            topic = arguments[3];
        }
        parentId = pId, parentChannel = pChannel;

        postal.instanceId(pId);
        console.log("publisher \"" + pId + "\"" + " is initialized...");

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
            {channel: pChannel, topic: "#", direction: "out"}
        ]);

        postal.fedx.signalReady();


        console.log("publisher \"" + pId + "\"" + " is ready on" +
            " channel \"" + pChannel + "\"...");
    }

    function publish(data) {
        console.log("publishing from " + parentId + " on channel " + parentChannel + "...");
        postal.publish({
            channel: parentChannel,
            topic: topic,
            data: data
        });
        console.log("... " + JSON.stringify(data));
        return false;
    }
    return {init:init, publish:publish};
}());
