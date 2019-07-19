<template>
  <div>
    <div id="main">
      <h1>Toxicity Notifier</h1>
      <div class="description">Click the button below!</div>
      <div id="table-wrapper"></div>
      <div class="button-container">
        <button v-on:click="startScreening" class="rainbow rainbow-5"><div class="logo"></div></button>
        <div class="buffer-overlay hide"></div>
      </div>
      <div>
        <p class="note">Only for Facebook Newsfeed</p>
      </div>
      <div class="results-container">
        <h4>Results:</h4>
        <div class="results"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as toxicity from '@tensorflow-models/toxicity';
export default {
  data() {
    return {
      sentences: null,
      users: null,
      ids: null,
    };
  },
  created: () => {
    chrome.tabs.executeScript({
      code: `var posts = document.querySelectorAll('.userContentWrapper div[data-testid="post_message"]');
          var sentences = [];
          var users = [];
          var id = [];

          for (let index = 0; index < posts.length; index++) {
            var text = posts[index].innerText;
            var user = posts[index].parentElement;
            var elementID = posts[index].closest('div[data-fte="1"]').id;

            if (user) {
              user = user.querySelector("h5");
              if (user != null) {
                sentences.push(text);
                users.push(user.textContent);
                id.push(elementID);
              }
            }
          }
          chrome.runtime.sendMessage(
            {
              action: 'posts',
              data: [sentences, users, id]
            },
            function(response) {
              console.log(response);
            }
          );
        `,
    });
  },
  methods: {
    startScreening() {
      document.querySelector('.buffer-overlay').classList.remove('hide');
      document.querySelector('.results').innerHTML = '';

      let promise = new Promise(function(resolve, reject) {
        chrome.storage.local.get(['posts'], function(items) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            reject(chrome.runtime.lastError.message);
          } else {
            resolve(items);
          }
        });
      });

      promise.then(result => {
        this.sentences = result.posts[0];
        this.users = result.posts[1];
        this.ids = result.posts[2];
        this.detectToxicity();
      });
    },
    detectToxicity() {
      // The minimum prediction confidence.
      const threshold = 0.9;

      // Load the model. Users optionally pass in a threshold and an array of
      // labels to include.
      toxicity.load(threshold).then(model => {
        const sentences = this.sentences;

        model.classify(sentences).then(predictions => {
          let isToxic = [];
          // `predictions` is an array of objects, one for each prediction head,
          // that contains the raw probabilities for each input along with the
          // final prediction in `match` (either `true` or `false`).
          // If neither prediction exceeds the threshold, `match` is `null`.
          for (let index = 0; index < predictions.length; index++) {
            let results = predictions[index].results;

            for (let result = 0; result < results.length; result++) {
              let match = results[result].match;
              if (match == true) {
                isToxic.push(result.toString());
              }
            }
          }
          var unique = isToxic.filter((v, i, a) => a.indexOf(v) === i);

          for (let toxicPosts = 0; toxicPosts < unique.length; toxicPosts++) {
            let sentence = this.sentences[unique[toxicPosts]];
            let userName = this.users[unique[toxicPosts]];
            let id = this.ids[unique[toxicPosts]];

            let div = document.createElement('div');
            let labelElement = document.createElement('label');
            let span = document.createElement('span');

            div.setAttribute('class', 'result');
            div.classList.add('focus-post');
            labelElement.innerText = userName;
            span.innerText = '>';
            div.setAttribute('user-id', id);

            div.innerHTML = labelElement.outerHTML;
            div.innerHTML += span.outerHTML;
            document.querySelector('.results').innerHTML += div.outerHTML;
          }

          this.focusPost();
          document.querySelector('.buffer-overlay').classList.add('hide');
        });
      });
    },
    focusPost() {
      var links = document.querySelectorAll('.focus-post');

      for (var i = 0; i < links.length; i++) {
        (function(index) {
          links[index].addEventListener('click', function(event) {
            var element = event.target.tagName;
            var newElement;

            if (element != 'DIV') {
              newElement = event.target.parentNode;
            } else {
              newElement = event.target;
            }
            console.log(newElement);
            let id = newElement.getAttribute('user-id');
            if (id != null) {
              chrome.tabs.executeScript({
                code: `window.location = "/#${id}";`,
              });
            }
          });
        })(i);
      }
    },
  },
};
</script>

<style>
h4 {
  margin-bottom: 0;
}

#main {
  width: 200px;
  height: 175px;
  text-align: center;
}

.hide {
  display: none;
}

.description {
  margin: 10px 0;
}

.button-container {
  position: relative;
}

button {
  margin: auto;
  display: block;
  border-radius: 4px;
  width: 175px;
  height: 70px;
}

button .logo {
  background-image: url(/poison.png);
  background-size: contain;
  width: 50px;
  height: 50px;
  margin: auto;
}

button:hover {
  cursor: pointer;
  border: 1px solid;
  padding: 10px;
  box-shadow: 5px 10px 8px #888888;
}

.buffer-overlay {
  height: 70px;
  width: 176px;
  top: 0px;
  left: 12px;
  background-color: #ffffff;
  margin: auto;
  border-radius: 4px;
  position: absolute;
  opacity: 0.5;
  z-index: 1;
}

p {
  font-size: 20px;
}

.rainbow {
  background-color: #343a40;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 8px 16px;
}

.rainbow-5:hover {
  background-image: linear-gradient(
    to right,
    #e7484f,
    #e7484f 16.65%,
    #f68b1d 16.65%,
    #f68b1d 33.3%,
    #fced00 33.3%,
    #fced00 49.95%,
    #009e4f 49.95%,
    #009e4f 66.6%,
    #00aac3 66.6%,
    #00aac3 83.25%,
    #732982 83.25%,
    #732982 100%,
    #e7484f 100%
  );
  animation: slidebg 2s linear infinite;
}

.buffer-overlay {
  background-image: linear-gradient(
    to right,
    #ffffff,
    #e4e4e4 16.65%,
    #c5c5c5 16.65%,
    #afafaf 33.3%,
    #999898 33.3%,
    #797979 49.95%,
    #4e4e4e 49.95%,
    #797979 66.6%,
    #999898 66.6%,
    #afafaf 83.25%,
    #c5c5c5 83.25%,
    #e4e4e4 100%,
    #ffffff 100%
  );
  animation: slidebg 2s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}

.note {
  color: red;
  font-size: 10px;
}

.results-container {
  margin-bottom: 10px;
}

.results,
.results label,
.results span {
  cursor: pointer;
}

.results {
  height: auto;
}

.result {
  position: relative;
  height: 25px;
  margin: 5px;
}

.result label {
  position: absolute;
  left: 5px;
  top: 5px;
}

.result span {
  text-decoration: none;
  color: #000000;
  position: absolute;
  right: 5px;
  font-size: 17px;
  font-weight: bold;
}

.result:hover {
  background-color: #dc60608a;
  color: #ffffff !important;
}
</style>
