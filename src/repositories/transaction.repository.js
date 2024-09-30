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

    static async reportBorrowBook(){
        return await prisma.transactions.findMany({
            where: {
                return_status: false
            },
            include:{
                book: true,
                user: true,
            }
        })
    }

    static async reportReturnBook(){
        return await prisma.transactions.findMany({
            where: {
                return_status: true,
            }, 
            include:{
                book: true,
                user: true,
            }
        })
    }
}

module.exports = TransactionRepository