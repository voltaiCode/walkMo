import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import PrevRoutes from './PrevRoutes.jsx';


//component responses for complete user info
class UserStats extends Component {
    constructor(props){
        super(props)
        this.state ={
            userData: [{prevRoutes: [{miles: 10}]}],
            totalMiles: 0,
            totalPoints: 0,
        }
    }
    //fetch user data from mongoDB
    componentDidMount(){
        fetch('/User/')
            .then (res => res.json())
            .then (userData => {
                if (!Array.isArray(userData)) return userData;
                else {
                    return this.setState({
                        userData: userData
                    })
                }
            })
            .catch (err => console.log('Error: Unable to fetch User Info from database', err))
    }

    totalMiles(){
        console.log(userData)
        this.setState ({
            totalMiles: userData[0].prevRoutes.map((prev, i)=>{
                prev.miles.reduce((acc, mile)=> {acc + mile[i]
                console.log(acc)})
            })
        })
    }

    totalPoints(){
        this.setState ({
            totalMiles: userData.prevRoutes.map((prev, i)=>{
                prev.points.reduce((acc, point)=> acc + point[i])
            })
        })
    }

    render(){
        //deconstruct array of userData to take item
        const { userData } = this.state;

        //check and return if first time user and no userData is available
        if (userData.length === undefined){
            return (
                <div>There is no previous route info found. Let's start your journey!</div>
            )
        }

        //create list of all previous routes
        const prevRoutes = userData.prevRoutes.map((prevR, i)=>{
            return(
                <PrevRoutes key={i} info={prevR} />
            )
        })
        // const totalPoints = userData.prevRoutes.map((prevR, i)=>{
        //     return prevR.points.reduce((acc, point)=> acc + points.totalPoints)
        // })

        return(
        <React.Fragment>
        <Jumbotron>
            <Container>
            <h1>Welcome!</h1>
                <p>Total Miles: {this.state.totalMiles}</p>
                <p>Total Points: {this.state.totalPoints}</p>
            </Container>
        </Jumbotron>
        {prevRoutes}
        </React.Fragment>
        )
    }
}
export default UserStats;