import React from 'react';
import { ExplanationOfBenefitComponentProps } from '../../types';

const EobComponent: React.FC<ExplanationOfBenefitComponentProps> = ({ data }) => {
    return (
        <div>
            <h2>Explanation of Benefit Information</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default EobComponent;