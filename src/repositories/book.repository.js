const prisma = require("../config/prisma.config");

class BookRepository {
    static async addBook(payload) {
        return await prisma.books.create({
            data: payload,
        });
    }

    static async findBookById(id) {
        return await prisma.books.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                book_assets: true,
            },
        });
    }

    static async findAllBooks() {
        return await prisma.books.findMany({
            include: {
                book_assets: true,
            },
        });
    }

    static async updateBookById(id, payload) {
        return await prisma.books.update({
            where: {
                id: parseInt(id),
            },
            data: payload,
        });
    }

    static async deleteBookById(id) {
        return await prisma.books.delete({
            where: {
                id: parseInt(id),
            },
        });
    }

    static async addBookAssets(filePaths) {
        return await prisma.book_assets.createMany({
            data: filePaths,
        });
    }

    static async findBookAssetById(id) {
        return await prisma.book_assets.findUnique({
            where: {
                id: id,
            },
        });
    }

    static async deleteBookAssetById(id){
        return await prisma.book_assets.delete({
            where: {
                id:id
            }
        })
    }
}

module.exports = BookRepository;
