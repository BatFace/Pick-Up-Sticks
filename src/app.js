requirejs.config({
    paths: {
        jquery: './tmpLib/jquery/dist/jquery.min',
        d3: './tmpLib/d3/d3.min',
        timer: './js/timer'
    }
});

requirejs(["js/sticksGame"], function(main) {
    main();
});