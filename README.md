# Typestack Virtual Host

A modified version of [vhost-ts](https://github.com/PabloSzx/vhost-ts) that works with routing-controllers. There are two main functions, one being `vhost()` which can be used as middleware, while the other one, `@VirtualHost()` is meant to be used on a controller They both have the same options object.

## Example

```typescript
@UseBefore(
    vhost({
        host: "vhost.throw-out-error.dev",
        error: false,
        route: (_, res) => {
            res.json({ message: "hi from vhost" });
        },
    }),
)
@Get("/")
getIndex() {
    return { message: "Hello from /" };
}
```

In this example, if you visit the index page on localhost, the server will respond with "Hello from /". If you access it via the vhost domain, it will respond back with "hi from vhost".

The error paramter determines whether it should throw an InvalidHostError if it is not accessed from the correct virtual host. If set to false, it will call the route option instead of throwing an error.
