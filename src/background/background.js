import Vue from 'vue';
import App from './background.vue';

new Vue({
  el: '#background-app',
  render: h => h(App),
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'posts') {
    chrome.storage.local.set({ posts: request.data }, function() {
      console.log('Posts are stored.');
    });
  }

  sendResponse({
    message: 'Passed through onMessage',
  });

  return true;
});
