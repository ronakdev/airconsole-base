class AirConsoleWrapper {
    constructor(type) {
    
        if (type == "screen") {
            this.airconsole = new AirConsole()
            this.airconsole.onConnect = (deviceId) => {
                this.players.push(deviceId)
                this.talkToPlayer(this.airconsole.convertDeviceIdToPlayerNumber(deviceId), {content: "Hello from Screen"})
            }
            this.airconsole.onDisconnect = (deviceId) => {
                if (player != undefined) {
                    this.players.splice(players.indexOf(deviceId), 1)    
                }
            }
            
            // Called when SCREEN recieves data from CONTROLLER
            this.airconsole.onMessage = (deviceId, data) => {
                var player = this.airconsole.convertDeviceIdToPlayerNumber(deviceId)
                
                if (player != undefined && data.content !== undefined) {
                    // data is an object that holds stuff, you can set what you want inside
                    // code
                    if (this.players.length == 1) {
                        document.getElementById("data").innerHTML = data.content
                    }
                    else {
                        document.getElementById("data").innerHTML += ", "
                        document.getElementById("data").innerHTML += data.content
                    }
                }
    
            }
            
        }
        
        else if (type == "controller") {
            this.airconsole = new this.airconsole({"orientation": "portrait"}) //or landscape
                    
            // Called when CONTROLLER recieves data from SCREEN (but you can technically also recieve from another controller)
            this.airconsole.onMessage = (from, data) => {
                if (from == this.airconsole.SCREEN && data.content != undefined) {
                    // code
                    // cool way to vibrate the phone - navigator.vibrate(timeInMs)
                    document.getElementById("data").innerHTML = data.content
                    this.talkToScreen({content: "Hi there"})
                }
            }
        }
        
    }
    
    // Call this when the SCREEN wants to talk to the CONTROLLER
    talkToPlayer(playerNumber, data) {
        //device id = The device ID to send the message to. If "device_id" is undefined, the message is sent to all devices (except this one).
        deviceId = ""
        for (var j = 0; j < this.players.length; j++) {
            if (this.airconsole.convertDeviceIdToPlayerNumber(this.players[j]) == playerNumber) {
                deviceId = this.players[j]
            }
        }
        this.airconsole.message(deviceId, data)
    }
    
    talkToScreen(data) {
        this.airconsole.message(this.airconsole.SCREEN, data)
    }

}