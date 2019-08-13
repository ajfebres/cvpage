var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let hobbies = "Soccer lover. I discovered this beautiful sport since childhood, I enjoy playing it and seeing it. Music, oh, let's talk about music. Salsa and Meringue are the top. Caribbean music makes me feel at home. Impossible to leave urban music aside. 'The development of Software is also Art'.";
  let exp = 'I started in the world of technology as a Xerox Printer Technician to pay for my studies. I was contacted by a company that was developing an open source project that consisted in adapting OdooErp to a factory. These people gave me the opportunity and I started to program, great. I decided to work as a Freelancer because I could invest my time in many other things and it worked. Collaborating on projects for Argentina, Colombia, Mexico, Peru, Spain and of course Venezuela.';
  let studies = 'I finished my university career in 2017 since then I have only dedicated myself to being self-taught and to be updated with new technologies. I have a certificate in Python and UI Path Academy.'
  let greet = "Hi, I'm young venezuelan. Development for fun and work. I love challenges, eager to learn and be a better person every day. Interested in the present and future. In search of learning and professional growth but above all personal.";
  res.render('index', { head: 'Home', 
                        hobbies: hobbies,
                        exp: exp,
                        studies: studies,
                        greet: greet});
});

module.exports = router;
