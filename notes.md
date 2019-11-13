# Authentication

- it's about the client connecting to the API, not about the user logged in
  - the same user on same computer connected from Insomnia is different than the same user/machine w/ Chrome
- "server has amnesia" - will not remember client across requests
  - http is stateless - no common data saved btw. client & server
- need a way to help server remember client across requests

## Cookies
- a cookie is a container of data
- a browser will automatically send cookies on every request to the domain associated w/ the cookie
- the client will store the cookie in a special place (NOT called the cookie jar)

- A server can send a _header_ (Set-Cookie) suggesting to the client that it store a cookie

- The client sends the cookies back in a _cookie_ header to the server

## Sessions

- like a database
- used to store data on the server, much like a database

> Auth is not sexy! Concentrate on features.