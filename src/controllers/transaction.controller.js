const TransactionService = require("../services/transaction.service");

class TransactionController {
    static async borrowBook(req,res,next){
        try {
            const data = req.body;
            const transaction = await TransactionService.borrowBook(data);
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Transaction borrow data created successfully',
                data : transaction,
            });
        } catch (error) {
            next(error)
        }
    }

    static async returnBook(req,res,next){
        try {
            const data = req.body;
            const transaction = await TransactionService.returnBook(data);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Transaction return data successfully',
                data : transaction,
            });
        } catch (error) {
            next(error)
        }
    }

    static async reportBorrowBook(req,res,next){
        try {
            const filters = req.query;
            const transactions = await TransactionService.reportBorrowBook(filters);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Transaction borrow report retrieved successfully',
                data : transactions,
            });
        } catch (error) {
            next(error)
        }
    }

    static async reportReturnBook(req,res,next){
        try {
            const filters = req.query;
            const transactions = await TransactionService.reportReturnBook(filters);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Transaction Return report retrieved successfully',
                data : transactions,
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TransactionController