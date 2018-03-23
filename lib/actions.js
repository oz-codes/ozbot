//log = require("./actions/log.js")
yt = require("./actions/yt.js")
markov = require("./actions/markov.js")
actions = [yt.extract, markov.chainsaw]
exports.bgtasks = function bgtasks(evt) {
	for(var task in actions) {
		console.log(task)
		console.log(actions[task])
		actions[task](evt);
	}
}
	
