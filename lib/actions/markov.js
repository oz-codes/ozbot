const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"
const target = "discord"
exports.chainsaw = async function log(message) {
	//get attributes of message
	sender = message.author.username
	body = message.content
	server = message.channel.guild.name 
	room = message.channel.name
	//build connection to mongo
	try {
		client = await MongoClient.connect(url)
		const db = client.db(target)
		words = body.split(/ /);
		markov = {};
		for(var i=0; i < words.length; i++) {
			console.log("[MARKOV} current word: "+words[i])
			if(markov[words[i]] == null) {
				console.log('[MARKOV] creating array for '+words[i])
				markov[words[i]] = [];
			}
			if(i+1 < words.length) {
				console.log('[MARKOV] pushing '+words[i+1]+' into array for '+words[i])
				markov[words[i]].push(words[i+1])
			}
		}
		console.log("[MARKOV] inserting chains")
		Object.keys(markov).map(async function(word) {
			word = word.replace(/[.,!?;]/g,'')
			let ngram = await db.collection("markov").find({
				head: word
			}).limit(1).toArray()
			console.log('[MARKOV] ngram.length: '+ngram.length);
			if(ngram.length > 0) {
				console.log('[MARKOV] '+word+'found in db. updating tail list');
				tail = ngram[0].tail;
				markov[word].map((w) => { tail.push(w); })
				db.collection("markov").update({head: word}, {
				$set: {tail: tail}
				});
			} else { 
				chain = {head: word, tail: markov[word]}
				console.log("[MARKOV] chain: ", chain)
				db.collection("markov").save({
					head: word,
					tail: markov[word]
				})
			}
		})
	} catch (err) {
		console.log(err.stack);
	}
}


