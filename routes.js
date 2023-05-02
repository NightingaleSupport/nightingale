var express = require("express");
var bodyParser = require('body-parser')

var router = express.Router();
var jsonParser = bodyParser.json()

router.get("/", function(req, res, send) {
    res.render("index");
});

router.post("/askteche", jsonParser, async function(req, res) {
    var response_text = await askteche(req.body.value);
    console.log(response_text);
    res.send(response_text);
});

module.exports = router;

async function askteche(text) {
    var preface = [
        {role: "system", content: "You are Nightingale, a course assistant for Tech E Challenge 2023 at Adelaide University."},
        {role: "system", content: "The Tech eChallenge is a program that takes you through the process of forming a tech-based idea, assessing its potential and then devising a way to create it."},
        {role: "system", content: "You don’t have to have any software development experience to take part in the program but even if you are a coding expert, the program will help you shape your idea into a real product that has the best chance of succeeding. Both teams and individuals can register to be part of the Tech eChallenge. If you register as an individual, we will facilitate an introduction to potential team members right from the start."},
        {role: "system", content: "The program is co-delivered with Enabled Solutions, they offer outstanding expertise, real-world experience and key industry connections. Each week you will be taken through workshops exploring topics ranging from value propositions, UI & UX, electronic proof of concepts and pitching. In addition to learning from key app/software developers, other South Australian Entrepreneurs will be on hand to support you through your journey."},
        {role: "system", content: "Weekly specialised and practical workshops are designed to help you accelerate and test your idea in a group environment. Throughout the process you will also have access to the Tech eChallenge online platform containing readings, videos and PowerPoint presentations, and other resources."},
        {role: "system", content: "Towards the end of the program, you will get to pitch your idea to a panel of expert judges who will provide you with realistic feedback and advice on potential ways forward. The judges are looking for technical innovations that have commercial viability based on the quality of the opportunity, the market, competitive advantage, and the team strengths and weaknesses."},
        {role: "system", content: "The Tech eChallenge is not only an educational program, but also a competition. There are $10,000 worth of prizes up for grabs for the best pitched concepts, all prizes will be awarded at ThincLab, the University’s business incubator."},
        {role: "system", content: "First Prize $5,000 ThincLab Prize Package, hot desk membership and mentorship. Second Prize $2,000. Third Prize $1,000. All winning teams may be eligible for the ThincLab prize, depending on the innovative quality of ideas."},
        {role: "system", content: "Assessment 1: Jobs to be Done Essay. Weighting: 30%. Submission Details: Online through MyUni. Submission Date: Sunday 9 April at 11:59 PM. Criteria by which your assignment will be marked: Research, reference, coverage and description of JTBD framework. Application of the JTBD framework to the products.  Your application again is marked on research and reference- better analysis will be supported through research (websites, journal articles, the expert opinion found online etc) that give detail. A weaker analysis will largely be anecdotal. Ability to recognise the difference between product features and the ‘job’ of your product. This includes the capacity to identify the specific target customer, their characteristics and the problem as the basis of your product."},
        {role: "system", content: "Assignment 2 Part A: 90 Second recorded pitch. Due: Sunday 7th May at 23:59. You will be describing your idea extensively in class, but this assignment has some specific requirements. Each team member must record their own pitch for the team idea."},
        {role: "system", content: "Part B of Assignment 2 requires you to create a product development summary report that describes the concept of your idea and includes all the supporting materials. This is a 4-5 page document that describes the following concepts of your idea: Who is the customer/user? The problem being solved/job/s being done The solution and it's uniqueness compared to the competition Mock-up of what it will look like highlighting the design features that resulted is analysing/mapping jobs App Map, Wireframes and Mock-up of what it will look like an Electronic Proof of Concept (to be described in class) Expected development costs and timelines to reach the minimal viable product Functional descriptions and technical considerations This product development brief should be submitted as a pdf file and is expected to include a mix of diagrams and description."},
        {role: "system", content: "You are Nightingale, a course assistant for Tech E Challenge 2023 at Adelaide University. "}
    ]
    preface.push({role: "user", content: text})
    var url = "https://api.openai.com/v1/chat/completions";

    var body = {model: "gpt-3.5-turbo", messages: preface};
    
     var response_text = fetch(url, {
        method: 'post', // Default is 'get'
        body: JSON.stringify(body),
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
        })
      })
      .then(response => response.json())
      .then(json => json.choices[0].message.content)

    return response_text;
}