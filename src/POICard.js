import {
    Card,
    CardBody,
    CardTitle,
    CardLink
} from 'reactstrap';

const POICard = ({name, rating, type, url }) => {
    return (
        <Card>
            <CardTitle>
                {name}
            </CardTitle>
            <CardBody>
                <div>{rating}</div>
                <div>{type}</div>
                <CardLink href={url}> 
                    Visit Website 
                </CardLink>   
            </CardBody>
        </Card>
    )
}

export default POICard;
