const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('navActive', (navigationPath, expectedPath, options) => {
    return (navigationPath === expectedPath) ? 'active' : "";
})

hbs.registerHelper('ifEqual', function (val1, val2, options) {
    if (val1 === val2) {
        return options.fn(this);  // Ejecuta y devuelve el contenido dentro del bloque {{#ifEqual}}...{{/ifEqual}}
    } else {
        return options.inverse(this);  // Ejecuta y devuelve el contenido dentro de un eventual bloque {{else}} que esté después de {{#ifEqual}}
    }
});


