import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

interface ErrorPageProps {
    statusCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
    const myH1TagsStyle = {
        color: 'white',
        backgroundColor: 'DodgerBlue',
        padding: '10px',
        fontFamily: 'Arial',
    };

    const myLinkTagsStyle = {
        display: 'block',
        margin: '10px',
        padding: '10px',
        border: '2px solid black',
        borderRadius: '4px',
        color: '#333',
        textDecoration: 'none',
        transition: 'all 0.3s',
    };

    const [hovered, setHovered] = useState(false);

    const handleMouseOver = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <div>
                <h1>{statusCode} - Page Not Found _error.tsx</h1>
                <p style={myH1TagsStyle}>Oops! The page you're looking for does not exist.</p>
                <Link
                    href="/"
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        ...myLinkTagsStyle,
                        ...(hovered && {
                            borderColor: '#691f74',
                            color: '#fff',
                            backgroundColor: '#691f74',
                        }),
                    }}
                >
                    Go back to the homepage
                </Link>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ErrorPageProps> = async (context) => {
    const statusCode = context.res ? context.res.statusCode : 404;
    return { props: { statusCode } };
};

export default ErrorPage;
