export default class GotService {

    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';  //способ задать основу url, чтобы не повторять ее при каждом запросе
    };
    getResource = async (url) => {   //необходимо отправлять асинхронный запрос
        const res = await fetch(`${this._apiBase}${url}`);       //дождаться отработки этой команды запроса
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received: ${res.status}`);
        }
        return await res.json();      //дождаться отработки этой команды ответа от сервера    
    }
    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');  //настраиваем получение с 5 страницы 10 персонажей
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const characters = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(characters);  //настраиваем получение одного персонажа по id
    }
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);  //настраиваем получение одного персонажа по id
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
        // return this.getResource(`/houses/${id}`);  //настраиваем получение одного персонажа по id
    }
    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
        // return this.getResource(`/books/`);  //настраиваем получение одного персонажа по id
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
        // return this.getResource(`/books/${id}`);  //настраиваем получение одного персонажа по id
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];     //присвоение id
    }
    _transformCharacter = (char) => {
        return{
            // name: char.name,
            // gender: char.gender,
            // born: char.born,
            // died: char.died,
            // culture: char.culture
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        };
    }
    _transformHouse = (house) => {
        return{
            // name: house.name,
            // region: house.region,
            // words: house.words,
            // titles: house.titles,
            // overlord: house.overlord,
            // ancestralWeapons: house.ancestralWeapons
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)            
        };
    }
    _transformBook = (book) => {
        return{
            // name: book.name,
            // numberOfPages: book.numberOfPages,
            // publiser: book.publiser,
            // released: book.released
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        };
    }
}

// const got = new GotService();

// got.getAllCharacters()
//     .then(res => {
//         res.forEach( item => console.log(item.name)) //метод получения конкретного свойства объектов списка
//     });

//     got.getCharacter(130)
//     .then(res => console.log(res));
