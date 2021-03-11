const {
    ValidationError,
    NotFoundError,
    DBError,
    ConstraintViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError
} = require('objection');


const databaseErrorHandler = (err,req,res,next) => {
    console.error(err.stack);

    if (err instanceof ValidationError) {
        switch (err.type) {
            case 'ModelValidation':
                res.status(400).send({
                    message: err.type,
                    data: err.data
                });
                break;
            case 'RelationExpression':
                res.status(400).send({
                    message: 'RelationExpression',
                    data: {}
                });
                break;
            case 'UnallowedRelation':
                res.status(400).send({
                    message: err.type,
                    data: {}
                });
                break;
            case 'InvalidGraph':
                res.status(400).send({
                    message: err.type,
                    data: {}
                });
                break;
            default:
                res.status(400).send({
                    message: 'UnknownValidationError',
                    data: {}
                });
                break;
        }
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            message: 'NotFound',
            data: {}
        });
    } else if (err instanceof UniqueViolationError) {
        res.status(409).send({
            message:'UniqueViolation',
            data: {
                columns: err.columns,
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof NotNullViolationError) {
        res.status(400).send({
            message: 'NotNullViolation',
            data: {
                column: err.column,
                table: err.table
            }
        });
    } else if (err instanceof ForeignKeyViolationError) {
        res.status(409).send({
            message: 'ForeignKeyViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof CheckViolationError) {
        res.status(400).send({
            message: 'CheckViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof DataError) {
        res.status(400).send({
            message: 'InvalidData',
            data: {}
        });
    } else if (err instanceof DBError) {
        res.status(500).send({
            message: 'UnknownDatabaseError',
            data: {}
        });
    } else {
        next(err);
    }
}

module.exports = databaseErrorHandler;