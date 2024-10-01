const prisma = require('../config/prisma.config');

class TransactionRepository {
    static async borrowBook(book_id, user_id){
        const book = await prisma.books.findUnique({
            where: { id: book_id },
        });
        return await prisma.$transaction(async (prisma) => {
            await prisma.books.update({
                where: { id: book_id },
                data: { stock: book.stock - 1 }, 
            });
            return await prisma.transactions.create({
                data: {
                    book_id,
                    user_id,
                    borrow_date: new Date(), 
                    return_status: false, 
                },
            });
        });
    }

    static async returnBook(book_id, transaction_id){
        const book = await prisma.books.findUnique({
            where: { id: book_id },
        });
        return await prisma.$transaction(async (prisma) => {
            await prisma.books.update({
                where: { id: book_id },
                data: { stock: book.stock + 1 }, 
            });
            return await prisma.transactions.update({
                where: {
                    id: transaction_id
                },
                data: {
                    return_date: new Date(), 
                    return_status: true, 
                },
            });
        });
    }

    static async findTransactionById(id){
        return await prisma.transactions.findUnique({
            where: {id: id}
        });
    }

    static async reportBorrowBook(filters){
        const whereClause = {
            ...(filters.book_id && { book_id: { contains: filters.book_id } }), 
            ...(filters.user_id && { user_id: { contains: filters.user_id } }), 
            ...(filters.borrow_date && { borrow_date: { gte: new Date(filters.borrow_date) } }), 
            return_status: false,
        };
        return await prisma.transactions.findMany({
            where: whereClause,
            include:{
                book: true,
                user: true,
            }
        })
    }

    static async reportReturnBook(filters){
        const whereClause = {
            ...(filters.book_id && { book_id: { contains: filters.book_id } }), 
            ...(filters.user_id && { user_id: { contains: filters.user_id } }), 
            ...(filters.return_date && { return_date: { gte: new Date(filters.return_date) } }), 
            return_status: false,
        };
        return await prisma.transactions.findMany({
            where: whereClause, 
            include:{
                book: true,
                user: true,
            }
        })
    }
}

module.exports = TransactionRepository