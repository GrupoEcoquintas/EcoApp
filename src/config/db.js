const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'ec2-54-236-39-53.compute-1.amazonaws.com', // Cambia esto por la dirección de tu servidor MySQL
  user: 'root', // Cambia esto por tu nombre de usuario de MySQL
  password: '3c0qu1nt4s', // Cambia esto por tu contraseña de MySQL
  database: 'ecoquint_ecoerp', // Cambia esto por el nombre de tu base de datos
});

// Establecer la conexión
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
    // Aquí puedes ejecutar consultas u otras operaciones en la base de datos
  }
});

module.exports = connection;