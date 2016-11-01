var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejs = require('ejs');

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/libs', express.static('libs'));
app.use('/static', express.static('static'));

app.listen(3050, () => {
  console.log('All is well');
});


app.get('/articles/:id', (req, res) => {

  var articleId = req.params.id;

  request(`http://jsonplaceholder.typicode.com/posts/${articleId}`, (err, response, body) => {

    var jsonData = JSON.parse(body);

    res.render('article', {
      article: jsonData,
      pageName: 'article'
    })

  });

});

app.get('/api/posts', (req, res) => {

    var pageNum = req.query.page-1;
    var postCount = req.query.postCount ? req.query.postCount : 5;

    request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
      if (!error && response.statusCode == 200) {

          var jsonData = JSON.parse(body);
          var pageLength = Math.ceil(jsonData.length/postCount);
          var page = jsonData.splice(pageNum * postCount, postCount);

          res.send(page);
      }
    });

});

app.get('/', (req, res) => {

  var pageNum = req.query.page-1;
  var postCount = req.query.postCount ? req.query.postCount : 5;

  request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
     if (!error && response.statusCode == 200) {

       var jsonData = JSON.parse(body);
       var pageLength = Math.ceil(jsonData.length / postCount);
       var page = jsonData.splice(pageNum * postCount, postCount);

       res.render('landing', {
           posts: page,
           numPages: pageLength,
           pageNum: pageNum,
           postCount: postCount,
           pageName:'articles'
       });
     }
   });

});

app.get('/projects', (req, res) => {

  res.render('projects',{
     pageName:'projects'
  });

});

app.get('/about', (req, res) => {

  res.render('about', {
   pageName:'about'
  });

});

app.post('/api/hire', (req, res) => {

  var data = req.body;
  console.log(data);
  res.sendStatus(200);

});
