requirejs.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery.min',
        d3: '../node_modules/d3/d3.min',
        timer: './js/timer'
    }
});

requirejs(["js/sticksGame"], function(main) {
    main();
});