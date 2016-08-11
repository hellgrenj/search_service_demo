# READ ME

This is a simplified example demonstrating how to quickly get up and running with a full text search solution for your **[mongodb](https://www.mongodb.com/)** driven
application using **[node.js](https://nodejs.org)**, **[docker](https://www.docker.com/)**, **[elasticsearch](https://www.elastic.co/products/elasticsearch)** and **[compose/transporter](https://github.com/compose/transporter)**.

### Related blog post:

[A fast track to full text search for your mongodb driven app  
 utilizing elasticsearch, docker and transporter.](http://hellgrenj.tumblr.com/post/148795030888/a-fast-track-to-full-text-search-for-your-mongodb)

### Prerequisites
* have node.js installed
* have docker installed and running.
* have a mongodb instance running with a database with some example content ([not too small a collection](https://github.com/compose/transporter/issues/191))


### 8 steps to a working example


Step 1) clone this repository and run <code> npm install</code> in the root directory

Step 2) pull down the [elasticsearch docker image](https://hub.docker.com/_/elasticsearch/): <code> docker pull elasticsearch</code>

Step 3) run an elasticsearch docker container: <code>  docker run -d -p 9200:9200 -p 9300:9300 --name elasticsearch elasticsearch </code>

Step 4) pull down the [dortort/transporter docker image](https://hub.docker.com/r/dortort/transporter/): <code> docker pull dortort/transporter:es-v2.x-compat</code>

Step 5) clone your preferred collection of content from mongodb to elasticsearch by executing the transport.js script found in the utils folder:  *(make sure to replace the placeholders with your real stuff)*  

<code>
node utils/transport.js MONGODB_HOST_IP DB_NAME COLLECTION_NAME MONGODB_PORT
</code>    

If you have authentication enabled you can pass in **user:pass@**MONGODB_HOST_IP as **MONGODB_HOST_IP**

step 6) build this example app: <code> docker build -t search_demo . </code>

step 7) run the example app: <code> docker run -d -p 8080:8080 --name search_demo --link elasticsearch:elasticsearch search_demo</code>

step 8) browse to [localhost:8080](http://localhost:8080) and try the simple Vue.js client




### **DISCLAIMER:**
This is off course just a simplified getting-started-demo application. This should not be used **as is** in production. Besides the official docs for these tools i recommend reading
[this blog post](https://www.compose.com/articles/transporters-namespace-aware-data-transfer/)
and
[this compose/transporter issue](https://github.com/compose/transporter/issues/191)

### License

Released under the MIT license. Copyright (c) 2016 Johan Hellgren.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
