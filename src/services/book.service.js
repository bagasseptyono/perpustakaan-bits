const BookRepository = require("../repositories/book.repository")
const ErrHandler = require("../utils/error.util");
const FsUtil = require("../utils/fs.util");

class BookService {
    static async createBook (payload) {
        const book = await BookRepository.addBook(payload);
        return book;
    }

    static async getAllBooks() {
        const books = await BookRepository.findAllBooks();
        return books;
    }

    static async getDetailBook(id){
        const book = await BookRepository.findBookById(id);
        if (!book) throw new ErrHandler(404,"Book Not Found");
        return book;
    }

    static async updateBook(id,payload){
        const getBook = await BookRepository.findBookById(id);
        if (!getBook) throw new ErrHandler(404,"Book Not Found");

        const book = await BookRepository.updateBookById(id,payload);
        if (!book) throw new ErrHandler(500,"Error when update book");

        return book;

    }

    static async deleteBook(id){
        const getBook = await BookRepository.findBookById(id);
        if (!getBook) throw new ErrHandler(404,"Book Not Found");

        for (const asset of getBook.book_assets) {
            if (asset.path) {
                await FsUtil.deleteFileExists(asset.path, "books");
            }
        }

        const deleteBook = await BookRepository.deleteBookById(id);
        if (!deleteBook) throw new ErrHandler(500, "Error when delete ");
        return deleteBook


    }

    static async addBookAsset(id,payload){
        const getBook = await BookRepository.findBookById(id);
        if (!getBook) throw new ErrHandler(404,"Book Not Found");

        const filePaths = payload.map(file => ({
            book_id: id,
            path: file.filename
        }));

        console.log(filePaths);
        

        const addBookAssets = await BookRepository.addBookAssets(filePaths);

        return addBookAssets;

    }

    static async deleteBookAsset(id){
        const getBookAsset = await BookRepository.findBookAssetById(id);
        if (!getBookAsset) throw new ErrHandler(404, "Book Asset Not Found");

        if (getBookAsset.path) {
            await FsUtil.deleteFileExists(getBookAsset.path,"books");
        }

        const deleteBookAsset = await BookRepository.deleteBookAssetById(id);
        if (!deleteBookAsset) throw new ErrHandler(500, "Error when delete ");
        return deleteBookAsset
    }
}

module.exports = BookService