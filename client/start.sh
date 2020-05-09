rm ../shared/@env/*.js
rm ../shared/@env/*.js.map
ENV=$1 NODE_PATH=../shared tsc ../shared/@env/*.ts --baseUrl ../shared
ENV=$1 NODE_PATH=source/js:../shared concurrently \"webpack\" \"gulp\"