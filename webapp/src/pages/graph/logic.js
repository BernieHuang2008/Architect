var nodes = {
    'N<id>': {
        id: '<id>',
        type: 'default',
    }
}

var edges = {
    'E<id>': {
        id: '<id>',
        source: '<node-id>',
        target: '<node-id>',
    }
}

function genID(c) {
    var id = '<id>';
    var cate = c === 'N' ? nodes : edges;

    while (cate[c + id] !== undefined) {
        id = Math.floor(Math.random() * (36 ** 8)).toString(36);
    }

    return c + id;
}