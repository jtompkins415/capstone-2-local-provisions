import {
    Card,
    CardTitle,
    CardBody,
    CardText,
    Button
} from 'reactstrap'

const Home = () => {
    return (
        <div className='Home'>
            <h1>Local Provisions</h1>
            <h3>Enjoy your community!</h3>
            <div className='Home-body'>
                <Button
                    href='/signup'
                    tag='a'>Sign Up!</Button>
                <Button
                    href='/login'
                    tag='a'>Login!</Button>
            </div>
        </div>
    )
}

export default Home