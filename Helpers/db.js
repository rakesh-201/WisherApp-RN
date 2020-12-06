import { openDatabase } from 'expo-sqlite'

const db = openDatabase('persons')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS person1 (id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, number TEXT NOT NULL, message TEXT NOT NULL, date TEXT NOT NULL, image TEXT NOT NULL, identifier TEXT NOT NULL)", [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}

export const addPerson = (name, number, message, date, image, identifier) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO person1 (name, number, message, date, image, identifier) VALUES (?, ?, ?, ?, ?, ?) ', [name, number, message, date, image, identifier],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}

export const fetchPersons = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM person1', [], (_, result) => { resolve(result) }, (_, err) => { reject(err) })
        })
    })
    return promise
}

export const deletePer = (number) => {
    const promise = new Promise((resolve, reject) => {
        console.log(number)
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM person1 WHERE number = ?`, [number],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}

export const updatePerson = (name, number, identifier) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`UPDATE person1 SET identifier = ? WHERE name = ? AND number = ?`, [identifier, name, number],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}