// optional: you can add a topic as third parameter.
var sub = (function () {

    var frameId, frameChannel, topic;


    function init(subId, subChannel) {
        //optional part of initializing
        topic = "#";
        if (arguments.length == 3) {
            topic = arguments[2];
        }
        frameId = subId;
        frameChannel = subChannel;
        
        postal.instanceId(frameId);
        console.log("subscriber \"" + frameId + "\"" + " is initialized...");
        postal.fedx.addFilter([
            {channel: frameChannel, topic: topic, direction: "in"}
        ]);
        postal.fedx.signalReady();
        console.log("subscriber \"" + frameId + "\"" + " is ready on" +
            " channel \"" + frameChannel + "\"...");
    }

    function subscribe() {
        var sd = postal.subscribe({
            channel: frameChannel,
            topic: topic,
            callback: function (data, envelope) {
                console.log("subscription gets this message: " + JSON.stringify(data) + "...");
                return data;
            }});
        return sd;
    }

    return {init:init, subscribe:subscribe};
}());