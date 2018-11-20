import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
// import AnimalForm from './animal/AnimalForm'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import OwnerManager from "../modules/OwnerManager"
import LocationManager from "../modules/LocationManager"
import AnimalsOwnedManager from "../modules/AnimalsOwnedManager"
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'


export default class ApplicationViews extends Component {
    // employeesFromAPI = [
    //     { id: 1, name: "Jessica Younker" },
    //     { id: 2, name: "Jordan Nelson" },
    //     { id: 3, name: "Zoe LeBlanc" },
    //     { id: 4, name: "Blaise Roberts" }
    // ]

    // locationsFromAPI = [
    //     { id: 1, name: "Nashville North", address: "500 Circle Way" },
    //     { id: 2, name: "Nashville South", address: "10101 Binary Court" }
    // ]

    // animalsFromAPI = [
    //     { id: 1, name: "Doodles" },
    //     { id: 2, name: "Jack" },
    //     { id: 3, name: "Angus" },
    //     { id: 4, name: "Henley" },
    //     { id: 5, name: "Derkins" },
    //     { id: 6, name: "Checkers" }
    // ]

    // ownersFromAPI = [
    //     {id: 1, name: "Ousama"},
    //     {id: 2, name: "Zac"},
    //     {id: 3, name: "Elyse"},
    //     {id: 4, name: "Brendan"}
    // ]

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        animalsOwned: []
    }

    componentDidMount() {
        // const newState = {}

        AnimalManager.getAll().then(allAnimals => {
            this.setState({
                animals: allAnimals
            })
        })
        EmployeeManager.getAll().then(allEmployees => {
            this.setState({
                employees: allEmployees
            })
        })
        OwnerManager.getAll().then(allOwners => {
            this.setState({
                owners: allOwners
            })
        })
        LocationManager.getAll().then(allLocations => {
            this.setState({
                locations: allLocations
            })
        })
        AnimalsOwnedManager.getAll().then(allAnimalsOwned => {
            this.setState({
                animalsOwned: allAnimalsOwned
            })
        })
        

        // fetch("http://localhost:5002/animals")
        //     .then(r => r.json())
        //     .then(animals => newState.animals = animals)
        //     .then(() => fetch("http://localhost:5002/employees")
        //     .then(r => r.json()))
        //     .then(employees => newState.employees = employees)
        //     .then(() => this.setState(newState))
        //     .then(() => fetch("http://localhost:5002/owners")
        //     .then(r => r.json()))
        //     .then(owners => newState.owners = owners)
        //     .then(() => this.setState(newState))
        //     .then(() => fetch("http://localhost:5002/locations")
        //     .then(r => r.json()))
        //     .then(locations => newState.locations = locations)
        //     .then(() => this.setState(newState))
        //     .then(() => fetch("http://localhost:5002/animalsOwned")
        //     .then(r => r.json()))
        //     .then(animalsOwned => newState.animalsOwned = animalsOwned)
        //     .then(() => this.setState(newState))
    }

    // deleteAnimal = id => {
    //     return fetch(`http://localhost:5002/animals/${id}`, {
    //         method: "DELETE"
    //     })
    //     .then(e => e.json())
    //     .then(() => fetch(`http://localhost:5002/animals`))
    //     .then(e => e.json())
    //     .then(animals => this.setState({
    //         animals: animals
    //     })
    //   )
    // }

    deleteAnimal = (id) => {
        return AnimalManager.removeAndList(id)
        .then(animals => this.setState({
            animals: animals
          })
        )
      }

    fireEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/employees`))
        .then(e => e.json())
        .then(employees => this.setState({
            employees: employees
        })
      )
    }

    removeCustomer = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/owners`))
        .then(e => e.json())
        .then(owners => this.setState({
            owners: owners
        })
      )
    }

    // addAnimal = (animal) => AnimalList.post(animal)
    // .then(() => AnimalList.getAll())
    // .then(animals => this.setState({
    //     animals: animals
    //     })
    // )
    

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList 
                    deleteAnimal={this.deleteAnimal} 
                    animals={this.state.animals} 
                    owners={this.state.owners}
                    animalsOwned={this.state.animalsOwned}
                    />
                }} />
                {/* Our shiny new route. We pass employees to the AnimalForm so a dropdown can be populated */}
                {/* <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                                    addAnimal={this.addAnimal}
                                    employees={this.state.employees} />
                }} /> */}
                <Route path="/employees" render={(props) => {
                    return <EmployeeList fireEmployee={this.fireEmployee} employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList removeCustomer={this.removeCustomer} owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}