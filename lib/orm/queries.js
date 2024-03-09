const Query = require('./Query');

exports.QuerySelect = class QuerySelect extends Query {
    constructor(provider, query) {
        super(provider, 'select', query);
    }
}

exports.QuerySelectAll = class QuerySelectAll extends Query {
    constructor(provider, query) {
        super(provider, 'selectAll', query);
    }
}

exports.QueryInsert = class QueryInsert extends Query {
    constructor(provider, query) {
        super(provider, 'insert', query);
    }
}

exports.QueryDelete = class QueryDelete extends Query {
    constructor(provider, query) {
        super(provider, 'delete', query);
    }
}
exports.QueryUpdate = class QueryUpdate extends Query {
    constructor(provider, query) {
        super(provider, 'update', query);
    }
}
