var yt = require("youtube-node")
var YouTube = new yt();

YouTube.setKey('AIzaSyA_hirzMoOQzk4CV3cR4aUS-N8N2NH8A20')
exports.extract = async function extract(message) {
	body = message.content
	var ytre = /(https?:\/\/)?(www.)?youtu(\.be|be\.com)\/(watch\?v=)?([A-Za-z0-9\-]+)/
	console.log("[YT] RESULT OF REGEX: ")
	results = ytre.exec(body)
	console.log(results)
	if(results != null) { //if there is a youtube video
		try {
			YouTube.getById(results[5], function(err, res) { //get youtube video instance by id
				if(err) {
					message.reply("error with that youtube vid") 
				} else {
					//build response to send back
					response = "";
					console.log("[YT] getbyid results: ");
					console.info(res)
					try { 
						response = JSON.stringify(res.items[0].statistics)
						console.log("responding with: " + response)
						message.reply(response);
					} catch (err) { }
				}
			})

		} catch (err) {
			console.log(err.stack);
		}

	}
}


