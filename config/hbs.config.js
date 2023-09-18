const hbs = require('hbs');
const moment = require('moment')

//registro de partials en hbs con el folder partials 
hbs.registerPartials(`${__dirname}/../views/partials`);


// este nos dice si la barra del navegador es igual a la q estabamos buscando: nos regresa un string llamado "active"
hbs.registerHelper('navActive', (navigationPath, expectedPath, options) => {
    return (navigationPath === expectedPath) ? 'active' : "";
})


// este nos dice val1 y val2 son iguales nos regresa el primer options.fn(this) , si no la option.inverse como segunda opcion
hbs.registerHelper('ifEqual', function (val1, val2, options) {
    if (val1.toString() === val2.toString()) {
        return options.fn(this);  
    } else {
        return options.inverse(this);  
    }
});

//esta nos dice lo mismo q la anterior pero la estamos usando para comparar si el usuario registrado es el mismo 
hbs.registerHelper('ifUser', function (val1, val2, options) {
    if (val1.toString() === val2.toString()) {
        return options.fn(this);  
    } else {
        return options.inverse(this);  
    }
});

hbs.registerHelper('eq', (v1, v2) => v1 === v2);


hbs.registerHelper('formatDate', function(date) {
    return date.toISOString().split('T')[0];
});


hbs.registerHelper('eq', function(a, b) {
    return a === b;
});

hbs.registerHelper('elapsedTime', (createdAt, options) => {
    return moment(createdAt).fromNow();
} )


hbs.registerHelper('addOne', function(value) {
    return value + 1;
});