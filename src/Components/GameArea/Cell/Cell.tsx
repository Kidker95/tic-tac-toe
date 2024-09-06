import React from 'react';
import { Paper } from '@mui/material';

type CellProps = {
    value: string | null;
    onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ value, onClick }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '100px',
                margin: '8px',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                cursor: 'pointer',
                backgroundColor: value ? '#f5f5f5' : '#fff', // Set background color depending on the value
            }}
            onClick={onClick}
        >
            {value}
        </Paper>
    );
}
