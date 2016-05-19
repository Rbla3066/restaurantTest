function login(email, password, callback) {
    var connection = mysql({
        host: 'localhost',
        user: 'root',
        password: 'r',
        database: 'mydb'
    });

    connection.connect();

    var query = "SELECT id, nickname, email, password " +
        "FROM users WHERE email = ?";

    connection.query(query, [email], function(err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();
        var user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return callback();
        }

        callback(null, {
            id: user.id.toString(),
            nickname: user.nickname,
            email: user.email
        });

    });

}
