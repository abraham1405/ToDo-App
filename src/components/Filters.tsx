import React from 'react';
import { FILTERS_BUTTONS } from '../consts';
import type { FilterSelected } from '../types';

interface Props {
    onFilterChange: (filter: FilterSelected) => void;
    filterSelected: FilterSelected;
}

export const Filters: React.FC<Props> = ({
    filterSelected, onFilterChange
}) => {
    return (
        <ul className="filters">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, {href, literal}]) => {
                    const isSelected = filterSelected === key;
                    const className = isSelected ? 'selected' : '';
                    
                    return (
                        <li key={key}>

                            <a
                            href={href} 
                            className={className} 
                            onClick={(event) => {
                                event.preventDefault();
                                onFilterChange(key as FilterSelected);
                            }}
                            >
                                {literal}
                            </a>
                        </li>
                    );
                })
            }
        </ul>
    );
};
