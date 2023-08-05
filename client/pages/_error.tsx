import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface ErrorPageProps {
    statusCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
    return (
        <div>
            <h1>{statusCode} - Page Not Found _error.tsx</h1>
            <p>Oops! The page you're looking for does not exist.</p>
            <Link href="/">Go back to the homepage</Link>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ErrorPageProps> = async (context) => {
    const statusCode = context.res ? context.res.statusCode : 404;
    return { props: { statusCode } };
};

export default ErrorPage;
