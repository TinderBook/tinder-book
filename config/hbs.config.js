const hbs = require('hbs');


hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('navActive', (navigationPath, expectedPath, options) => {
    return (navigationPath === expectedPath) ? 'active' : "";
})

hbs.registerHelper('ifEqual', function (val1, val2, options) {
    if (val1.toString() === val2.toString()) {
        return options.fn(this);  
    } else {
        return options.inverse(this);  
    }
});
