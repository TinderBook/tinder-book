const Book = require('../models/book.model');
const User = require('../models/user.model');

exports.getMostReadBooks = async (req, res) => {
  try {
    // Obtener los IDs de los 10 libros con más likes y su respectivo conteo
    const topLikedBooks = await User.aggregate([
      { $unwind: "$likedBooks" },
      { $group: { _id: "$likedBooks", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Extraer solo los IDs para la siguiente consulta
    const topLikedBookIDs = topLikedBooks.map(item => item._id);

    // Obtener detalles de esos 10 libros a partir de sus IDs
    const allBooks = await Book.find({ _id: { $in: topLikedBookIDs } });

    // Asociar el conteo de likes con cada libro 
    allBooks.forEach(book => {
      const likeData = topLikedBooks.find(like => like._id.equals(book._id));
      book.likesCount = likeData ? likeData.count : 0;
    });

    // Ordenar los libros en el array por likes (por si el orden se perdió al consultar los detalles)
    allBooks.sort((a, b) => b.likesCount - a.likesCount);

    res.render('mostReadBooks', { books: allBooks });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al recuperar los libros más leídos.');
  }
};

