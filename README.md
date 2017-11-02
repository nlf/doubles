## Doubles

A hapi plugin to redirect incoming requests removing the `www.` prefix from hostnames.

### example

```js
server.register([
  require('doubles')
], {
  routes: {
    vhost: 'example.com'
  }
}, (err) => {

  server.start();
});
```

Any requests to the above server with a `Host` header matching `www.example.com` will be redirected to `example.com`, all other requests will be passed through unmodified.
