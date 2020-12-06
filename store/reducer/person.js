import dummyData from "../../assets/dummy-data";
import Birthday from "../../Models/birthday";
import { ADD_BIRTHDAY, DELETE_PERSON, FETCH_DATA, TOGGLE_COLOR, UPDATE_IDENTIFIER } from '../action/person'

const initialState = {
    person: [],
    backgroundColor: 'white'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            var persons = []
            persons = persons.concat(action.persons.map(person => new Birthday(person.name, person.number, person.date, person.message, person.image, person.identifier)))
            return {
                ...state,
                person: persons
            }
        case ADD_BIRTHDAY:
            return {
                ...state,
                person: state.person.concat(new Birthday(action.person.name, action.person.number, action.person.date, action.person.message, action.person.image, action.person.identifier))
            }
        case TOGGLE_COLOR:
            return {
                ...state,
                backgroundColor: action.color
            }
        case DELETE_PERSON:
            const index = state.person.filter((per) => per.number !== action.number)
            console.log(index)
                // console.log(action)
                // var p = state.person
                // delete p[index]
            return {
                ...state,
                person: index
            }
        case UPDATE_IDENTIFIER:
            var filtered = state.person.filter((per) => (per.number !== action.number))
            var per = state.person.filter((per) => per.number == action.number)
            return {
                ...state,
                person: filtered.concat(new Birthday(per[0].name, per[0].number, per[0].date, per[0].message, per[0].image, action.identifier))
            }
        default:
            return state
    }
}