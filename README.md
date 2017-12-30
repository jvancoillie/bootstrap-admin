
## Getting started 

```
# 1. Clone the repo
git clone https://github.com/jvancoillie/bootstrap-admin.git

# 2. Install dependenices
cd bootstrap-admin
yarn install

# 3. Launch dev script
yarn run dev

```

## Run it with docker

```
# 1. Step build docker image
$ docker build -t bootstrap-admin .

# 2. Step Run the container 
$ docker run -v $(pwd):/data -p 8080:8080 -ti --user node bootstrap-admin

# 3. Install dependencies  
$ yarn install

# 4. Run webpack dev-server
$ yarn run docker:dev-server

http://localhost:8080
```