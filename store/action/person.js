import { addPerson, fetchPersons, deletePer, updatePerson } from "../../Helpers/db"
import * as Notifications from 'expo-notifications'
import Color from "../../Constants/Color"

const year = new Date().getFullYear()

export const ADD_BIRTHDAY = 'ADD_BIRTHDAY'
export const FETCH_DATA = 'FETCH_DATA'
export const TOGGLE_COLOR = 'TOGGLE_COLOR'
export const DELETE_PERSON = 'DELETE_PERSON'
export const UPDATE_IDENTIFIER = 'UPDATE_IDENTIFIER'

export const fetchData = () => {
    return async(dispatch) => {
        const res = await fetchPersons()
        console.log(res)
        dispatch({ type: FETCH_DATA, persons: res.rows._array })
    }
}

export const addBirthday = (name, number, date, month, message, image) => {
    const time = new Date(`${date}/${month}/${year}`).getTime()
        // console.log(time)
    var y
    console.log(year)
    if (time <= new Date().getTime()) {
        y = parseInt(year) + 1
    } else {
        y = parseInt(year)
    }
    console.log(Math.floor(Math.abs(new Date(`${date}/${month}/${y}`).getTime() - new Date().getTime()) / 1000))

    // console.log(Math.abs(new Date(`${month} ${date} ${y}`) - new Date()))

    // console.log(Math.floor(Math.abs(new Date(`${month} ${date} ${y}`) - new Date()) / 60000))
    return async(dispatch) => {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: `It's ${name}'s Birthday`,
                vibrate: true,
                color: Color.primary,
                body: `Click here and be the first one to wish ${name}`,
                data: { name, number, message, date, month, y }
            },
            trigger: {
                seconds: Math.floor(Math.abs(new Date(`${date}/${month}/${y}`).getTime() - new Date().getTime()) / 1000)
            }
        })

        const res = await addPerson(name, number, message, date + "-" + month, image, identifier)

        if (!res.status) {
            //
            //
            //
            //
        }
        dispatch({ type: ADD_BIRTHDAY, person: { name, number, date: date + "-" + month, message, image, identifier } });

    }
}

export const toggleColor = (color) => {
    return { type: TOGGLE_COLOR, color: color }
}

export const deletePerson = (number, identifier) => {
    return async dispatch => {
        const res = await deletePer(number)
        console.log(res)
        await Notifications.cancelScheduledNotificationAsync(identifier)
        dispatch({ type: DELETE_PERSON, number: number })
    }
}

export const updateIdentifier = (name, number, identifier) => {
    return async dispatch => {
        await updatePerson(name, number, identifier)
        dispatch({ type: UPDATE_IDENTIFIER, name, number, identifier })
    }
}