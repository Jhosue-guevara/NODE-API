import { MongoClient } from "mongodb";
import 'dotenv/config';

class dbClient {
    constructor() {
        // Crea la cadena de conexión con las variables de entorno.
        const queryString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        this.client = new MongoClient(queryString);
        this.db = null; // Inicializa la referencia a la base de datos en null.
    }

    // Método para conectar a la base de datos.
    async conectarBD() {
        try {
            await this.client.connect(); // Conecta al cliente de MongoDB.
            this.db = this.client.db(process.env.DB_NAME); // Asigna la referencia a la base de datos.
            console.log("Conectado a la base de datos");
        } catch (error) {
            console.error("Error al conectar con la base de datos:", error.message);
        }
    }
}

// Exporta una instancia de dbClient para su uso global.
export default new dbClient();


