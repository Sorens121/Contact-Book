import React from 'react';
import classnames from 'classnames';
import { DOTS, usePagination } from '../../hooks/usePagination';
import './style.scss';

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if(currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    
    return (
        <ul
            className={classnames('pagination-container', {[className]: className})}
        >
            {/* Left navigation arrow */}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <div className='arrow left'/>
            </li>

            {
                paginationRange.map((pageNumber) => {
                    if(pageNumber === DOTS){
                        return <li className='pagination-item dots' key={pageNumber}>&#8230;</li>
                    }

                    // Render our page pills

                    return (
                        <li
                            className={classnames('pagination-item', {
                                selected: pageNumber === currentPage
                            })}
                            onClick={() => onPageChange(pageNumber)}
                            key={pageNumber}
                        >
                            {pageNumber}
                        </li>
                    )
                })
            }

            {/* Right navigation arrow */}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <div className='arrow right'/>
            </li>
        </ul>
    )
}

export default Pagination;