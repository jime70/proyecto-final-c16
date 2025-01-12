import { Component } from "react";
import { Grid2 } from "@mui/material";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <Grid2
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img src="/ALGO_SALIO_MAL.jpg" alt="Error" width="auto" height="auto" style={{ marginTop: "50px", marginBottom: "50px" }}/>
                    </Grid2>
                    <h2>¡Ups! Algo salió mal. Intente de nuevo.</h2>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
