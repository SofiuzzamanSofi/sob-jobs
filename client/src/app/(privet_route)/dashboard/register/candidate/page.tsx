import CandidateRegistration from '@/components/register/CandidateRegistration';
import React, { FC } from 'react'

interface CandidateProps {

};

const Candidate: FC<CandidateProps> = ({ }) => {
    return (
        <div>
            <CandidateRegistration />
        </div>
    )
};

export default Candidate;