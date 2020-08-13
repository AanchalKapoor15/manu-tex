import React, { FunctionComponent } from 'react';
import Sidebar from '../sidebar/sidebar';
import { Container, Row, Col } from 'reactstrap';
import { GlobalStyles } from '../../styles/globalStyles';

export const Home: FunctionComponent = () => {
    return (
        <Container
            style={GlobalStyles.MasterContainer}>
            <Row>
                <Col
                    className="col-auto"
                    style={GlobalStyles.Col}>
                    <Sidebar pageIndex={1} />
                </Col>
                <Col
                    style={GlobalStyles.Col}>
                    <span>
                        Welcome to Manu Tex
                    </span>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;