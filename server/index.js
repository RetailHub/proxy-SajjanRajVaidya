require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {createProxyMiddleware} = require('http-proxy-middleware');
const port = 8080;

app.use(express.static('public'))

// const apiProxy = createProxyMiddleware({target: 'http://ec2-3-132-5-204.us-east-2.compute.amazonaws.com:3001'});
// const reviewProxy = createProxyMiddleware({target: 'http://18.212.184.37:3004'});
const relatedProxy = createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
});
// const itemsProxy = createProxyMiddleware({target: 'http://34.201.53.74:3002'});

// app.use('/api/items/:id',apiProxy);
// app.use('/api/allreviews/',reviewProxy);
app.use('/api/related_products/:id',relatedProxy);
app.use('/api/addProduct',relatedProxy);
// app.use('/items/:id',itemsProxy);

// app.get('/:id', (req, res) => {
//   res.send('public');
// })

app.use(bodyParser.json()); // THIS NEEDS TO BE HERE AT THE END (WHY AGAIN?)

app.listen(port,() => {
  console.log('Proxy server listening on port: ', port);
});