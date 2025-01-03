import { Component } from "react";
import { Grid2 } from "@mui/material";
import ALGO_SALIO_MAL from '../Images/ALGO_SALIO_MAL.jpg'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        console.log('ErrorBoundary caught an error', error, errorInfo);
    }
    render() {
        <div>
            <Grid2
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <img src={ALGO_SALIO_MAL} alt="Error" width="200" height="200" />
            </Grid2>

        </div>
        if (this.state.hasError) {
            return <h2>ups! Algo salió mal. Intente de nuevo</h2>
        }
        return this.props.children;
    }
}

export default ErrorBoundary