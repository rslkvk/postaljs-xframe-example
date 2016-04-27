function create_instance() {
    if(arguments.length == 0) {
        //default instance id
        return postal.instanceId("parent");
    }
    return postal.instanceId(arguments[0]);
}



