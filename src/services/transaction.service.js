const BookRepository = require("../repositories/book.repository");
const TransactionRepository = require("../repositories/transaction.repository");
const UserRepository = require("../repositories/user.repository");
const ErrHandler = require("../utils/error.util");

class TransactionService {
    static async borrowBook(data) {
        const { book_id, user_id } = data
        const getBook = await BookRepository.findBookById(book_id);
        if (!getBook) throw new ErrHandler(404,"Book Not Found");
        if (getBook.stock <= 0) throw new ErrHandler(404,"No Stock Available");

        const getUser = await UserRepository.findUserById(user_id)
        if (!getUser) throw new ErrHandler(404,"User Not Found");

        const borrowBook = await TransactionRepository.borrowBook(book_id, user_id);
        if (!borrowBook) throw new ErrHandler(500,"Error When add data");

        return borrowBook

    }

    static async returnBook(data) {
        const { transaction_id } = data
        const getTransaction = await TransactionRepository.findTransactionById(transaction_id);
        if (!getTransaction) throw new ErrHandler(404,"Transaction Not Found");
        if (getTransaction.return_status == true) throw new ErrHandler(400,"Book has already returned");


        const returnBook = await TransactionRepository.returnBook(getTransaction.book_id, transaction_id);
        if (!returnBook) throw new ErrHandler(500,"Error When add data");

        return returnBook

    }

    static async reportBorrowBook(){
        const reports = await TransactionRepository.reportBorrowBook();
        const filteredTransactions = reports.map(transaction => {
            return {
                id: transaction.id,
                book_id: transaction.book_id,
                user_id: transaction.user_id,
                borrow_date: transaction.borrow_date,
                return_date: transaction.return_date,
                return_status: transaction.return_status,
                book: {
                    id: transaction.book.id,
                    title: transaction.book.title,
                    author: transaction.book.author,
                    publisher: transaction.book.publisher,
                    category: transaction.book.category,
                    description: transaction.book.description,
                    ISBN: transaction.book.ISBN,
                    stock: transaction.book.stock,
                },
                user: {
                    id: transaction.user.id,
                    name: transaction.user.name,
                    email: transaction.user.email,
                    phone_number: transaction.user.phone_number,
                    address: transaction.user.address,
                    photo: transaction.user.photo,
                },
            };
        });
        return filteredTransactions;
    }

    static async reportReturnBook(){
        const reports = await TransactionRepository.reportReturnBook();
        const filteredTransactions = reports.map(transaction => {
            return {
                id: transaction.id,
                book_id: transaction.book_id,
                user_id: transaction.user_id,
                borrow_date: transaction.borrow_date,
                return_date: transaction.return_date,
                return_status: transaction.return_status,
                book: {
                    id: transaction.book.id,
                    title: transaction.book.title,
                    author: transaction.book.author,
                    publisher: transaction.book.publisher,
                    category: transaction.book.category,
                    description: transaction.book.description,
                    ISBN: transaction.book.ISBN,
                    stock: transaction.book.stock,
                },
                user: {
                    id: transaction.user.id,
                    name: transaction.user.name,
                    email: transaction.user.email,
                    phone_number: transaction.user.phone_number,
                    address: transaction.user.address,
                    photo: transaction.user.photo,
                },
            };
        });
        return filteredTransactions;
    }
}

module.exports = TransactionService