1) build
```terminal
npm run build
```

Manually edit /build folder:

2) edit index.html - remove leading "/" from href + source attributes

    workaround for gh-pages weird relative imports issue

3) in *.bundle.js
    search for *.wasm
    replace e.exports = n.p + "/f5c442719112209deeaa.wasm"
    with: "/ethanse.github.io/block_game_clone/f5c442719112209deeaa.wasm"

    
4) publish 
```terminal
npx gh-pages -d build
```

This could be automated. It is pretty quick to do and is done very infrequently