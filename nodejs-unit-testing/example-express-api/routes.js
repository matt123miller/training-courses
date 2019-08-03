

module.exports.setupRoutes = (app) => {

    app.use(
        '/example', 
        require('./example')
    );

    return app;
}