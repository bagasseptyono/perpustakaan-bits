const BookService = require("../services/book.service");
const ErrHandler = require("../utils/error.util");

class BookController {
    static async createBook(req, res, next){
        try {
            const data = req.body;
            const books = await BookService.createBook(data);
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Book data created successfully',
                data : books,
            });
        } catch (error) {
            next(error)
        }
    }

    static async getAllBooks(req, res, next){
        try {
            const filters = req.query;
            const books = await BookService.getAllBooks(filters);
            const sanitizedBooks = books.map(book => {
                const { created_at, updated_at, book_assets, ...bookData } = book;
                const formattedBooks = book_assets.map(asset => ({
                    id: asset.id,
                    book_id: asset.book_id,
                    path: `${req.protocol}://${req.get('host')}/public/images/books/${asset.path}`
                }));
                return {
                    ...bookData,
                    book_assets: formattedBooks
                };
            });
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Book data retrieved successfully',
                data : sanitizedBooks,
            });
        } catch (error) {
            next(error)
        }
    }

    static async getDetailBook(req, res, next){
        try {
            const id = req.params.id;
            const book = await BookService.getDetailBook(+id);
            const { created_at, updated_at, book_assets, ...bookData } = book;
            const formattedBooks = book_assets.map(asset => ({
                id: asset.id,
                book_id: asset.book_id,
                path: `${req.protocol}://${req.get('host')}/public/images/books/${asset.path}`
            }));
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Book data retrieved successfully',
                data : {
                    ...bookData,
                    book_assets: formattedBooks
                }
            });
        } catch (error) {
            next(error)
        }
    }

    static async updateBook(req, res, next){
        try {
            const id = req.params.id;
            const data = req.body;
            const book = await BookService.updateBook(+id, data);
            const { created_at, updated_at, ...bookData } = book;
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Books data retrieved successfully',
                data : bookData,
            });
        } catch (error) {
            next(error)
        }
    }

    static async deleteBook(req, res, next){
        try {
            const id = req.params.id;
            const book = await BookService.deleteBook(+id);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Book deleted successfully',
                data : null,
            });
        } catch (error) {
            next(error)
        }
    }

    static async addBookAssets(req, res, next){
        try {
            const id = req.params.id;
            const data = req.files;
            if (!data || data.length === 0) {
                throw new ErrHandler(400, "No Files uploaded")
            }
            const book = await BookService.addBookAsset(+id, data);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Book assets added successfully',
                data : book,
            });
        } catch (error) {
            next(error)
        }
    }

    static async deleteBookAssets(req, res, next){
        try {
            const id = req.params.id;
            const book = await BookService.deleteBookAsset(+id);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Book asset deleted successfully',
                data : null,
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookController